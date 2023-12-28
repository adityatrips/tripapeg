import { addDoc, collection, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../firebase';
import { DateTime } from 'luxon';

const ContactForm = ({ tripName = '', isInTripPage = true }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [query, setQuery] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const addQuery = async (data) => {
		setIsLoading(true);

		const dataRef = collection(db, 'queries');
		await addDoc(dataRef, data);
		setName('');
		setEmail('');
		setPhone('');
		setQuery('');

		setIsLoading(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let data = {
			name,
			email,
			phone,
			query,
			tripName,
			date: DateTime.fromISO(DateTime.now().toISO()).toLocaleString({
				...DateTime.DATETIME_SHORT_WITH_SECONDS,
				weekday: 'long',
			}),
		};

		addQuery(data);
	};

	return (
		<form
			className={`border-2 flex flex-col gap-2 border-secondary p-5 mt-5 rounded ${
				isLoading ? 'animate-pulse' : ''
			}`}
			onSubmit={handleSubmit}
		>
			<label>
				<p className="font-bold uppercase mt-2">Name:</p>
				<input
					className="bg-[transparent] text-text border-2 border-secondary rounded flex-grow outline-none p-2 w-full"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</label>
			<label>
				<p className="font-bold uppercase mt-2">Email:</p>
				<input
					className="bg-[transparent] text-text border-2 border-secondary rounded flex-grow outline-none p-2 w-full"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</label>
			<label>
				<p className="font-bold uppercase mt-2">Phone:</p>
				<input
					className="bg-[transparent] text-text border-2 border-secondary rounded flex-grow outline-none p-2 w-full"
					type="tel"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>
			</label>
			<label>
				<p className="font-bold uppercase mt-2">Query:</p>
				<textarea
					className="bg-[transparent] text-text border-2 border-secondary rounded flex-grow outline-none p-2 w-full"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
			</label>
			{isInTripPage && (
				<label>
					Trip Name:&nbsp;
					<span className="font-bold uppercase text-secondary">
						{tripName}
					</span>
				</label>
			)}
			<button
				type="submit"
				className="btn rounded-md btn-s w-full"
			>
				Submit
			</button>
		</form>
	);
};

export default ContactForm;

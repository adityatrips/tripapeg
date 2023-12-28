import React, { useState } from 'react';

const ContactForm = ({ tripName = '', isInTripPage = true }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [query, setQuery] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		let data = {
			name,
			email,
			phone,
			query,
			tripName,
		};
		fetch(`${process.env.REACT_APP_URL}/contact`, {
			method: 'POST',
			body: JSON.stringify(data),
		}).then((res) => {
			if (res.status === 200) {
				setEmail('');
				setName('');
				setPhone('');
				setQuery('');
			}
		});
	};

	return (
		<form
			className="border-2 flex flex-col gap-2 border-secondary p-5 mt-5 rounded"
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

import React, { useEffect, useState } from 'react';
import ReactImageUploading from 'react-images-uploading';
import { db, storage } from './../firebase';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import slugify from 'slugify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import ImageUploader from 'react-images-upload';
import 'react-image-upload/dist/index.css';

const HomePage = () => {
	const [tripTypeOpt, setTripTypeOpt] = useState([
		'Domestic',
		'International',
		'Family',
		'Honeymoon',
		'Bachelors',
		'Pilgrimage',
	]);
	const [destinationOpt, setDestinationOpt] = useState([
		'Andaman and Nicobar',
		'Bangkok Pattaya',
		'Kerala',
		'Meghalaya',
		'Phuket Krabi',
		'Rajasthan',
		'Dubai and Abu Dhabi',
		'Kedarnath Yatra from Delhi',
		'Kedarnath Yatra from Haridwar',
		'Shimla and Manali',
	]);
	const [activitiesOpt, setActivitiesOpt] = useState([
		'Water Sports',
		'Camping',
		'Underwater Diving',
		'Boating',
		'Camping',
		'Trekking',
		'Safari',
		'Adventure sports',
	]);
	const [images, setImages] = useState([]);

	const [cards, setCards] = useState([]);

	const [name, setName] = useState('');
	const [place, setPlace] = useState('');
	const [duration, setDuration] = useState('');
	const [price, setPrice] = useState('');
	const [days, setDays] = useState('');
	const [tags, setTags] = useState('');
	const [activities, setActivities] = useState('');
	const [months, setMonths] = useState('');
	const [inclusions, setInclusions] = useState('');
	const [exclusions, setExclusions] = useState('');
	const [hotels, setHotels] = useState('');
	const [imageRaw, setImageRaw] = useState('');

	const [allDays, setAllDays] = useState([]);

	const [dayNumber, setDayNumber] = useState('');
	const [dayTitle, setDayTitle] = useState('');
	const [dayDescription, setDayDescription] = useState('');
	const [imgUrl, setImgUrl] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log(images);

		uploadBytes(
			ref(
				storage,
				`images/${slugify(imageRaw.name, { lower: true }).toString()}`
			),
			imageRaw,
			''
		).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {
				setImgUrl(url.toString());
			});
		});

		let data = {
			activities: activities.split(','),
			available: {
				jan: months.includes('jan') ? true : false,
				feb: months.includes('feb') ? true : false,
				mar: months.includes('mar') ? true : false,
				apr: months.includes('apr') ? true : false,
				may: months.includes('may') ? true : false,
				jun: months.includes('jun') ? true : false,
				jul: months.includes('jul') ? true : false,
				aug: months.includes('aug') ? true : false,
				sep: months.includes('sep') ? true : false,
				oct: months.includes('oct') ? true : false,
				nov: months.includes('nov') ? true : false,
				dec: months.includes('dec') ? true : false,
			},
			d_days: days.toString(),
			days: allDays.toString(),
			duration: duration.toString(),
			exclusions: exclusions.split(','),
			hotels: hotels.split(','),
			inclusions: inclusions.split(','),
			name: name.toString(),
			price: parseInt(price),
			slug: slugify(name, { lower: true }).toString(),
			src: imgUrl,
			tags: tags.split(','),
		};

		const dataRef = collection(db, 'data');
		try {
			await setDoc(doc(db, 'data', name), data, { merge: true });

			if (
				!imageRaw ||
				!name ||
				!place ||
				!duration ||
				!price ||
				!days ||
				!tags ||
				!activities ||
				!months ||
				!inclusions ||
				!exclusions ||
				!hotels
			) {
				throw new Error('Please fill all the fields');
			}
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full my-5"
		>
			<ImageUploader
				withPreview
				fileContainerStyle={{
					background: 'transparent',
					border: '2px dashed var(--secondary)',
				}}
				buttonStyles={{
					background: 'var(--secondary)',
					color: 'white',
					fontWeight: 'bold',
					borderRadius: '0.5rem',
				}}
				labelStyles={{
					fontSize: '1rem',
				}}
				withIcon={true}
				buttonText="Choose images"
				onChange={(picture) => {
					setImageRaw(picture[0]);
				}}
				imgExtension={['.jpg', '.jpeg', '.gif', '.png', '.gif']}
				maxFileSize={5242880}
				singleImage
			/>

			<div className="md:flex-grow flex flex-col gap-1">
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					className="input-style w-full"
					placeholder="Name of the trip"
				/>
				<input
					value={place}
					onChange={(e) => setPlace(e.target.value)}
					type="text"
					className="input-style w-full"
					placeholder="Name of the place"
				/>
				<input
					value={duration}
					onChange={(e) => setDuration(e.target.value)}
					type="text"
					className="input-style w-full"
					placeholder="Duration of the trip (x days, y nights)"
				/>
				<input
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					type="text"
					className="input-style w-full"
					placeholder="Price of the trip"
				/>
				<input
					value={days}
					onChange={(e) => setDays(e.target.value)}
					type="text"
					className="input-style w-full"
					placeholder="Number of days of the trip"
				/>
				<input
					value={tags}
					onChange={(e) => setTags(e.target.value)}
					type="text"
					className="input-style w-full"
					placeholder="Tags for the trip (separate by a semicolol (;))"
				/>
				<input
					value={activities}
					onChange={(e) => setActivities(e.target.value)}
					type="text"
					className="input-style w-full"
					placeholder="Activities during the trip (separate by a semicolol (;))"
				/>
				<input
					value={months}
					onChange={(e) => setMonths(e.target.value)}
					type="text"
					className="input-style w-full"
					placeholder='Trip available in "month" (separate by a semicolol (;))'
				/>
				<small className="font-bold text-center">
					Available months (case-sensitive):&nbsp;
					<span className="text-red-300">jan</span>,&nbsp;
					<span className="text-red-300">feb</span>,&nbsp;
					<span className="text-red-300">mar</span>,&nbsp;
					<span className="text-red-300">apr</span>,&nbsp;
					<span className="text-red-300">may</span>,&nbsp;
					<span className="text-red-300">jun</span>,&nbsp;
					<span className="text-red-300">jul</span>,&nbsp;
					<span className="text-red-300">aug</span>,
					<span className="text-red-300">sep</span>,&nbsp;
					<span className="text-red-300">oct</span>,&nbsp;
					<span className="text-red-300">nov</span>,&nbsp;
					<span className="text-red-300">dec</span>,
				</small>
				<div>
					<div className="flex flex-col gap-2">
						{cards && (
							<div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
								{cards.map((card, index) => (
									<Card
										handleRemove={(e) => {
											setCards(
												cards.filter(
													(card, i) => i !== e
												)
											);
											setAllDays(
												allDays.filter(
													(card, i) => i !== e
												)
											);
										}}
										key={index}
										index={index}
										dayNumber={card.dayNumber}
										dayTitle={card.dayTitle}
										dayDescription={card.dayDescription}
									/>
								))}
							</div>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<input
							value={dayNumber}
							onChange={(e) => setDayNumber(e.target.value)}
							type="text"
							className="input-style w-full"
							placeholder="Day number"
						/>
						<input
							value={dayTitle}
							onChange={(e) => setDayTitle(e.target.value)}
							type="text"
							className="input-style w-full"
							placeholder="Day title"
						/>
						<input
							value={dayDescription}
							onChange={(e) => setDayDescription(e.target.value)}
							type="text"
							className="input-style w-full"
							placeholder="Day description"
						/>
						<a
							onClick={() => {
								setAllDays((prev) => [
									...prev,
									{ dayNumber, dayTitle, dayDescription },
								]);
								setCards([
									...cards,
									{ dayNumber, dayTitle, dayDescription },
								]);
								setDayNumber('');
								setDayTitle('');
								setDayDescription('');
							}}
							className="rounded-lg px-4 py-1 md:py-2 bg-secondary cursor-pointer text-center font-bold uppercase w-full mb-1"
						>
							Add Day
						</a>
					</div>
				</div>
				<textarea
					value={inclusions}
					onChange={(e) => setInclusions(e.target.value)}
					className="input-style w-full"
					placeholder="Inclusions of the trip (separate by a semicolol (;))"
					rows={5}
				></textarea>
				<textarea
					value={exclusions}
					onChange={(e) => setExclusions(e.target.value)}
					className="input-style w-full"
					placeholder="Exclusions of the trip (separate by a semicolol (;))"
					rows={5}
				></textarea>
				<textarea
					value={hotels}
					onChange={(e) => setHotels(e.target.value)}
					className="input-style w-full"
					placeholder="Hotels of the trip (separate by a semicolol (;))"
					rows={5}
				></textarea>
			</div>

			<button
				className="rounded-lg px-4 py-1 md:py-2 bg-secondary w-full mt-5"
				type="submit"
			>
				Submit
			</button>
		</form>
	);
};

function Card({ dayNumber, dayTitle, dayDescription, index, handleRemove }) {
	return (
		<div className="border-2 border-secondary p-2 rounded-lg">
			<h1 className="text-2xl text-center font-bold uppercase">
				Day {dayNumber}
			</h1>
			<p className="font-bold text-xl text-center">{dayTitle}</p>
			<p className="text-justify break-words mb-5">{dayDescription}</p>
			<a
				onClick={() => handleRemove(index)}
				className="rounded-lg px-4 py-1 md:py-2 bg-secondary w-full font-bold uppercase text-center cursor-pointer"
			>
				Remove
			</a>
		</div>
	);
}

export default HomePage;

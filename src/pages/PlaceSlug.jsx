import React, { useEffect, useState } from 'react';
import ImageUploader from 'react-image-upload';
import {
	arrayRemove,
	arrayUnion,
	collection,
	getDocs,
	query,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore';
import { getDownloadURL, ref as REF, uploadBytes } from 'firebase/storage';
import { db, storage } from '../firebase';
import slugify from 'slugify';
import { useParams } from 'react-router-dom';
import { MdClose, MdUploadFile } from 'react-icons/md';

const PlaceSlug = () => {
	const { id } = useParams();
	const [data, setData] = useState({});

	const getData = async () => {
		const d = query(collection(db, 'data'), where('slug', '==', id));
		const dSnap = await getDocs(d);
		setData(dSnap.docs[0].data());

		setName(dSnap.docs[0].data().name);
		setDuration(dSnap.docs[0].data().duration);
		setPrice(dSnap.docs[0].data().price);
		setDays(dSnap.docs[0].data().d_days);
		setTags(dSnap.docs[0].data().tags.join(';'));
		setActivities(dSnap.docs[0].data().activities.join(';'));
		for (let [k, v] of Object.entries(dSnap.docs[0].data().available)) {
			if (v == true) {
				setMonths((prev) => {
					return String(prev + ',' + k);
				});
			}
		}
		setInclusions(dSnap.docs[0].data().inclusions.join(';'));
		setExclusions(dSnap.docs[0].data().exclusions.join(';'));
		setHotels(dSnap.docs[0].data().hotels.join(';'));
		setImgUrl(dSnap.docs[0].data().src);
		setAllDays(
			dSnap.docs[0].data().days.length == 0
				? []
				: dSnap.docs[0].data().days
		);
	};

	const [cards, setCards] = useState([]);

	const [imgFile, setImgFile] = useState('');
	const [imgName, setImgName] = useState('');
	const [imgUrl, setImgUrl] = useState('');
	const [name, setName] = useState('');
	const [duration, setDuration] = useState('');
	const [price, setPrice] = useState('');
	const [days, setDays] = useState([]);
	const [tags, setTags] = useState('');
	const [activities, setActivities] = useState('');
	const [months, setMonths] = useState('');
	const [inclusions, setInclusions] = useState('');
	const [exclusions, setExclusions] = useState('');
	const [hotels, setHotels] = useState('');
	const [allDays, setAllDays] = useState([]);

	useEffect(() => {
		getData();
	}, [cards]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const ref = collection(db, 'data');
		const doc = await getDocs(query(ref, where('slug', '==', id)));

		uploadBytes(
			REF(
				storage,
				`images/${slugify(imgName, { lower: true }).toString()}`
			),
			imgFile,
			''
		).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {
				setImgUrl(url.toString());
			});
		});

		try {
			const snap = await updateDoc(doc.docs[0].ref, {
				activities: activities.split(';'),
				available: {
					jan: months.includes('jan'),
					feb: months.includes('feb'),
					mar: months.includes('mar'),
					apr: months.includes('apr'),
					may: months.includes('may'),
					jun: months.includes('jun'),
					jul: months.includes('jul'),
					aug: months.includes('aug'),
					sep: months.includes('sep'),
					oct: months.includes('oct'),
					nov: months.includes('nov'),
					dec: months.includes('dec'),
				},
				d_days: days,
				days: allDays,
				duration: duration,
				exclusions: exclusions.split(';'),
				hotels: hotels.split(';'),
				inclusions: inclusions.split(';'),
				name: name,
				price: parseInt(price),
				tags: tags.split(';'),
				src: imgUrl,
			});
		} catch (err) {
			alert(err.message + '\nContact us at: tripapeg@gmail.com');
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full my-5"
		>
			<div className="grid grid-cols-2 gap-2 mb-2">
				<img
					src={imgUrl}
					alt=""
					className="w-[50vw] h-auto object-contain aspect-video mx-auto border-2 border-secondary border-dashed rounded-lg"
				/>

				<ImageUploader
					onFileAdded={(picture) => {
						setImgFile(picture.file);
						setImgName(picture.file.name);
					}}
					style={{
						height: 'auto',
						aspectRatio: '16/9',
						margin: '0 auto',
						borderRadius: '.5rem',
						width: 'calc(50vw - 2rem)',
						minWidth: '100%',
						objectFit: 'contain',
						background: 'var(--secondary)',
						border: '2px dashed var(--secondary) !important',
						position: 'relative',
					}}
					imgExtension={['.jpg', '.jpeg', '.gif', '.png', '.gif']}
					maxFileSize={5242880}
					singleImage
					uploadIcon={
						<div className="aspect-square  rounded-full w-auto h-full bg-secondary flex items-center justify-center p-5">
							<MdUploadFile size={48} />
						</div>
					}
					deleteIcon={
						<div className="aspect-square rounded-full absolute bg-secondary top-2 right-3.5 p-5 ">
							<MdClose size={20} />
						</div>
					}
				/>
			</div>

			<div className="md:flex-grow flex flex-col gap-1">
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					className="input-style w-full"
					placeholder="Name of the trip"
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
				<div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{allDays.length == 0 || !allDays ? (
						<Card
							allDays={allDays}
							slug={data.slug}
							dayNumber={'1'}
							dayTitle={''}
							dayDescription={''}
							index={0}
						/>
					) : (
						allDays.map((day, index) => {
							return (
								<Card
									slug={data.slug}
									dayNumber={day.day}
									dayTitle={day.title}
									dayDescription={day.desc}
									index={index}
								/>
							);
						})
					)}
				</div>
				<a
					className="text-center text-text bg-secondary px-4 py-2 rounded-lg font-bold my-2 cursor-pointer uppercase"
					onClick={() => {
						setAllDays((prev) => {
							return [
								...prev,
								{
									day: prev.length + 1,
									title: '',
									desc: '',
								},
							];
						});
					}}
				>
					Add day
				</a>
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

function Card({ slug, allDays, dayNumber, dayTitle, dayDescription, index }) {
	const [newDayTitle, setNewDayTitle] = useState(dayTitle);
	const [newDayDescription, setNewDayDescription] = useState(dayDescription);
	const [newDayNumber, setNewDayNumber] = useState(dayNumber);

	const updateDay = async () => {
		const docRef = collection(db, 'data');
		const docSnap = await getDocs(query(docRef, where('slug', '==', slug)));

		const doc = docSnap.docs[0].ref;

		await setDoc(doc, {
			days: allDays,
		});
	};

	const removeDay = async () => {
		const docRef = collection(db, 'data');
		const docSnap = await getDocs(query(docRef, where('slug', '==', slug)));

		const doc = await getDocs(
			query(docSnap.docs[0].ref),
			where('activities.day', '==', `${dayNumber}`)
		);

		await updateDoc(
			doc,
			{
				days: arrayRemove({
					day: dayNumber,
					title: dayTitle,
					desc: dayDescription,
				}),
			},
			{ merge: true }
		);

		window.location.reload();
	};

	return (
		<div className="border-2 border-secondary p-2 rounded-lg">
			<h1 className="text-2xl text-center font-bold uppercase mb-2">
				Day{' '}
				<input
					className="font-bold text-xl bg-background border-2 border-secondary rounded-lg p-2 w-fit"
					value={newDayNumber}
					onChange={(e) => setNewDayNumber(e.target.value)}
				/>
			</h1>
			<input
				onChange={(e) => setNewDayTitle(e.target.value)}
				className="font-bold text-xl bg-background w-full mb-2 border-2 border-secondary rounded-lg p-2"
				value={newDayTitle}
			/>
			<textarea
				onChange={(e) => setNewDayDescription(e.target.value)}
				className="bg-background w-full mb-2 border-2 border-secondary rounded-lg p-2"
				value={newDayDescription}
				rows={10}
			></textarea>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
				<a
					className="rounded-lg px-4 py-1 md:py-2 bg-secondary w-full mt-5 cursor-pointer text-center uppercase font-bold"
					onClick={updateDay}
				>
					Update Day
				</a>
				<a
					className="rounded-lg px-4 py-1 md:py-2 bg-secondary w-full mt-5 cursor-pointer text-center uppercase font-bold"
					onClick={removeDay}
				>
					Remove Day
				</a>
			</div>
		</div>
	);
}

export default PlaceSlug;

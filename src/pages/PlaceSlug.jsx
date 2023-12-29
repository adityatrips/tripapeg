import React, { useEffect, useState } from 'react';
import ImageUploader from 'react-image-upload';
import 'react-image-upload/dist/index.css';
import {
	Navigate,
	RedirectFunction,
	useNavigate,
	useNavigation,
} from 'react-router-dom';
import {
	addDoc,
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
import { toast } from 'react-toastify';

let PlaceSlug = () => {
	let { id } = useParams();
	const [loading, setLoading] = useState(true);

	let getData = async () => {
		let d = query(collection(db, 'data'), where('slug', '==', id));
		let dSnap = await getDocs(d);
		setImgUrl(dSnap.docs[0].data().src);
		setName(dSnap.docs[0].data().name);
		setDuration(dSnap.docs[0].data().duration);
		setPrice(dSnap.docs[0].data().price);
		setDays(dSnap.docs[0].data().d_days);
		setTags(dSnap.docs[0].data().tags.join(';'));
		setActivities(dSnap.docs[0].data().activities.join(';'));
		for (let [k, v] of Object.entries(dSnap.docs[0].data().available)) {
			if (v == true) {
				setMonths((prev) => {
					return String(prev + ';' + k);
				});
			}
		}
		setInclusions(dSnap.docs[0].data().inclusions.join(';'));
		setExclusions(dSnap.docs[0].data().exclusions.join(';'));
		setHotels(dSnap.docs[0].data().hotels.join(';'));
		setImgUrl(dSnap.docs[0].data().src);
		setAllDays(dSnap.docs[0].data().days);
	};

	let [imgUrl, setImgUrl] = useState('');
	let [name, setName] = useState('');
	let [duration, setDuration] = useState('');
	let [price, setPrice] = useState('');
	let [days, setDays] = useState([]);
	let [tags, setTags] = useState('');
	let [activities, setActivities] = useState('');
	let [months, setMonths] = useState('');
	let [inclusions, setInclusions] = useState('');
	let [exclusions, setExclusions] = useState('');
	let [hotels, setHotels] = useState('');
	let [allDays, setAllDays] = useState([]);

	let [dayNumber, setDayNumber] = useState('');
	let [dayTitle, setDayTitle] = useState('');
	let [dayDescription, setDayDescription] = useState('');

	useEffect(() => {
		getData();
		setLoading(false);
	}, []);

	let handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let ref = collection(db, 'data');
			let doc = await getDocs(query(ref, where('slug', '==', id)));
			await updateDoc(doc.docs[0].ref, {
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

			toast.success('Trip updated successfully!');
		} catch (err) {
			toast.error(err.message + '\nContact us at: tripapeg@gmail.com');
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
			</div>
		);
	}
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
					onFileRemoved={() => {
						toast.success('Picture removed successfully!');
					}}
					onFileAdded={(picture) => {
						uploadBytes(
							REF(
								storage,
								`images/${slugify(
									name +
										'.' +
										picture.file.name.split('.')[1],
									{
										lower: true,
									}
								)}`
							),
							picture.file
						)
							.then((snapshot) => {
								return getDownloadURL(snapshot.ref);
							})
							.then((url) => {
								setImgUrl(url);
							});
						if (!imgUrl) {
							toast.error('Please upload the picture again!');
						} else {
							toast.success('Picture uploaded successfully!');
						}
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
					<span className="text-red-300">jan</span>;&nbsp;
					<span className="text-red-300">feb</span>;&nbsp;
					<span className="text-red-300">mar</span>;&nbsp;
					<span className="text-red-300">apr</span>;&nbsp;
					<span className="text-red-300">may</span>;&nbsp;
					<span className="text-red-300">jun</span>;&nbsp;
					<span className="text-red-300">jul</span>;&nbsp;
					<span className="text-red-300">aug</span>;
					<span className="text-red-300">sep</span>;&nbsp;
					<span className="text-red-300">oct</span>;&nbsp;
					<span className="text-red-300">nov</span>;&nbsp;
					<span className="text-red-300">dec</span>
				</small>
				<div>
					<div className="flex flex-col gap-2">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
							{allDays.map((day, index) => {
								let { dayNumber, dayTitle, dayDescription } =
									day;
								return (
									<div
										key={index}
										className="border-2 border-secondary p-2 rounded-lg"
									>
										<h1 className="text-2xl text-center font-bold uppercase">
											Day {dayNumber}
										</h1>
										<p className="font-bold text-xl text-center">
											{dayTitle}
										</p>
										<p className="text-justify break-words mb-5">
											{dayDescription}
										</p>
										<a
											onClick={() =>
												setAllDays(
													allDays.filter(
														(item) =>
															item.dayNumber !==
															dayNumber
													)
												)
											}
											className="rounded-lg px-4 py-1 md:py-2 bg-secondary w-full font-bold uppercase text-center cursor-pointer"
										>
											Remove
										</a>
									</div>
								);
							})}
						</div>
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

export default PlaceSlug;

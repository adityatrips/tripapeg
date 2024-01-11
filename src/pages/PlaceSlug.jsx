import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Accordion from './../components/Accordion';
import DestCard from './../components/DestCard';
import ContactForm from './../components/ContactForm';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const PlaceSlug = () => {
	const [cancellation, setCancellation] = useState([]);
	const [notes, setNotes] = useState([]);

	const { id } = useParams();

	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState({});

	const getDeal = async () => {
		const dataRef = collection(db, 'destinations');

		const dataSnap = await getDocs(
			query(dataRef, where('slug', '==', id), limit(1))
		);

		setData(dataSnap.docs[0].data());
		setIsLoading(false);
	};

	const getInfo = async () => {
		const cRef = collection(db, 'cancellation');
		const nRef = collection(db, 'notes');
		const dataSnapC = await getDocs(cRef);
		const dataSnapN = await getDocs(nRef);

		dataSnapC.docs.map((doc) =>
			setCancellation((prev) => [...prev, doc.data().desc])
		);
		dataSnapN.docs.map((doc) => setNotes((prev) => [...prev, doc.data().desc]));
	};

	useEffect(() => {
		getDeal();
		getInfo();
	}, []);

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<div>
			<ul className="accordion">
				<Accordion heading="Overview">
					<DestCard
						src={data.src}
						title={data.name}
						time={data.duration}
						place={data.name}
						price={`${data.price} / per person`}
						jan={data.available.jan}
						feb={data.available.feb}
						mar={data.available.mar}
						apr={data.available.apr}
						may={data.available.may}
						jun={data.available.jun}
						jul={data.available.jul}
						aug={data.available.aug}
						sep={data.available.sep}
						oct={data.available.oct}
						nov={data.available.nov}
						dec={data.available.dec}
						inclusions={data.inclusions}
						exclusions={data.exclusions || null}
						hotels={data.hotels || null}
					/>
				</Accordion>
				<Accordion heading="Itinerary">
					{data &&
						data.days.map((day) => {
							console.log(day);
							return (
								<div key={day.day}>
									<h1 className="text-xl font-extrabold">
										Day {day.day} ({day.title})
									</h1>
									<p className="text-justify mb-5">
										&nbsp;&nbsp;&nbsp;{day.desc}
									</p>
								</div>
							);
						})}
				</Accordion>
			</ul>

			<ul className="accordion">
				<Accordion heading="Cancellation Policy">
					{cancellation.map((cancel) => (
						<div>{cancel}</div>
					))}
				</Accordion>
			</ul>

			<ul className="accordion">
				<Accordion heading="General Information">
					{notes.map((note) => (
						<div>{note}</div>
					))}
				</Accordion>
			</ul>
		</div>
	);
};

export default PlaceSlug;

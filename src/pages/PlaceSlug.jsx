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
		const dataRef = collection(db, 'data');

		const dataSnap = await getDocs(
			query(dataRef, where('slug', '==', id), limit(1))
		);

		setData(dataSnap.docs[0].data());
		setIsLoading(false);
	};

	const getInfo = async () => {
		const cRef = collection(db, 'cancellation');
		const nRef = collection(db, 'note');
		const dataSnapC = await getDocs(cRef);
		const dataSnapN = await getDocs(nRef);

		dataSnapC.docs.map((doc) =>
			setCancellation((prev) => [...prev, doc.data().cancellationDesc])
		);
		dataSnapN.docs.map((doc) =>
			setNotes((prev) => [...prev, doc.data().noteDesc])
		);
	};

	useEffect(() => {
		getDeal();
		getInfo();
	}, []);

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<div>
			<img
				src={data.src}
				alt={data.id}
				className="w-[100%] flex justify-center items-center"
			/>

			<div className="flex flex-row justify-center items-center">
				<div
					data-duration={data.duration.split(' ')[0]}
					className="duration rounded"
				></div>
				<h1 className="text-2xl">{data.name}</h1>
			</div>

			<div className="meta-dest">
				<p className="text-justify">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
					modi, nostrum voluptate vitae esse dignissimos, consectetur
					at laboriosam suscipit iusto aperiam eaque odio asperiores
					minima perspiciatis atque ratione facere ullam nam! Fuga
					minus in beatae libero. Voluptatibus impedit modi explicabo
					earum ducimus, odit cupiditate ipsum quaerat. Corporis,
					excepturi? Nam, quos?
				</p>
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
							data.days.map((day) => (
								<div key={day.day}>
									<h1 className="text-xl font-extrabold">
										Day {day.day} ({day.title})
									</h1>
									<p className="text-justify mb-5">
										&nbsp;&nbsp;&nbsp;{day.desc}
									</p>
								</div>
							))}
					</Accordion>
				</ul>
			</div>

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

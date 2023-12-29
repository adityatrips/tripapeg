import React, { useEffect, useState } from 'react';
import Information from './../components/Information';
import Carousel from './../components/Carousel';
import SearchPlaces from './../components/SearchPlaces';
import Card from './../components/Card';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	query,
	where,
} from 'firebase/firestore';
import { db } from './../firebase';

const HomePage = () => {
	const [dests, setDests] = useState([]);
	const [loading, setLoading] = useState(true);
	const [cruiseData, setCruiseData] = useState([]);
	const [dealsData, setDealsData] = useState([]);

	const getCruiseDeals = async () => {
		const dataRef = collection(db, 'cruise');
		const dataSnap = await getDocs(dataRef);

		let tmpData = [];

		dataSnap.forEach((doc) => {
			tmpData.push(doc.data());
		});

		setCruiseData(tmpData);
	};

	const getDeals = async () => {
		const dataRef = collection(db, 'data');
		const dataSnap = await getDocs(
			query(dataRef, where('tags', 'array-contains', 'featured'))
		);

		dataSnap.forEach((doc) => {
			console.log(doc.data());
		});

		let tmpData = [];

		dataSnap.forEach((doc) => {
			tmpData.push(doc.data());
		});

		setDealsData(tmpData);
	};

	useEffect(() => {
		const getData = async () => {
			await getCruiseDeals();
			await getDeals();

			return;
		};

		getData();
		setLoading(false);
	}, [loading]);

	return loading ? (
		<div>Loading...</div>
	) : (
		<div className="w-full">
			<Carousel />
			<SearchPlaces dest={dests} />
			<Information />
			<div>
				<h1 className="text-2xl md:text-4xl text-center uppercase font-bold my-10">
					Offers
				</h1>

				<div className="grid gap-2 grid-cols-1 md:grid-cols-2">
					<img
						alt="Offer 1"
						src="/offer1.jpeg"
						height={1920}
						width={1080}
					/>
					<img
						alt="Offer 2"
						src="/offer2.jpeg"
						height={1920}
						width={1080}
					/>
				</div>
			</div>
			<div>
				<h1 className="text-2xl md:text-4xl text-center uppercase font-bold my-10">
					Crusie Deals
				</h1>
				<div className="grid gap-5 grid-cols-1 md:grid-cols-2">
					{cruiseData.map((deal, index) => (
						<Card
							desc={deal.desc}
							price={deal.price}
							src={deal.src}
							duration={deal.duration}
							name={deal.name}
							// slug={''}
							key={index}
						/>
					))}
				</div>
			</div>
			<div>
				<h1 className="text-2xl md:text-4xl text-center uppercase font-bold my-10">
					Popular Deals
				</h1>
				<div className="grid grid-cols-1 gap-5 md:grid-cols-2  lg:grid-cols-4">
					{dealsData.map((deal, index) => (
						<Card
							desc={deal.desc}
							price={deal.price}
							src={deal.src}
							duration={deal.duration}
							name={deal.name}
							key={index}
							slug={deal.slug}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default HomePage;

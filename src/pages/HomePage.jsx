import React, { useEffect, useState } from 'react';
import Information from './../components/Information';
import Carousel from './../components/Carousel';
import SearchPlaces from './../components/SearchPlaces';
import Card from './../components/Card';

const getCruiseDeals = async () => {
	const res = await fetch(`${process.env.REACT_APP_URL}/get-cruise`);

	return res.json();
};

const getPopularDeals = async () => {
	const res = await fetch(`${process.env.REACT_APP_URL}/get-featured`);

	return res.json();
};

const HomePage = () => {
	const [cruiseDeals, setCruiseDeals] = useState([]);
	const [popularDeals, setPopularDeals] = useState([]);
	const [dests, setDests] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getData = async () => {
			const cd = await getCruiseDeals().then((res) => {
				return res.cruise;
			});
			setCruiseDeals(cd);

			const pd = await getPopularDeals().then((res) => {
				return res.data;
			});
			setPopularDeals(pd);

			const d = await getPopularDeals().then((res) => {
				return res.data;
			});
			setDests(d);

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
					{cruiseDeals.map((deal) => (
						<Card
							desc={deal.desc}
							price={deal.price}
							src={deal.src}
							duration={deal.duration}
							name={deal.name}
							// slug={''}
							key={deal.name}
						/>
					))}
				</div>
			</div>
			<div>
				<h1 className="text-2xl md:text-4xl text-center uppercase font-bold my-10">
					Popular Deals
				</h1>
				<div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
					{popularDeals.map((deal) => (
						<Card
							desc={deal.desc}
							price={deal.price}
							src={deal.src}
							duration={deal.duration}
							name={deal.name}
							key={deal.name}
							slug={deal.slug}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default HomePage;

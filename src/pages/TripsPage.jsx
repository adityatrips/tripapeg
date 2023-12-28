import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../firebase';

const TripsPage = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getDeals = async () => {
		const dataRef = collection(db, 'data');
		const dataSnap = await getDocs(dataRef);

		let tmpData = [];

		dataSnap.forEach((doc) => {
			tmpData.push(doc.data());
		});

		setData(tmpData);
	};

	useEffect(() => {
		getDeals();
		setIsLoading(false);
	}, []);

	if (!isLoading) {
		return (
			<div className="mt-5 grid gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
				{data.map((d) => {
					return (
						<Card
							key={d.slug}
							src={d.src}
							name={d.name}
							duration={d.duration}
							desc={d.desc}
							price={d.price}
							slug={d.slug}
						/>
					);
				})}
			</div>
		);
	} else {
		return <div>Loading...</div>;
	}
};

export default TripsPage;

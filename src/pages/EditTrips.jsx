import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../firebase';
import { Link } from 'react-router-dom';
import { FaRegClock, FaRupeeSign } from 'react-icons/fa6';

const EditTrips = () => {
	const [trips, setTrips] = useState([]);
	const [loading, setLoading] = useState(true);

	const getDeals = async () => {
		const dataRef = collection(db, 'data');
		const dataSnap = await getDocs(dataRef);

		let tmpData = [];

		dataSnap.forEach((doc) => {
			tmpData.push(doc.data());
		});

		setTrips(tmpData);
		setLoading(false);
	};

	useEffect(() => {
		getDeals();
	}, []);

	useEffect(() => {
		console.log(trips);
	}, [trips]);

	if (loading) {
		return <div>Loading...</div>;
	} else {
		return (
			<div className="my-5">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
					{trips.map((trip) => {
						const { src, slug, desc, duration, name, price } = trip;
						return (
							<Link
								to={`${!slug ? '' : '/place/' + slug}`}
								className="overflow-hidden border-2 border-secondary rounded-lg"
							>
								<div className="hover:opacity-50 transition-all duration-300  p-4 gap-2 flex flex-col justify-center items-center w-full h-full">
									<img
										src={src}
										width={1920}
										height={1080}
										className="rounded h-full w-full "
									/>
									<h1 className="font-bold uppercase text-2xl">
										{name}
									</h1>
									<p>{desc}</p>
									<div className="flex justify-between items-center w-full">
										<div className="flex justify-center items-center gap-2">
											<FaRegClock />
											<p>{duration}</p>
										</div>
										<div className="flex justify-center items-center gap-2">
											<FaRupeeSign />
											<p>{price}</p>
										</div>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		);
	}
};

export default EditTrips;

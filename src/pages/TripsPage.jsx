import React, { useState } from 'react';
import Card from '../components/Card';

const TripsPage = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// useSWR(`${process.env.REACT_APP_URL}/get-destinations`, (...args) => {
	// 	fetch(...args)
	// 		.then((res) => res.json())
	// 		.then((json) => {
	// 			console.log(json);
	// 			setData(json);
	// 		})
	// 		.then(() => setIsLoading(false));
	// });

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

import React, { useState, useEffect } from 'react';

import { BsPeopleFill } from 'react-icons/bs';
import { FaPlaneDeparture } from 'react-icons/fa';
import { FaBuildingColumns } from 'react-icons/fa6';
import { MdOutlineChecklist } from 'react-icons/md';

function Information() {
	const [Customers, setCustomers] = useState(0);
	const [Destinations, setDestinations] = useState(0);
	const [Tours, setTours] = useState(0);
	const [TourTypes, setTourTypes] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			if (Destinations < 42) {
				setDestinations(Destinations + 1);
			}
			if (Tours < 97) {
				setTours(Tours + 1);
			}
			if (TourTypes < 36) {
				setTourTypes(TourTypes + 1);
			}
		}, 25);

		return () => clearInterval(interval);
	}, [Destinations, Tours, TourTypes]);

	useEffect(() => {
		const interval1 = setInterval(() => {
			if (Customers < 1231) {
				setCustomers(Customers + 1);
			}
		}, 1);

		return () => clearInterval(interval1);
	}, [Customers]);

	return (
		<div className="w-full py-4 grid grid-cols-2 gap-5 md:grid-cols-4 mt-10">
			<div>
				<div className="flex justify-center items-center">
					<BsPeopleFill className="text-text text-[2rem]" />
				</div>
				<div className="flex justify-center items-center">
					<h1 className="text-2xl font-bold md:text-4xl">
						{Customers}+
					</h1>
				</div>
				<div className="flex justify-center items-center">
					<h1 className="text-2xl">Customers</h1>
				</div>
			</div>
			<div>
				<div className="flex justify-center items-center">
					<FaPlaneDeparture className="text-text text-[2rem]" />
				</div>
				<div className="flex justify-center items-center">
					<h1 className="text-2xl font-bold md:text-4xl">
						{Destinations}+
					</h1>
				</div>
				<div className="flex justify-center items-center">
					<h1 className="text-2xl">Destinations</h1>
				</div>
			</div>
			<div>
				<div className="flex justify-center items-center">
					<FaBuildingColumns className="text-text text-[2rem]" />
				</div>
				<div className="flex justify-center items-center">
					<h1 className="text-2xl font-bold md:text-4xl">{Tours}+</h1>
				</div>
				<div className="flex justify-center items-center">
					<h1 className="text-2xl">Tours</h1>
				</div>
			</div>
			<div>
				<div className="flex justify-center items-center">
					<MdOutlineChecklist className="text-text text-[2rem]" />
				</div>
				<div className="flex justify-center items-center">
					<h1 className="text-2xl font-bold md:text-4xl">
						{TourTypes}+
					</h1>
				</div>
				<div className="flex justify-center items-center">
					<h1 className="text-2xl">Tour Types</h1>
				</div>
			</div>
		</div>
	);
}

export default Information;

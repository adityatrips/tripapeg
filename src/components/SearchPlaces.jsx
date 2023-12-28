import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Card from './Card';
import { MdClose } from 'react-icons/md';

const tripTypeOpts = [
	{ value: 'domestic', label: 'Domestic' },
	{ value: 'international', label: 'International' },
	{ value: 'family', label: 'Family' },
	{ value: 'honeymoon', label: 'Honeymoon' },
	{ value: 'bachelors', label: 'Bachelors' },
	{ value: 'pilgrimage', label: 'Pilgrimage' },
];

const destinationOpts = [
	{
		value: 'Andaman and Nicobar',
		label: 'Andaman and Nicobar',
	},
	{ value: 'Bangkok Pattaya', label: 'Bangkok Pattaya' },
	{ value: 'Kerala', label: 'Kerala' },
	{ value: 'Meghalaya', label: 'Meghalaya' },
	{ value: 'Phuket Krabi', label: 'Phuket Krabi' },
	{ value: 'Rajasthan', label: 'Rajasthan' },
	{ value: 'Dubai and Abu Dhabi', label: 'Dubai and Abu Dhabi' },
	{
		value: 'Kedarnath Yatra from Delhi',
		label: 'Kedarnath Yatra from Delhi',
	},
	{
		value: 'Kedarnath Yatra from Haridwar',
		label: 'Kedarnath Yatra from Haridwar',
	},
	{ value: 'Shimla and Manali', label: 'Shimla and Manali' },
];

const activitiesOpts = [
	{ label: 'Water Sports', value: 'water sports' },
	{ label: 'Camping', value: 'camping' },
	{ label: 'Underwater Diving', value: 'underwater diving' },
	{ label: 'Boating', value: 'boating' },
	{ label: 'Camping', value: 'camping' },
	{ label: 'Trekking', value: 'trekking' },
	{ label: 'Safari', value: 'safari' },
	{ label: 'Adventure sports', value: 'adventure sports' },
];

const SearchPlaces = ({ dest }) => {
	const [tripTypeOpt, setTripTypeOpt] = useState(['Domestic']);
	const [destinationOpt, setDestinationOpt] = useState([
		'Andaman and Nicobar',
	]);
	const [activitiesOpt, setActivitiesOpt] = useState(['Camping']);
	const [search, setSearch] = useState([]);

	const handleSearch = () => {
		let results = [];
		setSearch([]);
		for (let item of dest) {
			for (let i of tripTypeOpt) {
				item.tags.includes(i.toLowerCase().trim()) &&
					results.push(item);
			}
			for (let i of destinationOpt) {
				if (item.name.toLowerCase().trim() === i.toLowerCase().trim()) {
					results.push(item);
				}
			}
			for (let item of dest) {
				for (let i of activitiesOpt) {
					item.activities.includes(i.toLowerCase()) &&
						results.push(item);
				}
			}
		}
		let searchSet = new Set(results);
		setSearch(Array.from(searchSet));
	};

	return (
		<div className="border-2 border-secondary p-2 rounded-xl mt-5 ">
			<div className="grid gap-3 grid-cols-1 md:grid-cols-3">
				<div className="flex flex-col">
					<div className="font-bold uppercase text-center pb-2">
						Trip Type:&nbsp;
						<br />
					</div>
					<Dropdown
						className="bg-secondary p-2 rounded-lg cursor-pointer"
						arrowClosed={<FaChevronDown />}
						controlClassName="flex justify-between items-center"
						arrowOpen={<FaChevronUp />}
						options={tripTypeOpts.map((o) => o.label)}
						onChange={(e) => {
							let dt = new Set(tripTypeOpt);
							dt.add(e.value);
							setTripTypeOpt(Array.from(dt));
						}}
						placeholder={tripTypeOpt}
					/>
					<div className="flex flex-wrap">
						<div className="flex flex-wrap">
							{tripTypeOpt.map((t) => (
								<span
									key={t}
									className="flex w-fit flex-wrap bg-primary m-2 py-1 px-2 rounded-full gap-2"
								>
									{t}
									<span
										onClick={() => {
											let dt = new Set(tripTypeOpt);
											dt.delete(t);
											setTripTypeOpt(Array.from(dt));
										}}
										className="flex items-center font-bold text-[white] rounded-full aspect-square cursor-pointer"
									>
										<MdClose />
									</span>
								</span>
							))}
						</div>
					</div>
				</div>
				<div className="flex flex-col">
					<div className="font-bold uppercase text-center pb-2">
						Destination:&nbsp;
						<br />
					</div>
					<Dropdown
						className="bg-secondary p-2 rounded-lg cursor-pointer"
						arrowClosed={<FaChevronDown />}
						controlClassName="flex justify-between items-center"
						arrowOpen={<FaChevronUp />}
						options={destinationOpts.map((o) => o.label)}
						onChange={(e) => {
							let dt = new Set(destinationOpt);
							dt.add(e.value);
							setDestinationOpt(Array.from(dt));
						}}
						placeholder={destinationOpt}
					/>
					<div className="flex flex-wrap">
						{destinationOpt.map((d) => (
							<span
								key={d}
								className="flex w-fit flex-wrap bg-primary m-2 py-1 px-2 rounded-full gap-2"
							>
								{d}
								<span
									onClick={() => {
										let dt = new Set(destinationOpt);
										dt.delete(d);
										setDestinationOpt(Array.from(dt));
									}}
									className="flex items-center font-bold text-[white] rounded-full aspect-square cursor-pointer"
								>
									<MdClose />
								</span>
							</span>
						))}
					</div>
				</div>
				<div className="flex flex-col">
					<div className="font-bold uppercase text-center pb-2">
						Activities:&nbsp;
					</div>
					<Dropdown
						className="bg-secondary p-2 rounded-lg cursor-pointer"
						arrowClosed={<FaChevronDown />}
						controlClassName="flex justify-between items-center"
						arrowOpen={<FaChevronUp />}
						options={activitiesOpts.map((o) => o.label)}
						onChange={(e) => {
							let dt = new Set(activitiesOpt);
							dt.add(e.value);
							setActivitiesOpt(Array.from(dt));
						}}
						placeholder={activitiesOpt}
					/>

					<div className="flex flex-wrap">
						{activitiesOpt.map((a) => (
							<span
								key={a}
								className="flex w-fit flex-wrap bg-primary m-2 py-1 px-2 rounded-full gap-2"
							>
								{a}
								<span
									onClick={() => {
										let dt = new Set(activitiesOpt);
										dt.delete(a);
										setActivitiesOpt(Array.from(dt));
									}}
									className="flex items-center font-bold text-[white] rounded-full aspect-square cursor-pointer"
								>
									<MdClose />
								</span>
							</span>
						))}
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 gap-2 mt-5">
				<button
					onClick={handleSearch}
					className="btn btn-s w-full rounded-lg p-0 m-0"
				>
					Search
				</button>
				<button
					onClick={() => {
						setTripTypeOpt(['Domestic']);
						setDestinationOpt(['Andaman and Nicobar']);
						setActivitiesOpt(['Camping']);
						setSearch([]);
					}}
					className={` w-full rounded-lg py-[0.5rem] px-[1rem] ${
						search.length === 0
							? 'select-none cursor-not-allowed border-2 border-secondary bg-black text-white'
							: 'btn btn-s'
					}`}
				>
					Clear
				</button>
			</div>
			{search.length > 0 && (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-5">
					{new Set(search).length !== 0 &&
						search.map((s) => (
							<Card
								key={s.slug}
								src={s.src}
								desc={''}
								name={s.name}
								duration={s.duration}
								slug={s.slug}
								price={s.price}
							/>
						))}
				</div>
			)}
		</div>
	);
};

export default SearchPlaces;

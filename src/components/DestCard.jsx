import React from 'react';

import { FaIndianRupeeSign, FaLocationDot } from 'react-icons/fa6';
import { FaRegClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DestCard = ({
	title,
	inclusions = null,
	exclusions = null,
	hotels = null,
	src,
	place,
	time,
	price,
	action,
	tags = [],
	activities = [],
	link,
	jan = false,
	feb = false,
	mar = false,
	apr = false,
	may = false,
	jun = false,
	jul = false,
	aug = false,
	sep = false,
	oct = false,
	nov = false,
	dec = false,
}) => {
	return (
		<div className={`w-full rounded-lg shadow-2xl p-6`}>
			<div className="title mb-4 overflow-hidden">
				<img
					src={src}
					alt="Dubai"
					className="card-img"
				/>
			</div>
			<h2
				className="text-4xl text-center font-bold pb-4 mb-4"
				style={{ borderBottom: '2px solid #fff' }}
			>
				{title}
			</h2>

			<div className="card-meta flex md:flex-row flex-col items-center justify-center md:justify-between">
				<div className="time-place grid grid-cols-2 md:flex md:flex-col md:justify-start md:items-start items-center">
					<p className="place gap-2 flex flex-row justify-center items-center">
						<FaLocationDot />
						{place}
					</p>
					<p className="schedule gap-2 flex flex-row justify-center items-center">
						<FaRegClock />
						{time}
					</p>
				</div>
				<div className="price gap-2 flex flex-row justify-center items-center">
					<FaIndianRupeeSign />
					{price}
				</div>
			</div>

			{inclusions && (
				<h1 className="text-xl text-center font-extrabold mt-5 uppercase">
					Inclusions
				</h1>
			)}
			{inclusions &&
				inclusions.map((item) => (
					<div key={item}>
						<p className="text-white text-left">• {item}</p>
					</div>
				))}

			{exclusions && (
				<h1 className="text-xl text-center font-extrabold mt-5 uppercase">
					Exclusions
				</h1>
			)}
			{exclusions &&
				exclusions.map((item) => (
					<p className="text-white text-left">• {item}</p>
				))}

			{hotels && (
				<h1 className="text-xl text-center font-extrabold mt-5 uppercase">
					Hotels
				</h1>
			)}

			<h1 className="text-xl text-center font-extrabold mt-5 uppercase">
				Tags
			</h1>
			{tags.length !== 0 &&
				tags.map((item) => (
					<p className="text-white text-left">• {item}</p>
				))}

			<h1 className="text-xl text-center font-extrabold mt-5 uppercase">
				Activities
			</h1>
			{activities.length !== 0 &&
				activities.forEach((item) => (
					<p className="text-white text-left">• {item}</p>
				))}

			{hotels &&
				hotels.forEach((item) => (
					<p className="text-white text-left">• {item}</p>
				))}

			{(jan ||
				feb ||
				mar ||
				apr ||
				may ||
				jun ||
				jul ||
				aug ||
				sep ||
				oct ||
				nov ||
				dec) && <h1 className="text-center text-xl">Availability</h1>}
			<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12">
				<p
					className={`${
						jan ? 'text-[green] font-bold uppercase' : 'text-[red]'
					} text-center`}
				>
					January
				</p>
				<p
					className={`${
						feb ? 'text-[green] font-bold uppercase' : 'text-[red]'
					} text-center`}
				>
					February
				</p>
				<p
					className={`${
						mar ? 'text-[green] font-bold uppercase' : 'text-[red]'
					} text-center`}
				>
					March
				</p>
				<p
					className={`${
						apr ? 'text-[green] font-bold uppercase' : 'text-[red]'
					} text-center`}
				>
					April
				</p>
				<p
					className={`${
						mar ? 'text-[green] font-bold uppercase' : 'text-[red]'
					} text-center`}
				>
					May
				</p>
				<p
					className={`${
						jun ? 'text-[green] font-bold uppercase' : 'text-[red]'
					} text-center`}
				>
					June
				</p>
				<p
					className={`${
						jul ? 'text-[green] font-bold uppercase' : 'text-[red]'
					} text-center`}
				>
					July
				</p>
				<p
					className={`${
						aug ? 'text-[green] font-bold uppercase' : 'text-[red]'
					} text-center`}
				>
					August
				</p>
				<p
					className={`${
						sep ? 'text-[green] font-bold uppercase' : 'text-[red]'
					} text-center`}
				>
					September
				</p>
				<p
					className={`${
						oct ? 'text-[green] font-bold uppercase' : 'text-[red]'
					} text-center`}
				>
					October
				</p>
				<p
					className={`${
						nov ? 'text-[green] font-bold uppercase' : 'text-[red]'
					} text-center`}
				>
					November
				</p>
				<p
					className={`${
						dec ? 'text-[green] font-bold uppercase' : 'text-[red]'
					} text-center`}
				>
					December
				</p>
			</div>

			{action && (
				<Link to={link}>
					<button className="rounded-md btn btn-p w-full">
						Learn More...
					</button>
				</Link>
			)}
		</div>
	);
};

export default DestCard;

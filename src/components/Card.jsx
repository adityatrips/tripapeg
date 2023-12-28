import React from 'react';
import { FaRegClock, FaRupeeSign } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export default function Card({ src, name, duration, desc, price, slug }) {
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
				<h1 className="font-bold uppercase text-2xl">{name}</h1>
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
}

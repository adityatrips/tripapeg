import React from 'react';
import Accordion from './Accordion';
import DestCard from './DestCard';
import { notes, data, cancellation } from '../data';

const Card = ({
	id,
	src,
	duration,
	name,
	price,
	available,
	inclusions,
	exclusions,
	hotels,
	days,
	tags,
	activities,
}) => {
	return (
		<div>
			<img
				src={src}
				alt={id}
				className="w-[100%] flex justify-center items-center"
			/>
			<ul className="accordion">
				<Accordion heading="Overview">
					<DestCard
						tags={tags}
						activities={activities}
						src={src}
						title={name}
						time={duration}
						place={name}
						price={`${price} / per person`}
						jan={available.jan}
						feb={available.feb}
						mar={available.mar}
						apr={available.apr}
						may={available.may}
						jun={available.jun}
						jul={available.jul}
						aug={available.aug}
						sep={available.sep}
						oct={available.oct}
						nov={available.nov}
						dec={available.dec}
						inclusions={inclusions}
						exclusions={exclusions || null}
						hotels={hotels || null}
					/>
				</Accordion>
				<Accordion heading="Itinerary">
					{data &&
						days &&
						days.map((day) => (
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

export default Card;

import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

const Accordion = ({ heading, children }) => {
	const [isActive, setIsActive] = useState(false);

	return (
		<li className="accordion-item cursor-pointer border-2 border-secondary p-2 my-2 rounded">
			<div
				className="accordion-toggle flex justify-between items-center"
				onClick={() => setIsActive(!isActive)}
			>
				<h3 className="text-2xl font-bold uppercase text-center w-full">
					{heading}
				</h3>
				<span>{isActive ? <FaChevronUp /> : <FaChevronDown />}</span>
			</div>
			{isActive && <div className="accordion-content">{children}</div>}
		</li>
	);
};

export default Accordion;

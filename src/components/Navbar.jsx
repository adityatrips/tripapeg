import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
	return (
		<nav className="h-[100px] w-full px-5 flex flex-col md:flex-row justify-center md:justify-between items-center border-b-2 border-b-primary">
			<div className="logo flex items-center gap-2">
				<img
					src="/logo.png"
					width={90}
					height={90}
					className="hidden md:block"
				/>
				<span className="font-bold uppercase text-2xl">trip a peg</span>
			</div>
			<div className="flex gap-5">
				<Link
					className="hover:text-primary font-bold"
					to="/"
				>
					Home
				</Link>
				<Link
					className="hover:text-primary font-bold"
					to="/contact"
				>
					Contact
				</Link>
				<Link
					className="hover:text-primary font-bold"
					to="/trips"
				>
					Trips
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;

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
				<Link
					to="/"
					className="font-bold uppercase text-2xl"
				>
					trip a peg
				</Link>
			</div>

			<div className="links flex flex-row justify-center items-center md:flex-row gap-5">
				<Link
					to="/"
					className="text-lg font-semibold"
				>
					Home
				</Link>
				<Link
					to="/edit-trips"
					className="text-lg font-semibold"
				>
					Edit
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;

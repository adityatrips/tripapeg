import React from 'react';
import { FaGlobe, FaPhone } from 'react-icons/fa';
import { MdAutorenew, MdMail } from 'react-icons/md';
import { FaInstagram, FaRegMessage } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function Footer() {
	return (
		<footer className="min-h-[100px] p-5">
			<div className="grid grid-cols-1 md:grid-cols-2">
				<div className="flex flex-col justify-center items-center">
					<h1 className="font-bold text-xl mt-5">Contact us</h1>
					<div>
						<Link
							to="mailto:tripapeg@gmail.com"
							className="flex gap-2 items-center"
							target="_blank"
						>
							<MdMail />
							<span className="font-bold uppercase">
								tripapeg@gmail.com
							</span>
						</Link>
					</div>
					<div className="flex flex-col justify-center items-start">
						<Link
							to="https://instagram.com/tripapeg"
							className="flex gap-2 items-center"
							target="_blank"
						>
							<FaInstagram />
							<span className="font-bold uppercase">
								@tripapeg
							</span>
						</Link>
					</div>
					<div className="flex flex-col justify-center items-start">
						<Link
							to="tel:+918250226818"
							className="flex gap-2 items-center"
						>
							<FaPhone />
							<span className="font-bold uppercase">
								+91 825 022 6818
							</span>
						</Link>
					</div>
				</div>
				<div className="flex flex-col justify-center items-center">
					<h1 className="font-bold text-xl mt-5">Why us?</h1>
					<div>
						<div className="flex gap-2 justify-center items-center">
							<FaGlobe />
							<span className="font-bold uppercase">
								Experienced
							</span>
						</div>
						<p>
							Our friendly Consultants travel regularly & offer
							first hand advice.
						</p>
					</div>
					<div>
						<div className="flex gap-2 justify-center items-center">
							<FaRegMessage />
							<span className="font-bold uppercase">Trusted</span>
						</div>
						<p>Hundreds of customers travel with us every week.</p>
					</div>
					<div>
						<div className="flex gap-2 justify-center items-center">
							<MdAutorenew />
							<span className="font-bold uppercase">Easy</span>
						</div>
						<p>
							We coordinate your travel so flights, transfers &
							tours all connect smoothly.
						</p>
					</div>
				</div>
			</div>
			<div className="font-bold text-center w-full uppercase mt-5">
				&copy; Copyright Trip a Peg {new Date().getFullYear()}
			</div>
		</footer>
	);
}

export default Footer;

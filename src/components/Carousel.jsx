import React, { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';

const images = [
	{ src: 'andamannicobar.jpg', name: 'Andaman and Nicobar Islands' },
	{ src: 'bangkokpattaya.jpg', name: 'Bangkok Pattaya' },
	{ src: 'dubai.jpg', name: 'Dubai and Abu Dhabi' },
	{ src: 'kedarnath1.jpeg', name: 'Kedarnath' },
	{ src: 'kerala.jpg', name: 'Kerala' },
	{ src: 'meghalaya.jpg', name: 'Meghalaya' },
	{ src: 'phuketkrabi.jpeg', name: 'Phuket and Krabi' },
	{ src: 'rajasthan.jpg', name: 'Rajasthan' },
	{ src: 'shimlamanali.jpeg', name: 'Shimla and Manali' },
];

const Carousel = () => {
	const [activeSlideIndex, setActiveSlideIndex] = useState(0);

	return (
		<ReactSimplyCarousel
			activeSlideIndex={activeSlideIndex}
			onRequestChange={setActiveSlideIndex}
			autoplay
			easing="ease-in-out"
			itemsToShow={1}
			itemsToScroll={3}
			responsiveProps={[
				{ minWidth: 768, maxWidth: 992, itemsToShow: 3 },
				{ maxWidth: 767, itemsToShow: 1 },
			]}
			infinite
			autoplayDelay={5000}
			disableSwipeByMouse
		>
			{images.map((image, index) => (
				<div
					className="h-96 w-screen flex justify-center items-center"
					key={index}
				>
					<h1 className="absolute px-4 py-2 bg-primary rounded font-bold text-xl md:text-2xl uppercase break-words">
						{image.name}
					</h1>
					<img
						className="aspect-video select-none w-full h-full object-cover"
						src={`/destinations/${image.src}`}
						width={1920}
						height={1080}
						alt={image.src}
					/>
				</div>
			))}
		</ReactSimplyCarousel>
	);
};

export default Carousel;

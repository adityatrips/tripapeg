import { NextRequest, NextResponse } from 'next/server';

export async function GET(req) {
	return NextResponse.json({
		cruise: [
			{
				src: '/cruise1.jpeg',
				name: 'Mumbai (high sea) to Lakshadweep',
				duration: '3 night 4 days',
				desc: "Cruising is a wonderful way to explore different destinations and enjoy a vacation. Whether you're interested in visiting tropical islands,...",
				price: '38999',
			},
			{
				src: '/cruise2.jpeg',
				name: 'Mumbai (high sea) to Goa',
				duration: '2 night 3 days',
				desc: "Cruising is a wonderful way to explore different destinations and enjoy a vacation. Whether you're interested in visiting tropical islands,...",
				price: '55559',
			},
		],
	});
}

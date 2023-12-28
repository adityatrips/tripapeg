import { NextRequest, NextResponse } from 'next/server';
import { data } from '../../../data';

export async function POST(req) {
	const body = await req.json();

	for (let d of data) {
		if (body.place == d.slug) {
			return NextResponse.json({
				d,
			});
		}
	}
	return NextResponse.json({
		data: 'Not found',
	});
}

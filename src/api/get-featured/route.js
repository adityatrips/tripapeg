import { NextRequest, NextResponse } from 'next/server';
import { data } from '../../../data';
import { genRandInt } from '../../../util/util';
export async function GET(req) {
	let featuredDest = [];

	for (let i = 0; i < 3; i++) {
		// @ts-ignore
		featuredDest.push(data[genRandInt(data.length)]);
	}

	return NextResponse.json({
		data: featuredDest,
	});
}

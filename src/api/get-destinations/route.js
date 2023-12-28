import { notes, cancellation, data } from '../../../data';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req) {
	return NextResponse.json(data);
}

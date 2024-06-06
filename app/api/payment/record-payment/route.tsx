import { NextResponse } from 'next/server'

import prisma from '@/utils/database/dbConnect'

export async function GET(req: Request) {
	const signature = req.headers.get('x-razorpay-signature')
	console.log('a reques tis made th')

	return NextResponse.json({ message: 'success' })
}

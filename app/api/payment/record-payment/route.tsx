import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	const signature = req.headers.get('x-razorpay-signature')
	console.log('this is from the payment success route')
	console.log('signature', signature)

	const json = await req.json()
	console.log('json', json)

	return NextResponse.json({ message: 'success' })
}

import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'

export async function POST(req: Request) {
	const signature = req.headers.get('x-razorpay-signature') as string
	const isValid = await Razorpay.validateWebhookSignature(
		JSON.stringify(req.body),
		signature,
		process.env.RAZORPAY_WEBHOOK_SECRET as string
	)

	if (isValid) {
		const { event, payload } = (await req.json()) as { event: string; payload: any }

		console.log('event', event)
		console.log('from line 16', payload)

		if (event === 'payment.captured') {
			console.log('payment.captured', payload)
		}
	}

	console.log('signature', signature)

	const json = await req.json()
	console.log('json obj', json)
	console.log('more', json.payload['payment.downtime'])

	return NextResponse.json({ message: 'success' })
}

import { NextResponse } from 'next/server'

import { nanoid } from 'nanoid'
import Razorpay from 'razorpay'

export async function POST(req: Request) {
	try {
		const { reciept } = await req.json()

		if (reciept === 1 || reciept === 2 || reciept === 3) {
			const amount = reciept === 1 ? 100 : reciept === 2 ? 500 : 1000

			const razorpay = new Razorpay({
				key_id: process.env.NEXT_PUBLIC_Razorpay_key_id as string,
				key_secret: process.env.Razorpay_Key_secret as string,
			})

			// setting up options for razorpay order.
			const options: any = {
				amount: amount * 100,
				currency: 'INR',
				receipt: nanoid(),
				payment_capture: 1,
			}

			const response = await razorpay.orders.create(options)
			console.log('response is below')
			console.log(response)
			console.log('response is above')

			return NextResponse.json({
				order_id: response.id,
				currency: response.currency,
				amount: response.amount,
			})
		} else {
			return NextResponse.json({ error: 'Invalid reciept.' }, { status: 400 })
		}
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error: 'Failed to generate payment.' }, { status: 500 })
	}
}

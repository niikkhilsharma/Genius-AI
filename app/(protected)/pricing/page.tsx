'use client'

import React, { use } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { useSession } from 'next-auth/react'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'

const PricingPage = () => {
	const { toast } = useToast()
	const { data, status } = useSession()

	if (status === 'loading') return null
	console.log(data)

	const initializeRazorpay = () => {
		return new Promise(resolve => {
			const script = document.createElement('script')
			script.src = 'https://checkout.razorpay.com/v1/checkout.js'

			script.onload = () => {
				resolve(true)
			}
			script.onerror = () => {
				resolve(false)
			}

			document.body.appendChild(script)
		})
	}

	async function payout(reciept: number) {
		const res = await initializeRazorpay()
		if (!res) {
			alert('Razorpay SDK Failed to load')
			return
		}

		const response = await fetch('/api/payment/razorpay', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				reciept,
			}),
		})
		const data = await response.json()
		console.log(data)

		const options = {
			key: process.env.NEXT_PUBLIC_Razorpay_key_id, // Enter the Key ID generated from the Dashboard
			name: 'Genius AI Pvt. Ltd.',
			currency: data.currency,
			amount: data.amount,
			order_id: data.id,
			description: 'Thankyou for your choosing our service.',
			image: 'https://manuarora.in/logo.png',
			handler: function (response: any) {
				// Validate payment at server - using webhooks is a better idea.
				// alert(response.razorpay_payment_id)
				// alert(response.razorpay_order_id)
				// alert(response.razorpay_signature)

				if (response.razorpay_payment_id) {
					toast({
						title: 'Payment Successfull',
						description: `Thankyou for your payment. 🎉 razorpay_payment_id: ${response.razorpay_payment_id}`,
					})
				}
				if (response.razorpay_order_id) {
					toast({
						title: 'Payment Successfull',
						description: `Thankyou for your payment. 🎉 razorpay_payment_id: ${response.razorpay_order_id}`,
					})
				}
				if (response.razorpay_signature) {
					toast({
						title: 'Payment Successfull',
						description: `Thankyou for your payment. 🎉 razorpay_payment_id: ${response.razorpay_signature}`,
					})
				}
			},
			prefill: {
				name: data.user.name,
				email: data.user.email,
			},
		}

		const paymentObject = new (window as any).Razorpay(options)
		paymentObject.open()
	}

	return (
		<div className="max-w-5xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
			<h1 className="font-extrabold text-3xl text-start">Pricing plans</h1>
			<Table className="my-8">
				<TableCaption>Per request cost for each model.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">S.NO</TableHead>
						<TableHead>Model</TableHead>
						<TableHead>Currency</TableHead>
						<TableHead className="text-right">Amount</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell className="font-medium">01</TableCell>
						<TableCell>Image Generation</TableCell>
						<TableCell>INR</TableCell>
						<TableCell className="text-right">₹ 00.28 / per request</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="font-medium">02</TableCell>
						<TableCell>Video Generation</TableCell>
						<TableCell>INR</TableCell>
						<TableCell className="text-right">₹ 02.25 / per request</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="font-medium">03</TableCell>
						<TableCell>Music Generation</TableCell>
						<TableCell>INR</TableCell>
						<TableCell className="text-right">₹ 06.74 / per request</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="font-medium">04</TableCell>
						<TableCell>Restore Image</TableCell>
						<TableCell>INR</TableCell>
						<TableCell className="text-right">Free with pro plan</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<div>
				<h1 className="font-extrabold text-3xl text-start mb-6">Select your recharge plan</h1>
				<div className="grid grid-rows-3">
					<Button className="mt-4" variant={'premium'} onClick={() => payout(1)}>
						Start with monthly subscription of ₹ 100
					</Button>
					<Button className="mt-4" variant={'premium'} onClick={() => payout(2)}>
						Start with quaterly subscription of ₹ 500
					</Button>
					<Button className="mt-4" variant={'premium'} onClick={() => payout(3)}>
						Start with yearly subscription of ₹ 1000
					</Button>
				</div>
			</div>
		</div>
	)
}

export default PricingPage

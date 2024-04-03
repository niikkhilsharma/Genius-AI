import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Montserrat } from 'next/font/google'

import { Button } from './ui/button'
import { cn } from '@/lib/utils'

const montserratFont = Montserrat({
	weight: ['600'],
	subsets: ['latin'],
})

const LandingNavbar = () => {
	return (
		<div className="w-full flex items-center justify-between py-4 text-white">
			<div className="flex items-center">
				<Image src="/logo.png" alt="avatar" width={400} height={400} className="w-10 h-10 mr-4" />
				<h1 className={cn(`text-2xl font-semibold ${montserratFont.className}`)}>Genius</h1>
			</div>
			<div>
				<Button variant={'outline'} className="rounded-full text-black">
					<Link href="/dashboard">Get Started</Link>
				</Button>
			</div>
		</div>
	)
}

export default LandingNavbar

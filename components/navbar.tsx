import React from 'react'
import { cn } from '@/lib/utils'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'

import { Button } from './ui/button'

const montserratFont = Montserrat({
	weight: ['600'],
	subsets: ['latin'],
})

const Navbar = () => {
	return (
		<div className="w-full flex items-center justify-between py-4 text-white">
			<div className="flex items-center">
				<Image src="/logo.png" alt="avatar" width={400} height={400} className="w-8 h-8 mr-4" />
				<h1 className={cn(`text-2xl font-semibold ${montserratFont.className}`)}>Genius</h1>
			</div>
			<div>
				<Button variant={'outline'} className="rounded-full text-black">
					Get Started
				</Button>
			</div>
		</div>
	)
}

export default Navbar

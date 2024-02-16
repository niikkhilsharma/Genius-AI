import Link from 'next/link'

import { Button } from '@/components/ui/button'
import MaxScreenWrapper from '@/components/ui/maxScreenWrapper'
import Testimonials from '@/components/testimonials'
import TypeWriter from '@/components/typeWriter'
import LandingNavbar from '@/components/landing-navbar'

export default function Home() {
	return (
		<main className="w-full min-h-screen bg-[#111827]">
			<MaxScreenWrapper>
				<LandingNavbar />
				<div className="my-36 text-center">
					<div className="mx-auto text-4xl font-extrabold sm:text-5xl sm:font-bold md:text-6xl md:font-bold lg:text-7xl lg:font-extrabold">
						<h1 className="text-white">The Best AI Tool for</h1>
						<div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 my-5">
							<TypeWriter
								strings={['Image Generation.', 'Video Generation.', 'Audio Generation.', 'Music Generation.', 'Chatbot.']}
							/>
						</div>
					</div>
					<h3 className="text-zinc-400 text-sm font-light md:text-xl">Create content using AI 10x faster.</h3>
					<Button variant="premium" className="rounded-full my-5 sm:font-semibold md:text-lg md:p-6">
						<Link href="/dashboard">Start Generating For Free</Link>
					</Button>
					<p className="text-zinc-400 text-xs md:text-sm">No credit card required.</p>
				</div>
				<Testimonials />
			</MaxScreenWrapper>
		</main>
	)
}

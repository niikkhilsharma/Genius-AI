'use client'
import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

import Autoplay from 'embla-carousel-autoplay'

const Testimonials = () => {
	const testimonials = [
		{
			name: 'Elon Musk',
			title: 'Founder & CEO of SpaceX',
			image: '/elon-musk.png',
			quote: 'I would like to die on Mars. Just not on impact.',
		},
		{
			name: 'Ada Lovelace',
			title: 'Mathematician & Writer',
			image: '/ada-lovelace.png',
			quote:
				'The Analytical Engine has no pretensions to originate anything. It can do whatever we know how to order it to perform.',
		},
		{
			name: 'Steve Jobs',
			title: 'Co-founder of Apple Inc.',
			image: '/steve-jobs.png',
			quote: '"Design is not just what it looks like and feels like. Design is how it works."',
		},
		{
			name: 'Grace Hopper',
			title: 'Computer Scientist',
			image: '/grace-hopper.png',
			quote:
				"\"Humans are allergic to change. They love to say, 'We've always done it this way.' I try to fight that. That's why I have a clock on my wall that runs counter-clockwise.\"",
		},
		{
			name: 'Alan Turing',
			title: 'Mathematician & Computer Scientist',
			image: '/alan-turing.png',
			quote: '"We can only see a short distance ahead, but we can see plenty there that needs to be done."',
		},
		{
			name: 'Marissa Mayer',
			title: 'Former CEO of Yahoo',
			image: '/marissa-mayer.png',
			quote:
				'"I always did something I was a little not ready to do. I think that’s how you grow. When there’s that moment of, ‘Wow, I’m not really sure I can do this,’ and you push through those moments, that’s when you have a breakthrough."',
		},
		{
			name: 'Bill Gates',
			title: 'Co-founder of Microsoft',
			image: '/bill-gates.png',
			quote: '"Your most unhappy customers are your greatest source of learning."',
		},
		{
			name: 'Sheryl Sandberg',
			title: 'COO of Facebook',
			image: '/sheryl-sandberg.png',
			quote:
				'"The challenge of leadership is to be strong, but not rude; be kind, but not weak; be bold, but not bully; be thoughtful, but not lazy; be humble, but not timid; be proud, but not arrogant; have humor, but without folly."',
		},
		{
			name: 'Mark Zuckerberg',
			title: 'CEO of Meta Platforms Inc.',
			image: '/mark-zuckerberg.png',
			quote:
				'"The biggest risk is not taking any risk. In a world that’s changing really quickly, the only strategy that is guaranteed to fail is not taking risks."',
		},
		{
			name: 'Susan Wojcicki',
			title: 'CEO of YouTube',
			image: '/susan-wojcicki.png',
			quote:
				'"Don’t let anyone tell you that you can’t do something, because they are just telling you about their own limitations, not yours."',
		},
	]

	return (
		<div className="mx-10 sm:mx-20 pb-20">
			<h1 className="text-white text-center my-10 text-4xl font-extrabold sm:text-4xl sm:font-extrabold">Testimonials</h1>
			<Carousel
				plugins={[
					Autoplay({
						delay: 2000,
					}),
				]}
				opts={{
					align: 'start',
				}}
				className="mx-auto max-w-screen-lg"
			>
				<CarouselContent>
					{testimonials.map((testimonial, index) => (
						<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
							<div className="p-1 h-full">
								<Card className="bg-[#192339] border-none text-white h-full">
									<CardContent className="aspect-auto md:aspect-video">
										<div className="mb-4">
											<div className="flex items-center gap-4">
												<Avatar>
													<AvatarImage src="https://github.com/shadcn.png" alt="profile" />
													<AvatarFallback>CN</AvatarFallback>
												</Avatar>
												<div>
													<h3 className="text-md font-bold inline">{testimonial.name}</h3>
													<h3 className="text-zinc-400 font-bold text-sm">{testimonial.title}</h3>
												</div>
											</div>
										</div>
										<p className="line-clamp-6 md:line-clamp-3">{testimonial.quote}</p>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	)
}

export default Testimonials

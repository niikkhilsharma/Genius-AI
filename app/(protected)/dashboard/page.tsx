import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

import { Code, ImageIcon, MessageSquare, Music, VideoIcon, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const tools = [
	// {
	// 	label: 'Conversation',
	// 	icon: MessageSquare,
	// 	href: '/conversation',
	// 	color: 'text-violet-500',
	// 	bgColor: 'bg-violet-500/10',
	// },
	{
		label: 'Music Generation',
		icon: Music,
		href: '/music',
		color: 'text-emerald-500',
		bgColor: 'bg-emerald-500/10',
	},
	{
		label: 'Image Generation',
		icon: ImageIcon,
		color: 'text-pink-700',
		bgColor: 'bg-pink-700/10',
		href: '/image',
	},
	{
		label: 'Video Generation',
		icon: VideoIcon,
		color: 'text-orange-700',
		bgColor: 'bg-orange-700/10',
		href: '/video',
	},
	// {
	// 	label: 'Code Generation',
	// 	icon: Code,
	// 	color: 'text-green-700',
	// 	bgColor: 'bg-green-700/10',
	// 	href: '/code',
	// },
]

export default function DashboardPage() {
	return (
		<>
			<div className="text-center">
				<h1 className="text-2xl md:text-4xl font-bold mb-5 md:mb-4">Explore the power of AI</h1>
				<p className="text-gray-500 text-sm md:text-lg font-light leading-3">
					Chat with the smartest AI - Experience the power of AI
				</p>
			</div>
			<div className="px-4 md:px-20 lg:px-32 mx-auto my-9 md:my-8 space-y-4">
				{tools.map((tool, index) => (
					<Card key={index} className="flex justify-between hover:shadow-md transition border-black/5">
						<Link href={tool.href} className="p-4 flex w-full justify-between items-center">
							<div className={cn('flex justify-center items-center')}>
								<span className={cn('p-2 rounded-lg mr-1', tool.bgColor)}>
									{<tool.icon className={cn('w-8 h-8', tool.color)} />}
								</span>
								<span className="font-semibold ml-3">{tool.label}</span>
							</div>
							<ArrowRight className="w-5 h-5" />
						</Link>
					</Card>
				))}
			</div>
		</>
	)
}

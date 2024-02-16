'use client'

import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Montserrat } from 'next/font/google'

import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

const routes = [
	{
		label: 'Dashboard',
		icon: LayoutDashboard,
		href: '/dashboard',
		color: 'text-sky-500',
	},
	{
		label: 'Conversation',
		icon: MessageSquare,
		href: '/conversation',
		color: 'text-violet-500',
	},
	{
		label: 'Image Generation',
		icon: ImageIcon,
		color: 'text-pink-700',
		href: '/image',
	},
	{
		label: 'Video Generation',
		icon: VideoIcon,
		color: 'text-orange-700',
		href: '/video',
	},
	{
		label: 'Music Generation',
		icon: Music,
		color: 'text-emerald-500',
		href: '/music',
	},
	{
		label: 'Code Generation',
		icon: Code,
		color: 'text-green-700',
		href: '/code',
	},
	{
		label: 'Settings',
		icon: Settings,
		href: '/settings',
	},
]

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] })

const Sidebar = () => {
	const pathname = usePathname()

	return (
		<div>
			<Link href="/dashboard" className="flex justify-start items-center px-6 my-6">
				<Image src="/logo.png" alt="avatar" width={400} height={400} className="w-8 h-8 mr-4" />
				<h1 className={cn('text-2xl font-bold text-white', montserrat.className)}>Genius</h1>
			</Link>
			<div className="px-3 mt-14 space-y-1">
				{routes.map((route, index) => (
					<Button
						asChild
						variant={'ghost'}
						className={cn(
							'text-sm font-medium w-full flex justify-start hover:bg-white/10 rounded-lg h-11 hover:text-white px-3',
							pathname === route.href ? 'bg-white/10 text-white' : 'text-zinc-400'
						)}
						key={index}
					>
						<Link href={route.href} className="w-full text-start">
							{<route.icon className={cn(`w-5 h-5 mr-3`, route.color)} />}
							{route.label}
						</Link>
					</Button>
				))}
			</div>
		</div>
	)
}

export default Sidebar

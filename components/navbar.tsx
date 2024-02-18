import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import MobileSidebar from './mobile-sidebar'

const Navbar = () => {
	return (
		<div className="w-full flex items-center justify-between md:justify-end p-4">
			<MobileSidebar />
			<Avatar className="h-8 w-8">
				<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
		</div>
	)
}

export default Navbar

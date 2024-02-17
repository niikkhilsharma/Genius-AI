import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Navbar = () => {
	return (
		<div className="w-full flex justify-end p-4">
			<Avatar>
				<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
		</div>
	)
}

export default Navbar

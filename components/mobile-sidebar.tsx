import React from 'react'

import { buttonVariants } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { Menu } from 'lucide-react'
import Sidebar from './sidebar'

const MobileSidebar = () => {
	return (
		<div className="md:hidden">
			<Sheet>
				<SheetTrigger>
					<div className={buttonVariants({ variant: 'ghost', size: 'icon' })}>
						<Menu />
					</div>
				</SheetTrigger>
				<SheetContent side={'left'} className="bg-gray-900 border-none p-0">
					<Sidebar />
				</SheetContent>
			</Sheet>
		</div>
	)
}

export default MobileSidebar

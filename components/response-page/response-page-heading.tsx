import { cn } from '@/lib/utils'
import React from 'react'

type AiType = {
	title: string
	description: string
	icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
	iconColor: string
	bgColor: string
}

const ResponsePageHeading = ({ ai }: { ai: AiType }) => {
	return (
		<div>
			<div className="flex items-center">
				<span className={cn('p-2 rounded-md mr-3', ai.bgColor)}>
					<ai.icon className={cn('w-10 h-10', ai.iconColor)} />
				</span>
				<div>
					<h1 className="text-3xl font-bold">{ai.title}</h1>
					<p className="text-muted-foreground text-sm">{ai.description}</p>
				</div>
			</div>
		</div>
	)
}

export default ResponsePageHeading

import React from 'react'

import { Music } from 'lucide-react'

import ResponsePageHeading from '@/components/response-page/response-page-heading'

export default async function MusicPage() {
	return (
		<div className="px-8">
			<ResponsePageHeading
				ai={{
					title: 'Music Generation',
					description: 'Turn your words into music.',
					icon: Music as React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
					iconColor: 'text-emerald-500',
					bgColor: 'bg-emerald-500/10',
				}}
			/>
		</div>
	)
}

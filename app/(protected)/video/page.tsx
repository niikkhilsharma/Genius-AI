import ResponsePageHeading from '@/components/response-page/response-page-heading'

import { FileAudio } from 'lucide-react'

export default async function VideoPage() {
	return (
		<div className="px-8">
			<ResponsePageHeading
				ai={{
					title: 'Video Generation',
					description: 'Turn your words into video.',
					icon: FileAudio as React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
					iconColor: 'text-orange-700',
					bgColor: 'bg-orange-700/10',
				}}
			/>
		</div>
	)
}

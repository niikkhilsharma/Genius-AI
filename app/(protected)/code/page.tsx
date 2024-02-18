import ResponsePageHeading from '@/components/response-page/response-page-heading'

import { Code } from 'lucide-react'

export default async function CodePage() {
	return (
		<div className="px-8">
			<ResponsePageHeading
				ai={{
					title: 'Code Generation',
					description: 'Generate code using descriptive text.',
					icon: Code as React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
					iconColor: 'text-green-700',
					bgColor: 'bg-green-700/10',
				}}
			/>
		</div>
	)
}

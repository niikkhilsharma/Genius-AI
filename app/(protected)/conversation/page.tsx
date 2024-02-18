import { MessageSquare } from 'lucide-react'

import ResponsePageHeading from '@/components/response-page/response-page-heading'

export default async function ConversationPage() {
	return (
		<div className="px-8">
			<ResponsePageHeading
				ai={{
					title: 'Conversation',
					description: 'Our most advanced conversation model.',
					icon: MessageSquare as React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
					iconColor: 'text-violet-500',
					bgColor: 'bg-violet-500/10',
				}}
			/>
		</div>
	)
}

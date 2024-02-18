import ResponsePageHeading from '@/components/response-page/response-page-heading'
import { Button } from '@/components/ui/button'

import { Settings } from 'lucide-react'

export default async function SettingsPage() {
	return (
		<div className="px-8">
			<ResponsePageHeading
				ai={{
					title: 'Settings',
					description: 'Manage account settings.',
					icon: Settings as React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
					iconColor: 'text-gray-700',
					bgColor: 'bg-gray-700/10',
				}}
			/>
			<div className="mt-8">
				<p className="text-muted-foreground text-sm">Paid plans will be introduced soon.</p>
				<Button className="mt-4" variant={'premium'}>
					Manage Subscription
				</Button>
			</div>
		</div>
	)
}

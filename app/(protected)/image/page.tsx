import ResponsePageHeading from '@/components/response-page/response-page-heading'

import { ImageIcon } from 'lucide-react'

export default async function ImagePage() {
	const ai = {
		title: 'Image Generation',
		description: 'Turn your words into an image.',
		icon: ImageIcon as React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
		iconColor: 'text-pink-700',
		bgColor: 'bg-pink-700/10',
	}

	return (
		<>
			<ResponsePageHeading ai={ai} />
		</>
	)
}

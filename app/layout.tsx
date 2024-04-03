import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Genius AI',
	description: 'Create, edit and share your own image, video, and audio using the best AI models',
	openGraph: {
		title: 'Genius AI',
		description: 'Create, edit and share your own image, video, and audio AI models',
		url: 'https://ai.nikkhil.tech',
		type: 'website',
		locale: 'en_US',
		siteName: 'Genius AI',
	},
	twitter: {
		card: 'summary',
		site: '@nikhil_dmg',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	)
}

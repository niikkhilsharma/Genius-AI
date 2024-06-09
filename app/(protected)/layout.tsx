import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import { Toaster } from 'react-hot-toast'

import { Providers } from '@/lib/next-auth-provider'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-full">
			<Toaster position="top-center" reverseOrder={false} />
			<div className="hidden md:block md:fixed md:w-72 md:inset-y-0 bg-gray-900">
				<Sidebar />
			</div>
			<main className="md:pl-72">
				<Navbar />
				<Providers>{children}</Providers>
			</main>
		</div>
	)
}

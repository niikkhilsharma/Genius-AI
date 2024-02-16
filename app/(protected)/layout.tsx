import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-full">
			<div className="hidden md:block md:fixed md:w-72 md:inset-y-0 bg-gray-900">
				<Sidebar />
			</div>
			<main className="md:pl-72">
				<Navbar />
				{children}
			</main>
		</div>
	)
}

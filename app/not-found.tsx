import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import { Toaster } from 'react-hot-toast'

export default function NotFound() {
	return (
		<>
			<div className="h-full">
				<Toaster position="top-center" reverseOrder={false} />
				<div className="hidden md:block md:fixed md:w-72 md:inset-y-0 bg-gray-900">
					<Sidebar />
				</div>
				<main className="md:pl-72">
					<Navbar />
					<div className="w-full flex justify-center items-center font-bold">This page is not available</div>
				</main>
			</div>
		</>
	)
}

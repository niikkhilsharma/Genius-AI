import React from 'react'

import { Loader } from 'lucide-react'

const DashboardLoading = () => {
	return (
		<div className="w-full h-screen flex justify-center items-center">
			<Loader size={64} className="animate-spin" />
		</div>
	)
}

export default DashboardLoading

import React from 'react'

import { cn } from '@/lib/utils'

const MaxScreenWrapper = ({ children }: { children: React.ReactNode }) => {
	return <div className={cn('container mx-auto max-w-screen-xl')}>{children}</div>
}

export default MaxScreenWrapper

'use client'

import React from 'react'

import TypewriterComponent from 'typewriter-effect'

const TypeWriter = ({ strings }: { strings: string[] }) => {
	return (
		<TypewriterComponent
			options={{
				strings,
				autoStart: true,
				loop: true,
			}}
		/>
	)
}

export default TypeWriter

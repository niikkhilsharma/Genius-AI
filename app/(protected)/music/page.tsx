'use client'
import React, { useState } from 'react'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Music, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

import ResponsePageHeading from '@/components/response-page/response-page-heading'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const musicPrompt = z.object({
	prompt: z
		.string()
		.min(5, { message: 'Prompt must be atleast 5 char long.' })
		.max(50, { message: 'Prompt must be atmost 50 char long.' }),
})

export default function MusicPage() {
	const [music, setMusic] = useState<string>()
	const [loading, setLoading] = useState(false)

	// 1. Define your form.
	const form = useForm<z.infer<typeof musicPrompt>>({
		resolver: zodResolver(musicPrompt),
		defaultValues: {
			prompt: '',
		},
	})

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof musicPrompt>) {
		try {
			setLoading(true)
			setMusic(undefined)
			const res = await fetch('/api/dashboard/music', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			})
			const data = await res.json()
			setMusic(data.output)
			setLoading(false)
			toast.success('Music generated successfully.')
		} catch (error) {
			console.log(error)
			setLoading(false)
			toast.error('Failed to generate music.')
		}
	}

	return (
		<div className="px-8">
			<ResponsePageHeading
				ai={{
					title: 'Music Generation',
					description: 'Turn your words into music.',
					icon: Music as React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
					iconColor: 'text-emerald-500',
					bgColor: 'bg-emerald-500/10',
				}}
			/>
			<div className="mt-8">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0 relative">
						<FormField
							control={form.control}
							name="prompt"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder="Piano Solo"
											{...field}
											className="h-20 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
										/>
									</FormControl>
									<FormMessage className="absolute" />
								</FormItem>
							)}
						/>
						<button
							type="submit"
							className={cn(
								'shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] pl-8 pr-6 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear absolute top-[25%] right-0 mr-4',
								loading && 'cursor-not-allowed bg-[#0070f3] hover:bg-[#0070f3]'
							)}
							disabled={loading}
						>
							Generate <span className="ml-2">{loading && <Loader2 className="inline-block animate-spin" />}</span>
						</button>
					</form>
				</Form>
			</div>
			{music && (
				<div className="mt-10">
					<audio controls className="w-full">
						<source src={music} type="audio/wav" />
						Your browser does not support the audio element.
					</audio>
				</div>
			)}
		</div>
	)
}

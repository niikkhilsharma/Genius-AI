'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ImageDown, Images, Loader2 } from 'lucide-react'
import ImageUploading, { ImageListType } from 'react-images-uploading'

import ResponsePageHeading from '@/components/response-page/response-page-heading'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'

const imagePrompt = z.object({
	prompt: z
		.string()
		.min(5, { message: 'Prompt must be atleast 5 char long.' })
		.max(50, { message: 'Prompt must be atmost 50 char long.' }),
})

const RestoreImagesPage = () => {
	const [image, setImage] = useState<any>()
	const [imgPublicId, setImgPublicId] = useState<any>()
	const [loading, setLoading] = useState(false)
	const [prompt, setPrompt] = useState('')
	const router = useRouter()

	const { toast } = useToast()

	const form = useForm<z.infer<typeof imagePrompt>>({
		resolver: zodResolver(imagePrompt),
		defaultValues: {
			prompt: '',
		},
	})

	async function onSubmit(values: z.infer<typeof imagePrompt>) {
		setPrompt(values.prompt)
		// console.log(
		// 	`https://res.cloudinary.com/niikkhilsharma/image/upload/e_gen_remove:prompt_${values.prompt}/${imgPublicId}.jpg`
		// )
	}

	async function downloadImage(imgUrl: string) {
		const image = await fetch(imgUrl)
		const imageBlog = await image.blob()
		const imageURL = URL.createObjectURL(imageBlog)

		const link = document.createElement('a')
		link.href = imageURL
		link.download = 'imageName'
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	// handling image upload
	const onChange = async (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
		try {
			if (imageList.length !== 0) {
				setLoading(true)

				console.log('image list below')
				console.log(imageList, addUpdateIndex)
				console.log('image list above')

				setImage(imageList)

				const res = await fetch('/api/cloudnary/upload', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ imageBlob: imageList[0].data_url }),
				})
				const response = await res.json()

				console.log('response from api', response)
				setImgPublicId(response.publicId)
				setLoading(false)

				if (res.status !== 200) throw new Error(response.error)
			} else {
				setImage('')
				setImgPublicId('')
			}
		} catch (error) {
			console.log(error)
			setImage('')
			setImgPublicId('')

			if ((error as Error).message === 'FREE TRIAL LIMIT EXCEEDED') {
				toast({
					title: 'Free trial limit exceeded',
					description: 'You have exceeded the free trial limit of 5 API calls.',
					action: (
						<ToastAction altText="Pay Now" onClick={() => router.push('/pricing')}>
							Pay Now
						</ToastAction>
					),
				})
			}
		}
	}

	return (
		<div className="px-8">
			<ResponsePageHeading
				ai={{
					title: 'Restore Images',
					description: 'Remove unwanted images or people from your image.',
					icon: Images as React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
					iconColor: 'text-emerald-500',
					bgColor: 'bg-emerald-500/10',
				}}
			/>
			<div className="my-8">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0 relative">
						<FormField
							control={form.control}
							name="prompt"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											disabled={!image}
											placeholder="Remove the person on the right"
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
								(loading || !image) && 'cursor-not-allowed bg-[#0070f3]/90 hover:bg-red-700/90'
							)}
							disabled={loading || !image}
						>
							<span>
								Generate
								{loading && <Loader2 className="inline-block animate-spin ml-2" />}
							</span>
						</button>
					</form>
				</Form>
			</div>

			<ImageUploading maxFileSize={1500000} multiple value={image} onChange={onChange} maxNumber={1} dataURLKey="data_url">
				{({ imageList, errors, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
					// write your building UI
					<div className="upload__image-wrapper my-10">
						{imageList.length === 0 ? (
							<div onClick={onImageUpload} {...dragProps} className={'flex items-center justify-center w-full hover:cursor-pointer'}>
								<span
									className={cn(
										'flex flex-col rounded-lg border-4 border-dashed w-full h-96 p-10 group text-center',
										isDragging && 'border-blue-400'
									)}
								>
									<div className="h-full w-full text-center flex flex-col justify-center items-center">
										<div className="flex flex-auto mx-auto -mt-10">
											<Image
												className="w-full aspect-square"
												src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=512&ext=jpg"
												loading="lazy"
												width={338}
												height={676}
												alt="upload image here"
											/>
										</div>
										<p className="pointer-none text-gray-500 ">
											<span className="text-sm">Drag and drop</span> files here <br /> or{' '}
											<span className="text-blue-600 hover:underline">select a file</span> from your computer
										</p>
									</div>
								</span>
							</div>
						) : (
							<>
								{imageList.map((image, index) => (
									<div key={index} className="image-item">
										<div className="w-full flex flex-col sm:flex-row justify-center gap-4">
											<div className="sm:w-1/2">
												<Image src={image['data_url']} alt="" width={300} height={300} className="mx-auto w-full max-h-96 object-contain" />
											</div>
											<div className="hidden sm:block border-dashed border-2 border-blue-600" />
											<div className="sm:w-1/2 flex justify-start items-center">
												{prompt ? (
													<div className="flex flex-col justify-center items-center h-full gap-2 w-full relative group">
														<Avatar className="w-full h-full rounded-none shadow-lg absolute top-0">
															<AvatarImage
																src={`https://res.cloudinary.com/niikkhilsharma/image/upload/e_gen_remove:prompt_${prompt}/${imgPublicId}.jpg`}
																alt=""
																width={300}
																height={300}
																className="mx-auto w-full max-h-96 object-contain hover:cursor-pointer"
																onClick={() => {
																	downloadImage(image['data_url'])
																}}
															/>
															<AvatarFallback className="rounded-none max-h-96">
																<Skeleton className="w-full h-full max-h-96" />
															</AvatarFallback>
														</Avatar>

														<div className="w-full h-full relative flex justify-center items-center">
															<div className="group-hover:bg-black group-hover:opacity-35 w-full h-full flex justify-center items-center absolute top-0"></div>
															<Button
																className="z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
																variant={'secondary'}
																onClick={() => downloadImage(image['data_url'])}
															>
																Download <ImageDown className="ml-2" />
															</Button>
														</div>
													</div>
												) : (
													<div className="flex flex-col justify-center items-center px-4 h-full gap-2">
														<div className="bg-blue-300 py-1 px-2 rounded-md shadow-lg hover:bg-blue-400">
															<span className="mr-1">1.</span>Right a prompt to remove the object from the image.
														</div>
														<div className="bg-blue-300 py-1 px-2 rounded-md shadow-lg hover:bg-blue-400">
															<span className="mr-1">2.</span>Click on generate button and wait for the new image to be generated.
														</div>
													</div>
												)}
											</div>
										</div>
										<div className="image-item__btn-wrapper flex justify-start gap-4 mt-4">
											<Button className="bg-blue-600 hover:bg-blue-600/95" onClick={() => onImageUpdate(index)} disabled={loading}>
												Update
											</Button>
											<Button variant={'destructive'} onClick={() => onImageRemove(index)} disabled={loading}>
												Remove
											</Button>
										</div>
									</div>
								))}
							</>
						)}
						{errors && (
							<div>
								{errors.maxNumber && <span>Number of selected images exceed maxNumber 1.5MB</span>}
								{errors.acceptType && <span>Your selected file type is not allow</span>}
								{errors.maxFileSize && <span>Selected file size exceed maxFileSize</span>}
								{errors.resolution && <span>Selected file is not match your desired resolution</span>}
							</div>
						)}
					</div>
				)}
			</ImageUploading>
		</div>
	)
}

export default RestoreImagesPage

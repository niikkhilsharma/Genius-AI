import { NextResponse } from 'next/server'
import Replicate from 'replicate'

const replicate = new Replicate({
	auth: process.env.REPLICATE_API_TOKEN,
})

export async function POST(req: Request) {
	try {
		const { prompt } = await req.json()

		const output = await replicate.run(
			'stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4',
			{
				input: {
					width: 768,
					height: 768,
					prompt: prompt,
					scheduler: 'K_EULER',
					num_outputs: 2,
					guidance_scale: 7.5,
					num_inference_steps: 50,
				},
			}
		)

		console.log(output)
		return NextResponse.json({ output })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error: 'Failed to generate music.' }, { status: 500 })
	}
}

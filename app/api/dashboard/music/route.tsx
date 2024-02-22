import { NextResponse } from 'next/server'
import Replicate from 'replicate'

const replicate = new Replicate({
	auth: process.env.REPLICATE_API_TOKEN,
})

export async function POST(req: Request) {
	try {
		const { prompt } = await req.json()

		const output = await replicate.run('meta/musicgen:b05b1dff1d8c6dc63d14b0cdb42135378dcb87f6373b0d3d341ede46e59e2b38', {
			input: {
				top_k: 250,
				top_p: 0,
				prompt: prompt,
				duration: 5,
				temperature: 1,
				continuation: false,
				model_version: 'melody-large',
				output_format: 'wav',
				continuation_start: 0,
				multi_band_diffusion: false,
				normalization_strategy: 'peak',
				classifier_free_guidance: 3,
			},
		})

		return NextResponse.json({ output })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error: 'Failed to generate music.' }, { status: 500 })
	}
}

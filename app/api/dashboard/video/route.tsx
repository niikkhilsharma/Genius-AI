import { NextResponse } from 'next/server'
import Replicate from 'replicate'

const replicate = new Replicate({
	auth: process.env.REPLICATE_API_TOKEN,
})

export async function POST(req: Request) {
	try {
		const { prompt } = await req.json()

		const output = await replicate.run(
			'cjwbw/damo-text-to-video:1e205ea73084bd17a0a3b43396e49ba0d6bc2e754e9283b2df49fad2dcf95755',
			{
				input: {
					fps: 8,
					prompt: prompt,
					num_frames: 50,
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

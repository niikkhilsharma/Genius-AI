import { NextResponse } from "next/server";
import Replicate from "replicate";

import { updateRuntimeUsed } from "@/lib/database/functions";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  const startTime = process.hrtime();

  try {
    const { prompt } = await req.json();

    const output = await replicate.run(
      "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      {
        input: {
          width: 768,
          height: 768,
          prompt: prompt,
          scheduler: "K_EULER",
          num_outputs: 1,
          guidance_scale: 7.5,
          num_inference_steps: 50,
        },
      },
    );

    // Calculate the api runtime and update it in the database.
    const endTime = process.hrtime(startTime);
    const elapsedTimeInSeconds = endTime[0] + endTime[1] / 1e9;
    updateRuntimeUsed(elapsedTimeInSeconds, 0.1);

    return NextResponse.json({ output });
  } catch (error) {
    const endTime = process.hrtime(startTime);
    const elapsedTimeInSeconds = endTime[0] + endTime[1] / 1e9;
    updateRuntimeUsed(elapsedTimeInSeconds, 0.1);

    console.log(error);
    return NextResponse.json(
      { error: "Failed to generate Image! Please try agin." },
      { status: 500 },
    );
  }
}

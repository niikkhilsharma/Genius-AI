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
      "meta/musicgen:b05b1dff1d8c6dc63d14b0cdb42135378dcb87f6373b0d3d341ede46e59e2b38",
      {
        input: {
          top_k: 250,
          top_p: 0,
          prompt: prompt,
          duration: 5,
          temperature: 1,
          continuation: false,
          model_version: "melody-large",
          output_format: "wav",
          continuation_start: 0,
          multi_band_diffusion: false,
          normalization_strategy: "peak",
          classifier_free_guidance: 3,
        },
      },
    );

    // Calculate the api runtime and update it in the database.
    const endTime = process.hrtime(startTime);
    const elapsedTimeInSeconds = endTime[0] + endTime[1] / 1e9;
    // This model runs on Nvidia A100 (40GB) GPU hardware, which costs $0.00115 per second. Predictions typically complete within 24 seconds.

    updateRuntimeUsed(elapsedTimeInSeconds, 0.1);

    return NextResponse.json({ output });
  } catch (error) {
    const endTime = process.hrtime(startTime);
    const elapsedTimeInSeconds = endTime[0] + endTime[1] / 1e9;
    updateRuntimeUsed(elapsedTimeInSeconds, 0.1);

    console.log(error);
    return NextResponse.json(
      { error: "Failed to generate music." },
      { status: 500 },
    );
  }
}

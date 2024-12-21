import { NextResponse } from "next/server";

import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";
import { updateRuntimeUsed } from "@/lib/database/functions";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const body = await request.json();
  const { imageBlob } = body;

  const compressedImgBlob = await compressImage(imageBlob, 500);

  const uploadedImgObj = await cloudinary.uploader.upload(compressedImgBlob);
  console.log(uploadedImgObj);
  updateRuntimeUsed(0, 0.1);
  return NextResponse.json({ publicId: uploadedImgObj.public_id });
}

async function compressImage(base64Url: string, targetSizeKB: number) {
  // Extract base64 data
  const base64Data = base64Url.split(",")[1];

  // Decode base64 data
  let imageBuffer = Buffer.from(base64Data, "base64");

  let sizeKB = imageBuffer.length / 1024;

  // Iterate until the image size is less than or equal to the target size
  let reducedQuality = 80;

  while (sizeKB > targetSizeKB) {
    console.log(reducedQuality);

    if (reducedQuality <= 20) {
      reducedQuality = 2;
    }
    console.log("again running", reducedQuality);

    // Resize the image by reducing the quality
    imageBuffer = await sharp(imageBuffer)
      .jpeg({ quality: reducedQuality }) // Adjust quality as needed
      .toBuffer();

    sizeKB = imageBuffer.length / 1024;
    console.log(sizeKB);
    reducedQuality -= 10;
    console.log("running");
  }

  // Convert the resized image buffer to base64
  const resizedBase64 = imageBuffer.toString("base64");

  // Construct the base64 URL of the resized image
  const resizedBase64Url = `data:image/jpeg;base64,${resizedBase64}`;

  return resizedBase64Url;
}

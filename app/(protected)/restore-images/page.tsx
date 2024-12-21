"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImageDown, Images, Loader2 } from "lucide-react";
import ImageUploading, { ImageListType } from "react-images-uploading";

import ResponsePageHeading from "@/components/response-page/response-page-heading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const imagePrompt = z.object({
  prompt: z
    .string()
    .min(5, { message: "Prompt must be atleast 5 char long." })
    .max(50, { message: "Prompt must be atmost 50 char long." }),
});

const RestoreImagesPage = () => {
  const [image, setImage] = useState<any>();
  const [imgPublicId, setImgPublicId] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof imagePrompt>>({
    resolver: zodResolver(imagePrompt),
    defaultValues: {
      prompt: "",
    },
  });

  async function onSubmit(values: z.infer<typeof imagePrompt>) {
    try {
      setPrompt(values.prompt);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("run router refresh from restore images");
      router.refresh();
    }
    // console.log(
    // 	`https://res.cloudinary.com/niikkhilsharma/image/upload/e_gen_remove:prompt_${values.prompt}/${imgPublicId}.jpg`
    // )
  }

  async function downloadImage(imgUrl: string) {
    const image = await fetch(imgUrl);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "imageName";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // handling image upload
  const onChange = async (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined,
  ) => {
    try {
      if (imageList.length !== 0) {
        setLoading(true);
        setImage(imageList);

        const res = await fetch("/api/cloudnary/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageBlob: imageList[0].data_url }),
        });
        const response = await res.json();
        setImgPublicId(response.publicId);
        setLoading(false);

        if (res.status !== 200) throw new Error(response.error);
      } else {
        setImage("");
        setImgPublicId("");
      }
    } catch (error) {
      console.log(error);
      setImage("");
      setImgPublicId("");

      if ((error as Error).message === "FREE TRIAL LIMIT EXCEEDED") {
        toast({
          title: "Free trial limit exceeded",
          description: "You have exceeded the free trial limit of 5 API calls.",
          action: (
            <ToastAction
              altText="Pay Now"
              onClick={() => router.push("/pricing")}
            >
              Pay Now
            </ToastAction>
          ),
        });
      }
    }
  };

  return (
    <div className="px-8">
      <ResponsePageHeading
        ai={{
          title: "Restore Images",
          description: "Remove unwanted images or people from your image.",
          icon: Images as React.FunctionComponent<
            React.SVGProps<SVGSVGElement>
          >,
          iconColor: "text-emerald-500",
          bgColor: "bg-emerald-500/10",
        }}
      />
      <div className="my-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative space-y-0"
          >
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
                "absolute right-0 top-[25%] mr-4 rounded-md bg-[#0070f3] py-2 pl-8 pr-6 font-light text-white shadow-[0_4px_14px_0_rgb(0,118,255,39%)] transition duration-200 ease-linear hover:bg-[rgba(0,118,255,0.9)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)]",
                (loading || !image) &&
                  "cursor-not-allowed bg-[#0070f3]/90 hover:bg-red-700/90",
              )}
              disabled={loading || !image}
            >
              <span>
                Generate
                {loading && (
                  <Loader2 className="ml-2 inline-block animate-spin" />
                )}
              </span>
            </button>
          </form>
        </Form>
      </div>

      <ImageUploading
        maxFileSize={1500000}
        multiple
        value={image}
        onChange={onChange}
        maxNumber={1}
        dataURLKey="data_url"
      >
        {({
          imageList,
          errors,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper my-10">
            {imageList.length === 0 ? (
              <div
                onClick={onImageUpload}
                {...dragProps}
                className={
                  "flex w-full items-center justify-center hover:cursor-pointer"
                }
              >
                <span
                  className={cn(
                    "group flex h-96 w-full flex-col rounded-lg border-4 border-dashed p-10 text-center",
                    isDragging && "border-blue-400",
                  )}
                >
                  <div className="flex h-full w-full flex-col items-center justify-center text-center">
                    <div className="mx-auto -mt-10 flex flex-auto">
                      <Image
                        className="aspect-square w-full"
                        src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=512&ext=jpg"
                        loading="lazy"
                        width={338}
                        height={676}
                        alt="upload image here"
                      />
                    </div>
                    <p className="pointer-none text-gray-500">
                      <span className="text-sm">Drag and drop</span> files here{" "}
                      <br /> or{" "}
                      <span className="text-blue-600 hover:underline">
                        select a file
                      </span>{" "}
                      from your computer
                    </p>
                  </div>
                </span>
              </div>
            ) : (
              <>
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
                      <div className="sm:w-1/2">
                        <Image
                          src={image["data_url"]}
                          alt=""
                          width={300}
                          height={300}
                          className="mx-auto max-h-96 w-full object-contain"
                        />
                      </div>
                      <div className="hidden border-2 border-dashed border-blue-600 sm:block" />
                      <div className="flex items-center justify-start sm:w-1/2">
                        {prompt ? (
                          <div className="group relative flex h-full w-full flex-col items-center justify-center gap-2">
                            <Avatar className="absolute top-0 h-full w-full rounded-none shadow-lg">
                              <AvatarImage
                                src={`https://res.cloudinary.com/niikkhilsharma/image/upload/e_gen_remove:prompt_${prompt}/${imgPublicId}.jpg`}
                                alt=""
                                width={300}
                                height={300}
                                className="mx-auto max-h-96 w-full object-contain hover:cursor-pointer"
                                onClick={() => {
                                  downloadImage(image["data_url"]);
                                }}
                              />
                              <AvatarFallback className="max-h-96 rounded-none">
                                <Skeleton className="h-full max-h-96 w-full" />
                              </AvatarFallback>
                            </Avatar>

                            <div className="relative flex h-full w-full items-center justify-center">
                              <div className="absolute top-0 flex h-full w-full items-center justify-center group-hover:bg-black group-hover:opacity-35"></div>
                              <Button
                                className="z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                variant={"secondary"}
                                onClick={() => downloadImage(image["data_url"])}
                              >
                                Download <ImageDown className="ml-2" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex h-full flex-col items-center justify-center gap-2 px-4">
                            <div className="rounded-md bg-blue-300 px-2 py-1 shadow-lg hover:bg-blue-400">
                              <span className="mr-1">1.</span>Right a prompt to
                              remove the object from the image.
                            </div>
                            <div className="rounded-md bg-blue-300 px-2 py-1 shadow-lg hover:bg-blue-400">
                              <span className="mr-1">2.</span>Click on generate
                              button and wait for the new image to be generated.
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="image-item__btn-wrapper mt-4 flex justify-start gap-4">
                      <Button
                        className="bg-blue-600 hover:bg-blue-600/95"
                        onClick={() => onImageUpdate(index)}
                        disabled={loading}
                      >
                        Update
                      </Button>
                      <Button
                        variant={"destructive"}
                        onClick={() => onImageRemove(index)}
                        disabled={loading}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </>
            )}
            {errors && (
              <div>
                {errors.maxNumber && (
                  <span>Number of selected images exceed maxNumber 1.5MB</span>
                )}
                {errors.acceptType && (
                  <span>Your selected file type is not allow</span>
                )}
                {errors.maxFileSize && (
                  <span>Selected file size exceed maxFileSize</span>
                )}
                {errors.resolution && (
                  <span>
                    Selected file is not match your desired resolution
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default RestoreImagesPage;

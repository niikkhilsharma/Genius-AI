"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

import { ParallaxScroll } from "@/components/aui/parallax-scroll";

import ResponsePageHeading from "@/components/response-page/response-page-heading";
import { ImageIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const musicPrompt = z.object({
  prompt: z
    .string()
    .min(5, { message: "Prompt must be atleast 5 char long." })
    .max(100, { message: "Prompt must be atmost 50 char long." }),
});

export default function ImagePage() {
  const [images, setImages] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(musicPrompt),
    defaultValues: {
      prompt: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof musicPrompt>) {
    try {
      setLoading(true);
      setImages(undefined);
      const res = await fetch("/api/dashboard/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (res.status !== 200) throw new Error(data.error);

      setImages(data.output);
      console.log(data.ouput);
      setLoading(false);
      toast({
        title: "Image generated successfully. 🎉",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
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
  }

  return (
    <div className="px-8">
      <ResponsePageHeading
        ai={{
          title: "Image Generation",
          description: "Turn your words into an image.",
          icon: ImageIcon as React.FunctionComponent<
            React.SVGProps<SVGSVGElement>
          >,
          iconColor: "text-pink-700",
          bgColor: "bg-pink-700/10",
        }}
      />

      <div className="mt-8">
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
                      placeholder="An astronaut riding a rainbow unicorn, cinematic, dramatic"
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
                loading && "cursor-not-allowed bg-[#0070f3] hover:bg-[#0070f3]",
              )}
              disabled={loading}
            >
              Generate{" "}
              <span className="ml-2">
                {loading && <Loader2 className="inline-block animate-spin" />}
              </span>
            </button>
          </form>
        </Form>
      </div>
      {images && <ParallaxScroll images={images} />}
    </div>
  );
}

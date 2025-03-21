import React from "react";

import Image from "next/image";
import Link from "next/link";

import { Montserrat } from "next/font/google";

import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const montserratFont = Montserrat({
  weight: ["600"],
  subsets: ["latin"],
});

const LandingNavbar = () => {
  return (
    <div className="flex w-full items-center justify-between py-4 text-white">
      <div className="flex items-center">
        <Image
          src="/assets/images/logo.png"
          alt="avatar"
          width={400}
          height={400}
          className="mr-4 h-10 w-10"
        />
        <h1
          className={cn(`text-2xl font-semibold ${montserratFont.className}`)}
        >
          Genius
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <Link
          className={cn(
            buttonVariants({ variant: "outline" }),
            "hidden rounded-full bg-white text-black sm:block",
          )}
          href="/contact"
        >
          Contact Us
        </Link>
        <Link
          className={cn(
            buttonVariants({ variant: "outline" }),
            "rounded-full text-black",
          )}
          href="/dashboard"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default LandingNavbar;

"use client";
import Image from "next/image";
import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { signIn } from "next-auth/react";

const AuthenticationPage = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#111827] bg-background px-4 pb-20 text-white">
      <div className="mx-auto flex w-full max-w-[26rem] flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-3">
          <Image
            src={"/assets/images/logo.png"}
            width={75}
            height={75}
            alt="Genius AI"
          />
          <h1 className="text-center text-2xl font-semibold">
            Welcome to Genius AI
          </h1>
          <h3 className="text-center font-light opacity-60">
            Please enter your details to create your account
          </h3>
        </div>
        <div className="mt-10 w-full space-y-4">
          <button
            className="bg- flex w-full items-center justify-center gap-2 rounded-2xl border border-muted-foreground bg-zinc-700 p-4 text-white transition-all duration-100 hover:bg-zinc-700/80"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            <FaGoogle size={24} /> Continue with Google
          </button>
          {/* <button
            className="bg- flex w-full items-center justify-center gap-2 rounded-2xl border border-muted-foreground bg-zinc-700 p-4 text-white transition-all duration-100 hover:bg-zinc-700/80"
            onClick={() => signIn("github")}
          >
            <FaGithub size={24} /> Continue with Github
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;

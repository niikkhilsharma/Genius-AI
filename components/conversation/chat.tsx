"use client";
import React, { useEffect, useRef } from "react";
import { ToolInvocation } from "ai";
import { Message, useChat } from "ai/react";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import type { Session, User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Plane, Figma, TreePine } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Chat({ session }: { session: Session }) {
  const user = session.user;
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const suggestedIcons = [
    {
      icon: <Plane />,
      text: "Wamderlust Destinations 2024",
      category: "Must-Visit Places",
    },
    {
      icon: <TreePine />,
      text: "Why these winters are too cold",
      category: "Key Differentiators",
    },
    {
      icon: <Figma />,
      text: "Design Trends on TikTok 2024",
      category: "Trending Now",
    },
  ];

  const { messages, input, handleInputChange, handleSubmit, addToolResult } =
    useChat({
      maxSteps: 5,

      // run client-side tools that are automatically executed:
      async onToolCall({ toolCall }) {
        if (toolCall.toolName === "getLocation") {
          const cities = [
            "New York",
            "Los Angeles",
            "Chicago",
            "San Francisco",
          ];
          return cities[Math.floor(Math.random() * cities.length)];
        }
      },
    });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <>
      <div className="mt-6 flex h-[70vh] flex-col justify-between rounded-lg border bg-gradient-to-r from-[#e6e9f0] to-[#eef1f5]">
        {messages.length > 0 ? (
          <div className="flex flex-col gap-4 overflow-y-scroll p-4">
            {messages?.map((m: Message) => (
              <div key={m.id}>
                {m.role === "user" ? (
                  <div className="flex gap-4">
                    <span className="flex aspect-square h-12 w-12 items-center justify-center rounded-full bg-slate-200 p-2">
                      <Avatar>
                        <AvatarImage
                          src={user.image || ""}
                          alt="User"
                          width={30}
                          height={30}
                          className="aspect-square rounded-full"
                        />
                        <AvatarFallback>
                          {user.name && user.name.split(" ").length > 1
                            ? user.name.split(" ")[0][0] +
                              user.name.split(" ")[1][0]
                            : user?.name?.[0] || ""}
                        </AvatarFallback>
                      </Avatar>
                    </span>
                    <div>
                      <strong>You</strong>
                      <Markdown
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeKatex, rehypeHighlight]}
                        components={{
                          code({ node, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(
                              className || "",
                            );
                            return match ? (
                              <pre
                                className={cn(className, "my-2 rounded-xl p-4")}
                              >
                                <code {...props}>{children}</code>
                              </pre>
                            ) : (
                              <code
                                {...props}
                                className={cn(className, "my-2 p-4")}
                              >
                                {children}
                              </code>
                            );
                          },
                        }}
                      >
                        {m.content}
                      </Markdown>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <span className="flex aspect-square h-12 w-12 items-center justify-center rounded-full bg-slate-200 p-2">
                      <Avatar>
                        <AvatarImage
                          src={"/logo.png"}
                          alt="User"
                          width={30}
                          height={30}
                          className="aspect-square rounded-full"
                        />
                        <AvatarFallback>
                          {user.name && user.name.split(" ").length > 1
                            ? user.name.split(" ")[0][0] +
                              user.name.split(" ")[1][0]
                            : user?.name?.[0] || ""}
                        </AvatarFallback>
                      </Avatar>
                    </span>
                    <div>
                      <strong>Assistant</strong>
                      <Markdown
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeKatex, rehypeHighlight]}
                        components={{
                          code({ node, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(
                              className || "",
                            );
                            return match ? (
                              <pre
                                className={cn(className, "my-2 rounded-xl p-4")}
                              >
                                <code {...props}>{children}</code>
                              </pre>
                            ) : (
                              <code
                                {...props}
                                className={cn(className, "my-2 p-4")}
                              >
                                {children}
                              </code>
                            );
                          },
                        }}
                      >
                        {m.content}
                      </Markdown>
                    </div>
                  </div>
                )}
                {/* {m.content} */}
                {m.toolInvocations?.map((toolInvocation: ToolInvocation) => {
                  const toolCallId = toolInvocation.toolCallId;
                  const addResult = (result: string) =>
                    addToolResult({ toolCallId, result });

                  // render confirmation tool (client-side tool with user interaction)
                  if (toolInvocation.toolName === "askForConfirmation") {
                    return (
                      <div key={toolCallId}>
                        {toolInvocation.args.message}
                        <div>
                          {"result" in toolInvocation ? (
                            <b>{toolInvocation.result}</b>
                          ) : (
                            <>
                              <button onClick={() => addResult("Yes")}>
                                Yes
                              </button>
                              <button onClick={() => addResult("No")}>
                                No
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  }

                  // other tools:
                  return "result" in toolInvocation ? (
                    <div key={toolCallId}>
                      Tool call {`${toolInvocation.toolName}: `}
                      {toolInvocation.result}
                    </div>
                  ) : (
                    <div key={toolCallId}>
                      Calling {toolInvocation.toolName}...
                    </div>
                  );
                })}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-4">
            <div className="flex flex-col items-center justify-center">
              <Image src="/logo.png" alt="logo" width={50} height={50} />
              <p className="mt-2 font-sans text-3xl font-semibold text-pink-500/80">
                Hi, {user.name}
              </p>
              <p className="font-sans text-3xl font-semibold text-black/80">
                Can I help you with anything?
              </p>
              <p className="mt-2 text-sm text-pink-400">
                Ready to assit you with anything you need, from answering <br />
                questions to providing recommendations. Let&apos;s get started!
              </p>
            </div>
            <div className="mt-20 flex gap-4">
              {suggestedIcons.map((suggestion, indx) => (
                <div
                  key={indx}
                  className="w-40 rounded-xl border bg-white p-4 hover:cursor-pointer hover:bg-white/60"
                  onClick={() => {
                    const message = suggestion.text;
                    const inputField = document.querySelector(
                      "input",
                    ) as HTMLInputElement; // Adjust selector if needed
                    if (inputField) {
                      inputField.value = message; // Set the input field value
                      handleInputChange({
                        target: inputField,
                      } as React.ChangeEvent<HTMLInputElement>);
                      handleSubmit();
                    }
                  }}
                >
                  <div
                    key={indx}
                    className="flex aspect-square h-10 w-10 items-center justify-center rounded-xl bg-slate-700 p-2 text-xl text-white"
                  >
                    {suggestion.icon}
                  </div>
                  <p className="mt-4 text-sm leading-5">{suggestion.text}</p>
                  <p className="mt-2 text-xs text-gray-400">
                    {suggestion.category}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="relative mt-6 w-full">
        <PlaceholdersAndVanishInput
          className="max-w-screen-xl"
          placeholders={placeholders}
          onChange={handleInputChange}
          onSubmit={() => {
            try {
              handleSubmit;
            } catch (error) {
              console.log(error);
            } finally {
              router.refresh();
            }
          }}
        />
      </div>
    </>
  );
}

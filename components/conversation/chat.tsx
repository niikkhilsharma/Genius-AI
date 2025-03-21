"use client";
import React, { useEffect, useRef } from "react";
import { ToolInvocation } from "ai";
import { Message, useChat } from "ai/react";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import type { Session, User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import {
  Plane,
  Figma,
  TreePine,
  Cloud,
  Thermometer,
  Wind,
  Droplets,
} from "lucide-react";
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
    "What's the weather like in New York?",
    "How's the temperature in Tokyo today?",
    "Is it raining in London?",
    "What should I wear in Barcelona today?",
    "Tell me about the weather in Sydney",
  ];

  const suggestedIcons = [
    {
      icon: <Cloud />,
      text: "Check weather in your city",
      category: "Weather Updates",
    },
    {
      icon: <TreePine />,
      text: "Plan an outdoor activity",
      category: "Weather-based Planning",
    },
    {
      icon: <Plane />,
      text: "Travel weather recommendations",
      category: "Trip Planning",
    },
  ];

  const { messages, input, handleInputChange, handleSubmit, addToolResult } =
    useChat({
      maxSteps: 5,

      // run client-side tools that are automatically executed:
      async onToolCall({ toolCall }) {
        if (toolCall.toolName === "getLocation") {
          // In a real app, we would use the browser's geolocation API
          // For this example, we'll return a random city
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to render weather data in a nice format
  const renderWeatherData = (weatherData: any) => {
    if (typeof weatherData === "string") {
      return <div className="text-red-500">{weatherData}</div>;
    }

    return (
      <div className="mt-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">{weatherData.location}</h3>
          <span className="text-sm text-gray-500">{weatherData.timestamp}</span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-red-500" />
            <div>
              <div className="text-2xl font-bold">
                {weatherData.temperature}
              </div>
              <div className="text-xs text-gray-500">
                Feels like {weatherData.feelsLike}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-blue-500" />
            <div>
              <div className="capitalize">{weatherData.conditions}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-400" />
            <div>
              <div>{weatherData.humidity}</div>
              <div className="text-xs text-gray-500">Humidity</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-gray-500" />
            <div>
              <div>{weatherData.windSpeed}</div>
              <div className="text-xs text-gray-500">Wind</div>
            </div>
          </div>
        </div>

        {/* Display weather alert if available */}
        {weatherData.alertInfo && (
          <div className="mt-4 rounded-md bg-yellow-50 p-3 text-yellow-800">
            {weatherData.alertInfo}
          </div>
        )}
      </div>
    );
  };

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
                          src={"/assets/images/logo.png"}
                          alt="Assistant"
                          width={30}
                          height={30}
                          className="aspect-square rounded-full"
                        />
                        <AvatarFallback>AI</AvatarFallback>
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

                {m.toolInvocations?.map((toolInvocation: ToolInvocation) => {
                  const toolCallId = toolInvocation.toolCallId;
                  const addResult = (result: string) =>
                    addToolResult({ toolCallId, result });

                  // render confirmation tool (client-side tool with user interaction)
                  if (toolInvocation.toolName === "askForConfirmation") {
                    return (
                      <div
                        key={toolCallId}
                        className="ml-16 mt-2 flex flex-col gap-2"
                      >
                        <div className="rounded-lg bg-blue-50 p-3">
                          {toolInvocation.args.message}
                        </div>
                        <div>
                          {"result" in toolInvocation ? (
                            <div className="font-medium">
                              You answered:{" "}
                              <span className="font-bold">
                                {toolInvocation.result}
                              </span>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <button
                                onClick={() => addResult("Yes")}
                                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => addResult("No")}
                                className="rounded-md border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50"
                              >
                                No
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }

                  // Weather tool display
                  if (
                    toolInvocation.toolName === "getWeatherInformation" &&
                    "result" in toolInvocation
                  ) {
                    return (
                      <div key={toolCallId} className="ml-16 mt-2">
                        {renderWeatherData(toolInvocation.result)}
                      </div>
                    );
                  }

                  // other tools:
                  return "result" in toolInvocation ? (
                    <div
                      key={toolCallId}
                      className="ml-16 mt-2 text-sm text-gray-500"
                    >
                      {toolInvocation.toolName}:{" "}
                      {JSON.stringify(toolInvocation.result)}
                    </div>
                  ) : (
                    <div
                      key={toolCallId}
                      className="ml-16 mt-2 text-sm text-gray-500"
                    >
                      Getting information...
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
              <Image
                src="/assets/images/logo.png"
                alt="logo"
                width={50}
                height={50}
              />
              <p className="mt-2 font-sans text-3xl font-semibold text-pink-500/80">
                Hi, {user.name}
              </p>
              <p className="font-sans text-3xl font-semibold text-black/80">
                What's the weather like today?
              </p>
              <p className="mt-2 text-sm text-pink-400">
                I can provide real-time weather information for any location.{" "}
                <br />
                Ask me about the weather in your city or anywhere in the world!
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
              handleSubmit();
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

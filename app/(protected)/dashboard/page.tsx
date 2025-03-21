import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { Code, ImageIcon, Music, ArrowRight, Images, Bot } from "lucide-react";
import Link from "next/link";

const tools = [
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
  },
  {
    label: "Restore Image",
    icon: Images,
    color: "text-red-700",
    bgColor: "bg-red-700/10",
    href: "/restore-images",
  },
  // {
  // 	label: 'Video Generation',
  // 	icon: VideoIcon,
  // 	color: 'text-orange-700',
  // 	bgColor: 'bg-orange-700/10',
  // 	href: '/video',
  // },
  {
    label: "AI Assistant",
    icon: Bot,
    href: "/conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  // {
  // 	label: 'Code Generation',
  // 	icon: Code,
  // 	color: 'text-green-700',
  // 	bgColor: 'bg-green-700/10',
  // 	href: '/code',
  // },
];

export default function DashboardPage() {
  return (
    <>
      <div className="text-center">
        <h1 className="mb-5 text-2xl font-bold md:mb-4 md:text-4xl">
          Explore the power of AI
        </h1>
        <p className="text-sm font-light leading-3 text-gray-500 md:text-lg">
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>
      <div className="mx-auto my-9 space-y-4 px-4 md:my-8 md:px-20 lg:px-32">
        {tools.map((tool, index) => (
          <Card
            key={index}
            className="flex justify-between border-black/5 transition hover:shadow-md"
          >
            <Link
              href={tool.href}
              className="flex w-full items-center justify-between p-4"
            >
              <div className={cn("flex items-center justify-center")}>
                <span className={cn("mr-1 rounded-lg p-2", tool.bgColor)}>
                  {<tool.icon className={cn("h-8 w-8", tool.color)} />}
                </span>
                <span className="ml-3 font-semibold">{tool.label}</span>
              </div>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Card>
        ))}
      </div>
    </>
  );
}

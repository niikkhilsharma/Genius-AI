"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Montserrat } from "next/font/google";
import { Progress } from "@/components/ui/progress";

import {
  ImageIcon,
  LayoutDashboard,
  Music,
  Settings,
  Images,
  Bot,
} from "lucide-react";
import { BiSolidZap } from "react-icons/bi";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { profile } from "@prisma/client";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    href: "/image",
  },
  // {
  // 	label: 'Video Generation',
  // 	icon: VideoIcon,
  // 	color: 'text-orange-700',
  // 	href: '/video',
  // },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    href: "/music",
  },
  {
    label: "Restore Image",
    icon: Images,
    color: "text-red-700",
    bgColor: "bg-red-700/10",
    href: "/restore-images",
  },
  {
    label: "AI Assistant",
    icon: Bot,
    href: "/conversation",
    color: "text-violet-500",
  },
  // {
  // 	label: 'Code Generation',
  // 	icon: Code,
  // 	color: 'text-green-700',
  // 	href: '/code',
  // },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const Sidebar = ({ profile }: { profile: profile | null }) => {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col">
      <div>
        <Link href="/dashboard" className="flex items-center justify-start p-6">
          <Image
            src="https://avatars.githubusercontent.com/u/131470832?s=100&v=4"
            alt="avatar"
            width={400}
            height={400}
            className="mr-4 h-10 w-10"
          />
          <h1
            className={cn(
              "text-2xl font-bold text-white",
              montserrat.className,
            )}
          >
            Genius AI
          </h1>
        </Link>
        <div className="mt-8 space-y-1 px-3">
          {routes.map((route, index) => (
            <Button
              asChild
              variant={"ghost"}
              className={cn(
                "flex h-11 w-full justify-start rounded-lg px-3 text-sm font-medium hover:bg-white/10 hover:text-white",
                pathname === route.href
                  ? "bg-white/10 text-white"
                  : "text-zinc-400",
              )}
              key={index}
            >
              <Link href={route.href} className="w-full text-start">
                {<route.icon className={cn(`mr-3 h-5 w-5`, route.color)} />}
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
      {!profile?.isPro && (
        <div className="m-4 mt-auto flex flex-col gap-4 rounded-xl bg-gray-700 p-6 text-white">
          <p className="text-center">
            {profile?.apiCallCount} / 5 Free Generations
          </p>
          {/* <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div className="h-3 bg-blue-600" style={{}}></div>
          </div> */}
          <Progress
            className="h-3 text-blue-700"
            value={(profile?.apiCallCount! / 5) * 100}
          />
          <Button
            variant={"premium"}
            className="flex items-center justify-center gap-2"
          >
            Upgrade <BiSolidZap size={18} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

import React from "react";

import { buttonVariants } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import Sidebar from "./sidebar";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import prisma from "@/lib/database/dbConnect";

const MobileSidebar = async () => {
  const session = await getServerSession(authOptions);
  const userProfile = await prisma.profile.findUnique({
    where: { email: session?.user.profile.id },
  });

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <div className={buttonVariants({ variant: "ghost", size: "icon" })}>
            <Menu />
          </div>
        </SheetTrigger>
        <SheetContent side={"left"} className="border-none bg-gray-900 p-0">
          <Sidebar profile={userProfile} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;

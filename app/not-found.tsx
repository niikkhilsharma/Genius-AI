import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import prisma from "@/lib/database/dbConnect";

export default async function NotFound() {
  const session = await getServerSession(authOptions);
  const userProfile = await prisma.profile.findUnique({
    where: { id: session?.user.profile.id },
  });
  return (
    <>
      <div className="h-full">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="hidden bg-gray-900 md:fixed md:inset-y-0 md:block md:w-72">
          <Sidebar profile={userProfile} />
        </div>
        <main className="md:pl-72">
          <Navbar />
          <div className="flex w-full items-center justify-center font-bold">
            This page is not available
          </div>
        </main>
      </div>
    </>
  );
}

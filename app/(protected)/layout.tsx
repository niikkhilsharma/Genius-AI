import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Toaster } from "react-hot-toast";

import { Providers } from "@/lib/next-auth-provider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="hidden bg-gray-900 md:fixed md:inset-y-0 md:block md:w-72">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <Navbar />
        <Providers>{children}</Providers>
      </main>
    </div>
  );
}

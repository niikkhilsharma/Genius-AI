import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

import { siteConfig } from "@/config";

const inter = Inter({ subsets: ["latin"] });

import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = siteConfig;

// export const metadata: Metadata = {
//   title: "Genius AI",
//   description:
//     "Create, edit and share your own image, video, and audio using the best AI models",
//   metadataBase: new URL("https://ai.nikkhil.tech/"),
//   openGraph: {
//     title: "Genius AI",
//     description:
//       "Create, edit and share your own images, video, and audio AI models",
//     type: "website",
//     locale: "en_US",
//     siteName: "Genius AI",
//   },
//   twitter: {
//     card: "summary",
//     site: "@nikhil_dmg",
//   },
// };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}

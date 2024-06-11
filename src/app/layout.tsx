import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Topbar from "./_components/topbar";
import { PodcastProvider } from "./podcastProvider";

const inter = Inter({ subsets: ["latin"], preload: false });

export const metadata: Metadata = {
  title: "Podcaster",
  description: "Best apple podcasts online"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PodcastProvider>
          <Topbar />
          {children}
        </PodcastProvider>
      </body>
    </html>
  );
}

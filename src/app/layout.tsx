import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/(Providers)/Providers";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tuber",
  description: "A website for sharing videos",
};

export default function RootLayout({
  children,
  uploadModal,
}: Readonly<{
  children: React.ReactNode;
  uploadModal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("", inter.className)}>
        <Providers>
          <Navbar />
          <div className="mt-28">{children}</div>
          {uploadModal}
        </Providers>
      </body>
    </html>
  );
}

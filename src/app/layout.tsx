import Providers from "@/components/provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rick and Morty",
  description:
    "Rick and Morty is an American adult animated science fiction sitcom created by Justin Roiland and Dan Harmon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "antialiased min-h-screen bg-background"
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

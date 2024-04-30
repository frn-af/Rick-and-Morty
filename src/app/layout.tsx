import Navbar from "@/components/navbar";
import Providers from "@/components/provider";
import { ThemeProvider } from "@/components/themeprovider";
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "antialiased min-h-screen bg-background"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

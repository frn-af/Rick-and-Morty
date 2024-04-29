import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Rick and Morty",
  description: "Rick and Morty is an American adult animated science fiction sitcom created by Justin Roiland and Dan Harmon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={
        inter.variable}>
        {children}
      </body>
    </html>
  );
}

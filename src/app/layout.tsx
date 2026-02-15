import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ReaderProvider } from "@/context/ReaderContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "night reader",
  description: "comfortable nighttime pdf reading",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <ReaderProvider>{children}</ReaderProvider>
      </body>
    </html>
  );
}

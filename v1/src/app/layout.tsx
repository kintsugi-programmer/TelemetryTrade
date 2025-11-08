import type { Metadata } from "next";
import localFont from "next/font/local";

import { Rubik_80s_Fade } from "next/font/google"; 
import "./globals.css";
// import Footer from '@/components/Foot'
import DelayedLoader from '@/components/DelayedLoader'
// import Nav from "@/components/Nav";
const satoshi = localFont({
  src: [
    {
      path: "./fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
});
const rubik80s = Rubik_80s_Fade({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rubik-80s",
});

export const metadata: Metadata = {
  title: "TelemetryTrade",
  description: "TelemetryTrade is a modern, high-performance web trading interface designed to show real-time price movement of crypto tokens. Inspired by the Axiom Trade Token Discovery Table and built to meet the demanding standards of low-latency traders, the project is architected with strict performance, scalability, and accessibility principles in mind.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head><meta name="apple-mobile-web-app-title" content="TelemetryTrade" /></head>
      <body className={`${satoshi.variable} ${rubik80s.variable} bg-[#222222] text-white antialiased`}>
        <div className="sticky top-0 z-50 bg-white shadow-sm">
    {/* <Nav /> */}
  </div>

        <DelayedLoader>{children}</DelayedLoader>
        {/* <Footer/> */}
      </body>
    </html>
  );
}

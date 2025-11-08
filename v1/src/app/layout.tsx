import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Rubik_80s_Fade } from "next/font/google"; 
import "./globals.css";
// import Footer from '@/components/Foot'
import DelayedLoader from '@/components/DelayedLoader'
import Nav from "@/components/Nav";
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
    <ClerkProvider>
    <html lang="en">
      <head><meta name="apple-mobile-web-app-title" content="TelemetryTrade" /></head>
      <body className={`${satoshi.variable} ${rubik80s.variable} bg-[#222222] text-white antialiased`}>
        <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
        <div className="sticky top-0 z-50 bg-white shadow-sm">
    <Nav />
  </div>

        <DelayedLoader>{children}</DelayedLoader>
        {/* <Footer/> */}
      </body>
    </html>
    </ClerkProvider>
  );
}

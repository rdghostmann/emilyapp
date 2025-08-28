import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EmilyAgros | Sign In",
  description: "Sign in to EmilyAgros - Your Gateway to the Future of Agriculture and Marketplace",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
            <>
              {children}
            </>
           
  );
}
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import SessionWrapper from "@/components/SessionWrapper/SessionWrapper";
import PWAInstallPrompt from "@/components/PWAInstallPrompt/PWAInstallPrompt";
import MobileTabNavigation from "@/components/MobileTabNavigation";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EmilyAgros",
  description: "Your Gateway to the Future of Agriculture and Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  if (typeof window !== "undefined") {
    // Suppress console errors related to MetaMask
    const originalConsoleError = console.error
    console.error = (...args) => {
      if (args[0]?.includes?.("MetaMask")) {
        return
      }
      originalConsoleError(...args)
    }
  }
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4CAF50" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} cz-shortcut-listen="true">
        <SessionWrapper>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {/* <TopNavigation /> */}
            <main className="max-w-6xl mx-auto pb-16 lg:pb-0">
              <PWAInstallPrompt />
              {children}
            </main>
            {/* <MobileTabNavigation /> */}
            <Toaster />
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}

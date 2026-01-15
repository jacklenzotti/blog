import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ScrollIndicator from "./components/ScrollIndicator";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jack Lenzotti",
  description: "Personal site of Jack Lenzotti",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="fixed top-0 left-0 right-0 z-50">
          <nav className="flex justify-center gap-16 p-6">
            <a
              href="#about"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-all hover:scale-110"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-all hover:scale-110"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-all hover:scale-110"
            >
              Contact
            </a>
          </nav>
        </header>
        {children}
        <ScrollIndicator />
      </body>
    </html>
  );
}

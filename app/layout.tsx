import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ThemeScript from "./components/ThemeScript";
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
  metadataBase: new URL("https://jacklenzotti.github.io/blog"),
  title: {
    default: "Jack Lenzotti",
    template: "%s | Jack Lenzotti",
  },
  description:
    "Software engineer based in Chicago. Developer Experience, game dev, and open source.",
  authors: [{ name: "Jack Lenzotti" }],
  keywords: [
    "Jack Lenzotti",
    "software engineer",
    "developer experience",
    "Chicago",
  ],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    siteName: "Jack Lenzotti",
    title: "Jack Lenzotti",
    description:
      "Software engineer based in Chicago. Developer Experience, game dev, and open source.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jack Lenzotti",
    description:
      "Software engineer based in Chicago. Developer Experience, game dev, and open source.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

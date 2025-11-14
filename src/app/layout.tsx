import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Hossam Saber - Competitive Programmer & Software Developer",
  description: "ACPC Finalist, ICPC Problem Setter & Software Developer passionate about algorithms, clean code, and building impactful software solutions. Expert in C++, Java, Data Structures & Algorithms.",
  keywords: ["Hossam Saber", "Competitive Programmer", "Software Developer", "ACPC Finalist", "ICPC", "Codeforces Expert", "AtCoder Cyan", "C++", "Java", "Algorithms"],
  authors: [{ name: "Hossam Saber" }],
  creator: "Hossam Saber",
  openGraph: {
    title: "Hossam Saber - Competitive Programmer & Software Developer",
    description: "ACPC Finalist, ICPC Problem Setter & Software Developer passionate about algorithms and clean code",
    url: "https://hossamsaberr.github.io",
    siteName: "Hossam Saber Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hossam Saber - Competitive Programmer & Software Developer",
    description: "ACPC Finalist, ICPC Problem Setter & Software Developer passionate about algorithms and clean code",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
        {children}
      </body>
    </html>
  );
}

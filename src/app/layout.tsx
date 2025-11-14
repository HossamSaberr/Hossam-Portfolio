import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hossam Saber - Competitive Programmer & Software Developer",
    template: "%s | Hossam Saber"
  },
  description: "ACPC Finalist, ICPC Problem Setter, and Software Developer. 4000+ algorithmic problems solved, passionate about competitive programming and mentoring.",
  keywords: [
    "Hossam Saber",
    "Competitive Programming",
    "Software Developer",
    "ACPC Finalist",
    "ICPC Problem Setter",
    "Codeforces Expert",
    "AtCoder Cyan",
    "Algorithm",
    "Data Structures",
    "Java",
    "C++",
    "Menoufia University",
    "Programming",
    "Web Development"
  ],
  authors: [{ name: "Hossam Saber" }],
  creator: "Hossam Saber",
  publisher: "Hossam Saber",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://hossamsaberr.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hossam Saber - Competitive Programmer & Software Developer",
    description: "ACPC Finalist, ICPC Problem Setter, and Software Developer. 4000+ algorithmic problems solved, passionate about competitive programming and mentoring.",
    url: "https://hossamsaberr.dev",
    siteName: "Hossam Saber Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hossam Saber - Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hossam Saber - Competitive Programmer & Software Developer",
    description: "ACPC Finalist, ICPC Problem Setter, and Software Developer. 4000+ algorithmic problems solved.",
    images: ["/og-image.png"],
    creator: "@hossamsaberr",
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
  verification: {
    google: "verification-code-here",
    yandex: "verification-code-here",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Preload critical fonts */}
        <link rel="preload" href="/fonts/Geist-Regular.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/GeistMono-Regular.woff2" as="font" type="font/woff2" crossOrigin="" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Hossam Saber",
              "jobTitle": "Competitive Programmer & Software Developer",
              "description": "ACPC Finalist, ICPC Problem Setter, and Software Developer passionate about algorithmic problem solving and mentoring.",
              "url": "https://hossamsaberr.dev",
              "sameAs": [
                "https://github.com/HossamSaberr",
                "https://codeforces.com/profile/Homz",
                "https://icpc.global/ICPCID/WCMZYVG0D2Q9",
                "https://linkedin.com/in/hossamsaberr"
              ],
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Menoufia University",
                "sameAs": "https://menofia.edu.eg"
              },
              "knowsAbout": [
                "Competitive Programming",
                "Software Development",
                "Data Structures",
                "Algorithms",
                "Java",
                "C++",
                "Web Development"
              ],
              "award": [
                {
                  "@type": "Award",
                  "name": "ACPC Finalist",
                  "awardYear": "2025"
                },
                {
                  "@type": "Award",
                  "name": "Codeforces Expert",
                  "description": "Achieved Expert rating with 1600+ rating points"
                },
                {
                  "@type": "Award",
                  "name": "AtCoder Cyan",
                  "description": "Cyan rating with 1200+ rating points"
                }
              ]
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Visits Counter",
  description: "A simple visits counter with a customizable badge",
  keywords: ["visits counter", "customizable", "SVG", "badge", "Next.js", "MongoDB", "Chhatresh Khatri"],
  authors: [
    {
      name: "Chhatresh Khatri",
      url: "https://chhatreshkhatri.com/",
    },
  ],
  creator: "Chhatresh Khatri",
  openGraph: {
    title: "Visits Counter",
    description: "A simple visits counter with a customizable badge",
    url: "https://visits-counter.chhatreshkhatri.com/",
    siteName: "Visits Counter",
    images: [
      {
        url: "https://cdn.chhatreshkhatri.com/icons/visits-counter.png",
        width: 1200,
        height: 630,
        alt: "Visits Counter Badge Example",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visits Counter",
    description: "A simple visits counter with a customizable badge",
    images: ["https://cdn.chhatreshkhatri.com/icons/visits-counter.png"],
  },
  appleWebApp: {
    capable: true,
    title: "Visits Counter",
    statusBarStyle: "black-translucent",
  },
  alternates: {
    canonical: "https://visits.chhatreshkhatri.com/",
    types: {
      "application/rss+xml": "https://visits.chhatreshkhatri.com/feed.xml",
    },
  },
  icons: {
    icon: "https://cdn.chhatreshkhatri.com/icons/favicon.ico",
    apple: "https://cdn.chhatreshkhatri.com/icons/apple-icon.png",
    other: [
      {
        rel: "icon",
        url: "https://cdn.chhatreshkhatri.com/icons/icon.svg",
        sizes: "any",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}

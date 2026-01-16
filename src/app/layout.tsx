import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/json-ld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const basePath = process.env.NODE_ENV === "production" ? "/days-until" : "";

export const metadata: Metadata = {
  metadataBase: new URL("https://tuannh982.github.io/days-until/"),
  title: {
    default: "Days Until",
    template: "%s | Days Until",
  },
  description:
    "Track how many days are left until your vacation, birthday, or any important date with this beautiful countdown timer.",
  keywords: [
    "countdown",
    "days until",
    "timer",
    "event tracker",
    "date calculator",
    "time remaining",
  ],
  authors: [{ name: "tuannh982", url: "https://github.com/tuannh982" }],
  creator: "tuannh982",
  openGraph: {
    title: "Days Until",
    description:
      "Track how many days are left until your vacation, birthday, or any important date with this beautiful countdown timer.",
    url: "https://tuannh982.github.io/days-until/",
    siteName: "Days Until",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${basePath}/icon.png`,
        width: 512,
        height: 512,
        alt: "Days Until App Icon",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Days Until",
    description:
      "Track how many days are left until your vacation, birthday, or any important date.",
    images: [`${basePath}/icon.png`],
    creator: "@tuannh982",
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
        <JsonLd />
        {children}
      </body>
    </html>
  );
}

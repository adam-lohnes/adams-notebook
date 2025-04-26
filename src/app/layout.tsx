import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { GoogleAdsense } from "@/components/analytics/GoogleAdsense";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adam's Notebook",
  description: "Personal blog about software projects, AI thoughts, and life experiences",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon-192x192.png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon.svg',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        {process.env.NODE_ENV === 'production' && <GoogleAnalytics />}
        {process.env.NODE_ENV === 'production' && <GoogleAdsense />}
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

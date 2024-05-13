import type { Metadata } from "next";
import clsx from "clsx";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import Nav from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  title: {
    default: "Night Watch",
    template: "%s - Watch movies and Seasons",
  },
  description: "Watch movies and Seasons with Night Watch for free!",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main>
            <Nav />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
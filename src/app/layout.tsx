import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import {ReactNode} from "react";
import "./globals.css";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Conference App",
  description: "Conference App for upcoming events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster richColors={true} position="top-right" />
        <main>
        {children}
        </main>
      </body>
    </html>
  );
}

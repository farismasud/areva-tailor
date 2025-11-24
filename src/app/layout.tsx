// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Import komponen baru kita
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Areva Tailor - Custom Clothing", // Ganti titlenya bro
  description: "Jasa pembuatan jas, batik, kemeja, dan celana custom.",
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
        {/* Tambahkan div wrapper untuk layout sticky footer */}
        <div className="flex min-h-screen flex-col">
          <Navbar />
          {/* Buat konten utama bisa tumbuh mengisi ruang */}
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
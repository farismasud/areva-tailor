import type { Metadata } from "next";
// Ganti font sesuai selera, Inter bawaan nextjs udah bagus buat shadcn
import { Inter } from "next/font/google"; 
import "./globals.css";

// Import Component yang baru dibuat
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Areva Tailor | Professional Convection",
  description: "Jasa jahit dan konveksi terbaik.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground`}>
        
        {/* Navbar Component */}
        <Navbar />

        {/* Konten Utama */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer Component */}
        <Footer />
        
      </body>
    </html>
  );
}
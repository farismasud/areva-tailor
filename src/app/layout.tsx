import type { Metadata } from "next";
// Import Font Google
import { Cinzel, Lato } from "next/font/google"; 
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Setup Font Judul (Cinzel)
const cinzel = Cinzel({ 
  subsets: ["latin"], 
  variable: "--font-cinzel",
  weight: ["400", "700"] 
});

// Setup Font Isi (Lato)
const lato = Lato({ 
  subsets: ["latin"], 
  variable: "--font-lato",
  weight: ["400", "700"] 
});

export const metadata: Metadata = {
  title: "AREVA INTERNATIONAL TAILOR",
  description: "Exclusive Bespoke Tailoring.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-[#050505]">
      {/* Pasang variable font disini */}
      <body className={`${cinzel.variable} ${lato.variable} font-sans min-h-screen flex flex-col bg-[#050505] text-foreground antialiased selection:bg-gold/30 selection:text-white`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
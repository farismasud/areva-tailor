import type { Metadata } from "next";
import { Cinzel, Lato } from "next/font/google"; 
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const cinzel = Cinzel({ 
  subsets: ["latin"], 
  variable: "--font-cinzel",
  weight: ["400", "600", "700"],
  display: "swap",
});

const lato = Lato({ 
  subsets: ["latin"], 
  variable: "--font-lato",
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AREVA INTERNATIONAL TAILOR | Bespoke Craftsmanship Jakarta",
  description: "Exquisite hand-stitched bespoke suits, tuxedos, and silk batiks crafted for dignitaries, leaders, and executives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('areva-theme');
                if (t === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                } else {
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.remove('dark');
                }
              } catch(e) {
                document.documentElement.classList.add('light');
              }
            `,
          }}
        />
      </head>
      <body className={`${cinzel.variable} ${lato.variable} font-sans min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-gold/30 selection:text-foreground`}>
        <ThemeProvider>
          <SmoothScrollProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

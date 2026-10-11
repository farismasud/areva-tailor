import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
      <body className="font-sans min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-gold/30 selection:text-foreground">
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

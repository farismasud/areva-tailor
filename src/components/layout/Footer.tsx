import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xl font-bold">ArevaTailor</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Spesialis konveksi dan tailor profesional. Kami menghadirkan kualitas jahitan premium untuk seragam kantor, jas formal, dan kebutuhan tekstil Anda.
            </p>
          </div>

          {/* Navigasi */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground/80">Menu</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition">Home</Link></li>
              <li><Link href="/products" className="hover:text-primary transition">Katalog Produk</Link></li>
              <li><Link href="/about" className="hover:text-primary transition">Tentang Kami</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition">Hubungi Kami</Link></li>
            </ul>
          </div>

          {/* Kontak */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground/80">Kontak</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Jakarta Selatan, Indonesia</li>
              <li>+62 812-3456-7890</li>
              <li>info@arevatailor.com</li>
            </ul>
          </div>
          
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t pt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Areva Tailor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
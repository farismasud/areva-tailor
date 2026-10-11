import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="w-full bg-card/50 border-t border-border pt-20 pb-12 text-muted-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="inline-block" aria-label="Areva Tailor Home">
               <div className="relative h-12 w-48 transition-opacity hover:opacity-85">
                 <Image 
                   src="/logo-areva.png" 
                   alt="Areva International Tailor" 
                   fill
                   className="object-contain object-left" 
                 />
               </div>
            </Link>

            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed font-normal">
              Fine bespoke tailoring crafted with traditional hand-stitched floating horsehair canvas and premium European textiles. Serving leaders and executives since 1988.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-foreground">Menu</h4>
            <ul className="space-y-3 text-xs font-mono tracking-wider text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">HOME</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">COLLECTION</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">ABOUT</Link></li>
              <li><Link href="/lab-3d" className="hover:text-primary transition-colors">3D LAB</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">APPOINTMENT</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-foreground">Atelier</h4>
            <ul className="space-y-3 text-xs text-muted-foreground font-normal">
              <li className="leading-relaxed">Jl. Wijaya II No. 123<br/>Kebayoran Baru, Jakarta Selatan</li>
              <li className="text-foreground font-mono font-medium">+62 812-3456-7890</li>
              <li className="font-mono">atelier@arevatailor.com</li>
            </ul>
          </div>
          
        </div>

        {/* Copyright */}
        <div className="border-t border-border/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-mono text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} AREVA INTERNATIONAL TAILOR. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 tracking-widest uppercase">
            <span>BESPOKE</span>
            <span>•</span>
            <span>SARTORIAL</span>
            <span>•</span>
            <span>JAKARTA</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

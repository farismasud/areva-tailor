import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] border-t border-[#262626] pt-20 pb-12 text-[#999999]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
               <div className="relative h-12 w-48 transition-opacity hover:opacity-85">
                 <Image 
                   src="/logo-areva.png" 
                   alt="Areva International Tailor" 
                   fill
                   className="object-contain object-left" 
                 />
               </div>
            </Link>

            <p className="text-sm text-[#999999] max-w-sm leading-relaxed font-light">
              Architectural bespoke tailoring and artisanal savoir-faire. Engineered with hand-canvassed construction and prestigious European textiles.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-white">Maison</h4>
            <ul className="space-y-3 text-xs font-mono tracking-wider text-[#999999]">
              <li><Link href="/" className="hover:text-white transition">MAISON</Link></li>
              <li><Link href="/products" className="hover:text-white transition">COLLECTION</Link></li>
              <li><Link href="/about" className="hover:text-white transition">HERITAGE</Link></li>
              <li><Link href="/lab-3d" className="hover:text-white transition">3D LAB</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">APPOINTMENT</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-white">Atelier</h4>
            <ul className="space-y-3 text-xs text-[#999999] font-light">
              <li>Jl. Jahit Presisi No. 123<br/>Kebayoran Baru, Jakarta Selatan</li>
              <li className="text-white font-mono">+62 812-3456-7890</li>
              <li className="font-mono">atelier@arevatailor.com</li>
            </ul>
          </div>
          
        </div>

        {/* Copyright */}
        <div className="border-t border-[#1f1f1f] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-mono text-[#666666]">
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

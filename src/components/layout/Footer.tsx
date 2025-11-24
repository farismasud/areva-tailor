import Link from "next/link"
import Image from "next/image" // <--- Jangan lupa import ini
import { Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-6">
            
            {/* GANTI TEKS JADI LOGO IMAGE DISINI */}
            <Link href="/" className="inline-block">
               <div className="relative h-16 w-64"> {/* Ukuran agak gedean dari navbar biar gagah */}
                 <Image 
                   src="/logo-areva.png" 
                   alt="Areva International Tailor" 
                   fill
                   className="object-contain object-left" 
                 />
               </div>
            </Link>

            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed font-light">
              Menghadirkan seni menjahit kelas dunia ke dalam lemari pakaian Anda. Presisi, elegan, dan tak lekang oleh waktu.
            </p>
            
            <div className="flex gap-4 pt-2">
              <Link href="#" className="p-2 rounded-full bg-white/5 hover:bg-gold hover:text-black transition-all duration-300 text-neutral-400">
                <Instagram size={18}/>
              </Link>
              <Link href="#" className="p-2 rounded-full bg-white/5 hover:bg-gold hover:text-black transition-all duration-300 text-neutral-400">
                <Facebook size={18}/>
              </Link>
            </div>
          </div>

          {/* Navigasi */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-gold">Explore</h4>
            <ul className="space-y-4 text-sm text-neutral-400 font-light">
              <li><Link href="/" className="hover:text-white transition tracking-wide">MAISON</Link></li>
              <li><Link href="/products" className="hover:text-white transition tracking-wide">COLLECTION</Link></li>
              <li><Link href="/about" className="hover:text-white transition tracking-wide">HERITAGE</Link></li>
              <li><Link href="/contact" className="hover:text-white transition tracking-wide">APPOINTMENT</Link></li>
            </ul>
          </div>

          {/* Kontak */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-gold">Atelier</h4>
            <ul className="space-y-4 text-sm text-neutral-400 font-light">
              <li>Jl. Jahit Presisi No. 123<br/>Jakarta Selatan, Indonesia</li>
              <li className="text-white">+62 812-3456-7890</li>
              <li>info@arevatailor.com</li>
            </ul>
          </div>
          
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-600 font-light tracking-wide">
            &copy; {new Date().getFullYear()} AREVA INTERNATIONAL TAILOR. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-neutral-600 font-light">
            <Link href="#" className="hover:text-neutral-400">Privacy Policy</Link>
            <Link href="#" className="hover:text-neutral-400">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
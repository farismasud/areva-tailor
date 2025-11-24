import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button" // Pake button shadcn
import { ShoppingBag } from "lucide-react"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-black/80 transition-all duration-300">
      <div className="container mx-auto px-4 md:px-6 flex h-20 items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-10 w-40 md:h-12 md:w-48 transition-transform duration-500 group-hover:scale-105"> 
            <Image 
              src="/logo-areva.png"
              alt="Areva International Tailor" 
              fill
              className="object-contain object-left" 
              priority 
            />
          </div>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest">
          {/* Menu items tetep sama, cuma gua rapihin dikit hover effectnya */}
          {['MAISON', 'COLLECTION', 'HERITAGE', 'APPOINTMENT'].map((item, idx) => {
             const hrefs = ['/', '/products', '/about', '/contact'];
             return (
               <Link 
                 key={item} 
                 href={hrefs[idx]} 
                 className="relative text-neutral-400 hover:text-white transition-colors font-serif text-xs uppercase tracking-[0.2em] group"
               >
                 {item}
                 {/* Garis emas muncul pas hover */}
                 <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
               </Link>
             )
          })}
        </nav>

        {/* TOMBOL KANAN (Icon Only Style) */}
        <div className="flex items-center gap-4">
          <Link href="/products">
             {/* Varian: "Golden Coin" 
                - rounded-full: Biar bunder
                - w-10 h-10: Ukuran pas
                - bg-gold: Warna emas
                - text-black: Iconnya hitam biar kontras
             */}
             <Button 
               size="icon" 
               className="rounded-full w-10 h-10 bg-gold text-black hover:bg-white hover:text-black transition-all duration-500 shadow-[0_0_15px_rgba(212,155,53,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:scale-110"
             >
                <ShoppingBag size={18} strokeWidth={2.5} />
             </Button>
          </Link>
        </div>
        
      </div>
    </header>
  )
}
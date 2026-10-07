"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Menu, X } from "lucide-react"

const navItems = [
  { label: "MAISON", href: "/" },
  { label: "COLLECTION", href: "/products" },
  { label: "HERITAGE", href: "/about" },
  { label: "3D LAB", href: "/lab-3d" },
  { label: "APPOINTMENT", href: "/contact" },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 bg-[#050505]/75 backdrop-blur-2xl border-b border-white/[0.07]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex h-20 items-center justify-between">
        
        {/* LOGO: Monolithic Atelier Wordmark */}
        <Link href="/" className="flex items-center gap-2 group py-2">
          <div className="relative h-10 w-40 md:h-11 md:w-44 transition-opacity duration-300 group-hover:opacity-80"> 
            <Image 
              src="/logo-areva.png"
              alt="Areva International Tailor" 
              fill
              className="object-contain object-left" 
              priority 
            />
          </div>
        </Link>

        {/* FLOATING SARTORIAL DOCK (Central Navigation Bar) */}
        <nav className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.label} 
                href={item.href} 
                className={`relative px-4 py-2 rounded-full text-[11px] font-serif tracking-[0.22em] uppercase transition-all duration-300 select-none ${
                  isActive
                    ? "text-black bg-white font-semibold shadow-[0_2px_10px_rgba(255,255,255,0.2)]"
                    : "text-[#888888] hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* RIGHT ACTION: Contour Pill Action */}
        <div className="flex items-center gap-3">
          <Link href="/contact" className="hidden sm:inline-block">
            <button 
              type="button"
              className="group relative inline-flex items-center justify-center gap-1.5 px-5 h-9 rounded-full text-[11px] font-serif font-bold uppercase tracking-[0.2em] text-white bg-white/[0.04] hover:bg-white border border-white/20 hover:border-white hover:text-black transition-all duration-300 cursor-pointer overflow-hidden shadow-none"
            >
              <span>RESERVE</span>
              <ArrowUpRight size={13} className="stroke-[2] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Link>
          
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white rounded-full border border-white/10 bg-white/[0.03] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
      </div>

      {/* MOBILE FLOATING MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#080808]/98 backdrop-blur-3xl px-6 py-6 space-y-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.label} 
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-xs font-serif tracking-[0.25em] uppercase py-2.5 px-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-white/10 text-white font-semibold border-l-2 border-gold pl-4"
                    : "text-[#999999] hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <div className="pt-3">
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full bg-gold text-black hover:bg-gold-light rounded-full text-xs font-serif font-bold tracking-[0.2em] uppercase h-11 border-none shadow-[0_0_20px_rgba(212,155,53,0.3)] cursor-pointer">
                RESERVE APPOINTMENT
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

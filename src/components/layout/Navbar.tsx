"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, ArrowUpRight } from "lucide-react"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#262626] bg-[#050505]/90 backdrop-blur-xl transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex h-20 items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-10 w-40 md:h-11 md:w-44 transition-opacity duration-300 hover:opacity-85"> 
            <Image 
              src="/logo-areva.png"
              alt="Areva International Tailor" 
              fill
              className="object-contain object-left" 
              priority 
            />
          </div>
        </Link>

        {/* MENU DESKTOP: Bugatti & Superhuman Precision */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          {[
            { label: 'MAISON', href: '/' },
            { label: 'COLLECTION', href: '/products' },
            { label: 'HERITAGE', href: '/about' },
            { label: '3D LAB', href: '/lab-3d' },
            { label: 'APPOINTMENT', href: '/contact' }
          ].map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              className="text-[#999999] hover:text-white transition-colors font-mono text-[11px] uppercase tracking-[0.25em] py-2 relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* RIGHT ACTION: Luxury Pill Button */}
        <div className="flex items-center gap-4">
          <Link href="/contact" className="hidden sm:inline-block">
            <Button 
              size="sm" 
              className="rounded-full bg-gold/10 hover:bg-gold text-gold hover:text-black border border-gold/40 hover:border-gold text-[11px] font-serif font-bold uppercase tracking-[0.2em] px-6 h-9 transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(212,155,53,0.15)] hover:shadow-[0_0_20px_rgba(212,155,53,0.35)]"
            >
              <span>RESERVE</span>
              <ArrowUpRight size={13} className="ml-1.5 stroke-[2]" />
            </Button>
          </Link>
          
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white rounded-lg border border-[#262626] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
      </div>

      {/* MOBILE MENU ACCORDION */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#262626] bg-[#050505]/98 px-6 py-6 space-y-4">
          {[
            { label: 'MAISON', href: '/' },
            { label: 'COLLECTION', href: '/products' },
            { label: 'HERITAGE', href: '/about' },
            { label: '3D LAB', href: '/lab-3d' },
            { label: 'APPOINTMENT', href: '/contact' }
          ].map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-mono tracking-[0.25em] text-[#cccccc] hover:text-white py-2 border-b border-[#1f1f1f]"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-gold text-black hover:bg-gold-light rounded-full text-xs font-serif font-bold tracking-[0.2em] uppercase h-11 border-none shadow-[0_0_20px_rgba(212,155,53,0.3)]">
                RESERVE APPOINTMENT
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
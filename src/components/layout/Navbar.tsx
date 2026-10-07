"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-neutral-950/80 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto px-4 md:px-8 flex h-20 items-center justify-between">
        
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
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
          {[
            { label: 'MAISON', href: '/' },
            { label: 'COLLECTION', href: '/products' },
            { label: 'HERITAGE', href: '/about' },
            { label: 'APPOINTMENT', href: '/contact' }
          ].map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              className="relative text-neutral-400 hover:text-gold transition-colors font-serif text-xs uppercase tracking-[0.25em] py-1 group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* TOMBOL KANAN & MOBILE TOGGLE */}
        <div className="flex items-center gap-3">
          <Link href="/products" className="hidden sm:inline-block">
            <Button 
              size="sm" 
              className="rounded-full bg-gold/15 text-gold hover:bg-gold hover:text-black border border-gold/40 text-xs font-serif tracking-widest px-5 h-9 transition-all duration-300 cursor-pointer"
            >
              CATALOG
            </Button>
          </Link>
          
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-300 hover:text-white rounded-lg border border-white/10 hover:border-gold/40 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
      </div>

      {/* MOBILE MENU ACCORDION */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-neutral-950/95 backdrop-blur-xl px-6 py-6 space-y-4">
          {[
            { label: 'MAISON', href: '/' },
            { label: 'COLLECTION', href: '/products' },
            { label: 'HERITAGE', href: '/about' },
            { label: 'APPOINTMENT', href: '/contact' }
          ].map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-serif tracking-[0.2em] text-neutral-300 hover:text-gold py-2 border-b border-white/5"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-gold text-black hover:bg-gold-light rounded-full text-xs font-serif tracking-widest h-11">
                RESERVE APPOINTMENT
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
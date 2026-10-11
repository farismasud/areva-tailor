"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "@/components/providers/ThemeProvider"
import { Magnet } from "@/components/ui/react-bits/Magnet"

const navItems = [
  { label: "HOME", href: "/" },
  { label: "COLLECTION", href: "/products" },
  { label: "ABOUT", href: "/about" },
  { label: "3D LAB", href: "/lab-3d" },
  { label: "APPOINTMENT", href: "/contact" },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full transition-colors duration-300 bg-background/85 backdrop-blur-2xl border-b border-border shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex h-20 items-center justify-between">
        
        {/* LOGO: Monolithic Atelier Wordmark */}
        <Link href="/" className="flex items-center gap-2 group py-2" aria-label="Areva Tailor Home">
          <div className="relative h-10 w-40 md:h-11 md:w-44 transition-opacity duration-300 group-hover:opacity-85"> 
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
        <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary/60 border border-border/80 shadow-[inset_0_1px_1px_rgba(0,0,0,0.02)]">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.label} 
                href={item.href} 
                className={`relative px-4 py-2 rounded-full text-[11px] font-serif tracking-[0.22em] uppercase transition-all duration-300 select-none ${
                  isActive
                    ? "text-primary-foreground bg-primary font-semibold shadow-[0_2px_10px_rgba(180,133,32,0.25)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/80"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* RIGHT ACTIONS: Theme Toggle & Reserve Pill Button */}
        <div className="flex items-center gap-3">
          
          {/* THEME TOGGLE (Light / Dark) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-border bg-secondary/50 text-foreground hover:text-primary hover:border-primary/40 transition-all duration-300 cursor-pointer"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun size={17} className="stroke-[1.75] text-gold" />
            ) : (
              <Moon size={17} className="stroke-[1.75] text-primary" />
            )}
          </button>

          {/* RESERVE ACTION WITH MAGNETIC SNAP */}
          <Magnet disabled={false} magnetStrength={0.25} className="hidden sm:inline-block">
            <Link href="/contact">
              <button 
                type="button"
                className="group relative inline-flex items-center justify-center gap-1.5 px-6 h-10 rounded-full text-[11px] font-serif font-bold uppercase tracking-[0.2em] text-primary-foreground bg-primary hover:bg-gold-dark transition-all duration-300 cursor-pointer shadow-[0_2px_12px_rgba(180,133,32,0.2)]"
              >
                <span>RESERVE</span>
                <ArrowUpRight size={13} className="stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Link>
          </Magnet>
          
          {/* MOBILE MENU TOGGLE */}
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground rounded-full border border-border bg-secondary/50 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
      </div>

      {/* MOBILE EXPANDED MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background/98 backdrop-blur-3xl px-6 py-6 space-y-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.label} 
                href={item.href} 
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-xs font-serif tracking-[0.25em] uppercase py-3 px-4 rounded-xl transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-bold border-l-3 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <div className="pt-3">
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full bg-primary text-primary-foreground hover:bg-gold-dark rounded-full text-xs font-serif font-bold tracking-[0.2em] uppercase h-12 border-none shadow-[0_2px_15px_rgba(180,133,32,0.25)] cursor-pointer">
                RESERVE APPOINTMENT
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

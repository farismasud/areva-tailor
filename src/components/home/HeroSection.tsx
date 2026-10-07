"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import { SilkClothCanvas } from "@/components/home/SilkClothCanvas"
import type { Product } from "@/types/database.types"

interface HeroSectionProps {
  featuredProducts: Product[] | null
}

export function HeroSection({ featuredProducts }: HeroSectionProps) {
  const reduce = useReducedMotion()

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white">
      {/* === HERO SECTION: Austere Luxury Architecture === */}
      <section className="relative min-h-[92dvh] flex items-center overflow-hidden border-b border-[#262626]">
        {/* Three.js Interactive Silk Wave Shader */}
        {!reduce && <SilkClothCanvas />}

        {/* Ambient Dark Scrim */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#050505]/95 via-[#050505]/75 to-transparent z-[1]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 py-16 sm:py-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Precision Typography */}
            <motion.div 
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-8 text-left"
            >
              {/* Eyebrow Label */}
              <div className="inline-flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#999999]">
                  Bespoke Atelier • Jakarta
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-[1.04] tracking-tight">
                Anatomy of <br />
                <span className="text-gold italic font-light">Bespoke Precision</span>
              </h1>

              {/* Paragraph */}
              <p className="text-base sm:text-lg text-[#cccccc] font-light leading-relaxed max-w-xl">
                Master craftsmanship engineered to the natural contours of your physique. Sculpted with hand-canvassed construction and prestigious European wools from Scabal and Loro Piana.
              </p>

              {/* Action Buttons: Austere Pills */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/products" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto min-w-[200px] h-13 rounded-full bg-white hover:bg-neutral-200 text-black font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-none border border-white cursor-pointer"
                  >
                    <span>View Collection</span>
                    <ArrowUpRight size={14} className="ml-1 opacity-70" />
                  </Button>
                </Link>

                <Link href="/contact" className="w-full sm:w-auto">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full sm:w-auto min-w-[200px] h-13 rounded-full border-[#3a3a3a] text-white hover:border-white hover:bg-white/5 font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 bg-transparent cursor-pointer"
                  >
                    <span>Reserve Fitting</span>
                  </Button>
                </Link>
              </div>

              {/* Metric Strips: Hairline Grid */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#262626] max-w-lg">
                <div>
                  <div className="text-2xl sm:text-3xl font-mono text-white tracking-tight">40+</div>
                  <div className="text-[10px] text-[#999999] uppercase tracking-[0.25em] font-mono mt-1">Anatomy Points</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-mono text-white tracking-tight">100%</div>
                  <div className="text-[10px] text-[#999999] uppercase tracking-[0.25em] font-mono mt-1">Horsehair Canvas</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-mono text-white tracking-tight">3-Stage</div>
                  <div className="text-[10px] text-[#999999] uppercase tracking-[0.25em] font-mono mt-1">Fitting Cycle</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Monolithic Product Frame */}
            <motion.div 
              initial={reduce ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-[420px] aspect-[4/5] rounded-[1.5rem] overflow-hidden border border-[#262626] bg-[#0d0d0d] group">
                <Image
                  src={featuredProducts?.[0]?.image_url || "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop"}
                  alt="Areva Bespoke Suit"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-[#0d0d0d]/85 backdrop-blur-md border border-[#262626]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gold text-[10px] font-mono tracking-[0.25em] uppercase">Premier Piece</p>
                      <h2 className="text-lg font-serif text-white mt-1">{featuredProducts?.[0]?.name || "Bespoke Suit"}</h2>
                    </div>
                    <Link href={`/products/${featuredProducts?.[0]?.slug || 'jas-luxury'}`}>
                      <div className="w-10 h-10 rounded-full border border-[#3a3a3a] hover:border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition-all">
                        <ArrowUpRight size={16} />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* === ARCHITECTURAL PRINCIPLES (Monochrome Hairlines) === */}
      <section className="py-24 bg-[#080808] border-b border-[#262626]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            
            <div className="p-8 rounded-xl bg-[#0d0d0d] border border-[#262626] space-y-4">
              <span className="font-mono text-xs text-gold uppercase tracking-[0.25em]">01 / Precision</span>
              <h3 className="text-xl font-serif text-white tracking-wide">Anatomical Draft</h3>
              <p className="text-[#999999] text-sm leading-relaxed font-light">
                Every pattern is drafted individually to accommodate natural shoulder slope, spinal arch, and fluid kinetic movement.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-[#0d0d0d] border border-[#262626] space-y-4">
              <span className="font-mono text-xs text-gold uppercase tracking-[0.25em]">02 / Structure</span>
              <h3 className="text-xl font-serif text-white tracking-wide">Floating Horsehair</h3>
              <p className="text-[#999999] text-sm leading-relaxed font-light">
                Full-canvas interior construction pad-stitched by hand, moulding dynamically to the wearer over decades of use.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-[#0d0d0d] border border-[#262626] space-y-4">
              <span className="font-mono text-xs text-gold uppercase tracking-[0.25em]">03 / Materials</span>
              <h3 className="text-xl font-serif text-white tracking-wide">European Mills</h3>
              <p className="text-[#999999] text-sm leading-relaxed font-light">
                Exclusively sourced Super 150s worsted wools, cashmere blends, and rare Indonesian hand-drawn silk batiks.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* === ARCHIVE / MASTERPIECES COLLECTION === */}
      <section className="py-24 bg-[#050505] border-b border-[#262626]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="text-gold text-xs font-mono tracking-[0.25em] uppercase">Permanent Collection</span>
              <h2 className="text-3xl sm:text-5xl font-serif text-white mt-2">Selected Commissions</h2>
            </div>
            <Link 
              href="/products" 
              className="inline-flex items-center gap-2 text-white hover:text-gold transition-colors font-mono text-xs uppercase tracking-[0.2em] pb-1 border-b border-[#3a3a3a] hover:border-gold"
            >
              <span>Explore Archive</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts?.map((product) => (
              <Link 
                href={`/products/${product.slug}`} 
                key={product.id}
                className="group block"
              >
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#0d0d0d] border border-[#262626] group-hover:border-[#3a3a3a] transition-all duration-500">
                  {product.image_url ? (
                    <Image 
                      src={product.image_url} 
                      alt={product.name} 
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-neutral-600 font-mono text-xs">NO PREVIEW</div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 space-y-1">
                    {product.category && (
                      <span className="text-gold text-[10px] font-mono tracking-[0.25em] uppercase">
                        {product.category}
                      </span>
                    )}
                    <h3 className="text-xl font-serif text-white group-hover:text-gold transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#999999] line-clamp-1 font-light">
                      {product.description || "Bespoke handcrafted commission."}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* === PRIVATE ATELIER CONSULTATION CALLOUT === */}
      <section className="py-24 bg-[#080808] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10 space-y-6 max-w-2xl">
          <span className="text-gold text-xs font-mono tracking-[0.25em] uppercase">Private Atelier Consultation</span>
          <h2 className="text-3xl sm:text-5xl font-serif text-white">Experience Bespoke Tailoring</h2>
          <p className="text-[#999999] text-sm sm:text-base leading-relaxed font-light">
            Book a private fitting session with our master tailor at the atelier or at your residence in Jakarta.
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <Button 
                size="lg" 
                className="rounded-full bg-white hover:bg-neutral-200 text-black font-mono text-xs uppercase tracking-[0.2em] px-8 h-13 shadow-none border border-white cursor-pointer"
              >
                <span>Reserve Appointment</span>
                <ArrowUpRight size={14} className="ml-1 opacity-70" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

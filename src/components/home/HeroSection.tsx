"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Ruler, Scissors, Sparkles } from "lucide-react"
import type { Product } from "@/types/database.types"

interface HeroSectionProps {
  featuredProducts: Product[] | null
}

export function HeroSection({ featuredProducts }: HeroSectionProps) {
  const reduce = useReducedMotion()

  return (
    <div className="flex flex-col min-h-screen">
      {/* === HERO SECTION: Asymmetric Luxury Split === */}
      <section className="relative min-h-[92dvh] flex items-center overflow-hidden border-b border-white/10 pt-8 pb-16 md:py-24">
        {/* Subtle radial glow & noise background */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(212,155,53,0.12),transparent_70%)]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Typography & Intent */}
            <motion.div 
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6 md:space-y-8 text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-[11px] font-mono uppercase tracking-[0.2em]">
                <Sparkles size={12} />
                <span>Atelier Sartorial Jakarta</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-[1.05] tracking-tight">
                Anatomy of <br />
                <span className="text-gold italic font-normal">Bespoke Elegance</span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-xl">
                Jahitan presisi yang dibentuk sesuai siluet tubuh Anda. Menghadirkan wibawa, kenyamanan material Scabal dan Loro Piana, serta sentuhan tangan artisan berpengalaman.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/products" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto min-w-[200px] h-13 rounded-full bg-gold hover:bg-gold-light text-black font-serif text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(212,155,53,0.35)] hover:-translate-y-0.5"
                  >
                    Explore Works
                  </Button>
                </Link>

                <Link href="/contact" className="w-full sm:w-auto">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full sm:w-auto min-w-[200px] h-13 rounded-full border-white/20 text-white hover:bg-white hover:text-black font-serif text-xs tracking-[0.2em] uppercase transition-all duration-300 bg-transparent"
                  >
                    Book Fitting
                  </Button>
                </Link>
              </div>

              {/* Atelier Specs */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-lg">
                <div>
                  <div className="text-2xl sm:text-3xl font-serif text-gold">40+</div>
                  <div className="text-[11px] text-neutral-400 uppercase tracking-widest mt-1">Titik Ukur</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-serif text-gold">100%</div>
                  <div className="text-[11px] text-neutral-400 uppercase tracking-widest mt-1">Hand-Canvassed</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-serif text-gold">3-Stage</div>
                  <div className="text-[11px] text-neutral-400 uppercase tracking-widest mt-1">Fitting Cycle</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Visual Hero Card */}
            <motion.div 
              initial={reduce ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-[420px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/15 bg-neutral-900 shadow-2xl group">
                <Image
                  src={featuredProducts?.[0]?.image_url || "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop"}
                  alt="Areva Tailor Bespoke Jacket"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-neutral-950/70 backdrop-blur-md border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gold text-[10px] font-mono tracking-widest uppercase">Premier Piece</p>
                      <h2 className="text-lg font-serif text-white mt-0.5">{featuredProducts?.[0]?.name || "Bespoke Suit"}</h2>
                    </div>
                    <Link href={`/products/${featuredProducts?.[0]?.slug || 'jas-luxury'}`}>
                      <div className="w-10 h-10 rounded-full bg-gold text-black flex items-center justify-center hover:scale-110 transition-transform">
                        <ArrowRight size={16} />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* === PHILOSOPHY STRIP === */}
      <section className="py-20 bg-neutral-950 border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center border border-gold/30">
                <Ruler size={22} />
              </div>
              <h3 className="text-xl font-serif text-white tracking-wide">Anatomical Precision</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Pola dasar dibangun eksklusif mengikuti postur tulang, bahu, dan lekuk gerak tubuh, bukan pola massal standar pabrik.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center border border-gold/30">
                <Scissors size={22} />
              </div>
              <h3 className="text-xl font-serif text-white tracking-wide">Handcrafted Canvas</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Struktur jas dipasang dengan jahitan tangan (full canvas) menggunakan helai bulu kuda untuk fleksibilitas dada yang bernapas alami.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center border border-gold/30">
                <Sparkles size={22} />
              </div>
              <h3 className="text-xl font-serif text-white tracking-wide">Rare Fabric Selection</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Koleksi material wool super 150s hingga sutra tulis otentik dengan kurasi serat bermutu tinggi untuk daya tahan puluhan tahun.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* === SELECTED MASTERPIECES (Curated Grid) === */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="text-gold text-xs font-mono tracking-[0.25em] uppercase">Archive</span>
              <h2 className="text-3xl sm:text-5xl font-serif text-white mt-2">Selected Commissions</h2>
            </div>
            <Link 
              href="/products" 
              className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors text-xs font-serif tracking-[0.2em] uppercase pb-1 border-b border-gold/40 hover:border-white"
            >
              <span>Explore All Catalog</span>
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
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-lg group-hover:border-gold/40 transition-all duration-500">
                  {product.image_url ? (
                    <Image 
                      src={product.image_url} 
                      alt={product.name} 
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-neutral-600 font-serif text-sm">NO IMAGE</div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 space-y-1">
                    {product.category && (
                      <span className="text-gold text-[10px] font-mono tracking-widest uppercase">
                        {product.category}
                      </span>
                    )}
                    <h3 className="text-2xl font-serif text-white group-hover:text-gold transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-1">
                      {product.description || "Bespoke handcrafted piece."}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* === APPOINTMENT RESERVATION CALLOUT === */}
      <section className="py-24 border-t border-white/10 bg-neutral-950 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6 max-w-3xl">
          <span className="text-gold text-xs font-mono tracking-[0.25em] uppercase">Private Atelier Session</span>
          <h2 className="text-3xl sm:text-5xl font-serif text-white">Wujudkan Siluet Terbaik Anda</h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Konsultasikan gaya dan pemilihan kain bersama master tailor kami di atelier atau melalui sesi privat sesuai waktu Anda.
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <Button 
                size="lg" 
                className="rounded-full bg-gold hover:bg-gold-light text-black font-serif text-xs font-bold tracking-[0.2em] uppercase px-8 h-13 shadow-[0_0_25px_rgba(212,155,53,0.3)] transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                Schedule Fitting Appointment
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

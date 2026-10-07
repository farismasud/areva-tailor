"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import { SilkClothCanvas } from "@/components/home/SilkClothCanvas"
import { BespokeProcessSection } from "@/components/home/BespokeProcessSection"
import { FabricHeritageSection } from "@/components/home/FabricHeritageSection"
import { BespokeFaqSection } from "@/components/home/BespokeFaqSection"
import type { Product } from "@/types/database.types"

interface HeroSectionProps {
  featuredProducts: Product[] | null
}

/**
 * Animated measuring tape counter for sartorial metrics
 */
function MetricCounter({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 600
    const startTimestamp = performance.now()

    let animationFrameId: number

    const step = (now: number) => {
      const elapsed = now - startTimestamp
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const easeVal = 1 - Math.pow(1 - progress, 3)
      const current = Math.min(Math.round(easeVal * target), target)
      setCount(current)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    animationFrameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationFrameId)
  }, [target])

  return (
    <div className="overflow-hidden">
      <div className="text-xl sm:text-2xl font-mono text-white tracking-tight flex items-baseline">
        <span>{count}</span>
        <span>{suffix}</span>
      </div>
      <div className="text-[10px] text-[#999999] uppercase tracking-[0.25em] font-mono mt-1">{label}</div>
    </div>
  )
}

/**
 * Magnetic 3D Tilt Card with dynamic light reflection
 */
function MagneticTiltCard({ product }: { product: Product | null }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Max 10 deg tilt
    const rotX = -((y - centerY) / centerY) * 10
    const rotY = ((x - centerX) / centerX) * 10

    setRotateX(rotX)
    setRotateY(rotY)
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    })
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setGlarePos((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.18s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
      className="relative mx-auto max-w-[380px] aspect-[4/5] rounded-[1.5rem] overflow-hidden border border-[#262626] bg-[#0d0d0d] group shadow-2xl cursor-pointer will-change-transform"
    >
      {/* Specular Glare Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.2), transparent 70%)`,
          opacity: glarePos.opacity,
        }}
      />

      <Image
        src={product?.image_url || "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop"}
        alt="Areva Bespoke Suit"
        fill
        priority
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

      {/* Premier Piece Overlay */}
      <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 shadow-2xl z-20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gold text-[10px] font-serif font-semibold tracking-[0.25em] uppercase">Premier Piece</p>
            <h2 className="text-lg font-serif text-white mt-0.5">{product?.name || "Bespoke Suit"}</h2>
          </div>
          <Link href={`/products/${product?.slug || 'jas-luxury'}`}>
            <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/40 text-gold flex items-center justify-center hover:bg-gold hover:text-black transition-all shadow-[0_0_15px_rgba(212,155,53,0.2)]">
              <ArrowUpRight size={16} className="stroke-[2]" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

const fallbackCommissions = [
  {
    id: "sample-1",
    slug: "midnight-black-tuxedo",
    name: "Midnight Black Dinner Tuxedo",
    category: "SUITS",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop",
    desc: "Barathea wool with satin grosgrain peak lapels and hand-sewn buttonholes.",
  },
  {
    id: "sample-2",
    slug: "charcoal-chalkstripe-suit",
    name: "Charcoal Chalkstripe Three-Piece",
    category: "SUITS",
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1000&auto=format&fit=crop",
    desc: "English flannel tailored with high-rise pleated trousers and horseshoe vest.",
  },
  {
    id: "sample-3",
    slug: "bespoke-silk-batik-shirt",
    name: "Royal Canting Batik Silk Shirt",
    category: "BATIK",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop",
    desc: "Hand-drawn mulberry silk with hidden placket and mother-of-pearl buttons.",
  },
]

export function HeroSection({ featuredProducts }: HeroSectionProps) {
  const displayProducts = featuredProducts && featuredProducts.length > 0 ? featuredProducts : fallbackCommissions
  const reduce = useReducedMotion()

  // Editorial word split animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const wordVariants = {
    hidden: { y: "115%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as const, // Haute couture editorial snap
      },
    },
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white">
      {/* === HERO SECTION: Austere Luxury Architecture === */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden border-b border-[#262626] py-8 lg:py-12">
        {/* Three.js Interactive Silk Wave Shader */}
        <SilkClothCanvas />

        {/* Subtle Vignette Scrim */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_20%,#050505_95%)] z-[1]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Precision Typography */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Eyebrow Label with Fade */}
              <motion.div 
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(212,155,53,0.8)]" />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#999999]">
                  Bespoke Atelier • Jakarta
                </span>
              </motion.div>

              {/* Masked Editorial Headline */}
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif text-white leading-[1.08] tracking-tight">
                  Anatomy of
                </h1>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif leading-[1.08] tracking-tight">
                  <span className="text-gold italic font-light">Bespoke Precision</span>
                </h1>
              </div>

              {/* Subhead Paragraph */}
              <p className="text-sm sm:text-base text-[#cccccc] font-light leading-relaxed max-w-xl">
                Master craftsmanship engineered to the natural contours of your physique. Sculpted with hand-canvassed construction and prestigious European wools from Scabal and Loro Piana.
              </p>

              {/* Action Buttons: Liquid Border Shimmer on Hover */}
              <motion.div 
                initial={reduce ? false : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
              >
                {/* Primary Button with Shimmer Border Glow */}
                <Link href="/products" className="w-full sm:w-auto relative group">
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-gold/50 via-white/40 to-gold/50 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
                  <Button 
                    size="lg" 
                    className="relative w-full sm:w-auto min-w-[200px] h-12 rounded-full bg-gold hover:bg-gold-light text-black font-serif text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(212,155,53,0.35)] hover:shadow-[0_0_35px_rgba(212,155,53,0.5)] cursor-pointer border-none overflow-hidden"
                  >
                    {/* Travelling Shimmer Ray */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                    <span className="relative z-10 flex items-center justify-center">
                      <span>View Collection</span>
                      <ArrowUpRight size={15} className="ml-2 stroke-[2.5]" />
                    </span>
                  </Button>
                </Link>

                {/* Secondary Button */}
                <Link href="/contact" className="w-full sm:w-auto relative group">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full sm:w-auto min-w-[200px] h-12 rounded-full border border-white/25 group-hover:border-gold text-white group-hover:text-gold hover:bg-white/5 font-serif text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 bg-black/40 backdrop-blur-sm cursor-pointer overflow-hidden"
                  >
                    <span className="relative z-10">Reserve Fitting</span>
                  </Button>
                </Link>
              </motion.div>

              {/* Sartorial Metrics: Measuring Tape Counter */}
              <motion.div 
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="pt-6 border-t border-[#262626] grid grid-cols-3 gap-6 max-w-lg"
              >
                <MetricCounter target={40} suffix="+" label="Anatomy Points" />
                <MetricCounter target={100} suffix="%" label="Horsehair Canvas" />
                <MetricCounter target={3} suffix="-Stage" label="Fitting Cycle" />
              </motion.div>
            </div>

            {/* Right Column: Magnetic 3D Tilt Card */}
            <motion.div 
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              <MagneticTiltCard product={featuredProducts?.[0] || null} />
            </motion.div>

          </div>
        </div>
      </section>

      {/* === ARCHITECTURAL PRINCIPLES (Monochrome Hairlines) === */}
      <section className="py-24 bg-[#080808] border-b border-[#262626]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            
            <div className="group p-8 rounded-2xl bg-[#0d0d0d] border border-[#262626] hover:border-[#3a3a3a] transition-all duration-500 space-y-4 hover:-translate-y-1">
              <span className="font-mono text-xs text-gold uppercase tracking-[0.25em]">01 / Precision</span>
              <h3 className="text-xl font-serif text-white tracking-wide group-hover:text-gold transition-colors">Anatomical Draft</h3>
              <p className="text-[#999999] text-sm leading-relaxed font-light">
                Every pattern is drafted individually to accommodate natural shoulder slope, spinal arch, and fluid kinetic movement.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-[#0d0d0d] border border-[#262626] hover:border-[#3a3a3a] transition-all duration-500 space-y-4 hover:-translate-y-1">
              <span className="font-mono text-xs text-gold uppercase tracking-[0.25em]">02 / Structure</span>
              <h3 className="text-xl font-serif text-white tracking-wide group-hover:text-gold transition-colors">Floating Horsehair</h3>
              <p className="text-[#999999] text-sm leading-relaxed font-light">
                Full-canvas interior construction pad-stitched by hand, moulding dynamically to the wearer over decades of use.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-[#0d0d0d] border border-[#262626] hover:border-[#3a3a3a] transition-all duration-500 space-y-4 hover:-translate-y-1">
              <span className="font-mono text-xs text-gold uppercase tracking-[0.25em]">03 / Materials</span>
              <h3 className="text-xl font-serif text-white tracking-wide group-hover:text-gold transition-colors">European Mills</h3>
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
            {[
              {
                id: "commission-1",
                slug: "jas-luxury",
                name: "Jas Luxury Bespoke Tuxedo",
                category: "SUITS",
                image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop",
                desc: "Barathea wool with satin grosgrain lapels and hand-sewn buttonholes.",
              },
              {
                id: "commission-2",
                slug: "batik-formal",
                name: "Royal Batik Silk Canting",
                category: "BATIK",
                image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop",
                desc: "Hand-drawn mulberry silk crafted with authentic wax canting.",
              },
              {
                id: "commission-3",
                slug: "kemeja",
                name: "Atelier Egyptian Cotton Shirt",
                category: "SHIRTINGS",
                image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1000&auto=format&fit=crop",
                desc: "Crisp two-ply Giza cotton tailored with Australian mother-of-pearl buttons.",
              },
            ].map((item, idx) => {
              const linkHref = item.slug ? `/products/${item.slug}` : "/products"
              return (
                <div key={item.id || idx}>
                  <Link href={linkHref} className="group block">
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#0d0d0d] border border-[#262626] group-hover:border-gold/50 transition-all duration-500 shadow-xl">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-1">
                        <span className="text-gold text-[10px] font-mono tracking-[0.25em] uppercase">
                          {item.category}
                        </span>
                        <h3 className="text-xl font-serif text-white group-hover:text-gold transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs text-[#999999] line-clamp-1 font-light">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* === BESPOKE CRAFT PROTOCOL: 4 STAGES OF FITTING === */}
      <BespokeProcessSection />

      {/* === CURATED EUROPEAN MILLS & FABRIC HERITAGE === */}
      <FabricHeritageSection />

      {/* === CLIENT GUIDANCE FAQ === */}
      <BespokeFaqSection />

      {/* === PRIVATE ATELIER CONSULTATION CALLOUT === */}
      <section className="py-24 bg-[#080808] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10 space-y-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-6"
          >
            <span className="text-gold text-xs font-mono tracking-[0.25em] uppercase">Private Atelier Consultation</span>
            <h2 className="text-3xl sm:text-5xl font-serif text-white">Experience Bespoke Tailoring</h2>
            <p className="text-[#999999] text-sm sm:text-base leading-relaxed font-light">
              Book a private fitting session with our master tailor at the atelier or at your residence in Jakarta.
            </p>
            <div className="pt-4">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="rounded-full bg-gold hover:bg-gold-light text-black font-serif text-xs font-bold uppercase tracking-[0.2em] px-8 h-13 shadow-[0_0_25px_rgba(212,155,53,0.3)] hover:shadow-[0_0_35px_rgba(212,155,53,0.5)] border-none cursor-pointer"
                >
                  <span>Reserve Appointment</span>
                  <ArrowUpRight size={15} className="ml-1.5 stroke-[2]" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

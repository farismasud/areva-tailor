"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { ArrowRight, MessageCircle, Calendar } from "lucide-react"
import type { Product } from "@/types/database.types"

interface ProductCatalogClientProps {
  products: Product[]
  initialCategory?: string
}

interface ArchiveMeta {
  subtitle: string
  fabricBadge: string
  timeframe: string
  silhouette: string
}

const ARCHIVE_DETAILS: Record<string, ArchiveMeta> = {
  "jas-luxury": {
    subtitle: "Custom Two-Piece Bespoke Commission",
    fabricBadge: "Scabal Super 150s Wool",
    timeframe: "3-4 Weeks Lead Time",
    silhouette: "Full Floating Canvas • Hand-Rolled Lapel",
  },
  "batik-formal": {
    subtitle: "Bespoke Long-Sleeve Silk Shirt",
    fabricBadge: "Hand-Drawn Mulberry Silk",
    timeframe: "2-3 Weeks Lead Time",
    silhouette: "Pattern-Matched Pocket • French Seams",
  },
  "kemeja": {
    subtitle: "Tailored Executive Dress Shirt",
    fabricBadge: "Thomas Mason 140s Cotton",
    timeframe: "1-2 Weeks Lead Time",
    silhouette: "Mother of Pearl • Single-Needle Stitch",
  },
}

const CATEGORIES = [
  { label: "All Collections", value: "all" },
  { label: "Bespoke Suit", value: "jas" },
  { label: "Silk Batik", value: "batik" },
  { label: "Tailored Shirt", value: "kemeja" },
]

const CATEGORY_DISPLAY: Record<string, string> = {
  jas: "SUITING",
  batik: "SILK BATIK",
  kemeja: "SHIRTING",
}

export function ProductCatalogClient({ products, initialCategory = "all" }: ProductCatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const reduce = useReducedMotion()

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return products
    return products.filter((p) => {
      const cat = (p.category || "").toLowerCase()
      const slug = (p.slug || "").toLowerCase()
      return cat.includes(selectedCategory) || slug.includes(selectedCategory)
    })
  }, [products, selectedCategory])

  const handleSelectCategory = (catValue: string) => {
    setSelectedCategory(catValue)
    const newUrl = catValue === "all" ? "/products" : `/products?category=${catValue}`
    window.history.replaceState(null, "", newUrl)
  }

  return (
    <div className="space-y-16">
      {/* Editorial Header with Staggered Entrance */}
      <motion.div 
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center space-y-4 max-w-2xl mx-auto"
      >
        <span className="font-mono text-[11px] text-primary uppercase tracking-[0.3em] font-medium">
          Permanent Archive
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-foreground leading-[1.15]">
          Sartorial Collections
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm font-light leading-relaxed max-w-lg mx-auto">
          An archival selection of handcrafted bespoke suiting, silk batiks, and executive shirts tailored to your individual anatomical posture.
        </p>
      </motion.div>

      {/* Smooth Animated Category Filter Tabs */}
      <motion.div 
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-center gap-2 flex-wrap"
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.value
          return (
            <button
              key={cat.value}
              onClick={() => handleSelectCategory(cat.value)}
              className={`relative px-5 py-2 rounded-full text-[11px] font-mono tracking-[0.2em] uppercase transition-colors duration-300 cursor-pointer ${
                isSelected
                  ? "text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isSelected && (
                <motion.span
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 rounded-full bg-primary shadow-[0_2px_14px_rgba(180,133,32,0.28)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          )
        })}
      </motion.div>

      {/* Product Archive Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, index) => {
            const meta = ARCHIVE_DETAILS[product.slug] || {
              subtitle: "Handcrafted Atelier Commission",
              fabricBadge: "European Wool & Silk Blend",
              timeframe: "3-4 Weeks Lead Time",
              silhouette: "Bespoke Anatomical Cut",
            }

            return (
              <motion.div
                key={product.id}
                layout
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="group block h-full focus:outline-hidden"
                >
                  <article className="flex flex-col h-full bg-card rounded-2xl border border-border/80 group-hover:border-primary/40 group-hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden">
                    {/* Clean Editorial Photo Frame (No floating badge clutter) */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted/40">
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground font-serif text-sm tracking-widest">
                          ATELIER ARCHIVE
                        </div>
                      )}

                      {/* Subtle Vignette for Depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
                    </div>

                    {/* Editorial Information (Calm, Minimal, Refined) */}
                    <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                      <div className="space-y-2">
                        {/* Eyebrow: Category & Cloth Origin */}
                        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em]">
                          <span className="text-primary font-semibold">
                            {product.category ? (CATEGORY_DISPLAY[product.category.toLowerCase()] || product.category) : "ATELIER"}
                          </span>
                          <span className="text-border">•</span>
                          <span className="text-foreground/75 font-medium tracking-[0.14em]">
                            {meta.fabricBadge}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl sm:text-2xl font-serif text-foreground font-normal tracking-wide group-hover:text-primary transition-colors duration-300">
                          {product.name}
                        </h2>

                        {/* One-line Silhouette Narrative */}
                        <p className="text-xs text-foreground/70 font-normal leading-relaxed">
                          {meta.subtitle} • {meta.silhouette}
                        </p>
                      </div>

                      {/* Bottom Link Row */}
                      <div className="pt-3 border-t border-border/70 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-foreground/70 tracking-wider">
                          {meta.timeframe}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.18em] text-foreground group-hover:text-primary font-medium transition-colors">
                          <span>View Piece</span>
                          <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 border border-border/60 bg-card rounded-2xl">
          <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
            Archival collection currently being curated.
          </p>
        </div>
      )}

      {/* Understated Editorial Atelier Footer */}
      <motion.div 
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="pt-16 border-t border-border/70 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
      >
        <div className="space-y-1">
          <p className="font-serif text-base sm:text-lg text-foreground">
            Each bespoke garment is individually sculpted through private fittings.
          </p>
          <p className="text-xs text-muted-foreground font-light">
            Visit our Jakarta atelier or schedule an executive consultation at your residence.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/6281234567890?text=Hello%20Areva%20Atelier,%20I%20would%20like%20to%20inquire%20about%20a%20bespoke%20commission."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-gold-dark text-primary-foreground text-xs font-serif font-bold tracking-wider uppercase transition-colors shadow-xs"
          >
            <MessageCircle size={14} />
            <span>WhatsApp Concierge</span>
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border hover:border-primary text-foreground text-xs font-serif font-semibold tracking-wider uppercase transition-colors bg-card"
          >
            <Calendar size={14} />
            <span>Reserve Fitting</span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion } from "motion/react"
import Image from "next/image"
import { Award, Compass, Feather, ShieldCheck } from "lucide-react"

const fabrics = [
  {
    id: "scabal",
    name: "Scabal of Savile Row",
    origin: "Brussels & Huddersfield, UK",
    type: "Super 150s - 180s Wool & Cashmere",
    desc: "Renowned globally as the pinnacle of English suiting textiles. Weave density that holds razor-sharp creasing and natural water-repellent drape.",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop",
    traits: ["Pure Natural Luster", "Resilient Recovery", "Breathable Four-Season"],
  },
  {
    id: "loro-piana",
    name: "Loro Piana Australis",
    origin: "Quarona, Northern Italy",
    type: "Super 150s Tasmanian Merino",
    desc: "Spun from select ultra-fine Australian Merino fleece. Exceptionally soft hand-feel combined with Italian fluid kinetic drape.",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop",
    traits: ["Featherweight Softness", "Deep Chroma Dyeing", "Thermoclimatic Balance"],
  },
  {
    id: "batik-sutra",
    name: "Atelier Hand-Drawn Batik Silk",
    origin: "Pekalongan & Solo, Indonesia",
    type: "100% Pure Mulberry Silk Crepe",
    desc: "Handcrafted using traditional hot beeswax canting techniques over weeks. Custom tailored as bespoke silk shirtings or opulent inner jacket linings.",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop",
    traits: ["Artisanal Canting Craft", "Natural Plant Dyes", "Sartorial Heritage Fusion"],
  },
]

export function FabricHeritageSection() {
  const [selectedFabric, setSelectedFabric] = useState(0)

  return (
    <section className="py-28 bg-[#080808] border-b border-[#262626] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="font-mono text-xs text-gold uppercase tracking-[0.3em]">
            Prestigious Textiles
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
            Curated Mill Partners
          </h2>
          <p className="text-sm text-[#999999] font-light leading-relaxed">
            A bespoke suit is only as dignified as the wool from which it is drafted. We maintain direct allocations with the world&apos;s oldest weaving mills.
          </p>
        </div>

        {/* Fabric Swatch Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {fabrics.map((fabric, idx) => {
            const isSelected = selectedFabric === idx
            return (
              <div
                key={fabric.id}
                onClick={() => setSelectedFabric(idx)}
                className={`group rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                  isSelected 
                    ? "bg-[#0f0f0f] border-gold shadow-[0_0_30px_rgba(212,155,53,0.15)] -translate-y-1.5" 
                    : "bg-[#0a0a0a] border-[#222222] hover:border-[#383838] hover:bg-[#0d0d0d]"
                }`}
              >
                <div>
                  {/* Textile Swatch Visual */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#141414]">
                    <Image
                      src={fabric.image}
                      alt={fabric.name}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-wider text-gold uppercase">
                        {fabric.type}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <div>
                      <span className="text-[10px] font-mono tracking-[0.2em] text-[#777777] uppercase block">
                        {fabric.origin}
                      </span>
                      <h3 className="text-xl font-serif text-white group-hover:text-gold transition-colors mt-1">
                        {fabric.name}
                      </h3>
                    </div>

                    <p className="text-xs text-[#999999] font-light leading-relaxed">
                      {fabric.desc}
                    </p>

                    {/* Attribute Pills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {fabric.traits.map((trait) => (
                        <span 
                          key={trait} 
                          className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[#aaaaaa]"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Bottom Accent */}
                <div className={`p-4 border-t flex items-center justify-between text-[11px] font-mono uppercase tracking-wider ${
                  isSelected ? "border-gold/30 text-gold" : "border-[#1c1c1c] text-[#666666]"
                }`}>
                  <span>Permanent Swatch Archive</span>
                  <span className="text-white">Allocated</span>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

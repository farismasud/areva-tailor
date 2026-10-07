"use client"

import { useState } from "react"
import { motion } from "motion/react"
import Image from "next/image"
import { Award, Compass, Feather, ShieldCheck } from "lucide-react"

const fabrics = [
  {
    id: "scabal",
    name: "Scabal of London",
    origin: "London & West Yorkshire, England",
    type: "Super 150s - 180s Wool & Cashmere",
    desc: "Internationally celebrated as the benchmark for luxury English suiting. Dense, durable weave that keeps crisp lines and drapes naturally.",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop",
    traits: ["Natural Sheen", "Wrinkle Resistant", "Four-Season Comfort"],
  },
  {
    id: "loro-piana",
    name: "Loro Piana Australis",
    origin: "Piedmont, Northern Italy",
    type: "Super 150s Australian Merino",
    desc: "Spun from select ultra-fine merino wool fibers. Exceptionally light and soft to the touch with effortless Italian elegance.",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop",
    traits: ["Ultra-Soft Feel", "Rich Color Depth", "Naturally Breathable"],
  },
  {
    id: "batik-sutra",
    name: "Hand-Drawn Silk Batik",
    origin: "Central Java, Indonesia",
    type: "100% Pure Mulberry Silk",
    desc: "Created by skilled artisans using traditional hot wax canting methods. Tailored into bespoke silk shirts or statement suit linings.",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop",
    traits: ["Hand-Drawn Canting", "Pure Natural Dyes", "Indonesian Heritage"],
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
            Premium Fabrics
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
            World-Renowned Mills
          </h2>
          <p className="text-sm text-[#999999] font-light leading-relaxed">
            A great suit starts with exceptional cloth. We source our materials directly from historic weaving houses in Italy, England, and Indonesia.
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
                    <div className="absolute inset-0">
                      <img
                        src={fabric.image}
                        alt={fabric.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="eager"
                      />
                    </div>
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

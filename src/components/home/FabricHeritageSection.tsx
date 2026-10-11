"use client"

import { useState } from "react"

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
    <section className="py-28 bg-card/40 border-b border-border relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="font-mono text-xs text-primary uppercase tracking-[0.3em]">
            Premium Fabrics
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-foreground tracking-tight">
            World-Renowned Mills
          </h2>
          <p className="text-sm text-muted-foreground font-light leading-relaxed">
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
                    ? "bg-card border-primary shadow-[0_4px_25px_rgba(180,133,32,0.18)] -translate-y-1.5" 
                    : "bg-card/70 border-border hover:border-primary/50 hover:bg-card"
                }`}
              >
                <div>
                  {/* Textile Swatch Visual */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <div className="absolute inset-0">
                      <img
                        src={fabric.image}
                        alt={fabric.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="eager"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-90" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-background/85 backdrop-blur-md border border-border text-[10px] font-mono tracking-wider text-primary uppercase font-medium">
                        {fabric.type}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <div>
                      <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground uppercase block">
                        {fabric.origin}
                      </span>
                      <h3 className="text-xl font-serif text-foreground group-hover:text-primary transition-colors mt-1">
                        {fabric.name}
                      </h3>
                    </div>

                    <p className="text-xs text-muted-foreground font-light leading-relaxed">
                      {fabric.desc}
                    </p>

                    {/* Attribute Pills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {fabric.traits.map((trait) => (
                        <span 
                          key={trait} 
                          className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-secondary border border-border text-foreground/80"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Bottom Accent */}
                <div className={`p-4 border-t flex items-center justify-between text-[11px] font-mono uppercase tracking-wider ${
                  isSelected ? "border-primary/30 text-primary" : "border-border text-muted-foreground"
                }`}>
                  <span>Permanent Swatch Archive</span>
                  <span className="text-foreground font-medium">Allocated</span>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

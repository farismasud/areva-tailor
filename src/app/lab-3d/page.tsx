"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Sparkles, Box, Activity, Layers, Scissors, Grid } from "lucide-react"
import { SilkClothCanvas } from "@/components/home/SilkClothCanvas"
import { Mannequin3DCanvas } from "@/components/3d-lab/Mannequin3DCanvas"
import { KineticFibers3DCanvas } from "@/components/3d-lab/KineticFibers3DCanvas"
import { SilkRibbon3DCanvas } from "@/components/3d-lab/SilkRibbon3DCanvas"
import { GoldenShears3DCanvas } from "@/components/3d-lab/GoldenShears3DCanvas"
import { LoomMatrix3DCanvas } from "@/components/3d-lab/LoomMatrix3DCanvas"

const experiments = [
  {
    id: "mannequin",
    name: "01 / Sartorial Torso (Wireframe Mannequin)",
    tag: "Architectural & Precise",
    desc: "Anatomical dress form mannequin with horizontal contour slice lines and glowing measurement points, rotating and tilting with cursor interaction.",
    icon: Box,
    component: Mannequin3DCanvas,
  },
  {
    id: "fibers",
    name: "02 / Kinetic Silk Fibers",
    tag: "Organic & Ethereal",
    desc: "Floating multi-strand woven golden threads swirling dynamically in 3D space, responding to pointer turbulence.",
    icon: Activity,
    component: KineticFibers3DCanvas,
  },
  {
    id: "ribbon",
    name: "03 / Infinite Möbius Ribbon",
    tag: "Minimalist Couture",
    desc: "Single continuous 3D gold silk tube ribbon twisting gracefully with metallic sheen, specular reflections, and wireframe skeleton overlay.",
    icon: Layers,
    component: SilkRibbon3DCanvas,
  },
  {
    id: "shears",
    name: "04 / Golden Shears (Artisan Scissors)",
    tag: "Sculptural Craftsmanship",
    desc: "Polished bespoke brass tailor shears carving geometric pattern drafting lines in space with rhythmic snip physics.",
    icon: Scissors,
    component: GoldenShears3DCanvas,
  },
  {
    id: "loom",
    name: "05 / Loom Matrix & Weft Lattice",
    tag: "Tactile Textile Physics",
    desc: "Warp and weft grid nodes undulating in real-time, simulating high-count Italian Super 150s woven wool structure.",
    icon: Grid,
    component: LoomMatrix3DCanvas,
  },
  {
    id: "cloth",
    name: "06 / Adaptive Silk Drape",
    tag: "Light & Dark Reactive",
    desc: "Woven silk plane simulation with custom GLSL vertex shader rippling dynamically beneath mouse movement and shifting tone with active theme.",
    icon: Sparkles,
    component: SilkClothCanvas,
  },
]

export default function Lab3DPage() {
  const [activeId, setActiveId] = useState("mannequin")

  const currentExperiment = experiments.find((exp) => exp.id === activeId) || experiments[0]
  const ActiveComponent = currentExperiment.component

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
      {/* Top Bar */}
      <header className="h-16 border-b border-border px-6 sm:px-12 flex items-center justify-between z-20 bg-background/90 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono tracking-widest text-muted-foreground hover:text-foreground transition uppercase"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
          <span className="text-border">/</span>
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-primary font-semibold">
            3D Motion Lab
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
            6 WebGL Experiments Ready
          </span>
        </div>
      </header>

      {/* Main Showcase Layout */}
      <div className="flex-1 grid lg:grid-cols-12 relative overflow-hidden">
        {/* Left Control Panel */}
        <aside className="lg:col-span-4 border-r border-border p-6 lg:p-8 flex flex-col justify-between bg-card/60 backdrop-blur-md z-10 overflow-y-auto max-h-[calc(100vh-4rem)]">
          <div className="space-y-6">
            <div>
              <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em]">Bespoke 3D Exploration</span>
              <h1 className="text-2xl sm:text-3xl font-serif text-foreground mt-1">Sartorial 3D Concepts</h1>
              <p className="text-xs text-muted-foreground font-light leading-relaxed mt-2">
                Pilih konsep 3D di bawah ini untuk melihat pergerakan fisik kain, partikel, anatomi torso, gunting tailor, atau struktur tenun benang secara real-time.
              </p>
            </div>

            {/* Selector Options */}
            <div className="space-y-2.5 pt-1">
              {experiments.map((exp) => {
                const isSelected = activeId === exp.id
                const Icon = exp.icon
                return (
                  <button
                    key={exp.id}
                    onClick={() => setActiveId(exp.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? "bg-card border-primary text-foreground shadow-md"
                        : "bg-secondary/40 border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    <div className={`p-2 rounded-lg border mt-0.5 ${isSelected ? "border-primary/40 text-primary bg-primary/10" : "border-border text-muted-foreground"}`}>
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm text-foreground font-normal truncate">{exp.name}</span>
                      </div>
                      <span className="inline-block mt-0.5 text-[10px] font-mono tracking-wider text-primary uppercase">
                        {exp.tag}
                      </span>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1 font-light leading-relaxed">
                        {exp.desc}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-border mt-6">
            <div className="p-4 rounded-xl bg-card border border-border space-y-1.5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Tips Interaksi</span>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                Arahkan kursor mouse ke kanvas sebelah kanan. Setiap model memiliki kurva physics dan specular lighting yang responsif.
              </p>
            </div>
          </div>
        </aside>

        {/* Right 3D Viewport */}
        <main className="lg:col-span-8 relative min-h-[550px] lg:min-h-full flex items-center justify-center bg-background">
          {/* Subtle Ambient Radial Light */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,var(--tw-colors-card)_0%,transparent_75%)] opacity-50" />

          {/* Active 3D Component */}
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <ActiveComponent key={activeId} />
          </div>

          {/* Overlay Badge Status */}
          <div className="absolute bottom-6 right-6 z-10 pointer-events-none">
            <div className="px-4 py-2 rounded-full bg-card/85 backdrop-blur-md border border-border text-[11px] font-mono text-muted-foreground tracking-widest uppercase">
              RENDER: <span className="text-foreground font-semibold">{currentExperiment.name.split("/")[1] || currentExperiment.name}</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

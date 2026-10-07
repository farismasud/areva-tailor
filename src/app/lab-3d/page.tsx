"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Sparkles, Box, Activity, Layers } from "lucide-react"
import { SilkClothCanvas } from "@/components/home/SilkClothCanvas"
import { Mannequin3DCanvas } from "@/components/3d-lab/Mannequin3DCanvas"
import { KineticFibers3DCanvas } from "@/components/3d-lab/KineticFibers3DCanvas"
import { SilkRibbon3DCanvas } from "@/components/3d-lab/SilkRibbon3DCanvas"

const experiments = [
  {
    id: "mannequin",
    name: "01 / Sartorial Torso (Wireframe Mannequin)",
    tag: "Architectural & Precise",
    desc: "Anatomical dress form mannequin with horizontal contour slice lines and glowing anatomical measurement points, rotating and tilting with cursor interaction.",
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
    tag: "Minimalist Couture (ThreeUI)",
    desc: "Single continuous 3D gold silk tube ribbon twisting gracefully with metallic sheen, specular reflections, and wireframe skeleton overlay.",
    icon: Layers,
    component: SilkRibbon3DCanvas,
  },
  {
    id: "cloth",
    name: "04 / Current Silk Cloth Drape",
    tag: "Active on Homepage",
    desc: "Woven silk plane simulation with custom GLSL vertex shader rippling dynamically beneath the mouse cursor.",
    icon: Sparkles,
    component: SilkClothCanvas,
  },
]

export default function Lab3DPage() {
  const [activeId, setActiveId] = useState("mannequin")

  const currentExperiment = experiments.find((exp) => exp.id === activeId) || experiments[0]
  const ActiveComponent = currentExperiment.component

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      {/* Top Bar */}
      <header className="h-16 border-b border-[#262626] px-6 sm:px-12 flex items-center justify-between z-20 bg-[#050505]/90 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#999999] hover:text-white transition uppercase"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
          <span className="text-[#3a3a3a]">/</span>
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-gold font-semibold">
            3D Motion Lab
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[11px] text-[#999999] uppercase tracking-widest">
            WebGL Live Playground
          </span>
        </div>
      </header>

      {/* Main Showcase Layout */}
      <div className="flex-1 grid lg:grid-cols-12 relative overflow-hidden">
        {/* Left Control Panel */}
        <aside className="lg:col-span-4 border-r border-[#262626] p-6 lg:p-8 flex flex-col justify-between bg-[#080808]/70 backdrop-blur-md z-10">
          <div className="space-y-6">
            <div>
              <span className="font-mono text-[10px] text-gold uppercase tracking-[0.3em]">Bespoke 3D Exploration</span>
              <h1 className="text-2xl sm:text-3xl font-serif text-white mt-1">Sartorial 3D Concepts</h1>
              <p className="text-xs text-[#999999] font-light leading-relaxed mt-2">
                Pilih konsep 3D di bawah ini untuk melihat pergerakan fisik kain, partikel, atau anatomi torso secara real-time. Gerakkan kursor di area kanvas untuk menguji interaksinya.
              </p>
            </div>

            {/* Selector Options */}
            <div className="space-y-3 pt-2">
              {experiments.map((exp) => {
                const isSelected = activeId === exp.id
                const Icon = exp.icon
                return (
                  <button
                    key={exp.id}
                    onClick={() => setActiveId(exp.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-start gap-4 ${
                      isSelected
                        ? "bg-[#141414] border-gold text-white shadow-[0_0_20px_rgba(212,155,53,0.15)]"
                        : "bg-[#0a0a0a] border-[#262626] text-[#999999] hover:border-[#3a3a3a] hover:text-white"
                    }`}
                  >
                    <div className={`p-2 rounded-lg border ${isSelected ? "border-gold/40 text-gold bg-gold/10" : "border-[#262626] text-neutral-400"}`}>
                      <Icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm text-white font-normal truncate">{exp.name}</span>
                      </div>
                      <span className="inline-block mt-0.5 text-[10px] font-mono tracking-wider text-gold uppercase">
                        {exp.tag}
                      </span>
                      <p className="text-[11px] text-[#888888] line-clamp-2 mt-1 font-light leading-relaxed">
                        {exp.desc}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-[#1f1f1f]">
            <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#888888]">Tips Interaksi</span>
              <p className="text-xs text-[#cccccc] font-light leading-relaxed">
                Arahkan kursor mouse ke kanvas sebelah kanan. Setiap model memiliki kurva physics dan specular lighting yang unik.
              </p>
            </div>
          </div>
        </aside>

        {/* Right 3D Viewport */}
        <main className="lg:col-span-8 relative min-h-[500px] lg:min-h-full flex items-center justify-center bg-[#050505]">
          {/* Subtle Ambient Radial Light */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,#171512_0%,#050505_75%)]" />

          {/* Active 3D Component */}
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <ActiveComponent key={activeId} />
          </div>

          {/* Overlay Badge Status */}
          <div className="absolute bottom-6 right-6 z-10 pointer-events-none">
            <div className="px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-[#262626] text-[11px] font-mono text-[#999999] tracking-widest uppercase">
              RENDER: <span className="text-white font-semibold">{currentExperiment.name.split("/")[1] || currentExperiment.name}</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

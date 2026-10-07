"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Compass, Sparkles, Scissors, Layers, CheckCircle2 } from "lucide-react"

const stages = [
  {
    step: "01",
    title: "Measurements & Consultation",
    timeframe: "Week 1",
    summary: "Over 40 precise body measurements taken to create a unique paper pattern made solely for you.",
    details: [
      "In-depth analysis of posture, shoulder slope, and natural movement",
      "Fabric selection from renowned mills like Scabal and Loro Piana",
      "Custom paper pattern hand-drafted from scratch",
    ],
    icon: Compass,
  },
  {
    step: "02",
    title: "First Fitting (Baste Skeleton)",
    timeframe: "Week 2 - 3",
    summary: "A preliminary prototype basted with white thread, allowing us to sculpt the suit directly on your body.",
    details: [
      "Checking chest balance, back suppression, and sleeve position",
      "Deconstruction and exact re-cutting to refine your fit",
      "Installation of natural floating horsehair canvas",
    ],
    icon: Scissors,
  },
  {
    step: "03",
    title: "Second Fitting (Structure & Detail)",
    timeframe: "Week 4",
    summary: "Pockets, linings, and lapels are assembled to lock in the final silhouette and comfort.",
    details: [
      "Fine-tuning trouser length and jacket collar hug",
      "Hand-stitched buttonholes crafted with silk thread",
      "Genuine horn buttons securely attached by hand",
    ],
    icon: Layers,
  },
  {
    step: "04",
    title: "Final Try-On & Delivery",
    timeframe: "Week 5",
    summary: "Final steam-pressing and inspection before your suit is safely packaged for handover.",
    details: [
      "Hand-pressed to lock in the three-dimensional chest shape",
      "Your measurements archived for effortless future commissions",
      "Delivered with a premium wooden hanger and breathable suit carrier",
    ],
    icon: Sparkles,
  },
]

export function BespokeProcessSection() {
  const [activeStage, setActiveStage] = useState(0)

  return (
    <section className="py-28 bg-[#050505] border-b border-[#262626] relative overflow-hidden">
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="font-mono text-xs text-gold uppercase tracking-[0.3em]">
              The Craft Process
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
              How We Create Your Suit
            </h2>
          </div>
          <p className="text-sm text-[#999999] max-w-md font-light leading-relaxed">
            True bespoke tailoring is a personalized craft. Every suit goes through multiple stages of hand-fitting to ensure unmatched comfort and elegance.
          </p>
        </div>

        {/* Process Interactive Stage Selector */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Stage Navigation Tabs */}
          <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
            {stages.map((stage, idx) => {
              const isActive = activeStage === idx
              const Icon = stage.icon
              return (
                <button
                  key={stage.step}
                  onClick={() => setActiveStage(idx)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                    isActive
                      ? "bg-[#0d0d0d] border-gold text-white shadow-[0_0_25px_rgba(212,155,53,0.15)]"
                      : "bg-[#080808] border-[#222222] text-[#888888] hover:border-[#333333] hover:text-[#cccccc]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-xs font-semibold px-2.5 py-1 rounded-md border ${
                      isActive ? "bg-gold text-black border-gold" : "bg-white/[0.04] text-[#777777] border-white/[0.08]"
                    }`}>
                      {stage.step}
                    </span>
                    <div>
                      <h4 className={`font-serif text-base transition-colors ${isActive ? "text-white font-medium" : "text-[#aaaaaa] group-hover:text-white"}`}>
                        {stage.title.split("(")[0]}
                      </h4>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#777777] mt-0.5 block">
                        {stage.timeframe}
                      </span>
                    </div>
                  </div>
                  <Icon size={18} className={`transition-transform duration-300 ${isActive ? "text-gold scale-110" : "text-[#555555] group-hover:text-neutral-400"}`} />
                </button>
              )
            })}
          </div>

          {/* Right Column: Active Stage Deep Inspection Card */}
          <div className="lg:col-span-7">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="h-full p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#0d0d0d] to-[#070707] border border-[#2a2a2a] flex flex-col justify-between shadow-2xl relative overflow-hidden"
            >
              {/* Giant Watermark Step Number */}
              <div className="absolute top-2 right-4 text-8xl font-mono font-bold text-white/[0.02] select-none pointer-events-none">
                {stages[activeStage].step}
              </div>

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between border-b border-[#222222] pb-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold">Phase Inspection</span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-white mt-1">
                      {stages[activeStage].title}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-white bg-white/[0.06] border border-white/10 px-3.5 py-1.5 rounded-full">
                    {stages[activeStage].timeframe}
                  </span>
                </div>

                <p className="text-base text-[#cccccc] font-light leading-relaxed">
                  {stages[activeStage].summary}
                </p>

                {/* Technical Protocols Checklist */}
                <div className="space-y-3 pt-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#888888] block">
                    Execution Benchmarks
                  </span>
                  <div className="space-y-2.5">
                    {stages[activeStage].details.map((point) => (
                      <div key={point} className="flex items-start gap-3 text-sm text-[#aaaaaa] font-light">
                        <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Guarantee */}
              <div className="pt-8 border-t border-[#222222] flex items-center justify-between text-[11px] font-mono text-[#777777] uppercase tracking-wider relative z-10 mt-8">
                <span>Hand-Canvassed Protocol</span>
                <span className="text-white">Zero Industrial Fusing</span>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  )
}

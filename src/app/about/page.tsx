import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header Banner */}
      <section className="relative h-[50vh] flex items-center justify-center bg-[#080808] overflow-hidden border-b border-[#262626]">
        <div className="text-center z-10 px-4 space-y-4">
          <span className="font-mono text-xs text-gold uppercase tracking-[0.3em]">Atelier Heritage</span>
          <h1 className="text-4xl md:text-7xl font-serif tracking-tight text-white">SAVOIR-FAIRE</h1>
          <p className="font-mono text-xs text-[#999999] uppercase tracking-[0.25em]">Est. 2024 • Jakarta</p>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-24 container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <p className="text-2xl md:text-4xl font-serif leading-relaxed text-[#ffffff] font-normal tracking-wide">
            &quot;A bespoke garment is not merely assembled cloth. It is an architectural dialogue between human posture and textile tension.&quot;
          </p>
          <div className="w-[1px] h-16 bg-[#3a3a3a] mx-auto"></div>
          
          <div className="text-[#999999] leading-loose font-light space-y-6 text-base sm:text-lg text-left md:text-center">
            <p>
              Founded in Jakarta, Areva International Tailor emerged from an uncompromising devotion to classical bespoke tailoring. In an age dominated by industrial ready-to-wear, our atelier preserves the time-honored discipline of pure anatomical drafting.
            </p>
            <p>
              Every garment is individually drafted on paper, cut by hand, and constructed with floating horsehair canvas. This ensures the chest piece adapts organically to the wearer&apos;s heat and posture, breathing naturally and retaining structural integrity over generations.
            </p>
          </div>

          <div className="pt-6">
            <Link href="/contact">
              <Button 
                size="lg" 
                className="rounded-full bg-white hover:bg-neutral-200 text-black font-mono text-xs uppercase tracking-[0.2em] px-8 h-13 shadow-none border border-white cursor-pointer"
              >
                <span>Reserve a Fitting</span>
                <ArrowUpRight size={14} className="ml-1 opacity-70" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Precision Metrics */}
      <section className="border-t border-b border-[#262626] py-16 bg-[#080808]">
         <div className="container mx-auto grid grid-cols-3 text-center divide-x divide-[#262626]">
            <div>
               <span className="block text-3xl sm:text-4xl font-mono text-white mb-2">15+</span>
               <span className="font-mono text-[10px] text-[#999999] tracking-[0.25em] uppercase">Master Artisans</span>
            </div>
            <div>
               <span className="block text-3xl sm:text-4xl font-mono text-white mb-2">100%</span>
               <span className="font-mono text-[10px] text-[#999999] tracking-[0.25em] uppercase">Hand-Canvassed</span>
            </div>
            <div>
               <span className="block text-3xl sm:text-4xl font-mono text-white mb-2">5,000+</span>
               <span className="font-mono text-[10px] text-[#999999] tracking-[0.25em] uppercase">Mill Swatches</span>
            </div>
         </div>
      </section>
    </div>
  )
}

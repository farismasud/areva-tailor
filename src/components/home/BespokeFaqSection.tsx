"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    q: "How does bespoke tailoring differ from made-to-measure (MTM)?",
    a: "Made-to-measure alters an existing pre-graded standard block pattern on a computer. Authentic bespoke begins with an entirely blank sheet of card stock, drafted individually around your posture, shoulder drop, and spinal curve, followed by 3 manual fitting stages with floating horsehair canvas.",
  },
  {
    q: "How many fittings are required, and how long does a commission take?",
    a: "A classic bespoke commission requires 3 fittings: the Toile/Baste fitting (skeleton prototype), Forward fitting (structural alignment), and Final inspection. The entire artisanal journey spans 4 to 6 weeks to allow the natural textiles to rest between pressing cycles.",
  },
  {
    q: "Can I bring my own fabric or rare Indonesian batik?",
    a: "Certainly. Our master artisans frequently craft bespoke three-piece suits with customer-supplied royal batik silks as artistic inner linings, or draft complete full-canvassed bespoke batik formal shirts.",
  },
  {
    q: "Do you offer private consultations at my residence or hotel?",
    a: "Yes. Our master tailor provides private concierge fittings across the Greater Jakarta area for clients requiring utmost discretion.",
  },
]

export function BespokeFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-28 bg-[#050505] border-b border-[#262626]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="font-mono text-xs text-gold uppercase tracking-[0.3em]">
            Client Guidance
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
            Frequently Inquired
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={faq.q}
                className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${
                  isOpen ? "bg-[#0d0d0d] border-gold/40" : "bg-[#080808] border-[#222222] hover:border-[#333333]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-serif text-base sm:text-lg text-white font-normal">
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-full border transition-colors shrink-0 ${
                    isOpen ? "border-gold text-gold bg-gold/10" : "border-[#333333] text-[#777777]"
                  }`}>
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-7 pb-7 pt-1 text-sm text-[#999999] font-light leading-relaxed border-t border-[#1a1a1a]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

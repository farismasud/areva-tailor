"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    q: "What is the difference between bespoke and made-to-measure?",
    a: "Made-to-measure adjusts an existing standard template on a computer. Authentic bespoke starts entirely from scratch with a brand-new paper pattern drafted around your posture and build, followed by multiple fitting sessions with floating natural horsehair canvas.",
  },
  {
    q: "How many fittings are needed, and how long does it take?",
    a: "A typical bespoke commission takes 3 fittings: the initial measurement and baste fitting (white thread prototype), the structure fitting, and the final try-on. The entire process takes approximately 4 to 5 weeks.",
  },
  {
    q: "Can I bring my own fabric or custom batik?",
    a: "Yes. Our tailors regularly work with customer-provided fabrics, transforming rare heirloom batiks into tailored long-sleeve shirts or signature silk suit jacket linings.",
  },
  {
    q: "Do you offer private appointments at my office or home?",
    a: "Yes. We offer discreet concierge fitting services throughout Jakarta for clients who prefer private consultations at their home, office, or hotel.",
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
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
            Frequently Asked Questions
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

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header Banner */}
      <section className="relative h-[38vh] flex items-center justify-center bg-card/60 overflow-hidden border-b border-border">
        <div className="text-center z-10 px-4 space-y-3">
          <span className="font-mono text-xs text-primary uppercase tracking-[0.3em]">Atelier Profile</span>
          <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-foreground">OUR HERITAGE</h1>
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-[0.25em]">Bespoke Tailoring • Jakarta</p>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-24 container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-snug">
              Bespoke Tailoring for Leaders, Dignitaries &amp; Executives
            </h2>
            <div className="w-12 h-[1px] bg-primary mx-auto" />
          </div>
          
          <div className="text-muted-foreground leading-relaxed font-light space-y-6 text-base sm:text-lg">
            <p>
              Founded in Jakarta, <strong className="text-foreground font-medium">Areva International Tailor</strong> has long been entrusted by state dignitaries, prominent entrepreneurs, and corporate executives to create bespoke formal suiting and exclusive silk batiks.
            </p>
            <p>
              We prioritize anatomical cut precision and enduring wearer comfort. Every commission is individually developed from comprehensive anatomical measurements and hand-drafted paper patterns to natural floating canvas assembly crafted entirely without synthetic adhesives.
            </p>
            <p>
              Drawing from an archive of the world&apos;s most prestigious textile mills—including pure wools from Scabal and Loro Piana alongside authentic hand-drawn Indonesian silk batik—we deliver a dignified silhouette that reflects your executive presence.
            </p>
          </div>

          <div className="pt-4 flex justify-center">
            <Link href="/contact">
              <button 
                type="button"
                className="group inline-flex items-center justify-center gap-2 px-8 h-12 rounded-full text-xs font-serif font-bold tracking-[0.2em] uppercase text-primary-foreground bg-primary hover:bg-gold-dark transition-all duration-300 shadow-[0_4px_20px_rgba(180,133,32,0.25)] hover:shadow-[0_4px_25px_rgba(180,133,32,0.4)] cursor-pointer border-none"
              >
                <span>Book a Consultation</span>
                <ArrowUpRight size={14} className="stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Precision Metrics */}
      <section className="border-t border-b border-border py-16 bg-card/40">
        <div className="container mx-auto grid grid-cols-3 text-center divide-x divide-border max-w-4xl">
          <div>
            <span className="block text-3xl sm:text-4xl font-serif text-foreground mb-2">15+</span>
            <span className="font-mono text-[10px] text-muted-foreground tracking-[0.25em] uppercase">Master Tailors</span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-serif text-foreground mb-2">100%</span>
            <span className="font-mono text-[10px] text-muted-foreground tracking-[0.25em] uppercase">Hand-Stitched Canvas</span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-serif text-foreground mb-2">5,000+</span>
            <span className="font-mono text-[10px] text-muted-foreground tracking-[0.25em] uppercase">Fabric Options</span>
          </div>
        </div>
      </section>
    </div>
  )
}

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header Banner */}
      <section className="relative h-[42vh] flex items-center justify-center bg-[#080808] overflow-hidden border-b border-[#262626]">
        <div className="text-center z-10 px-4 space-y-3">
          <span className="font-mono text-xs text-gold uppercase tracking-[0.3em]">Atelier Profile</span>
          <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-white">OUR HERITAGE</h1>
          <p className="font-mono text-xs text-[#999999] uppercase tracking-[0.25em]">Bespoke Tailoring • Jakarta</p>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-24 container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-serif text-white leading-snug">
              Bespoke Tailoring for Leaders, Dignitaries &amp; Executives
            </h2>
            <div className="w-12 h-[1px] bg-gold mx-auto" />
          </div>
          
          <div className="text-[#cccccc] leading-relaxed font-light space-y-6 text-base sm:text-lg">
            <p>
              Berawal di Jakarta, <strong className="text-white font-medium">Areva International Tailor</strong> dipercaya oleh para tokoh nasional, pejabat tinggi negara, pengusaha ternama, hingga jajaran direksi korporasi besar dalam merancang setelan jas formal dan kemeja batik eksklusif.
            </p>
            <p>
              Kami mengutamakan presisi potongan badan dan kenyamanan pemakaian jangka panjang. Setiap pakaian dibuat secara individual mulai dari pengukuran mendalam, pembuatan pola kertas manual, hingga pemasangan furing dan kanvas kain alami tanpa lem industrial.
            </p>
            <p>
              Dengan koleksi bahan premium dunia seperti wool murni Scabal dan Loro Piana, dipadukan dengan kain sutra batik canting tulis asli nusantara, kami menghadirkan penampilan berwibawa yang mencerminkan karakter kepemimpinan Anda.
            </p>
          </div>

          <div className="pt-4 flex justify-center">
            <Link href="/contact">
              <button 
                type="button"
                className="group inline-flex items-center justify-center gap-2 px-8 h-12 rounded-full text-xs font-serif font-bold tracking-[0.2em] uppercase text-black bg-gold hover:bg-gold-light transition-all duration-300 shadow-[0_4px_20px_rgba(212,155,53,0.25)] hover:shadow-[0_4px_25px_rgba(212,155,53,0.4)] cursor-pointer border-none"
              >
                <span>Book a Consultation</span>
                <ArrowUpRight size={14} className="stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Precision Metrics */}
      <section className="border-t border-b border-[#262626] py-16 bg-[#080808]">
        <div className="container mx-auto grid grid-cols-3 text-center divide-x divide-[#262626] max-w-4xl">
          <div>
            <span className="block text-3xl sm:text-4xl font-serif text-white mb-2">15+</span>
            <span className="font-mono text-[10px] text-[#999999] tracking-[0.25em] uppercase">Master Tailors</span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-serif text-white mb-2">100%</span>
            <span className="font-mono text-[10px] text-[#999999] tracking-[0.25em] uppercase">Hand-Stitched Canvas</span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-serif text-white mb-2">5,000+</span>
            <span className="font-mono text-[10px] text-[#999999] tracking-[0.25em] uppercase">Fabric Options</span>
          </div>
        </div>
      </section>
    </div>
  )
}

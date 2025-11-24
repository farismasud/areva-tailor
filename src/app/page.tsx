import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { ArrowRight, Scissors, Ruler, Crown } from "lucide-react"

export const revalidate = 3600 

export default async function Home() {
  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .limit(3)

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* === HERO SECTION (Simetris & Grande) === */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        
        {/* Background Texture (Abstract Grid) */}
        <div className="absolute inset-0 z-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(#D49B35 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        
        {/* Glow Effect di tengah */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,155,53,0.15),transparent_70%)] z-0" />

        <div className="container relative z-10 px-4 text-center space-y-8 max-w-4xl mx-auto">
          {/* Badge Kecil */}
          <span className="inline-block py-1 px-3 border border-gold/30 text-gold text-xs tracking-[0.3em] uppercase bg-black/50 backdrop-blur-sm">
            Est. 2024 • Jakarta
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-normal tracking-wide text-white leading-[1.1]">
            BESPOKE <br />
            <span className="text-gold italic font-light">Masterpiece</span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            Menjahit bukan sekadar menyatukan kain. Kami menciptakan identitas, wibawa, dan kenyamanan dalam setiap helai benang.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Link href="/products">
              {/* UPDATE: rounded-full */}
              <Button size="lg" className="bg-gold hover:bg-gold-light text-black font-bold tracking-widest min-w-[200px] h-14 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,155,53,0.4)] hover:-translate-y-1">
                VIEW COLLECTION
              </Button>
            </Link>
            
            <Link href="/contact">
              {/* UPDATE: rounded-full + border radius */}
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white hover:text-black tracking-widest min-w-[200px] h-14 rounded-full bg-transparent backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
                MAKE APPOINTMENT
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* === PHILOSOPHY SECTION (Minimalist) === */}
      <section className="py-24 bg-neutral-950 relative">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            
            <div className="px-4 py-8 group hover:-translate-y-2 transition-transform duration-500">
              <Crown className="w-12 h-12 text-gold mx-auto mb-6 opacity-80 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xl font-serif text-white mb-3 tracking-widest">ROYAL QUALITY</h3>
              <p className="text-neutral-500 text-sm leading-loose">Material premium pilihan dari Italia & Inggris untuk kenyamanan tak tertandingi.</p>
            </div>

            <div className="px-4 py-8 group hover:-translate-y-2 transition-transform duration-500">
              <Ruler className="w-12 h-12 text-gold mx-auto mb-6 opacity-80 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xl font-serif text-white mb-3 tracking-widest">PERFECT FIT</h3>
              <p className="text-neutral-500 text-sm leading-loose">Diukur dengan presisi anatomi tubuh Anda untuk siluet yang tegas dan rapi.</p>
            </div>

            <div className="px-4 py-8 group hover:-translate-y-2 transition-transform duration-500">
              <Scissors className="w-12 h-12 text-gold mx-auto mb-6 opacity-80 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xl font-serif text-white mb-3 tracking-widest">HANDCRAFTED</h3>
              <p className="text-neutral-500 text-sm leading-loose">Setiap detail dikerjakan tangan oleh artisan penjahit berpengalaman puluhan tahun.</p>
            </div>

          </div>
        </div>
      </section>

      {/* === FEATURED COLLECTION (Dark Cards) === */}
      <section className="py-24 border-t border-white/5 bg-black">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Selected Works</h2>
              <div className="h-1 w-20 bg-gold" />
            </div>
            <Link href="/products" className="text-gold hover:text-white transition-colors tracking-widest text-sm flex items-center gap-2 pb-2 border-b border-transparent hover:border-gold">
              SEE ALL CATALOG <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> {/* Gap dikecilin biar rapet */}
            {featuredProducts?.map((product) => (
              <Link 
                href={`/products/${product.slug}`} 
                key={product.id}
                className="group relative block"
              >
                {/* WADAH UTAMA: Rounded-nya kita bikin 24px (1.5rem) biar pas, gak terlalu bunder */}
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 rounded-[1.5rem] border border-white/10 shadow-lg group-hover:shadow-[0_0_30px_rgba(212,155,53,0.2)] transition-all duration-500">
                  
                  {/* Gambar */}
                  {product.image_url ? (
                    <Image 
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                  ) : (
                     <div className="flex items-center justify-center h-full text-neutral-700 font-serif">NO PREVIEW</div>
                  )}

                  {/* GRADASI OVERLAY (Biar teks kebaca) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                  {/* TEKS DI DALAM (Pojok Kiri Bawah) */}
                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                     <p className="text-gold text-xs font-bold tracking-widest uppercase mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        View Detail
                     </p>
                     <h3 className="text-2xl font-serif text-white leading-tight">
                       {product.name}
                     </h3>
                  </div>

                  {/* Icon Panah di Kanan Bawah */}
                  <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-[-45deg]">
                    <ArrowRight className="text-white w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* === CTA SECTION (Gold Accent) === */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gold/5" />
        <div className="container relative z-10 text-center px-4">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Start Your Journey</h2>
          <p className="text-neutral-400 mb-10 max-w-xl mx-auto">
            Konsultasikan kebutuhan pakaian Anda bersama tim ahli kami. Gratis pengukuran untuk area Jakarta.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-black hover:bg-neutral-200 font-bold tracking-widest min-w-[200px] h-14 rounded-full shadow-lg transition-transform hover:scale-105">
              BOOK NOW
            </Button>
          </Link>
        </div>
      </section>

    </div>
  )
}
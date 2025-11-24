import { supabase } from "@/lib/supabase"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export const revalidate = 3600 

export default async function ProductsPage() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('id', { ascending: false })

  return (
    <div className="min-h-screen bg-neutral-950 text-white py-20 md:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-gold text-xs tracking-[0.3em] uppercase">The Collection</span>
          <h1 className="text-4xl md:text-6xl font-serif font-normal tracking-wide">
            MASTERPIECES
          </h1>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6"></div>
        </div>

        {/* GRID MAGAZINE STYLE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products?.map((product) => (
            <Link 
              href={`/products/${product.slug}`} 
              key={product.id}
              className="group relative block"
            >
              {/* WADAH UTAMA: Rounded 1.5rem (24px) - Magazine Look */}
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
                  <div className="flex items-center justify-center h-full text-neutral-700 font-serif text-sm tracking-widest">NO IMAGE</div>
                )}

                {/* GRADASI OVERLAY (Penting biar teks kebaca) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />

                {/* TEKS DI DALAM (Pojok Kiri Bawah) */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 z-20">
                    {/* Kategori kecil */}
                    {product.category && (
                        <p className="text-gold text-[10px] font-bold tracking-widest uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            {product.category}
                        </p>
                    )}
                    
                    {/* Judul Produk */}
                    <h3 className="text-2xl font-serif text-white leading-tight mb-1">
                      {product.name}
                    </h3>
                    
                    {/* Subtext kecil */}
                    <p className="text-xs text-neutral-400 font-light line-clamp-1 group-hover:text-white transition-colors">
                        View Details
                    </p>
                </div>

                {/* Icon Panah di Kanan Bawah */}
                <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-[-45deg] border border-white/10 z-20">
                  <ArrowRight className="text-white w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {products?.length === 0 && (
          <div className="text-center py-20 border border-white/5 bg-white/5 rounded-[1.5rem]">
            <p className="text-neutral-500 font-serif italic">Collection coming soon.</p>
          </div>
        )}

      </div>
    </div>
  )
}
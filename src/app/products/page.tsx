import { supabase } from "@/lib/supabase"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// Cache data selama 1 jam biar ngebut
export const revalidate = 3600 

// Definisi Tipe Data biar TypeScript seneng
interface Product {
  id: number
  name: string
  slug: string
  description: string | null
  image_url: string
  category: string | null
}

export default async function ProductsPage() {
  // 1. Ambil SEMUA produk yang aktif
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('id', { ascending: false }) // Produk terbaru muncul duluan

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20">
      <div className="container px-4 md:px-6 mx-auto">
        
        {/* Header Halaman */}
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            Koleksi Kami
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Temukan berbagai pilihan pakaian dinas, jas, dan tekstil berkualitas tinggi yang dirancang khusus untuk Anda.
          </p>
        </div>

        {/* Grid Produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product: Product) => (
            <Link 
              href={`/products/${product.slug}`} 
              key={product.id}
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Gambar */}
              <div className="relative aspect-[4/5] w-full bg-slate-200 overflow-hidden">
                {product.image_url ? (
                  <Image 
                    src={product.image_url} 
                    alt={product.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Info Produk */}
              <div className="p-5 flex flex-col flex-grow">
                {product.category && (
                  <span className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wider">
                    {product.category}
                  </span>
                )}
                <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-1 group-hover:text-blue-700 transition">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-grow">
                  {product.description}
                </p>
                
                <Button variant="outline" className="w-full mt-auto group-hover:bg-slate-900 group-hover:text-white transition-colors">
                  Detail <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </Link>
          ))}
        </div>

        {/* State Kosong (Kalau belum ada produk) */}
        {products?.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">Belum ada produk yang ditampilkan.</p>
          </div>
        )}

      </div>
    </div>
  )
}
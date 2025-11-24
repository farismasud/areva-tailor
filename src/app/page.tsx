import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { ArrowRight, Scissors, Ruler, Clock } from "lucide-react"

// Kita set revalidate biar datanya gak "basi", tapi tetep kenceng (cache 1 jam)
export const revalidate = 3600 

export default async function Home() {
  // 1. Fetch cuma 3 produk buat dipajang di depan (Sneak Peek)
  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .limit(3) // Cuma ambil 3 biji

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* === SECTION 1: HERO BANNER === */}
      <section className="relative py-20 md:py-32 bg-slate-900 text-white overflow-hidden">
        {/* Background Pattern (Optional, bisa diganti gambar asli nanti) */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0" />
        
        <div className="container relative z-10 px-4 md:px-6 mx-auto text-center md:text-left">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Jahitan Presisi,<br />
                <span className="text-blue-400">Tampilan Profesional.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-lg mx-auto md:mx-0">
                Solusi konveksi dan tailor premium untuk seragam perusahaan, jas formal, dan kebutuhan tekstil Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/products">
                  <Button size="lg" className="w-full sm:w-auto gap-2">
                    Lihat Katalog <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-black bg-white hover:bg-slate-100 border-none">
                    Hubungi Kami
                  </Button>
                </Link>
              </div>
            </div>
            {/* Tempat Foto Hero (Bisa diganti foto owner/workshop nanti) */}
            <div className="hidden md:block relative h-[400px] w-full bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
               <div className="absolute inset-0 flex items-center justify-center text-slate-600">
                  {/* Placeholder kalau belum ada gambar hero */}
                  <span className="text-sm">Place Hero Image Here</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION 2: WHY US === */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Kenapa Areva Tailor?
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Kami menggabungkan seni menjahit tradisional dengan standar kualitas modern.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                <Ruler size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Ukuran Presisi</h3>
              <p className="text-slate-600 leading-relaxed">
                Pengukuran detail untuk memastikan pakaian pas di badan dan nyaman dipakai seharian.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                <Scissors size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Jahitan Premium</h3>
              <p className="text-slate-600 leading-relaxed">
                Dikerjakan oleh penjahit berpengalaman dengan finishing yang rapi dan kuat.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Tepat Waktu</h3>
              <p className="text-slate-600 leading-relaxed">
                Komitmen kami terhadap deadline produksi agar kebutuhan seragam Anda terpenuhi tepat waktu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION 3: FEATURED PRODUCTS === */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Koleksi Unggulan</h2>
              <p className="mt-2 text-slate-600">Pilihan terbaik untuk kebutuhan Anda.</p>
            </div>
            <Link href="/products" className="hidden md:block">
              <Button variant="ghost" className="gap-2">Lihat Semua <ArrowRight size={16}/></Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredProducts?.map((product) => (
              <Link 
                href={`/products/${product.slug}`} // PERHATIKAN: URL-nya ke /products/ (jamak)
                key={product.id}
                className="group border rounded-lg overflow-hidden bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-64 w-full bg-slate-200 overflow-hidden">
                  {product.image_url ? (
                    <Image 
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                     <div className="flex items-center justify-center h-full text-slate-400">No Image</div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
             <Link href="/products">
              <Button variant="outline" className="w-full">Lihat Semua Produk</Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
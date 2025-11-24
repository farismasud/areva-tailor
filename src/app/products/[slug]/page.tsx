import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ArrowLeft, MessageCircle } from "lucide-react"

export const revalidate = 3600

// 1. Generate Static Params (Biar loading instant)
export async function generateStaticParams() {
  const { data: products } = await supabase.from('products').select('slug')
  return products?.map(({ slug }) => ({ slug })) || []
}

export default async function ProductDetail({ params }: { params: { slug: string } }) {
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white py-12 md:py-20">
      <div className="container px-4 md:px-6 mx-auto">
        
        {/* Tombol Back */}
        <div className="mb-8">
          <Link href="/products">
            <Button variant="ghost" className="gap-2 pl-0 hover:pl-2 transition-all">
              <ArrowLeft size={16} /> Kembali ke Katalog
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Kolom Kiri: Gambar Besar */}
          <div className="relative aspect-square md:aspect-[4/5] w-full bg-slate-100 rounded-2xl overflow-hidden border border-slate-100">
             {product.image_url ? (
               <Image 
                 src={product.image_url} 
                 alt={product.name} 
                 fill
                 className="object-cover"
                 priority // Gambar utama diprioritaskan load-nya
               />
             ) : (
               <div className="flex items-center justify-center h-full text-slate-400">No Image</div>
             )}
          </div>

          {/* Kolom Kanan: Detail Info */}
          <div className="flex flex-col justify-center">
            {product.category && (
              <span className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3">
                {product.category}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              {product.name}
            </h1>
            
            <div className="prose prose-slate max-w-none text-slate-600 text-lg leading-relaxed mb-10">
              {/* Deskripsi bisa dipisah per paragraf kalau ada enter */}
              {product.description?.split('\n').map((line: string, i: number) => (
                <p key={i} className="mb-4">{line}</p>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={`https://wa.me/628123456789?text=Halo Areva Tailor, saya tertarik dengan produk ${product.name}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto"
              >
                <Button size="lg" className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white">
                  <MessageCircle size={20} />
                  Pesan via WhatsApp
                </Button>
              </a>
              {/* Bisa tambah tombol lain kalau butuh */}
            </div>
            
            {/* Info Tambahan (Optional) */}
            <div className="mt-8 pt-8 border-t border-slate-100 text-sm text-slate-500">
              <p>Estimasi pengerjaan: 7-14 hari kerja (tergantung kuantitas).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
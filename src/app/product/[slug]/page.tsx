import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import { notFound } from 'next/navigation'

// 1. Ini buat ngasih tau Next.js daftar slug apa aja yang harus di-render jadi HTML
export async function generateStaticParams() {
  const { data: products } = await supabase.from('products').select('slug')
  return products?.map(({ slug }) => ({ slug })) || []
}

// 2. Ini Halaman Utamanya
export default async function ProductDetail({ params }: { params: { slug: string } }) {
  // Fetch 1 produk berdasarkan slug
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', params.slug)
    .single()

  // Kalau slug ngawur/gak ketemu, lempar ke 404
  if (!product) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Kolom Kiri: Gambar */}
        <div className="relative h-96 w-full bg-gray-100 rounded-lg overflow-hidden">
             {product.image_url ? (
               <Image 
                 src={product.image_url} 
                 alt={product.name} 
                 fill
                 className="object-cover"
               />
             ) : (
               <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
             )}
        </div>

        {/* Kolom Kanan: Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4 text-blue-900">{product.name}</h1>
          <div className="text-gray-600 leading-relaxed mb-6">
            {product.description}
          </div>
          
          {/* Tombol CTA (Misal ke WhatsApp) */}
          <a 
            href={`https://wa.me/628123456789?text=Halo, saya tertarik dengan ${product.name}`}
            target="_blank"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Tanya via WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
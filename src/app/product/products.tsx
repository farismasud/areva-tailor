import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'

// 1. Definisi Tipe Data Produk (Sesuai Table Supabase lo)
interface Product {
  id: number
  name: string
  slug: string
  description: string | null // Bisa null kalau kosong
  image_url: string
  is_active: boolean
}

export const revalidate = 3600

export default async function ProductCatalog() {
  // 2. Kasih tau Supabase kalau hasilnya adalah array of Product
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .returns<Product[]>() // <-- Ini kuncinya biar error "implicit any" ilang

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products?.map((product) => (
        // Bungkus pake Link ke arah /product/slug-nya
        <Link 
          href={`/product/${product.slug}`} 
          key={product.id}
          className="group border rounded-lg overflow-hidden hover:shadow-lg transition bg-white"
        >
           {product.image_url && (
             <div className="relative w-full h-64">
               <Image 
                 src={product.image_url} 
                 alt={product.name} 
                 fill
                 className="object-cover group-hover:scale-105 transition duration-300"
               />
             </div>
           )}
           <div className="p-4">
             <h2 className="text-lg font-bold mb-2 group-hover:text-blue-600">
                {product.name}
             </h2>
             <p className="text-gray-500 text-sm line-clamp-2">
                {product.description}
             </p>
           </div>
        </Link>
      ))}
    </div>
  )
}
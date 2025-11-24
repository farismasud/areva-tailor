import { supabase } from '@/lib/supabase'
import Image from 'next/image'

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products?.map((product) => (
        <div key={product.id} className="border p-4 rounded shadow-sm">
           {/* Cek kalau image_url ada, baru render */}
           {product.image_url && (
             <div className="relative w-full h-48 mb-4">
               <Image 
                 src={product.image_url} 
                 alt={product.name} 
                 fill
                 className="object-cover rounded"
               />
             </div>
           )}
           <h2 className="text-xl font-bold">{product.name}</h2>
           <p className="text-gray-600 line-clamp-2">{product.description}</p>
        </div>
      ))}
    </div>
  )
}
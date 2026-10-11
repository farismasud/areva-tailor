import { supabase } from "@/lib/supabase"
import { ProductCatalogClient } from "@/components/products/ProductCatalogClient"

export const revalidate = 3600

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams
  
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('id', { ascending: false })

  return (
    <div className="min-h-screen bg-background text-foreground py-16 md:py-24 transition-colors duration-300">
      <div className="container px-4 md:px-8 mx-auto max-w-6xl">
        <ProductCatalogClient 
          products={products || []} 
          initialCategory={category || "all"} 
        />
      </div>
    </div>
  )
}

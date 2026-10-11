import { supabase } from "@/lib/supabase"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export const revalidate = 3600

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams
  
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('id', { ascending: false })

  if (category && category !== 'all') {
    query = query.ilike('category', `%${category}%`)
  }

  const { data: products } = await query

  const categories = [
    { label: "All Collections", value: "all" },
    { label: "Bespoke Suit", value: "jas" },
    { label: "Silk Batik", value: "batik" },
    { label: "Tailored Shirt", value: "kemeja" },
  ]

  const activeCategory = category || "all"

  return (
    <div className="min-h-screen bg-background text-foreground py-20 md:py-32 transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <span className="font-mono text-xs text-primary uppercase tracking-[0.3em]">Permanent Archive</span>
          <h1 className="text-4xl md:text-6xl font-serif font-normal tracking-tight text-foreground">
            MASTERPIECES
          </h1>
          <div className="w-16 h-[1px] bg-border mx-auto mt-6"></div>
        </div>

        {/* Category Filter Bar */}
        <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap mb-16">
          {categories.map((cat) => {
            const isSelected = activeCategory.toLowerCase() === cat.value.toLowerCase()
            return (
              <Link
                key={cat.value}
                href={cat.value === "all" ? "/products" : `/products?category=${cat.value}`}
                className={`px-5 py-2 rounded-full text-[11px] font-mono tracking-[0.2em] uppercase transition-all duration-300 border ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary font-semibold shadow-[0_2px_12px_rgba(180,133,32,0.25)]"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat.label}
              </Link>
            )
          })}
        </div>

        {/* GRID MAGAZINE STYLE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products?.map((product) => (
            <Link 
              href={`/products/${product.slug}`} 
              key={product.id}
              className="group relative block"
            >
              {/* Card Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-card rounded-[1.5rem] border border-border shadow-md group-hover:shadow-[0_8px_30px_rgba(180,133,32,0.18)] group-hover:border-primary/50 transition-all duration-500">
                
                {/* Image */}
                {product.image_url ? (
                  <Image 
                    src={product.image_url} 
                    alt={product.name} 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground font-serif text-sm tracking-widest bg-muted">NO IMAGE</div>
                )}

                {/* Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-500 z-20">
                  {product.category && (
                    <p className="text-primary text-[10px] font-mono font-semibold tracking-widest uppercase mb-1.5 opacity-90">
                      {product.category}
                    </p>
                  )}
                  
                  <h3 className="text-2xl font-serif text-foreground leading-tight mb-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-xs text-muted-foreground font-light line-clamp-1">
                    View Details
                  </p>
                </div>

                {/* Arrow Icon */}
                <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-[-45deg] border border-border text-foreground z-20">
                  <ArrowRight className="w-4 h-4 text-primary" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {products?.length === 0 && (
          <div className="text-center py-20 border border-border bg-card rounded-2xl">
            <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">Archive coming soon.</p>
          </div>
        )}

      </div>
    </div>
  )
}

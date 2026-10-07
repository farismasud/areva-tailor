import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ArrowLeft, MessageCircle, Ruler } from "lucide-react"

export const revalidate = 3600

export async function generateStaticParams() {
  const { data: products } = await supabase.from('products').select('slug')
  return products?.map(({ slug }) => ({ slug })) || []
}

interface ProductDetailProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductDetailProps) {
  const { slug } = await params
  const { data: product } = await supabase
    .from('products')
    .select('name, description')
    .eq('slug', slug)
    .single()

  if (!product) return { title: 'Product Not Found | Areva Tailor' }

  return {
    title: `${product.name} | Areva Tailor Bespoke`,
    description: product.description || 'Exclusive handcrafted bespoke tailoring by Areva Tailor Jakarta.',
  }
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  const { slug } = await params
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!product) notFound()

  return (
    <div className="min-h-screen bg-neutral-950 text-white py-12 md:py-20 relative overflow-x-hidden">
      
      {/* Background Decor */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        
        {/* Tombol Kembali */}
        <div className="mb-8">
          <Link href="/products" className="inline-flex items-center text-xs font-bold text-neutral-500 hover:text-gold tracking-[0.2em] uppercase transition-colors gap-2 group">
             <div className="p-2 rounded-full border border-white/10 group-hover:border-gold transition-colors">
               <ArrowLeft size={14} />
             </div>
             Back to Collection
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* KOLOM KIRI: Gambar Produk (MATCHING STYLE: Rounded 2rem) */}
          <div className="relative w-full sticky top-24">
            
            {/* Dekorasi Garis Emas (Offset) */}
            <div className="absolute inset-0 border border-gold/20 rounded-[2rem] translate-x-4 translate-y-4 -z-10" />

            {/* Wadah Gambar */}
            <div className="relative aspect-[3/4] w-full bg-neutral-900 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
               {product.image_url ? (
                 <Image 
                   src={product.image_url} 
                   alt={product.name} 
                   fill
                   className="object-cover"
                   priority
                 />
               ) : (
                 <div className="flex items-center justify-center h-full text-neutral-700 font-serif text-sm tracking-widest">
                   NO PREVIEW
                 </div>
               )}
               
               {/* Inner Shadow bawah halus */}
               <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* KOLOM KANAN: Detail Info */}
          <div className="flex flex-col pt-2">
            
            {/* Category Badge */}
            {product.category && (
              <div className="inline-flex self-start px-3 py-1 mb-6 rounded-full border border-gold/30 bg-gold/5 text-gold text-[10px] font-bold tracking-[0.3em] uppercase">
                {product.category}
              </div>
            )}
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 font-normal leading-tight">
              {product.name}
            </h1>
            
            {/* Description */}
            <div className="prose prose-invert max-w-none text-neutral-400 font-light leading-loose mb-10 text-sm md:text-base border-l border-white/10 pl-6">
              {product.description?.split('\n').map((line: string, i: number) => (
                <p key={i} className="mb-4">{line}</p>
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-gold/30 transition-colors">
                <Ruler className="text-gold" size={20} />
                <div>
                   <p className="text-xs text-neutral-500 uppercase tracking-wider">Fit Type</p>
                   <p className="text-sm text-white font-serif">Bespoke / Custom</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-gold/30 transition-colors">
                <MessageCircle className="text-gold" size={20} />
                 <div>
                   <p className="text-xs text-neutral-500 uppercase tracking-wider">Service</p>
                   <p className="text-sm text-white font-serif">Consultation</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <a 
                href={`https://wa.me/628123456789?text=${encodeURIComponent(`Hello Areva Atelier, I am interested in inquiring about ${product.name}.`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1"
              >
                <Button size="lg" className="w-full bg-white hover:bg-neutral-200 text-black font-mono text-xs uppercase tracking-[0.2em] h-13 rounded-full border border-white cursor-pointer shadow-none">
                  INQUIRE VIA WHATSAPP
                </Button>
              </a>
              
              <Link href="/contact" className="flex-1">
                 <Button variant="outline" size="lg" className="w-full border-[#3a3a3a] text-white hover:border-white hover:bg-white/5 font-mono text-xs uppercase tracking-[0.2em] h-13 rounded-full bg-transparent cursor-pointer">
                   BOOK APPOINTMENT
                 </Button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
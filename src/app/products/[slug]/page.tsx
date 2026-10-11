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
    <div className="min-h-screen bg-background text-foreground py-12 md:py-20 relative overflow-x-hidden transition-colors duration-300">
      
      {/* Background Decor */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/products" className="inline-flex items-center text-xs font-bold text-muted-foreground hover:text-primary tracking-[0.2em] uppercase transition-colors gap-2 group">
             <div className="p-2 rounded-full border border-border group-hover:border-primary transition-colors bg-secondary/50">
               <ArrowLeft size={14} />
             </div>
             Back to Collection
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* LEFT: Image */}
          <div className="relative w-full sticky top-24">
            <div className="absolute inset-0 border border-primary/20 rounded-[2rem] translate-x-3 translate-y-3 -z-10" />

            <div className="relative aspect-[3/4] w-full bg-card rounded-[2rem] overflow-hidden border border-border shadow-xl">
               {product.image_url ? (
                 <Image 
                   src={product.image_url} 
                   alt={product.name} 
                   fill
                   className="object-cover"
                   priority
                 />
               ) : (
                 <div className="flex items-center justify-center h-full text-muted-foreground font-serif text-sm tracking-widest bg-muted">
                   NO PREVIEW
                 </div>
               )}
               
               <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* RIGHT: Detail Info */}
          <div className="flex flex-col pt-2">
            
            {/* Category Badge */}
            {product.category && (
              <div className="inline-flex self-start px-3 py-1 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-mono font-bold tracking-[0.3em] uppercase">
                {product.category}
              </div>
            )}
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6 font-normal leading-tight">
              {product.name}
            </h1>
            
            {/* Description */}
            <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground font-light leading-loose mb-10 text-sm md:text-base border-l border-border pl-6">
              {product.description?.split('\n').map((line: string, i: number) => (
                <p key={i} className="mb-4">{line}</p>
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors">
                <Ruler className="text-primary" size={20} />
                <div>
                   <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Fit Type</p>
                   <p className="text-sm text-foreground font-serif">Bespoke / Custom</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors">
                <MessageCircle className="text-primary" size={20} />
                 <div>
                   <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Service</p>
                   <p className="text-sm text-foreground font-serif">Consultation</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <a 
                href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Hello Areva Atelier, I am interested in inquiring about ${product.name}.`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1"
              >
                <Button size="lg" className="w-full bg-primary hover:bg-gold-dark text-primary-foreground font-serif text-xs font-bold uppercase tracking-[0.2em] h-12 rounded-full cursor-pointer shadow-[0_4px_15px_rgba(180,133,32,0.25)] border-none">
                  INQUIRE VIA WHATSAPP
                </Button>
              </a>
              
              <Link href="/contact" className="flex-1">
                 <Button variant="outline" size="lg" className="w-full border-border text-foreground hover:border-primary hover:text-primary hover:bg-muted/50 font-serif text-xs uppercase tracking-[0.2em] h-12 rounded-full bg-background/50 cursor-pointer">
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

import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { 
  ArrowLeft, 
  MessageCircle, 
  Ruler, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Scissors, 
  CheckCircle2, 
  ArrowUpRight 
} from "lucide-react"

export const revalidate = 3600

export async function generateStaticParams() {
  const { data: products } = await supabase.from('products').select('slug')
  return products?.map(({ slug }) => ({ slug })) || []
}

interface ProductDetailProps {
  params: Promise<{ slug: string }>
}

interface DetailedArchiveData {
  title: string
  subtitle: string
  narrative: string
  fabricTitle: string
  fabricDesc: string
  specs: { label: string; value: string; icon: typeof Ruler }[]
  craftHighlights: string[]
  leadTime: string
  fittingStages: string
}

const EXTENDED_DETAILS: Record<string, DetailedArchiveData> = {
  "jas-luxury": {
    title: "Executive Bespoke Suit",
    subtitle: "Custom Two-Piece Commission",
    narrative: "Dirancang khusus untuk para tokoh, eksekutif, dan figur publik yang mengutamakan wibawa, kenyamanan bergerak, dan siluet presisi. Menggunakan konstruksi floating horsehair canvas tanpa lem sintetis, jas ini akan mengikuti lekuk tubuh Anda secara alami dan semakin nyaman seiring waktu.",
    fabricTitle: "Scabal of London Super 150s Pure Wool",
    fabricDesc: "Ditenun di Huddersfield, Inggris, dengan kehalusan benang Super 150s yang jatuh elegan, tahan kusut, dan memiliki kilau sutra alami tanpa kesan berlebihan.",
    specs: [
      { label: "Konstruksi", value: "Full Floating Canvas", icon: ShieldCheck },
      { label: "Bahan Pilihan", value: "Scabal / Loro Piana", icon: Sparkles },
      { label: "Fitting", value: "3 Sesi Ukur & Baste", icon: Scissors },
      { label: "Waktu Jahit", value: "3-4 Minggu", icon: Clock },
    ],
    craftHighlights: [
      "Pola kertas pribadi dirancang dari 40+ titik ukur anatomi tubuh",
      "Kanvas bulu kuda alami dijahit tangan tanpa perekat sintetis (fusible-free)",
      "Lapel hand-rolled dengan pick-stitching halus dan lubang kancing fungsional",
      "Kancing tanduk kerbau alami (natural horn) dan lapisan furing sutra bemberg",
      "Termasuk penyesuaian gratis seumur hidup untuk perubahan postur minor",
    ],
    leadTime: "3-4 Minggu Pengerjaan Tangan",
    fittingStages: "3 Tahap (Ukur Anatomi, Baste Fitting, Final Delivery)",
  },
  "batik-formal": {
    title: "Presidential Silk Batik",
    subtitle: "Bespoke Long-Sleeve Silk Shirt",
    narrative: "Perpaduan warisan adiluhung nusantara dengan ketelitian teknik tailoring modern. Setiap helai batik canting tulis tangan dipotong dengan perhitungan motif presisi (pattern-matched) pada saku dan placket kancing depan agar komposisi motif tetap utuh dan agung.",
    fabricTitle: "100% Sutra Mulberry Asli Canting Tulis",
    fabricDesc: "Sutra mulberry berkualitas tinggi dengan tekstur sejuk dan jatuh lembut di kulit, dibatik menggunakan canting malam oleh perajin maestro batik tradisi.",
    specs: [
      { label: "Konstruksi", value: "Pattern-Matched Placket", icon: ShieldCheck },
      { label: "Bahan", value: "100% Sutra Mulberry Tulis", icon: Sparkles },
      { label: "Fitting", value: "2 Sesi (Ukur & Final)", icon: Scissors },
      { label: "Waktu Jahit", value: "2-3 Minggu", icon: Clock },
    ],
    craftHighlights: [
      "Penyambungan motif batik simetris pada saku depan, manset, dan kerah",
      "Jahitan stik balik Prancis (French seams) halus berkekuatan tinggi tanpa obras kasar",
      "Placket kancing tersembunyi (hidden placket) untuk kesan rapi dan formal kenegaraan",
      "Struktur kerah kokoh menggunakan interlining katun Jerman yang tidak mudah mengkerut",
      "Kancing cangkang kerang mutiara asli (Mother of Pearl) berukir halus",
    ],
    leadTime: "2-3 Minggu Pengerjaan Tangan",
    fittingStages: "2 Tahap (Ukur Tubuh, Final Fitting)",
  },
  "kemeja": {
    title: "Executive Tailored Shirt",
    subtitle: "Custom Egyptian Cotton Shirt",
    narrative: "Kemeja formal dengan standar sartorial tertinggi untuk pemakaian harian eksekutif dan pertemuan bisnis penting. Dibuat dengan jahitan jarum tunggal (single-needle) berkerapatan 22 jahitan per inci untuk garis jahitan yang sangat rapi dan kokoh.",
    fabricTitle: "Thomas Mason 140s Giza Egyptian Cotton",
    fabricDesc: "Kapas Mesir Giza tenunan Albini Group Italia dengan serat ekstra panjang yang memberikan rasa sejuk maksimal, sirkulasi udara superior, dan daya tahan cuci bertahun-tahun.",
    specs: [
      { label: "Jahitan", value: "Single-Needle 22 SPI", icon: ShieldCheck },
      { label: "Bahan", value: "Giza 140s 2-Ply Cotton", icon: Sparkles },
      { label: "Fitting", value: "1-2 Sesi Ukur", icon: Scissors },
      { label: "Waktu Jahit", value: "1-2 Minggu", icon: Clock },
    ],
    craftHighlights: [
      "Pilihan kerah kustom: Semi-Spread, Cutaway, Mandarin, atau Tab Collar",
      "Kancing cangkang kerang mutiara Australia (Australian Mother of Pearl)",
      "Penyangga kerah kuningan yang dapat dilepas (removable brass collar stays)",
      "Manset miring atau bulat dengan opsi monogram inisial nama bordir tangan",
      "Gusset penguat di sudut samping bawah untuk kekuatan tahan robek",
    ],
    leadTime: "1-2 Minggu Pengerjaan",
    fittingStages: "1-2 Tahap (Ukur Tubuh, Final Fitting)",
  },
}

export async function generateMetadata({ params }: ProductDetailProps) {
  const { slug } = await params
  const { data: product } = await supabase
    .from('products')
    .select('name, description')
    .eq('slug', slug)
    .single()

  if (!product) return { title: 'Piece Not Found | Areva Tailor' }

  return {
    title: `${product.name} | Areva Tailor Bespoke Jakarta`,
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

  // Fetch complementary products
  const { data: relatedProducts } = await supabase
    .from('products')
    .select('id, name, slug, image_url, category')
    .neq('slug', slug)
    .limit(2)

  const meta = EXTENDED_DETAILS[slug] || {
    title: product.name,
    subtitle: "Custom Bespoke Commission",
    narrative: product.description || "Setelan eksklusif rancangan Areva Tailor Jakarta, dibuat tangan sesuai ukuran anatomi Anda.",
    fabricTitle: "Premium Tailoring Cloth",
    fabricDesc: "Bahan pilihan terbaik dengan karakter serat alami bernapas.",
    specs: [
      { label: "Konstruksi", value: "Bespoke Cut", icon: ShieldCheck },
      { label: "Bahan", value: "Selected Wool / Silk", icon: Sparkles },
      { label: "Fitting", value: "2-3 Sesi", icon: Scissors },
      { label: "Lead Time", value: "3 Minggu", icon: Clock },
    ],
    craftHighlights: [
      "Pola kertas dibuat khusus dari ukuran tubuh",
      "Pengerjaan tangan oleh master tailor berpengalaman",
      "Bahan alami berkualitas tinggi",
    ],
    leadTime: "3 Minggu Pengerjaan",
    fittingStages: "3 Tahap",
  }

  const whatsappMessage = encodeURIComponent(
    `Halo Areva Tailor Atelier, saya tertarik dengan koleksi ${meta.title} (${product.name}). Saya ingin berkonsultasi mengenai pemilihan bahan dan jadwal janji temu.`
  )

  return (
    <div className="min-h-screen bg-background text-foreground py-12 md:py-20 transition-colors duration-300">
      <div className="container px-4 md:px-8 mx-auto max-w-6xl">
        
        {/* Breadcrumb / Back Action */}
        <div className="mb-10">
          <Link 
            href="/products" 
            className="inline-flex items-center text-xs font-mono text-muted-foreground hover:text-primary tracking-[0.2em] uppercase transition-colors gap-2.5 group"
          >
            <div className="p-2 rounded-full border border-border group-hover:border-primary transition-colors bg-card">
              <ArrowLeft size={13} />
            </div>
            <span>Kembali ke Koleksi</span>
          </Link>
        </div>

        {/* Main Product Presentation (Two Column) */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT: Portrait Photograph (Crisp, no white fog) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="relative aspect-[3/4] w-full rounded-[2rem] overflow-hidden border border-border bg-card shadow-lg">
              {product.image_url ? (
                <Image 
                  src={product.image_url} 
                  alt={product.name} 
                  fill
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground font-serif text-sm tracking-widest bg-muted">
                  NO PREVIEW
                </div>
              )}
            </div>

            {/* Subtle Origin Badge under photo */}
            <div className="mt-4 p-3.5 rounded-xl bg-card border border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>Origin: Jakarta Atelier</span>
              <span className="text-primary font-semibold">100% Handcrafted</span>
            </div>
          </div>

          {/* RIGHT: Editorial Detail & Specifications */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Header info */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-mono font-semibold tracking-[0.25em] uppercase">
                <span>BESPOKE ARCHIVE</span>
                <span>•</span>
                <span>{product.category || "ATELIER"}</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-foreground font-normal leading-tight">
                {meta.title}
              </h1>
              
              <p className="text-xs sm:text-sm font-mono text-primary uppercase tracking-wider">
                {meta.subtitle}
              </p>
            </div>

            {/* Narrative description */}
            <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
              {meta.narrative}
            </p>

            {/* Fabric Highlight Box */}
            <div className="p-5 rounded-2xl bg-card border border-border space-y-1.5">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold uppercase tracking-wider">
                <Sparkles size={14} />
                <span>Rekomendasi Bahan Pilihan</span>
              </div>
              <p className="text-sm font-serif text-foreground font-medium">
                {meta.fabricTitle}
              </p>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                {meta.fabricDesc}
              </p>
            </div>

            {/* 4 Specifications Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {meta.specs.map((item, i) => {
                const IconComponent = item.icon
                return (
                  <div key={i} className="p-3.5 sm:p-4 rounded-xl bg-card border border-border space-y-1">
                    <div className="flex items-center gap-2 text-primary">
                      <IconComponent size={14} />
                      <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">
                        {item.label}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-serif text-foreground font-medium">
                      {item.value}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Craftsmanship Blueprint Checklist */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-foreground font-semibold block">
                Detail Presisi Pengerjaan:
              </span>
              <div className="space-y-2">
                {meta.craftHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground font-light">
                    <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Consultation Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <a 
                href={`https://wa.me/6281234567890?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1"
              >
                <Button 
                  size="lg" 
                  className="w-full bg-primary hover:bg-gold-dark text-primary-foreground font-serif text-xs font-bold uppercase tracking-[0.2em] h-12 rounded-full cursor-pointer shadow-[0_4px_18px_rgba(180,133,32,0.25)] border-none flex items-center justify-center gap-2"
                >
                  <MessageCircle size={15} />
                  <span>Konsultasi WhatsApp</span>
                </Button>
              </a>
              
              <Link href="/contact" className="flex-1">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full border-border text-foreground hover:border-primary hover:text-primary hover:bg-card font-serif text-xs font-semibold uppercase tracking-[0.2em] h-12 rounded-full bg-card cursor-pointer"
                >
                  <span>Reservasi Jadwal Fitting</span>
                </Button>
              </Link>
            </div>

          </div>
        </div>

        {/* Complementary Archive Pieces */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-border space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-primary text-[10px] font-mono tracking-[0.25em] uppercase font-semibold">
                  Atelier Archive
                </span>
                <h3 className="text-2xl font-serif text-foreground mt-1">
                  Koleksi Pilihan Lainnya
                </h3>
              </div>
              <Link 
                href="/products" 
                className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors pb-0.5 border-b border-border"
              >
                Lihat Semua Koleksi
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {relatedProducts.map((rel) => (
                <Link 
                  href={`/products/${rel.slug}`} 
                  key={rel.id}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-muted shrink-0">
                    {rel.image_url ? (
                      <Image 
                        src={rel.image_url} 
                        alt={rel.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : null}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-primary uppercase tracking-wider">
                      {rel.category}
                    </span>
                    <h4 className="text-base font-serif text-foreground group-hover:text-primary transition-colors truncate">
                      {rel.name}
                    </h4>
                    <p className="text-xs text-muted-foreground font-light mt-0.5">
                      Bespoke Atelier Commission
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:border-primary group-hover:text-primary transition-colors">
                    <ArrowUpRight size={14} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

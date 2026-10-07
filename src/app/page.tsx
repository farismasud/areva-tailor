import { supabase } from "@/lib/supabase"
import { HeroSection } from "@/components/home/HeroSection"

export const revalidate = 3600

export default async function Home() {
  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .limit(3)

  return <HeroSection featuredProducts={featuredProducts} />
}

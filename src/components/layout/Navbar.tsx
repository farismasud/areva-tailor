import Link from "next/link"
import { Button } from "@/components/ui/button" // Pake button shadcn
import { ShoppingBag } from "lucide-react" // Icon bawaan shadcn (lucide)

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
        
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="bg-primary text-primary-foreground p-1 rounded">AT</span>
            <span>ArevaTailor</span>
          </Link>
        </div>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/products" className="transition-colors hover:text-primary">
            Products
          </Link>
          <Link href="/about" className="transition-colors hover:text-primary">
            About
          </Link>
          <Link href="/contact" className="transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>

        {/* TOMBOL KANAN (CTA) */}
        <div className="flex items-center gap-4">
          <Link href="/products">
             <Button variant="default" size="sm" className="gap-2">
                <ShoppingBag size={16} />
                Katalog
             </Button>
          </Link>
        </div>
        
      </div>
    </header>
  )
}
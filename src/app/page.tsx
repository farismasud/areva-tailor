import ProductCatalog from './products'

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center text-blue-900">
          Areva Tailor Catalog
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Koleksi terbaik untuk penampilan profesional Anda.
        </p>
        
        {/* Ini dia component yang bakal fetch data dari Supabase */}
        <ProductCatalog /> 
      </div>
    </main>
  )
}
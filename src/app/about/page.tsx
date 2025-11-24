export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header Image / Hero */}
      <section className="relative h-[60vh] flex items-center justify-center bg-black overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent)] opacity-50" />
        <div className="text-center z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-wide">OUR HERITAGE</h1>
          <p className="text-gold text-sm tracking-[0.3em] uppercase">Est. 2024 • Jakarta</p>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-24 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <p className="text-2xl md:text-3xl font-serif leading-relaxed text-neutral-200">
            "We believe that a suit is not just clothing. It is a statement of character, precision, and elegance."
          </p>
          <div className="w-[1px] h-24 bg-gold mx-auto opacity-50"></div>
          
          <div className="text-neutral-400 leading-loose font-light space-y-6 text-lg text-justify md:text-center">
            <p>
              Berawal dari sebuah workshop kecil di sudut Jakarta, Areva Tailor didirikan dengan satu visi: mengembalikan esensi dari seni menjahit tradisional (Bespoke) yang mulai hilang di era fast fashion.
            </p>
            <p>
              Setiap jahitan di Areva adalah hasil dedikasi artisan yang telah berpengalaman puluhan tahun. Kami menolak jalan pintas. Kami menggunakan teknik "Canvas" tradisional untuk memastikan jas Anda memiliki struktur yang kokoh namun tetap fleksibel mengikuti gerak tubuh.
            </p>
          </div>
        </div>
      </section>
      
      {/* Stats Simple */}
      <section className="border-t border-b border-white/5 py-16 bg-black">
         <div className="container mx-auto grid grid-cols-3 text-center divide-x divide-white/10">
            <div>
               <span className="block text-4xl font-serif text-gold mb-2">10+</span>
               <span className="text-xs text-neutral-500 tracking-widest uppercase">Years Experience</span>
            </div>
            <div>
               <span className="block text-4xl font-serif text-gold mb-2">1K+</span>
               <span className="text-xs text-neutral-500 tracking-widest uppercase">Suits Crafted</span>
            </div>
            <div>
               <span className="block text-4xl font-serif text-gold mb-2">100%</span>
               <span className="text-xs text-neutral-500 tracking-widest uppercase">Handmade</span>
            </div>
         </div>
      </section>
    </div>
  )
}
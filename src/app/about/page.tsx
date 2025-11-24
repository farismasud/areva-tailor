import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section About */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Tentang Areva Tailor</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Lebih dari sekadar menjahit kain. Kami membangun citra profesional Anda melalui potongan yang presisi.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Placeholder */}
            <div className="relative h-[400px] w-full bg-slate-100 rounded-2xl overflow-hidden shadow-lg">
              {/* Nanti ganti pake foto workshop/owner asli */}
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium bg-slate-200">
                Foto Workshop / Owner
              </div>
              {/* <Image src="/workshop.jpg" alt="Workshop" fill className="object-cover" /> */}
            </div>

            {/* Content */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Dedikasi pada Detail</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                Berdiri sejak tahun 20XX, Areva Tailor bermula dari sebuah workshop kecil dengan satu visi: menghadirkan pakaian tailor-made yang terjangkau namun dengan kualitas jahitan butik.
              </p>
              <p className="text-slate-600 leading-relaxed text-lg">
                Kini, kami dipercaya oleh berbagai instansi perusahaan dan perorangan untuk menangani kebutuhan seragam dinas, jas pernikahan, hingga pakaian casual harian.
              </p>
              
              {/* List Keunggulan */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-600" />
                  <span className="font-medium text-slate-700">Material Kualitas Terbaik</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-600" />
                  <span className="font-medium text-slate-700">Garansi Perbaikan Jahitan</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-600" />
                  <span className="font-medium text-slate-700">Pengerjaan Tepat Waktu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section (Optional - Biar keliatan Pro) */}
      <section className="bg-slate-50 py-16">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">5+</div>
              <div className="text-slate-600">Tahun Pengalaman</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">1000+</div>
              <div className="text-slate-600">Pakaian Terjahit</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">50+</div>
              <div className="text-slate-600">Klien Perusahaan</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">100%</div>
              <div className="text-slate-600">Kepuasan Pelanggan</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
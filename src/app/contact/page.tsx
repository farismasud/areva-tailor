import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20">
      <div className="container px-4 mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Hubungi Kami</h1>
          <p className="text-slate-600">Punya pertanyaan atau ingin custom order? Kami siap membantu.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100">
          
          {/* KOLOM KIRI: Info & Peta */}
          <div className="bg-slate-900 text-white p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-6">Informasi Kontak</h2>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <MapPin className="text-blue-400 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Alamat Workshop</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Jl. Jahit Presisi No. 123,<br />
                    Kebayoran Baru, Jakarta Selatan<br />
                    DKI Jakarta 12150
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="text-blue-400" />
                <div>
                  <h3 className="font-semibold mb-1">Telepon / WhatsApp</h3>
                  <p className="text-slate-300 text-sm">+62 812-3456-7890</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="text-blue-400" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-slate-300 text-sm">info@arevatailor.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Clock className="text-blue-400" />
                <div>
                  <h3 className="font-semibold mb-1">Jam Operasional</h3>
                  <p className="text-slate-300 text-sm">Senin - Sabtu: 09.00 - 17.00</p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed (Iframe) */}
            <div className="w-full h-48 bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126906.96205705338!2d106.7336049!3d-6.2843103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1ec2422b81d%3A0x2d0727567182498e!2sJakarta%20Selatan%2C%20South%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1708499999999!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* KOLOM KANAN: Form (UI Only) */}
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Kirim Pesan</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700">Nama</label>
                  <Input id="name" placeholder="Nama Anda" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-slate-700">No. HP</label>
                  <Input id="phone" placeholder="0812..." />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
                <Input id="email" type="email" placeholder="nama@email.com" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-700">Pesan</label>
                <Textarea id="message" placeholder="Tulis kebutuhan jahitan Anda..." className="min-h-[120px]" />
              </div>

              <Button className="w-full bg-blue-900 hover:bg-blue-800">
                Kirim Pesan
              </Button>
              <p className="text-xs text-center text-slate-500 mt-4">
                *Pesan ini hanya contoh tampilan (UI Demo).
              </p>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
"use client" // <--- PENTING: Tambahin ini di paling atas karena kita pake interaksi (useState)

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Check } from "lucide-react"

export default function ContactPage() {
  // State buat nyimpen layanan yang dipilih
  const [selectedService, setSelectedService] = useState("bespoke-suit")

  const services = [
    { id: "bespoke-suit", label: "Bespoke Suit" },
    { id: "wedding", label: "Wedding Attire" },
    { id: "batik", label: "Premium Batik" },
    { id: "alteration", label: "Alteration / Vermak" },
  ]

  return (
    <div className="min-h-screen bg-neutral-950 text-white py-20 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-gold text-xs font-bold tracking-[0.3em] uppercase">Reservation</span>
          <h1 className="text-4xl md:text-5xl font-serif">PRIVATE APPOINTMENT</h1>
          <p className="text-neutral-400 max-w-lg mx-auto font-light">
            Jadwalkan konsultasi eksklusif Anda. Tim ahli kami siap membantu mewujudkan pakaian impian Anda.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* KOLOM KIRI: Contact Info (Lebar 4 kolom) */}
          <div className="lg:col-span-4 space-y-8 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
             <div className="space-y-6">
               <div className="flex items-start gap-4">
                 <div className="p-3 bg-black/50 rounded-lg text-gold border border-white/10">
                    <MapPin size={20} />
                 </div>
                 <div>
                   <h3 className="font-serif text-lg mb-1">Our Atelier</h3>
                   <p className="text-sm text-neutral-400 leading-relaxed">
                     Jl. Jahit Presisi No. 123<br/>
                     Kebayoran Baru, Jakarta Selatan<br/>
                     DKI Jakarta 12150
                   </p>
                 </div>
               </div>

               <div className="flex items-start gap-4">
                 <div className="p-3 bg-black/50 rounded-lg text-gold border border-white/10">
                    <Phone size={20} />
                 </div>
                 <div>
                   <h3 className="font-serif text-lg mb-1">Direct Line</h3>
                   <p className="text-sm text-neutral-400">+62 812-3456-7890</p>
                   <p className="text-xs text-neutral-500 mt-1">Available 09:00 - 18:00</p>
                 </div>
               </div>

               <div className="flex items-start gap-4">
                 <div className="p-3 bg-black/50 rounded-lg text-gold border border-white/10">
                    <Mail size={20} />
                 </div>
                 <div>
                   <h3 className="font-serif text-lg mb-1">Email</h3>
                   <p className="text-sm text-neutral-400">info@arevatailor.com</p>
                 </div>
               </div>
             </div>
             
             {/* Google Maps Mini */}
             <div className="w-full h-40 bg-neutral-900 rounded-xl overflow-hidden border border-white/10 mt-6 grayscale hover:grayscale-0 transition-all duration-500">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126907.08666060662!2d106.732392!3d-6.283995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1ec2422b941%3A0x6295b9671d46772!2sSouth%20Jakarta%2C%20South%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
               ></iframe>
             </div>
          </div>

          {/* KOLOM KANAN: Form (Lebar 8 kolom) */}
          <div className="lg:col-span-8">
            <div className="bg-gradient-to-br from-neutral-900 to-black p-8 md:p-10 rounded-2xl border border-gold/30 shadow-[0_0_40px_rgba(212,155,53,0.1)]">
               
               <form className="space-y-8">
                  {/* Service Selection */}
                  <div>
                    <label className="text-xs uppercase tracking-widest text-neutral-400 mb-4 block">I am interested in</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {services.map((service) => (
                        <div 
                          key={service.id}
                          onClick={() => setSelectedService(service.id)}
                          className={`cursor-pointer rounded-xl border p-4 text-center transition-all duration-300 relative ${
                            selectedService === service.id 
                              ? "bg-gold text-black border-gold font-bold shadow-[0_0_15px_rgba(212,155,53,0.4)]" 
                              : "bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10 hover:border-gold/50"
                          }`}
                        >
                          <span className="text-sm">{service.label}</span>
                          {selectedService === service.id && (
                            <div className="absolute -top-2 -right-2 bg-white text-black rounded-full p-1">
                              <Check size={10} strokeWidth={4} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-neutral-400 ml-1">Name</label>
                      <Input placeholder="Your Full Name" className="bg-white/5 border-white/10 h-12 rounded-lg text-white focus:border-gold focus:ring-0 placeholder:text-neutral-600 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-neutral-400 ml-1">Phone (WhatsApp)</label>
                      <Input placeholder="0812..." className="bg-white/5 border-white/10 h-12 rounded-lg text-white focus:border-gold focus:ring-0 placeholder:text-neutral-600 transition-all" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs uppercase tracking-widest text-neutral-400 ml-1">Preferred Date</label>
                       {/* Input Type Date biar muncul kalender native */}
                       <Input type="date" className="bg-white/5 border-white/10 h-12 rounded-lg text-white focus:border-gold focus:ring-0 transition-all [color-scheme:dark]" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs uppercase tracking-widest text-neutral-400 ml-1">Time (Approx)</label>
                       <Input type="time" className="bg-white/5 border-white/10 h-12 rounded-lg text-white focus:border-gold focus:ring-0 transition-all [color-scheme:dark]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-neutral-400 ml-1">Additional Notes</label>
                    <Textarea placeholder="Tell us more about your needs..." className="bg-white/5 border-white/10 min-h-[120px] rounded-lg text-white focus:border-gold focus:ring-0 placeholder:text-neutral-600 transition-all resize-none" />
                  </div>

                  <Button className="w-full bg-gold hover:bg-gold-light text-black font-bold tracking-widest h-14 rounded-lg shadow-[0_0_20px_rgba(212,155,53,0.2)] hover:shadow-[0_0_30px_rgba(212,155,53,0.4)] transition-all text-lg">
                    CONFIRM BOOKING
                  </Button>

                  <p className="text-center text-xs text-neutral-500 pt-4">
                    Our team will contact you via WhatsApp to confirm the schedule.
                  </p>
               </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
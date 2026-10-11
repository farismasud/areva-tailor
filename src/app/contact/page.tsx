"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Check } from "lucide-react"

export default function ContactPage() {
  const [selectedService, setSelectedService] = useState("bespoke-suit")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [preferredDate, setPreferredDate] = useState("")
  const [preferredTime, setPreferredTime] = useState("")
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone) {
      setErrorMessage("Name and WhatsApp contact number are required.")
      return
    }

    setLoading(true)
    setErrorMessage(null)

    // Save appointment record via Next.js API route to Supabase
    try {
      await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          service_type: selectedService,
          preferred_date: preferredDate || null,
          preferred_time: preferredTime || null,
          notes: notes || null,
        }),
      })
    } catch (err) {
      console.warn("Direct DB sync background notice:", err)
    }

    // Format WhatsApp message in English
    const waText = encodeURIComponent(
      `Hello Areva Atelier, I would like to schedule a private fitting appointment:\n\n` +
      `• Name: ${name}\n` +
      `• Service: ${selectedService}\n` +
      `• Preferred Date: ${preferredDate || "Flexible"}\n` +
      `• Preferred Time: ${preferredTime || "Flexible"}\n` +
      `• Special Requests: ${notes || "None"}\n\n` +
      `Please confirm the atelier availability. Thank you.`
    )

    // Open WhatsApp admin
    window.open(`https://wa.me/6281234567890?text=${waText}`, "_blank")
    setSubmitted(true)
    setLoading(false)
  }

  const services = [
    { id: "bespoke-suit", label: "Bespoke Suit" },
    { id: "wedding", label: "Wedding Attire" },
    { id: "batik", label: "Premium Batik" },
    { id: "alteration", label: "Garment Alteration" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground py-20 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="font-mono text-xs text-primary uppercase tracking-[0.3em]">Bespoke Reservation</span>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground tracking-tight">PRIVATE APPOINTMENT</h1>
          <p className="text-muted-foreground max-w-lg mx-auto font-light text-sm sm:text-base leading-relaxed">
            Schedule an exclusive sartorial consultation. Our master tailors are at your service for precise anatomical measurement.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Contact Info */}
          <div className="lg:col-span-4 space-y-8 bg-card p-8 rounded-2xl border border-border backdrop-blur-sm shadow-md">
             <div className="space-y-6">
               <div className="flex items-start gap-4">
                 <div className="p-3 bg-secondary rounded-lg text-primary border border-border">
                    <MapPin size={20} />
                 </div>
                 <div>
                   <h3 className="font-serif text-lg mb-1 text-foreground">Our Atelier</h3>
                   <p className="text-sm text-muted-foreground leading-relaxed">
                     Jl. Wijaya II No. 123<br/>
                     Kebayoran Baru, Jakarta Selatan<br/>
                     DKI Jakarta 12150
                   </p>
                 </div>
               </div>

               <div className="flex items-start gap-4">
                 <div className="p-3 bg-secondary rounded-lg text-primary border border-border">
                    <Phone size={20} />
                 </div>
                 <div>
                   <h3 className="font-serif text-lg mb-1 text-foreground">Direct Line</h3>
                   <p className="text-sm text-muted-foreground">+62 812-3456-7890</p>
                   <p className="text-xs text-muted-foreground/75 mt-1 font-mono">Available 09:00 - 18:00</p>
                 </div>
               </div>

               <div className="flex items-start gap-4">
                 <div className="p-3 bg-secondary rounded-lg text-primary border border-border">
                    <Mail size={20} />
                 </div>
                 <div>
                   <h3 className="font-serif text-lg mb-1 text-foreground">Email</h3>
                   <p className="text-sm text-muted-foreground">atelier@arevatailor.com</p>
                 </div>
               </div>
             </div>
             
             {/* Map container */}
             <div className="w-full h-40 bg-muted rounded-xl overflow-hidden border border-border mt-6">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126907.08666060662!2d106.732392!3d-6.283995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1ec2422b941%3A0x6295b9671d46772!2sSouth%20Jakarta%2C%20South%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
               />
             </div>
          </div>

          {/* RIGHT: Form */}
          <div className="lg:col-span-8">
            <div className="bg-card p-8 md:p-10 rounded-2xl border border-border shadow-xl">
               
               <form onSubmit={handleSubmit} className="space-y-8">
                  {errorMessage && (
                    <div className="p-3 bg-destructive/10 border border-destructive/30 text-destructive text-xs rounded-lg">
                      {errorMessage}
                    </div>
                  )}
                  {submitted && (
                    <div className="p-4 bg-primary/10 border border-primary/40 text-primary text-sm rounded-lg flex items-center gap-2">
                      <Check size={16} /> Appointment request recorded and connecting to WhatsApp concierge.
                    </div>
                  )}
                  {/* Service Selection */}
                  <div>
                    <label className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4 block">Bespoke Service</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {services.map((service) => (
                        <div 
                          key={service.id}
                          onClick={() => setSelectedService(service.id)}
                          className={`cursor-pointer rounded-xl border p-4 text-center transition-all duration-300 relative ${
                            selectedService === service.id 
                              ? "bg-primary text-primary-foreground border-primary font-bold shadow-[0_2px_12px_rgba(180,133,32,0.25)]" 
                              : "bg-secondary/50 border-border text-muted-foreground hover:bg-background hover:border-primary/50 hover:text-foreground"
                          }`}
                        >
                          <span className="text-xs font-serif tracking-wide">{service.label}</span>
                          {selectedService === service.id && (
                            <div className="absolute -top-1.5 -right-1.5 bg-background text-primary rounded-full p-1 border border-primary shadow-xs">
                              <Check size={10} strokeWidth={3} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground ml-1">Full Name</label>
                      <Input 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alexander Wright" 
                        required
                        className="bg-background border-border h-12 rounded-xl text-foreground focus:border-primary placeholder:text-muted-foreground transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground ml-1">WhatsApp / Phone</label>
                      <Input 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+62 812..." 
                        required
                        className="bg-background border-border h-12 rounded-xl text-foreground focus:border-primary placeholder:text-muted-foreground transition-all" 
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground ml-1">Preferred Date</label>
                       <Input 
                         type="date" 
                         value={preferredDate}
                         onChange={(e) => setPreferredDate(e.target.value)}
                         className="bg-background border-border h-12 rounded-xl text-foreground focus:border-primary transition-all" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground ml-1">Preferred Time</label>
                       <Input 
                         type="time" 
                         value={preferredTime}
                         onChange={(e) => setPreferredTime(e.target.value)}
                         className="bg-background border-border h-12 rounded-xl text-foreground focus:border-primary transition-all" 
                       />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground ml-1">Specific Requests</label>
                    <Textarea 
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Inform us about your desired fabric, event date, or silhouette..." 
                      className="bg-background border-border min-h-[120px] rounded-xl text-foreground focus:border-primary placeholder:text-muted-foreground transition-all resize-none" 
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-primary hover:bg-gold-dark text-primary-foreground font-serif text-xs font-bold tracking-[0.25em] uppercase h-14 rounded-full shadow-[0_4px_20px_rgba(180,133,32,0.25)] hover:shadow-[0_6px_25px_rgba(180,133,32,0.35)] transition-all cursor-pointer border-none"
                  >
                    {loading ? "CONNECTING TO ATELIER..." : "RESERVE BESPOKE FITTING"}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground pt-4">
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

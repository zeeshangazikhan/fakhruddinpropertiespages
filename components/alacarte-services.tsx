"use client"

import { useEffect, useRef, useState } from "react"
import { 
  Car, 
  Ship, 
  MapPin, 
  Fuel, 
  Wrench, 
  Sparkles, 
  HeartPulse, 
  ShoppingCart, 
  Baby, 
  PawPrint,
  PhoneCall,
  ChevronRight
} from "lucide-react"

const services = [
  { icon: Car, title: "Chauffeur Driven Transportation" },
  { icon: Ship, title: "Private Boating With Captain" },
  { icon: MapPin, title: "In-House Island Transfers" },
  { icon: Fuel, title: "Vehicle Care And Refuelling" },
  { icon: Wrench, title: "In-Residence Maintenance" },
  { icon: Sparkles, title: "In-Home Massage Services" },
  { icon: HeartPulse, title: "Health Consultations" },
  { icon: ShoppingCart, title: "Grocery And Shopping Assistance" },
  { icon: Baby, title: "Childcare Assistance" },
  { icon: PawPrint, title: "Pet Services" },
  { icon: PhoneCall, title: "24-Hour Emergency Repair" },
]

export function AlaCarteServices() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-32 bg-[#334058] overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 border border-[#DAAA97]/20 rounded-full" />
        <div className="absolute top-20 left-20 w-48 h-48 border border-[#DAAA97]/10 rounded-full" />
        <div className="absolute bottom-10 right-10 w-40 h-40 border border-white/10 rounded-full" />
        <div className="absolute bottom-20 right-20 w-64 h-64 border border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#DAAA97]/5 to-transparent rounded-full opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            
            {/* Left Column - Sticky Header */}
            <div className={`lg:col-span-2 lg:sticky lg:top-32 transition-all duration-1000 text-center lg:text-left ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#DAAA97]/15 border border-[#DAAA97]/30 mb-6 backdrop-blur-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-[#DAAA97] animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold text-[#DAAA97] uppercase tracking-widest">On-Demand</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                À La Carte Services
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#DAAA97] to-transparent mb-6 mx-auto lg:mx-0" />
              
              <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                Extra services are available when you need them. From transport and boating to home care and wellness support, you can add help on demand for an easier, worry-free lifestyle.
              </p>
            </div>

            {/* Right Column - Services List */}
            <div className={`lg:col-span-3 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="space-y-3 sm:space-y-4">
                {services.map((service, index) => {
                  const IconComponent = service.icon
                  const isActive = activeIndex === index
                  
                  return (
                    <div
                      key={index}
                      className={`group relative flex items-center gap-4 sm:gap-6 p-4 sm:p-5 md:p-6 rounded-2xl cursor-pointer transition-all duration-500 ${
                        isActive 
                          ? "bg-[#DAAA97] shadow-2xl shadow-[#DAAA97]/30 scale-[1.02]" 
                          : "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#DAAA97]/30"
                      }`}
                      style={{ transitionDelay: `${index * 50}ms` }}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                    >
                      {/* Number Badge */}
                      <div className={`hidden sm:flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-colors duration-300 ${
                        isActive ? "bg-white/20 text-white" : "bg-white/10 text-white/50"
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      {/* Icon */}
                      <div className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? "bg-white/20" 
                          : "bg-gradient-to-br from-[#DAAA97]/20 to-[#DAAA97]/5 group-hover:from-[#DAAA97]/30 group-hover:to-[#DAAA97]/10"
                      }`}>
                        <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
                          isActive ? "text-white" : "text-[#DAAA97]"
                        }`} />
                      </div>

                      {/* Title */}
                      <h3 className={`flex-1 text-sm sm:text-base md:text-lg font-semibold transition-colors duration-300 ${
                        isActive ? "text-white" : "text-white/90"
                      }`}>
                        {service.title}
                      </h3>

                      {/* Active Indicator Line */}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Bottom Stats */}
              <div className={`mt-10 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-black text-[#DAAA97]">11+</p>
                  <p className="text-xs sm:text-sm text-white/50 mt-1">Services</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-black text-[#DAAA97]">24/7</p>
                  <p className="text-xs sm:text-sm text-white/50 mt-1">Availability</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-black text-[#DAAA97]">1 App</p>
                  <p className="text-xs sm:text-sm text-white/50 mt-1">To Access All</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { 
  Shield, 
  Paintbrush, 
  SprayCan, 
  Zap, 
  File, 
  Bell, 
  Users, 
  Wifi, 
  Coffee,
  UserCheck,
  CheckCircle2
} from "lucide-react"

const coreServices = [
  { icon: Shield, title: "24/7 Security" },
  { icon: Paintbrush, title: "Common Area Maintenance" },
  { icon: SprayCan, title: "Common Area Housekeeping" },
  { icon: Zap, title: "Utilities for Common Areas" },
  { icon: File, title: "Property Insurance" },
  { icon: Bell, title: "Residence Bellboy Services" },
  { icon: Users, title: "General & Admin Support" },
  { icon: Wifi, title: "Residence Lounge WiFi" },
  { icon: Coffee, title: "Lobby Coffee Machine" },
  { icon: UserCheck, title: "Clubhouse/Lounge Staff" },
]

export function CoreServices() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
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
      className="relative py-16 md:py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#f8f6f3] to-transparent" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#DAAA97]/5 rounded-full blur-3xl" />
      <div className="absolute top-20 right-20 w-40 h-40 border border-[#DAAA97]/10 rounded-full" />
      <div className="absolute top-32 right-32 w-24 h-24 border border-[#334058]/5 rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#DAAA97]/10 border border-[#DAAA97]/25 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#DAAA97] animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-[#DAAA97] uppercase tracking-widest">Included With Every Home</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#334058] leading-tight mb-4">
              Core Services
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#DAAA97] to-transparent mx-auto mb-6" />
            <p className="max-w-2xl mx-auto text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
              Treppan Living Privé is fully serviced, with everyday operations handled for you. Shared areas are cleaned and maintained regularly, utilities are covered in common spaces, and on-site support keeps things running smoothly.
            </p>
          </div>

          {/* Services - Unique Accordion Style */}
          <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {coreServices.map((service, index) => {
                const IconComponent = service.icon
                const isHovered = hoveredIndex === index
                
                return (
                  <div
                    key={index}
                    className={`group relative flex items-center gap-4 p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-400 ${
                      isHovered 
                        ? "bg-[#334058] shadow-xl shadow-[#334058]/20" 
                        : "bg-[#f8f6f3] hover:bg-[#f0ebe5]"
                    }`}
                    style={{ transitionDelay: `${index * 40}ms` }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Checkmark */}
                    <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isHovered 
                        ? "bg-[#DAAA97]" 
                        : "bg-white shadow-sm"
                    }`}>
                      <CheckCircle2 className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
                        isHovered ? "text-white" : "text-[#DAAA97]"
                      }`} />
                    </div>

                    {/* Icon + Title */}
                    <div className="flex-1 flex items-center gap-3">
                      <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
                        isHovered ? "text-[#DAAA97]" : "text-[#334058]/50"
                      }`} />
                      <span className={`text-sm sm:text-base font-semibold transition-colors duration-300 ${
                        isHovered ? "text-white" : "text-[#334058]"
                      }`}>
                        {service.title}
                      </span>
                    </div>

                    {/* Number Badge */}
                    <span className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center transition-all duration-300 ${
                      isHovered 
                        ? "bg-[#DAAA97] text-white scale-100" 
                        : "bg-transparent scale-0"
                    }`}>
                      {index + 1}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bottom Feature Pills */}

        </div>
      </div>
    </section>
  )
}

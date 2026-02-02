"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Crown, Building, Star, Gem, Heart, Waves, Leaf, Sun } from "lucide-react"
import { Modal } from "@/components/form-modals/common-form-modal"

export function ResortLiving() {
  const [isVisible, setIsVisible] = useState(false)
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

  const features = [
    { icon: MapPin, label: "Prime Location", description: "Beachside living" },
    { icon: Crown, label: "Luxury Experience", description: "5-star standards" },
    { icon: Building, label: "Premium Architecture", description: "Modern design" },
    { icon: Star, label: "5 Star Living", description: "Resort lifestyle" },
    { icon: Gem, label: "Classy Amenities", description: "46+ facilities" },
    { icon: Heart, label: "Cohesive Community", description: "Wellness focused" },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-[#334058]"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-[#DAAA97]/20 via-[#DAAA97]/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#DAAA97]/15 via-[#DAAA97]/5 to-transparent rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        
        {/* Decorative Lines */}
        <div className="absolute top-20 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#DAAA97]/20 to-transparent" />
        <div className="absolute bottom-20 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#DAAA97]/20 to-transparent" />
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 right-10 md:right-20">
          <Waves className="w-8 h-8 text-[#DAAA97]/20 animate-pulse" style={{ animationDuration: '3s' }} />
        </div>
        <div className="absolute bottom-1/4 left-10 md:left-20">
          <Leaf className="w-8 h-8 text-[#DAAA97]/20 animate-pulse" style={{ animationDuration: '4s' }} />
        </div>
        <div className="absolute top-1/2 right-1/4">
          <Sun className="w-6 h-6 text-[#DAAA97]/15 animate-spin" style={{ animationDuration: '20s' }} />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#DAAA97]/15 border border-[#DAAA97]/30 mb-6 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#DAAA97] animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-[#DAAA97] uppercase tracking-widest">A Wellness Home</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              With Resort Living Built In
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#DAAA97] to-transparent mx-auto" />
          </div>

          {/* Two Column Layout */}
          <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {/* Left - Description & CTA */}
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-white/80 text-base md:text-lg leading-relaxed">
                  Treppan Living Privé is a residential project by <span className="text-[#DAAA97] font-semibold">Fakhruddin Properties</span>, designed for people who want comfort, privacy, and a calmer pace of living.
                </p>
                <p className="text-white/70 text-base md:text-lg leading-relaxed">
                  It brings together <span className="text-white font-semibold">46 amenities</span> and biohacking-focused experiences, so wellness feels close, easy, and part of daily routine.
                </p>
                <p className="text-white/70 text-base md:text-lg leading-relaxed">
                  Homes are supported by clean indoor air, mineralised drinking water, AI-enabled features, and service-led operations.
                </p>
              </div>

              {/* Price & CTA */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 border-t border-white/10 text-center sm:text-left">
                <div>
                  <p className="text-xl sm:text-2xl font-semibold text-white">Price To Be announced</p>
                </div>
                <Modal title="Download Brochure" pdfUrl="/Treppan-Living-Prive-Brochure.pdf" />
              </div>
            </div>

            {/* Right - Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className={`group relative p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#DAAA97]/40 hover:bg-[#DAAA97]/10 transition-all duration-500 text-center md:text-left ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{ transitionDelay: `${300 + idx * 100}ms` }}
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#DAAA97]/0 to-[#DAAA97]/0 group-hover:from-[#DAAA97]/10 group-hover:to-transparent transition-all duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#DAAA97]/20 to-[#DAAA97]/5 flex items-center justify-center mb-4 mx-auto md:mx-0 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6 text-[#DAAA97]" />
                    </div>
                    <h3 className="text-white font-semibold text-sm sm:text-base mb-1">{feature.label}</h3>
                    <p className="text-white/50 text-xs sm:text-sm">{feature.description}</p>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden rounded-tr-2xl">
                    <div className="absolute top-0 right-0 w-6 h-6 bg-[#DAAA97]/0 group-hover:bg-[#DAAA97]/20 transform rotate-45 translate-x-3 -translate-y-3 transition-all duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Stats */}
          <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {[
              { number: "46+", label: "Premium Amenities" },
              { number: "24/7", label: "Concierge Service" },
              { number: "100%", label: "Wellness Focused" },
              { number: "5★", label: "Living Standard" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#DAAA97]/30 transition-all duration-300">
                <p className="text-2xl sm:text-3xl font-bold text-[#DAAA97] mb-1">{stat.number}</p>
                <p className="text-xs sm:text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

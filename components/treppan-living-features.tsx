"use client"

import { useEffect, useRef, useState } from "react"
import { 
  Cpu, 
  Wind, 
  Droplets, 
  Recycle, 
  Leaf, 
  Smartphone, 
  Bot, 
  Shield 
} from "lucide-react"

const features = [
  {
    icon: Cpu,
    title: "AI-Enabled Smart Homes",
    description: "AI-enabled homes support day-to-day convenience, with key functions designed to feel simple and natural, not complicated.",
  },
  {
    icon: Wind,
    title: "Purest Indoor Air Quality",
    description: "Indoor air quality is a core focus, supported by the project's clean-air promise as part of the Treppan Living features.",
  },
  {
    icon: Droplets,
    title: "Mineralised Drinking Water",
    description: "Centralised, mineralised hydrogenated drinking water is provided as part of daily living, available directly for residents.",
  },
  {
    icon: Recycle,
    title: "Efficient Waste Management",
    description: "Efficient waste management and recycling are built into operations, keeping sustainability practical and easy to maintain.",
  },
  {
    icon: Leaf,
    title: "Radiant Cooled Greenhouse Cafe",
    description: "A radiant-cooled Greenhouse Cafe with hydroponics is part of the lifestyle experience, designed as a daily-use amenity.",
  },
  {
    icon: Smartphone,
    title: "Master Control Mobile App",
    description: "Residents get master control through a single mobile app, bringing everyday home functions into one simple place, at their fingertips.",
  },
  {
    icon: Bot,
    title: "Robot Delivery And Facial Access",
    description: "An intelligent robot delivery system and facial recognition access control support convenience and smoother building access.",
  },
  {
    icon: Shield,
    title: "Service-Led Living",
    description: "A fully serviced community with round-the-clock security, shared-area upkeep, and concierge-style support, so daily living feels smooth and worry-free.",
  },
]

export function TreppanLivingFeatures() {
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

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-32 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#DAAA97]/10 via-[#DAAA97]/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#334058]/10 via-[#334058]/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 md:mb-16 lg:mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#DAAA97]/15 border border-[#DAAA97]/30 mb-6 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-[#DAAA97] animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-[#DAAA97] uppercase tracking-widest">Smart Living</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Treppan Living Features
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#DAAA97] to-transparent mx-auto" />
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto">
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="group relative p-5 sm:p-6 md:p-7 rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#DAAA97]/50 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#DAAA97]/10 overflow-hidden"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  {/* Hover Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#DAAA97]/10 via-transparent to-[#334058]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl md:rounded-3xl" />

                  {/* Icon Container */}
                  <div className="relative mb-4 md:mb-5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#DAAA97]/20 to-[#DAAA97]/5 border border-[#DAAA97]/30 flex items-center justify-center group-hover:scale-110 group-hover:border-[#DAAA97]/50 transition-all duration-300 shadow-lg">
                      <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#DAAA97]" />
                    </div>
                    {/* removed hover dot */}
                  </div>

                  {/* Feature Title */}
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-[#DAAA97] transition-colors duration-300 leading-tight">
                    {feature.title}
                  </h3>

                  {/* Feature Description */}
                  <p className="text-white/60 text-xs sm:text-sm md:text-base leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Bottom Line Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#DAAA97] to-[#334058] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl md:rounded-b-3xl" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

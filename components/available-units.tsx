"use client"

import { useEffect, useRef, useState } from "react"
import { Home, Building2, Castle, Sparkles, ArrowRight, Check } from "lucide-react"
import { OverviewContent, defaultOverviewContent } from "@/lib/strapi"

interface AvailableUnitsProps {
  content?: OverviewContent;
}

export function AvailableUnits({ content }: AvailableUnitsProps) {
  const overviewData = content || defaultOverviewContent;
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

  const iconMap = {
    '1 Bed Suite': Home,
    '2 Bed Suite': Building2,
    '4 Bed Penthouse': Castle,
  };

  const getIcon = (title: string) => {
    return iconMap[title as keyof typeof iconMap] || Home;
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-gradient-to-b from-[#f7f5f2] via-white to-[#f7f5f2] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#DAAA97]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#334058]/5 to-transparent rounded-full blur-3xl" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#334058 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#DAAA97]/10 border border-[#DAAA97]/25 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#DAAA97] animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-[#DAAA97] uppercase tracking-widest">Choose Your Home</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#334058] mb-4">
            {overviewData.sectionTitle}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#DAAA97] to-transparent mx-auto" />
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Units Grid - Unique Card Design */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {overviewData.units.map((unit, index) => {
              const IconComponent = getIcon(unit.title);
              const isHovered = hoveredIndex === index;
              
              return (
                <div
                  key={index}
                  className={`group relative cursor-pointer transition-all duration-500 ${isHovered ? 'z-10' : 'z-0'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Card */}
                  <div className={`relative h-full p-6 sm:p-8 rounded-3xl transition-all duration-500 overflow-hidden ${isHovered ? 'bg-[#334058] scale-[1.02] shadow-2xl shadow-[#334058]/30' : 'bg-white shadow-lg border border-gray-100'}`}>
                    
                    {/* Top Badge */}
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${isHovered ? 'bg-[#DAAA97] text-white' : 'bg-[#DAAA97]/10 text-[#DAAA97]'}`}>
                      {unit.count}
                    </div>

                    {/* Icon */}
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${isHovered ? 'bg-[#DAAA97] rotate-3 scale-110' : 'bg-gradient-to-br from-[#334058] to-[#4a5d7a]'}`}>
                      <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className={`text-xl sm:text-2xl font-bold mb-4 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-[#334058]'}`}>
                      {unit.title}
                    </h3>

                    {/* Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${isHovered ? 'bg-[#DAAA97]/30' : 'bg-[#DAAA97]/10'}`}>
                          <Check className={`w-3.5 h-3.5 ${isHovered ? 'text-[#DAAA97]' : 'text-[#DAAA97]'}`} />
                        </div>
                        <p className={`text-sm sm:text-base transition-colors duration-300 ${isHovered ? 'text-white/80' : 'text-gray-600'}`}>
                          <span className={`font-semibold ${isHovered ? 'text-white' : 'text-[#334058]'}`}>Size:</span> {unit.size}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${isHovered ? 'bg-[#DAAA97]/30' : 'bg-[#DAAA97]/10'}`}>
                          <Check className={`w-3.5 h-3.5 ${isHovered ? 'text-[#DAAA97]' : 'text-[#DAAA97]'}`} />
                        </div>
                        <p className={`text-sm sm:text-base transition-colors duration-300 ${isHovered ? 'text-white/80' : 'text-gray-600'}`}>
                          <span className={`font-semibold ${isHovered ? 'text-white' : 'text-[#334058]'}`}>Units:</span> {unit.count}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className={`pt-4 border-t transition-colors duration-300 ${isHovered ? 'border-white/20' : 'border-gray-100'}`}>
                      <p className={`font-bold text-lg sm:text-xl transition-colors duration-300 ${isHovered ? 'text-[#DAAA97]' : 'text-[#334058]'}`}>
                        {unit.price}
                      </p>
                    </div>

                    {/* Hover Arrow */}
                    <div className={`absolute bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isHovered ? 'bg-[#DAAA97] opacity-100 translate-x-0' : 'bg-gray-100 opacity-0 translate-x-4'}`}>
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>

                    {/* Bottom Gradient Line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#DAAA97] via-[#e8c4b3] to-[#DAAA97] transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                </div>
              )})}
          </div>

          {/* Total Units Card */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="relative p-8 sm:p-10 md:p-12 rounded-3xl bg-gradient-to-br from-[#334058] via-[#3d4d6a] to-[#2c3a4f] overflow-hidden group hover:shadow-[0_25px_60px_-15px_rgba(51,64,88,0.5)] transition-all duration-700">
              {/* Background Elements */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,#DAAA97_0%,transparent_50%)] opacity-20" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,#DAAA97_0%,transparent_50%)] opacity-20" />
              </div>
              <div className="absolute -right-20 -top-20 w-60 h-60 bg-[#DAAA97]/20 rounded-full blur-3xl group-hover:bg-[#DAAA97]/30 transition-all duration-700" />
              <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-[#DAAA97]/10 rounded-full blur-3xl group-hover:bg-[#DAAA97]/20 transition-all duration-700" />

              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-center">
                <div className="hidden sm:flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#DAAA97]/30 to-[#DAAA97]/10 border border-[#DAAA97]/40 shadow-lg shadow-[#DAAA97]/20">
                  <Sparkles className="w-10 h-10 text-[#DAAA97]" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DAAA97]/20 border border-[#DAAA97]/30 mb-3">
                    <div className="w-2 h-2 rounded-full bg-[#DAAA97] animate-pulse" />
                    <p className="text-xs text-[#DAAA97] uppercase tracking-[0.2em] font-bold">{overviewData.totalUnitsLabel}</p>
                  </div>
                  <div className="flex items-baseline gap-3 justify-center">
                    <span className="text-5xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#DAAA97] to-white" style={{ backgroundSize: '200% auto' }}>
                      {overviewData.totalUnits}
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-white/80">Units</span>
                  </div>
                  <p className="text-white/60 text-sm sm:text-base mt-3">Premium Residences at {overviewData.projectName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

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
                  <div className={`relative h-full p-6 sm:p-8 rounded-3xl transition-all duration-500 overflow-hidden text-center md:text-left ${isHovered ? 'bg-[#334058] scale-[1.02] shadow-2xl shadow-[#334058]/30' : 'bg-white shadow-lg border border-gray-100'}`}>

                    {/* Icon */}
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0 transition-all duration-500 ${isHovered ? 'bg-[#DAAA97] rotate-3 scale-110' : 'bg-gradient-to-br from-[#334058] to-[#4a5d7a]'}`}>
                      <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className={`text-xl sm:text-2xl font-bold mb-4 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-[#334058]'}`}>
                      {unit.title}
                    </h3>

                    {/* Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 justify-center md:justify-start">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${isHovered ? 'bg-[#DAAA97]/30' : 'bg-[#DAAA97]/10'}`}>
                          <Check className={`w-3.5 h-3.5 ${isHovered ? 'text-[#DAAA97]' : 'text-[#DAAA97]'}`} />
                        </div>
                        <p className={`text-sm sm:text-base transition-colors duration-300 ${isHovered ? 'text-white/80' : 'text-gray-600'}`}>
                          <span className={`font-semibold ${isHovered ? 'text-white' : 'text-[#334058]'}`}>Size:</span> {unit.size}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    {unit.price && (
                      <div className={`pt-4 border-t transition-colors duration-300 ${isHovered ? 'border-white/20' : 'border-gray-100'}`}>
                        <p className={`font-bold text-lg sm:text-xl transition-colors duration-300 ${isHovered ? 'text-[#DAAA97]' : 'text-[#334058]'}`}>
                          {unit.price}
                        </p>
                      </div>
                    )}



                    {/* Bottom Gradient Line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#DAAA97] via-[#e8c4b3] to-[#DAAA97] transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                </div>
              )})}
          </div>


        </div>
      </div>
    </section>
  )
}

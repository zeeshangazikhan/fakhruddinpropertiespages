"use client"

import { useEffect, useRef, useState } from "react"
import { Home, Building2, Castle, Sparkles, MapPin, Crown, Building, Star, Gem, Heart, Download } from "lucide-react"
import { OverviewContent, defaultOverviewContent } from "@/lib/strapi"
import { DownloadBrochureModal } from "@/components/download-brochure-modal"
import { Button } from "@/components/ui/button"

interface OverviewProps {
  isGlobalPage?: boolean;
  isEOIPage?: boolean;
  content?: OverviewContent;
}

export function Overview({ isGlobalPage, isEOIPage, content }: OverviewProps) {
  // Use provided content or fallback to defaults
  const overviewData = content || defaultOverviewContent;
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
      className="relative py-20 md:py-28 lg:py-28 bg-gradient-to-br from-white via-[#f7f5f2] to-[#f3efe9] overflow-hidden"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#DAAA97]/10 via-[#DAAA97]/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#334058]/10 via-[#334058]/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#DAAA97]/5 to-transparent rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Wellness Home Section */}
        <div className={`text-center mb-16 md:mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-sm sm:text-base text-[#DAAA97] font-semibold uppercase tracking-widest mb-3">A Wellness Home</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#334058] leading-tight mb-6">
            With Resort Living Built In
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
            Treppan Living Privé is a residential project by Fakhruddin Properties, designed for people who want comfort, privacy, and a calmer pace of living.
          </p>
          <p className="max-w-3xl mx-auto text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
            It brings together 46 amenities and biohacking-focused experiences, so wellness feels close, easy, and part of daily routine rather than a special plan.
          </p>
          <p className="max-w-3xl mx-auto text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-8">
            Homes are supported by clean indoor air, mineralised drinking water, AI-enabled features, and service-led operations that keep shared spaces running smoothly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-10">
            {!isEOIPage && (
              <>
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Starting Price</p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-[#334058]">AED 2.9M</p>
                </div>
                <DownloadBrochureModal>
                  <Button className="bg-gradient-to-r from-[#DAAA97] to-[#c99a87] text-white px-8 py-4 text-base font-semibold flex items-center gap-2 shadow-lg rounded-xl hover:scale-105 transition-transform">
                    <Download className="w-5 h-5" />
                    Download Brochure
                  </Button>
                </DownloadBrochureModal>
              </>
            )}
          </div>
          {/* Feature Boxes */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {[
              { icon: MapPin, label: "Prime Location" },
              { icon: Crown, label: "Inspired For Luxury Experience" },
              { icon: Building, label: "Premium Architecture" },
              { icon: Star, label: "5 Star Life Standard" },
              { icon: Gem, label: "Classy Spaces & Amenities" },
              { icon: Heart, label: "Cohesive Life, Humanitarian Community" },
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center p-4 rounded-2xl bg-white border border-gray-100 shadow hover:shadow-lg hover:border-[#DAAA97]/40 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-[#DAAA97] mb-2" />
                <span className="text-xs sm:text-sm text-[#334058] font-medium text-center leading-tight">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Header Section */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span style={{ animationDuration: '8s' }} className="bg-gradient-to-r from-[#334058] via-[#DAAA97] to-[#4a5d7a] bg-clip-text text-transparent tracking-tight max-w-3xl mx-auto block drop-shadow-[0_8px_30px_rgba(51,64,88,0.15)] animate-shimmer transition-transform duration-500 ease-out hover:scale-105">
              {overviewData.sectionTitle}
            </span>
            <span className="mt-3 block h-1 w-36 bg-gradient-to-r from-transparent via-[#DAAA97] to-transparent rounded-full mx-auto opacity-90" />
          </h2>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Units Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {overviewData.units.map((unit, index) => {
              const IconComponent = getIcon(unit.title);
              return (
              <div
                key={index}
                className="group relative p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-[#DAAA97]/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden text-center md:text-left"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Hover Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#DAAA97]/10 via-transparent to-[#334058]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon Container */}
                <div className="relative mb-5">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#334058] to-[#4a5d7a] flex items-center justify-center mx-auto md:mx-0 group-hover:scale-105 transition-all duration-300 shadow-lg">
                    <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#DAAA97] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" />
                </div>

                {/* Unit Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#334058] mb-4 group-hover:text-[#DAAA97] transition-colors duration-300">
                  {unit.title}
                </h3>

                {/* Unit Details */}
                  <div className="space-y-3">
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <div className="w-2 h-2 rounded-full bg-[#DAAA97]" />
                    <p className="text-gray-600 text-sm sm:text-base">
                      <span className="font-semibold text-[#334058]">Size:</span> {unit.size}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <div className="w-2 h-2 rounded-full bg-[#DAAA97]" />
                    <p className="text-gray-600 text-sm sm:text-base">
                      <span className="font-semibold text-[#334058]">Units Available:</span> {unit.count}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-gray-100">
                    <p className="text-[#DAAA97] font-semibold text-sm sm:text-base italic">
                      {unit.price}
                    </p>
                  </div>
                </div>

                {/* Bottom Line Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#DAAA97] to-[#334058] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            )})}
          </div>

          {/* Total Units Card */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="relative p-8 sm:p-10 md:p-12 rounded-3xl bg-gradient-to-br from-[#334058] via-[#3d4d6a] to-[#2c3a4f] overflow-hidden group hover:shadow-[0_25px_60px_-15px_rgba(51,64,88,0.5)] transition-all duration-700">
              {/* Animated Background Elements */}
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
                    <span className="text-5xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#DAAA97] to-white animate-shimmer" style={{ backgroundSize: '200% auto', animationDuration: '12s' }}>
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

"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Download } from "lucide-react"
import { HeroContent, defaultHeroContent } from "@/lib/strapi"
import { Modal } from "@/components/form-modals/common-form-modal"

interface HeroProps {
  isGlobalPage?: boolean;
  isEOIPage?: boolean;
  content?: HeroContent;
}

export function Hero({ isGlobalPage, isEOIPage, content }: HeroProps) {
  // Use provided content or fallback to defaults
  const heroData = content || defaultHeroContent;
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollToForm = () => {
    const formElement = document.getElementById('eoi-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // const [brochureOpen, setBrochureOpen] = useState(false);
  const tabs = isGlobalPage ? [
    // { value: "46+", label: "Resort Amenities" },
    // { value: "2 Mins", label: "to Beach" },
    // { value: "1, 2 & 3 BR", label: "Fully furnished" },
  ] : [
    // { value: "46+", label: "Resort Amenities" },
    //  { value: "2 Mins", label: "to Beach" },
    // { value: "1, 2 & 4 BR", label: "Fully furnished" },
  ];

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative flex items-center justify-center overflow-hidden py-20 md:py-20 lg:py-0 lg:h-screen">
      <div
        className="absolute inset-0 bg-cover bg-[position:25%_center] md:bg-center transition-transform duration-12000 ease-out scale-110"
        style={{
          backgroundImage: isEOIPage ? "url('/treppan-living-prive-images/treppan-living-prive-hero.webp')" : "url('/aminities-1.webp')",
          transform: isVisible ? "scale(1)" : "scale(1.2)",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-[#1a1a1a]/20" />
      </div>

      <div className="absolute top-20 right-20 w-64 h-64 bg-[#DAAA97]/10 rounded-lg blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#334058]/10 rounded-lg blur-3xl animate-float-delayed" />

      <div
        className={`relative z-10 container mx-auto px-6 text-center transition-all duration-1500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
      >
        {/* <div className="mb-6 animate-fade-in">
          <div className="inline-block px-6 py-2 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 mb-6">
            <p className="text-sm font-semibold text-white uppercase tracking-[0.2em]">
              Dubai Islands • Launching Soon
            </p>
          </div>
        </div> */}

        {/*
        <div className="mb-6">
          <div className="inline-block animate-fade-in animation-delay-200">
            <img
              src="/serenique-new-logo.webp"
              alt="Treppan Serenique Prive"
              className="mx-auto w-80 sm:w-96 md:w-180 object-contain drop-shadow-2xl"
            />
          </div>
        </div>
        */}

        <div className="max-w-4xl mx-auto mb-4 sm:mb-6 animate-fade-in animation-delay-500">
          <div className="mb-2 sm:mb-3">
            <img
              src="/treppan-living-prive-svg2.svg"
              alt="Treppan Living Privé"
              className="mx-auto w-[300px] sm:w-[500px] md:w-[600px] object-contain drop-shadow-2xl filter brightness-0 invert"
            />
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl text-white font-light leading-relaxed drop-shadow-lg mb-6">
            {heroData.subtitle}
          </p>
          <p className="text-sm sm:text-base text-white/80 italic leading-relaxed drop-shadow-lg">
            {heroData.description}
          </p>
          <div className="w-16 sm:w-24 h-1 bg-linear-to-r from-transparent via-[#DAAA97] to-transparent mx-auto mt-4" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-fade-in animation-delay-700">
          {isEOIPage ? (
            <button
              onClick={handleScrollToForm}
              className="w-full sm:w-auto bg-gradient-to-r from-[#DAAA97] to-[#c99a87] hover:from-[#e5baa7] hover:to-[#d9aa97] text-white px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Express Interest
            </button>
          ) : (
            <>
              <div className="w-full sm:w-auto flex justify-center">
                <Modal title="Download Brochure" pdfUrl="/Treppan-Living-Prive-Brochure.pdf" />
              </div>
              <div className="w-full sm:w-auto flex justify-center">
                <Modal title="Book a Meeting" />
              </div>
            </>
          )}
        </div>

        <div className="mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-8 max-w-5xl mx-auto animate-fade-in animation-delay-800 items-center justify-center place-items-center">
          {(heroData.stats || tabs).map((stat, index) => (
            <div key={index} className="group">
              <div className="glass-effect rounded-lg p-4 sm:p-6 transform hover:scale-105 transition-all duration-500 hover:bg-white/15">
                <p className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2" dangerouslySetInnerHTML={{ __html: stat.value }} />
                <p className="text-xs sm:text-sm text-white/80 uppercase tracking-wider">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
       
      </div>
    </section>
  )
}

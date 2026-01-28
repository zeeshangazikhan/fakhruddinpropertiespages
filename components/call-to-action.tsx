"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { MapPin, Award, Home } from "lucide-react"
import { BookMeetingModal } from "@/components/form-modals/book-meeting-modal"
import { DownloadBrochureModal2 } from "@/components/download-brochure-modal2"
import { Modal } from "./form-modals/common-form-modal"

export function CallToAction() {
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
      className="relative py-24 md:py-32 bg-gradient-to-br from-[#22313f] via-[#334a62] to-[#3d5a80] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="absolute -top-12 left-6 w-80 h-80 bg-white/6 rounded-2xl blur-3xl animate-float" />
        <div className="absolute bottom-10 -right-10 w-96 h-96 bg-[#DAAA97]/20 rounded-2xl blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-[#334058]/6 rounded-2xl blur-3xl animate-pulse-slow" />
      </div>

      <div
        className="absolute inset-0 opacity-6"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "48px 48px" }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className={`text-center mb-10 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#DAAA97]/15 border border-[#DAAA97]/30 mb-6 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#DAAA97] animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-[#DAAA97] uppercase tracking-widest">UAE's First Longevity Living Community</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Ready to Experience Treppan Living Prive?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#DAAA97] to-transparent mx-auto mb-6" />
            <p className="max-w-3xl mx-auto text-white/80 text-sm sm:text-base md:text-lg mb-3">
              Step into a world where thoughtful design meets future-ready living.
            </p>
            <p className="max-w-3xl mx-auto text-white/70 text-sm sm:text-base md:text-lg">
              Experience a tranquil, villa-led sanctuary with calm at its core. From AI-enabled smart homes to wellness-centred design and 20+ curated amenities, Treppan Serenique Prive transforms everyday life into a rhythm of balance and ease.
            </p>
          </div>

          {/*
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12 animate-fade-in animation-delay-400">
            {[
              { icon: Home, title: "Fully Furnished AI-Enabled Residences", desc: "Apartments and sky villas come fully furnished with elegant, ready-to-live interiors and integrated AI smart-home systems." },
              { icon: Award, title: "Extensive Resort-Style Amenities", desc: "Two full floors dedicated to fitness, entertainment, wellness, recreation and leisure — 20+ curated amenities for every age." },
              { icon: MapPin, title: "Wellness & Longevity Lab", desc: "A dedicated biohacking and wellness lab plus smart sustainable systems, purified water, and clean indoor air to prioritise resident health." },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-5 md:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <feature.icon className="w-6 md:w-8 h-6 md:h-8 text-[#DAAA97] mb-3" />
                <h3 className="text-white font-semibold text-base md:text-lg mb-1">{feature.title}</h3>
                <p className="text-white/70 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
          */}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-center animate-fade-in animation-delay-500">
            <div className="w-full sm:w-auto flex justify-center">
              <Modal title="Book a meeting" />
            </div>
            <div className="w-full sm:w-auto flex justify-center">
              <Modal title="Download Brochure" pdfUrl="/Treppan-Tower-Brochure.pdf" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2 } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

const amenitiesImages = [
  { src: "/treppan-living-prive-images/exterior/AquaGym.webp", title: "Aqua Gym", subtitle: "Wellness", description: "State-of-the-art underwater fitness experience" },
  { src: "/treppan-living-prive-images/exterior/Pool01.webp", title: "Infinity Pool", subtitle: "Relaxation", description: "Stunning poolside luxury with panoramic views" },
  { src: "/treppan-living-prive-images/exterior/Pool02.webp", title: "Resort Pool", subtitle: "Leisure", description: "Crystal clear waters for ultimate refreshment" },
  { src: "/treppan-living-prive-images/exterior/RoofTop-Pool-01.webp", title: "Rooftop Pool", subtitle: "Sky Living", description: "Breathtaking city views from above" },
  { src: "/treppan-living-prive-images/exterior/RoofTop-Pool02.webp", title: "Sky Lounge", subtitle: "Elevation", description: "Elevated luxury living experience" },
  { src: "/treppan-living-prive-images/exterior/RoofTop-Pool03.webp", title: "Sunset Deck", subtitle: "Golden Hour", description: "Watch the sun paint the sky in gold" },
  { src: "/treppan-living-prive-images/exterior/Pool_Lounge.webp", title: "Pool Lounge", subtitle: "Comfort", description: "Ultimate comfort by the shimmering water" },
  { src: "/treppan-living-prive-images/exterior/GreenCafe01.webp", title: "Green Café", subtitle: "Organic", description: "Farm-to-table organic dining experience" },
  { src: "/treppan-living-prive-images/exterior/GreenCafe02.webp", title: "Garden Bistro", subtitle: "Nature", description: "Dine amidst lush green surroundings" },
  { src: "/treppan-living-prive-images/exterior/OutdoorGym.webp", title: "Outdoor Gym", subtitle: "Fitness", description: "Train under the open sky" },
  { src: "/treppan-living-prive-images/exterior/KidsPool.webp", title: "Kids Pool", subtitle: "Family", description: "Safe aquatic fun for little ones" },
  { src: "/treppan-living-prive-images/exterior/KidsArea01.webp", title: "Adventure Zone", subtitle: "Play", description: "Where imagination comes alive" },
  { src: "/treppan-living-prive-images/exterior/KidsArea02.webp", title: "Kids Paradise", subtitle: "Joy", description: "Endless entertainment for children" },
  { src: "/treppan-living-prive-images/exterior/Lounge_PODS.webp", title: "Lounge Pods", subtitle: "Privacy", description: "Private cocoons for peaceful retreat" },
  { src: "/treppan-living-prive-images/exterior/Interior_Pool_View.webp", title: "Indoor Oasis", subtitle: "Serenity", description: "Serene indoor aquatic escape" },
]

export function AmenitiesGallery() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Auto-play slider
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      handleNext()
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, currentIndex])

  const handleNext = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev + 1) % amenitiesImages.length)
    setTimeout(() => setIsTransitioning(false), 700)
  }, [isTransitioning])

  const handlePrev = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev - 1 + amenitiesImages.length) % amenitiesImages.length)
    setTimeout(() => setIsTransitioning(false), 700)
  }, [isTransitioning])

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsAutoPlaying(false)
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 700)
  }

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx)
    setLightboxOpen(true)
  }

  const nextLightbox = () => setLightboxIndex((prev) => (prev + 1) % amenitiesImages.length)
  const prevLightbox = () => setLightboxIndex((prev) => (prev - 1 + amenitiesImages.length) % amenitiesImages.length)

  const currentImage = amenitiesImages[currentIndex]

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-32 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Subtle Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1a1a2e_0%,#0a0a0a_50%)]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#DAAA97]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-[#DAAA97]/3 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className={`text-center mb-12 md:mb-16 lg:mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#DAAA97]/10 border border-[#DAAA97]/20 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#DAAA97] animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-[#DAAA97] uppercase tracking-[0.2em]">Premium Living</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Amenities
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#DAAA97] to-transparent mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-white/50 text-sm md:text-base leading-relaxed">
            The unity of innovative technologies and natural motifs in the modern architecture
          </p>
        </div>

        {/* Main Gallery */}
        <div className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}>
          
          {/* Split Layout Container */}
          <div className="relative max-w-7xl mx-auto">
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 items-stretch">
              
              {/* Left Side - Main Image */}
              <div className="lg:col-span-8 relative">
                <div className="relative h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px] rounded-2xl lg:rounded-l-3xl lg:rounded-r-3xl overflow-hidden group">
                  
                  {/* Images with Transition */}
                  {amenitiesImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                        index === currentIndex
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-105"
                      }`}
                    >
                      <Image
                        src={image.src}
                        alt={image.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  ))}
                  
                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                  
                  {/* Left Content Overlay */}
                  <div className="absolute left-0 bottom-0 top-0 w-full lg:w-2/3 px-6 pt-6 pb-4 sm:pt-8 sm:pb-6 md:pt-10 md:pb-6 lg:pt-12 lg:pb-6 flex flex-col justify-end z-20">
                    
                    {/* Subtitle Tag */}
                    <div 
                      className="inline-flex items-center self-start mb-2 transition-all duration-500"
                      style={{ 
                        opacity: isTransitioning ? 0 : 1,
                        transform: isTransitioning ? 'translateY(20px)' : 'translateY(0)'
                      }}
                    >
                      <span className="px-3 py-1 bg-[#DAAA97] text-black text-[10px] sm:text-xs font-bold uppercase tracking-wide rounded-sm">
                        {currentImage.subtitle}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 transition-all duration-500 delay-75"
                      style={{ 
                        opacity: isTransitioning ? 0 : 1,
                        transform: isTransitioning ? 'translateY(30px)' : 'translateY(0)'
                      }}
                    >
                      {currentImage.title}
                    </h3>
                    
                    {/* Description */}
                    <p 
                      className="text-white/70 text-sm sm:text-base md:text-lg max-w-md transition-all duration-500 delay-150"
                      style={{ 
                        opacity: isTransitioning ? 0 : 1,
                        transform: isTransitioning ? 'translateY(30px)' : 'translateY(0)'
                      }}
                    >
                      {currentImage.description}
                    </p>
                  </div>
                  
                  {/* View Button - Bottom Right */}
                  <button
                    onClick={() => openLightbox(currentIndex)}
                    className="absolute right-3 top-3 sm:bottom-6 sm:right-6 sm:top-auto inline-flex items-center gap-1 px-3 py-2 sm:gap-2 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs sm:text-sm font-medium hover:bg-white/20 hover:border-white/40 transition-all duration-300 z-30"
                    style={{ 
                      opacity: isTransitioning ? 0 : 1,
                      transform: isTransitioning ? 'translateY(20px)' : 'translateY(0)',
                      transitionDelay: '200ms'
                    }}
                  >
                    <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="whitespace-nowrap">View Full Image</span>
                  </button>
                </div>
              </div>
              
              {/* Right Side - Info Panel */}
              <div className="lg:col-span-4 bg-[#111111] lg:rounded-r-3xl lg:rounded-l-none rounded-2xl p-5 sm:p-6 lg:p-8 flex flex-col justify-between h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px]">
                
                {/* Top: Counter & Navigation */}
                <div>
                  {/* Counter with Arrows */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-bold text-[#DAAA97]">
                        {String(currentIndex + 1).padStart(2, '0')}
                      </span>
                      <span className="text-xl text-white/30 font-light">/</span>
                      <span className="text-lg text-white/30">
                        {String(amenitiesImages.length).padStart(2, '0')}
                      </span>
                    </div>
                    
                    {/* Arrow Navigation */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setIsAutoPlaying(false); handlePrev(); }}
                        className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#DAAA97] hover:border-[#DAAA97] transition-all duration-300"
                        aria-label="Previous"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => { setIsAutoPlaying(false); handleNext(); }}
                        className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#DAAA97] hover:border-[#DAAA97] transition-all duration-300"
                        aria-label="Next"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-5">
                    <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#DAAA97] transition-all duration-700 ease-out"
                        style={{ width: `${((currentIndex + 1) / amenitiesImages.length) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Current Item Info */}
                  <div className="mb-4">
                    <p className="text-xs text-[#DAAA97] uppercase tracking-wider mb-1">{currentImage.subtitle}</p>
                    <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">{currentImage.title}</h4>
                    <p className="text-white/60 text-sm leading-relaxed line-clamp-2">{currentImage.description}</p>
                  </div>
                </div>
                
                {/* Middle: Thumbnail Grid (2x3) */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {amenitiesImages.slice(
                    Math.floor(currentIndex / 6) * 6,
                    Math.floor(currentIndex / 6) * 6 + 6
                  ).map((image, idx) => {
                    const actualIndex = Math.floor(currentIndex / 6) * 6 + idx;
                    return (
                      <button
                        key={actualIndex}
                        onClick={() => goToSlide(actualIndex)}
                        className={`relative aspect-[4/3] rounded-lg overflow-hidden transition-all duration-300 ${
                          actualIndex === currentIndex
                            ? "ring-2 ring-[#DAAA97]"
                            : "opacity-50 hover:opacity-80"
                        }`}
                      >
                        <Image
                          src={image.src}
                          alt={image.title}
                          fill
                          className="object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
                
                {/* Bottom: Controls */}
                <div className="flex items-center justify-between gap-3">
                  {/* Page Dots */}
                  <div className="flex gap-1.5">
                    {Array.from({ length: Math.ceil(amenitiesImages.length / 6) }).map((_, pageIdx) => (
                      <button
                        key={pageIdx}
                        onClick={() => goToSlide(pageIdx * 6)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          Math.floor(currentIndex / 6) === pageIdx
                            ? "w-6 bg-[#DAAA97]"
                            : "w-1.5 bg-white/30 hover:bg-white/50"
                        }`}
                        aria-label={`Go to page ${pageIdx + 1}`}
                      />
                    ))}
                  </div>
                  
                  {/* Play/Pause */}
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      isAutoPlaying
                        ? "bg-[#DAAA97] text-black"
                        : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span className="text-xs font-medium">{isAutoPlaying ? 'Pause' : 'Play'}</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Bottom Quick Nav - Mobile/Tablet */}
            <div className="lg:hidden mt-6 flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
              {amenitiesImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all duration-300 ${
                    index === currentIndex
                      ? "ring-2 ring-[#DAAA97] ring-offset-2 ring-offset-[#0a0a0a]"
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="flex flex-col items-center justify-center bg-black/95 p-0 !max-w-full w-screen h-screen overflow-hidden border-0">
          <DialogTitle className="sr-only">Amenities Gallery - Image Viewer</DialogTitle>

          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Close"
          >
            <span className="text-2xl">×</span>
          </button>

          <button
            onClick={prevLightbox}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
            <Image
              src={amenitiesImages[lightboxIndex].src}
              alt={amenitiesImages[lightboxIndex].title}
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={nextLightbox}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Bottom Info */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-50">
            <h4 className="text-2xl font-bold text-white mb-1">{amenitiesImages[lightboxIndex].title}</h4>
            <p className="text-white/60">{lightboxIndex + 1} of {amenitiesImages.length}</p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

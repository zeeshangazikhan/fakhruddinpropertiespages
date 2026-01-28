"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

export function VisualTour() {
  const [activeTab, setActiveTab] = useState<"exterior" | "interior" | "amenities">("exterior")
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
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

  useEffect(() => {
    setCurrentIndex(0)
  }, [activeTab])

  const exteriorImages = [
    { src: "/Treppan-Tower-exterior-1.webp", alt: "Exterior - Podium View" },
    { src: "/Treppan-Tower-exterior-2.webp", alt: "Exterior - Podium View 2" },
    { src: "/Treppan-Tower-exterior-3.webp", alt: "Exterior - Aerial View" },
    { src: "/Treppan-Tower-exterior-4.webp", alt: "Exterior - Amenities View" },
    { src: "/Treppan-Tower-exterior-5.webp", alt: "Exterior - Front Facade" },
    { src: "/Treppan-Tower-exterior-6.webp", alt: "Exterior - Side Facade" },
    { src: "/Treppan-Tower-exterior-7.webp", alt: "Exterior - Front Facade 2" },
  ]

  const interiorImages = [
    { src: "/Treppan-Tower-interior-1.webp", alt: "Interior - 2 BR -Living Room" },
    { src: "/Treppan-Tower-interior-2.webp", alt: "Interior - 3 BR - Bathroom" },
    { src: "/Treppan-Tower-interior-3.webp", alt: "Interior - 2BR - Bedroom" },
    { src: "/Treppan-Tower-interior-4.webp", alt: "Interior - 3 BR -Bedroom" },
    { src: "/Treppan-Tower-interior-5.webp", alt: "Interior - 3 BR - Dining Area" },
    { src: "/Treppan-Tower-interior-6.webp", alt: "Interior - 3 BR - Bathroom" },
    { src: "/Treppan-Tower-interior-7.webp", alt: "Interior - 3 BR - Dining Area" },
    { src: "/Treppan-Tower-interior-8.webp", alt: "Interior - 3 BR Living Room" },
    { src: "/Treppan-Tower-interior-9.webp", alt: "Interior - 3 BR Interance Lobby" },
    // { src: "/Interior-10.webp", alt: "Interior View 10" },
    // { src: "/Interior-11.webp", alt: "Interior View 11" },
    // { src: "/Interior-12.webp", alt: "Interior View 12" },
  ]

  // Amenities tab: show actual images from public/
  const amenitiesImages = [
    { src: "/Treppan-Tower-amenities-1.webp", alt: "Amenity - Rooftop Infinity Pool" },
    { src: "/Treppan-Tower-amenities-2.webp", alt: "Amenity - Balcony Jacuzzi" },
    { src: "/Treppan-Tower-amenities-3.webp", alt: "Amenity - Rooftop Lounge" },
    { src: "/Treppan-Tower-amenities-4.webp", alt: "Amenity - Private Courtyard" },
    { src: "/Treppan-Tower-amenities-5.webp", alt: "Amenity - Podium Infinity Pool" },
    { src: "/Treppan-Tower-amenities-6.webp", alt: "Amenity - Bamboo Oxygen Park" },
    { src: "/Treppan-Tower-amenities-7.webp", alt: "Amenity - Spa" },
  ];

  const images = activeTab === "exterior" ? exteriorImages : activeTab === "interior" ? interiorImages : amenitiesImages;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Lightbox for larger view
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx)
    setLightboxOpen(true)
  }
  const closeLightbox = () => setLightboxOpen(false)
  const nextLightbox = () => setLightboxIndex((prev) => (prev + 1) % images.length)
  const prevLightbox = () => setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)


  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2
          className={`text-xl sm:text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16 lg:mb-20 leading-tight text-gray-900 transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          Explore Treppan Serenique Prive
        </h2>

        <div
          className={`flex justify-center gap-3 md:gap-4 mb-12 md:mb-16 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <Button
            onClick={() => setActiveTab("exterior")}
            variant={activeTab === "exterior" ? "default" : "outline"}
            className={`px-6 md:px-8 py-3 md:py-5 text-sm md:text-base font-semibold rounded-lg transition-all duration-400 ${activeTab === "exterior" ? "bg-gradient-to-r from-[#DAAA97] to-[#c99a87] text-white shadow-lg scale-105" : "bg-white/10 border border-white/12 text-gray-700/90 backdrop-blur-sm shadow-sm hover:shadow-md hover:bg-white/20"}`}
          >
            Exterior
          </Button>
          <Button
            onClick={() => setActiveTab("interior")}
            variant={activeTab === "interior" ? "default" : "outline"}
            className={`px-6 md:px-8 py-3 md:py-5 text-sm md:text-base font-semibold rounded-lg transition-all duration-400 ${activeTab === "interior" ? "bg-gradient-to-r from-[#DAAA97] to-[#c99a87] text-white shadow-lg scale-105" : "bg-white/10 border border-white/12 text-gray-700/90 backdrop-blur-sm shadow-sm hover:shadow-md hover:bg-white/20"}`}
          >
            Interior
          </Button>
          <Button
            onClick={() => setActiveTab("amenities")}
            variant={activeTab === "amenities" ? "default" : "outline"}
            className={`px-6 md:px-8 py-3 md:py-5 text-sm md:text-base font-semibold rounded-lg transition-all duration-400 ${activeTab === "amenities" ? "bg-gradient-to-r from-[#DAAA97] to-[#c99a87] text-white shadow-lg scale-105" : "bg-white/10 border border-white/12 text-gray-700/90 backdrop-blur-sm shadow-sm hover:shadow-md hover:bg-white/20"}`}
          >
            Amenities
          </Button>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl ring-1 ring-black/6">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.03)_0%,transparent_35%)] mix-blend-screen pointer-events-none" />

            <Image
              src={images[currentIndex].src || "/placeholder.svg"}
              alt={images[currentIndex].alt}
              fill
              className="object-cover transform transition-transform duration-1000 ease-out group-hover:scale-105 cursor-pointer"
              onClick={() => openLightbox(currentIndex)}
            />

            {/* Stylish Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/60 text-white p-3 md:p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-105 z-20 backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/60 text-white p-3 md:p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-105 z-20 backdrop-blur-sm"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Compact left-side caption: simple 'X of Y' small text, no highlights or progress */}
            <div className="absolute left-6 bottom-6 z-30">
              <div className="max-w-[360px] bg-black/55 backdrop-blur-md rounded-xl px-4 py-3 text-white shadow-lg border border-white/6">
                {
                  (() => {
                    const alt = images[currentIndex].alt || ''
                    const parts = alt.split(' - ')
                    const category = parts.length > 1 ? parts[0] : ''
                    const title = parts.length > 1 ? parts.slice(1).join(' - ') : alt
                    return (
                      <div>
                        {category && <p className="text-xs uppercase text-[#DAAA97] font-semibold tracking-wide">{category}</p>}
                          <p className="text-lg md:text-2xl font-extrabold leading-tight mt-1 text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.45)] tracking-tight">{title}</p>
                          <div className="mt-2 h-1 w-14 rounded-full bg-gradient-to-r from-[#DAAA97] via-[#c99b86] to-transparent opacity-60" />
                          <p className="text-xs text-white/75 mt-2">{currentIndex + 1} of {images.length}</p>
                      </div>
                    )
                  })()
                }
              </div>
            </div>
          </div>

          {/* Lightbox Modal (reuses the same style as floor-plans) */}
          <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
            <DialogContent className="flex flex-col items-center justify-center bg-transparent p-0 !max-w-full w-[99vw] h-[92vh] overflow-hidden rounded-xl !sm:max-w-none">
                <DialogTitle className="sr-only">Explore Treppan Serenique Prive - Image Viewer</DialogTitle>

                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-40 text-white p-3 md:p-4 hover:opacity-90 transition-opacity duration-200 focus:outline-none"
                  aria-label="Close"
                >
                  <span className="text-3xl md:text-4xl font-bold leading-none">×</span>
                </button>

                <button
                  onClick={prevLightbox}
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-40 bg-white text-gray-800 hover:bg-gray-100 rounded-full p-3 md:p-4 shadow-xl border border-black/5 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#DAAA97]/30"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-7 h-7 md:w-8 md:h-8" />
                </button>

                <div className="relative w-full h-full max-w-full mx-auto flex items-center justify-center bg-black/90 rounded-md overflow-hidden">
                  <Image
                    src={images[lightboxIndex].src || "/placeholder.svg"}
                    alt={images[lightboxIndex].alt}
                    width={2400}
                    height={1600}
                    sizes="100vw"
                    className="object-contain w-auto max-w-[97vw] h-full"
                    style={{ objectPosition: 'center' }}
                  />
                </div>

                <button
                  onClick={nextLightbox}
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-40 bg-white text-gray-800 hover:bg-gray-100 rounded-full p-3 md:p-4 shadow-xl border border-black/5 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#DAAA97]/30"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-7 h-7 md:w-8 md:h-8" />
                </button>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 text-white text-sm bg-black/60 px-4 py-2 rounded-full shadow-md backdrop-blur-sm">
                  <div className="font-medium">{lightboxIndex + 1} / {images.length}</div>
                </div>
            </DialogContent>
          </Dialog>

          {/* Thumbnail dots (pills) */}
          <div className="flex justify-center gap-3 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`rounded-full transition-all duration-300 flex items-center justify-center ${index === currentIndex ? "bg-[#DAAA97] w-10 h-3 md:w-12 md:h-3 shadow-md" : "bg-gray-300 w-3 h-3 md:w-3 md:h-3 hover:bg-gray-400"}`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

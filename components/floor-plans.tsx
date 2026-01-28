"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Download, Sparkles, Ruler, Home } from "lucide-react"
import { DownloadFloorPlanModal } from "@/components/download-floorplan-modal"

export function FloorPlans() {
  const [activeTab, setActiveTab] = useState<"1bedroom" | "2bedroom" | "3bedroom">("1bedroom")
  const [currentIndex, setCurrentIndex] = useState(0)

  const floorPlans2Bed = [
    "/treppan-tower-2-bed-1.webp",
    "/treppan-tower-2-bed-2.webp",
    "/treppan-tower-2-bed-3.webp",
    "/treppan-tower-2-bed-4.webp",
  ];

  const floorPlans3Bed = [
    "/treppan-tower-3-bed-1.webp",
    "/treppan-tower-3-bed-2.webp",
    "/treppan-tower-3-bed-3.webp",
    "/treppan-tower-3-bed-4.webp",
  ];

  const floorPlans1Bed = [
    "/treppan-tower-1-bed-1.webp",
    "/treppan-tower-1-bed-2.webp",
    "/treppan-tower-1-bed-3.webp",
    "/treppan-tower-1-bed-4.webp",
    "/treppan-tower-1-bed-5.webp",
  ];

  const plans = activeTab === "1bedroom" ? floorPlans1Bed : activeTab === "2bedroom" ? floorPlans2Bed : floorPlans3Bed

  // Modal state for lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx)
    setLightboxOpen(true)
  }
  const closeLightbox = () => setLightboxOpen(false)
  const nextLightbox = () => setLightboxIndex((prev) => (prev + 1) % plans.length)
  const prevLightbox = () => setLightboxIndex((prev) => (prev - 1 + plans.length) % plans.length)

  const handleTabChange = (tab: "1bedroom" | "2bedroom" | "3bedroom") => {
    setActiveTab(tab)
    setCurrentIndex(0)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % plans.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + plans.length) % plans.length)
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-white via-[#f7f5f2] to-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* <div className="text-center">
          <div className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-1.5 sm:py-3 rounded-[4px] bg-[#DAAA97]/10 border border-[#DAAA97]/20 mb-4 sm:mb-6">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#DAAA97]" />
            <p className="text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#DAAA97] font-bold">Floor Plann</p>
          </div>
        </div> */}

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-4 sm:mb-6 leading-tight text-[#334058] px-4">
          Discover the Floor Plans
        </h2>

        <p className="text-center text-gray-600 mb-8 sm:mb-12 md:mb-16 max-w-3xl mx-auto text-sm sm:text-base md:text-lg px-4">
          1–3 bedroom residences that prioritise light, circulation and flexible living.
        </p>

        <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12 md:mb-16 px-4">
          <Button
            onClick={() => handleTabChange("1bedroom")}
            variant={activeTab === "1bedroom" ? "default" : "outline"}
            className={`px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg font-semibold rounded-lg transition-all duration-400 ${activeTab === "1bedroom" ? "bg-gradient-to-r from-[#DAAA97] to-[#c99a87] text-white shadow-lg scale-105" : "bg-white/10 border border-white/12 text-gray-700/90 backdrop-blur-sm shadow-sm hover:shadow-md hover:bg-white/20"}`}
          >
            1 Bedroom
          </Button>
          <Button
            onClick={() => handleTabChange("2bedroom")}
            variant={activeTab === "2bedroom" ? "default" : "outline"}
            className={`px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg font-semibold rounded-lg transition-all duration-400 ${activeTab === "2bedroom" ? "bg-gradient-to-r from-[#DAAA97] to-[#c99a87] text-white shadow-lg scale-105" : "bg-white/10 border border-white/12 text-gray-700/90 backdrop-blur-sm shadow-sm hover:shadow-md hover:bg-white/20"}`}
          >
            2 Bedroom
          </Button>
          <Button
            onClick={() => handleTabChange("3bedroom")}
            variant={activeTab === "3bedroom" ? "default" : "outline"}
            className={`px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg font-semibold rounded-lg transition-all duration-400 ${activeTab === "3bedroom" ? "bg-gradient-to-r from-[#DAAA97] to-[#c99a87] text-white shadow-lg scale-105" : "bg-white/10 border border-white/12 text-gray-700/90 backdrop-blur-sm shadow-sm hover:shadow-md hover:bg-white/20"}`}
          >
            3 Bedroom
          </Button>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-start px-4">
          <div className="relative order-1">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-100 hover:shadow-[#DAAA97]/20 hover:border-[#DAAA97]/30 transition-all duration-500">
              <Image
                src={plans[currentIndex] || "/placeholder.svg"}
                alt={`Floor plan ${currentIndex + 1}`}
                fill
                className="object-contain p-3 sm:p-4 md:p-6 cursor-pointer"
                onClick={() => openLightbox(currentIndex)}
                style={{ zIndex: 2 }}
              />

              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/70 text-white p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-105 z-10 backdrop-blur-sm border border-white/10"
                aria-label="Previous floor plan"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/70 text-white p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-105 z-10 backdrop-blur-sm border border-white/10"
                aria-label="Next floor plan"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 right-4 bg-black/55 text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium shadow-lg">
                {currentIndex + 1} / {plans.length}
              </div>
            </div>

            {/* Lightbox Modal */}
            <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
              <DialogContent className="flex flex-col items-center justify-center bg-transparent p-0 !max-w-full w-[99vw] h-[92vh] overflow-hidden rounded-xl !sm:max-w-none">
                  <DialogTitle className="sr-only">Floor Plan Image Viewer</DialogTitle>

                  {/* Close button */}
                  <button
                    onClick={closeLightbox}
                    className="absolute top-4 right-4 z-40 text-white p-3 md:p-4 hover:opacity-90 transition-opacity duration-200 focus:outline-none"
                    aria-label="Close"
                  >
                    <span className="text-3xl md:text-4xl font-bold leading-none">×</span>
                  </button>

                  {/* Prev control */}
                  <button
                    onClick={prevLightbox}
                    className="absolute left-6 top-1/2 -translate-y-1/2 z-40 bg-white text-gray-800 hover:bg-gray-100 rounded-full p-3 md:p-4 shadow-xl border border-black/5 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#DAAA97]/30"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-7 h-7 md:w-8 md:h-8" />
                  </button>

                  {/* Image container */}
                  <div className="relative w-full h-full max-w-full mx-auto flex items-center justify-center bg-black/90 rounded-md overflow-hidden">
                    <Image
                      src={plans[lightboxIndex] || "/placeholder.svg"}
                      alt={`Floor plan large view ${lightboxIndex + 1}`}
                      width={2400}
                      height={1600}
                      sizes="100vw"
                      className="object-contain w-auto max-w-[97vw] h-full"
                      style={{ objectPosition: 'center' }}
                    />
                  </div>

                  {/* Next control */}
                  <button
                    onClick={nextLightbox}
                    className="absolute right-6 top-1/2 -translate-y-1/2 z-40 bg-white text-gray-800 hover:bg-gray-100 rounded-full p-3 md:p-4 shadow-xl border border-black/5 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#DAAA97]/30"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-7 h-7 md:w-8 md:h-8" />
                  </button>

                  {/* Footer: index and download */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 text-white text-sm bg-black/60 px-4 py-2 rounded-full shadow-md backdrop-blur-sm">
                    <div className="font-medium">{lightboxIndex + 1} / {plans.length}</div>
                  </div>
                </DialogContent>
            </Dialog>

            <div className="flex justify-center gap-3 mt-4 sm:mt-6 md:mt-8">
              {plans.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-full transition-all duration-300 flex items-center justify-center ${index === currentIndex ? "bg-gradient-to-r from-[#DAAA97] to-[#c99a87] w-10 h-3 shadow-md" : "bg-gray-300 w-3 h-3 hover:bg-gray-400"}`}
                  aria-label={`Go to floor plan ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6 md:space-y-8 order-2">
            <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-gray-50 ring-1 ring-black/3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#FAF6F3] to-white ring-1 ring-[#DAAA97]/10 shadow-sm">
                    <Home className="w-6 h-6 text-[#DAAA97]" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#22313f]">Floor Plan Details</h3>
                </div>
               
              </div>

              <div className="overflow-x-auto mb-4 sm:mb-6 md:mb-8 mt-6 -mx-2 px-2">
                <table className="w-full min-w-[300px] text-sm md:text-base rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-white">
                      <th className="text-left py-3 sm:py-4 md:py-5 text-gray-700 font-medium">Type</th>
                      <th className="text-left py-3 sm:py-4 md:py-5 text-gray-700 font-medium">
                        <div className="flex items-center gap-2">
                          <Ruler className="w-4 h-4 text-[#DAAA97]" />
                          <span className="hidden sm:inline">Total Area</span>
                          <span className="sm:hidden">Area</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    <tr>
                      <td className="py-3 sm:py-4 md:py-5 font-semibold text-gray-800">1 Bedroom</td>
                      <td className="py-3 sm:py-4 md:py-5 text-gray-600">628 - 1,165 sq. ft.</td>
                    </tr>
                    <tr>
                      <td className="py-3 sm:py-4 md:py-5 font-semibold text-gray-800">2 Bedroom</td>
                      <td className="py-3 sm:py-4 md:py-5 text-gray-600">1,028 - 1,571 sq. ft.</td>
                    </tr>
                    <tr>
                      <td className="py-3 sm:py-4 md:py-5 font-semibold text-gray-800">3 Bedroom Skyvilla</td>
                      <td className="py-3 sm:py-4 md:py-5 text-gray-600">2,640 - 2,915 sq. ft.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <DownloadFloorPlanModal>
                <Button className="w-full mt-4 sm:mt-6 md:mt-8 bg-gradient-to-r from-[#DAAA97] to-[#c99a87] text-white py-3 sm:py-4 md:py-5 text-sm md:text-lg font-semibold flex items-center justify-center gap-3 shadow-lg rounded-xl">
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  Download Floor Plan
                </Button>
              </DownloadFloorPlanModal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

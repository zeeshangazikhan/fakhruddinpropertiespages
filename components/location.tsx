"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Clock, Navigation, Waves, ShoppingBag, Anchor, Coffee, Goal } from "lucide-react"

export function Location() {
  const [activeTab, setActiveTab] = useState<"landmark" | "amenities">("landmark")

  // Landmarks as provided
  const landmarks = [
    { name: "Dubai Islands Beach", time: "2 min", distance: "", Icon: Waves },
    { name: "Deira Mall", time: "5 min", distance: "", Icon: ShoppingBag },
    { name: "Dubai Islands Marina", time: "7 min", distance: "", Icon: Anchor },
  ]

  // Amenities (user list)
  const amenitiesData = [
    { name: "Water sports & Scuba Diving", time: "2 min", distance: "", Icon: Waves },
    { name: "Beach Snacks And Cafes", time: "2 min", distance: "", Icon: Coffee },
    { name: "Centara Mirage Beach Resort", time: "3 min", distance: "", Icon: Anchor },
    { name: "9 Hole Golf Course", time: "7 min", distance: "", Icon: Goal },
  ]

  const data = activeTab === "landmark" ? landmarks : amenitiesData

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#DAAA97]/10 border border-[#DAAA97]/25 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#DAAA97] animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-[#DAAA97] uppercase tracking-widest">Location</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#334058] mb-4 leading-tight">
            Beachside Address With Everyday City Connections
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#DAAA97] to-transparent mx-auto mb-6" />
          <p className="max-w-3xl mx-auto text-gray-600 text-sm sm:text-base md:text-lg">
            Minutes to the beach, marina, mall, and leisure spots, with simple access for daily plans.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-start">
          {/* Left side - Map and Get Direction */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="relative w-full h-[220px] sm:h-[280px] md:h-[330px] rounded-xl md:rounded-[4px] overflow-hidden shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.0254655978115!2d55.17132207607863!3d25.033209838322144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6d005f01e39d%3A0x3bec9fb8339333a5!2sTreppan%20Tower!5e0!3m2!1sen!2sin!4v1768267208157!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, width: '100%', height: '100%' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Treppan Serenique Prive Map"
                className="absolute inset-0 w-full h-full min-h-[220px] sm:min-h-[280px] md:min-h-[330px]"
              />
            </div>

            <Button
              className="w-full bg-[#DAAA97] hover:bg-[#c99a87] text-white py-5 md:py-6 text-base md:text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              asChild
            >
                <a
                  href="https://maps.app.goo.gl/TVYyzVARqRdYdWdf6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                <Navigation className="w-4 md:w-5 h-4 md:h-5" />
                Get Direction
              </a>
            </Button>
          </div>

          {/* Right side - Landmarks, Amenities, Transport tabs */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="flex gap-1 sm:gap-2 md:gap-3 bg-white rounded-xl p-1 sm:p-2 shadow-md flex-wrap">
              <Button
                onClick={() => setActiveTab("landmark")}
                variant={activeTab === "landmark" ? "default" : "ghost"}
                className={`flex-1 sm:min-w-[90px] min-w-[64px] transition-all duration-300 text-xs md:text-sm py-4 md:py-5 ${activeTab === "landmark" ? "bg-[#334058] hover:bg-[#2c4460] text-white shadow-md" : "text-gray-700 hover:bg-gray-100"}`}
              >
                Landmarks
              </Button>
              <Button
                onClick={() => setActiveTab("amenities")}
                variant={activeTab === "amenities" ? "default" : "ghost"}
                className={`flex-1 sm:min-w-[90px] min-w-[64px] transition-all duration-300 text-xs md:text-sm py-4 md:py-5 ${activeTab === "amenities" ? "bg-[#334058] hover:bg-[#2c4460] text-white shadow-md" : "text-gray-700 hover:bg-gray-100"}`}
              >
                Amenities
              </Button>
            </div>

            <div className="bg-white rounded-[4px] p-3 sm:p-4 md:p-6 shadow-lg space-y-2 sm:space-y-3 max-h-[340px] sm:max-h-[500px] md:max-h-[600px] overflow-y-auto">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-4 md:p-5 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100 hover:border-[#DAAA97]/50 hover:shadow-md transition-all duration-300 group gap-2 sm:gap-3"
                >
                  <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
                    <div className="bg-[#DAAA97]/10 rounded-lg group-hover:bg-[#DAAA97]/20 transition-colors flex-shrink-0 p-3 flex items-center justify-center">
                      <item.Icon className="w-5 md:w-6 h-5 md:h-6 text-[#DAAA97]" />
                    </div>
                    <span className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-6 text-xs md:text-sm flex-shrink-0 mt-2 sm:mt-0">
                    <div className="flex items-center gap-1 md:gap-2 bg-gray-100 px-2 md:px-4 py-1 md:py-2 rounded-lg">
                      <Clock className="w-3 md:w-4 h-3 md:h-4 text-gray-500" />
                      <span className="font-medium text-gray-700">{item.time}</span>
                    </div>
                    <span className="text-gray-500 font-medium min-w-[40px] sm:min-w-[50px] text-right">{item.distance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

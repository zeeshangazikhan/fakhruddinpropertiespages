"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Navigation, Sparkles } from "lucide-react"

export function Location() {
  const [activeTab, setActiveTab] = useState<"landmark" | "amenities" | "transport">("landmark")

  // Landmarks provided by user
  const landmarks = [
    { name: "Jumeirah Lake Towers", time: "11 min", distance: "9.6 km", icon: '/location/amenities/locationiconsvg-12.svg' },
    { name: "Dubai Marina Beach", time: "12 min", distance: "9.7 km", icon: '/location/landmark/locationiconsvg-01.svg' },
    { name: "Palm Jumeirah", time: "17 min", distance: "16.7 km", icon: '/location/landmark/locationiconsvg-03.svg' },
    { name: "Palm Jebel Ali", time: "23 min", distance: "26.2 km", icon: '/location/landmark/locationiconsvg-03.svg' },
    { name: "Business Bay", time: "28 min", distance: "29 km", icon: '/location/amenities/locationiconsvg-08.svg' },
  ]

  // Amenities provided by user
  const amenitiesData = [
    { name: "JVT Park", time: "1 min", distance: "150 m", icon: '/location/amenities/locationiconsvg-09.svg' },
    { name: "Redwood Montessori Nursery", time: "4 min", distance: "2 km", icon: '/location/amenities/locationiconsvg-04.svg' },
    { name: "Dubai British School", time: "6 min", distance: "4.5 km", icon: '/location/amenities/locationiconsvg-08.svg' },
    { name: "Jumeirah East Park Centre", time: "7 min", distance: "2.1 km", icon: '/location/amenities/locationiconsvg-09.svg' },
    { name: "Ibn Batuta Mall", time: "12 min", distance: "9 km", icon: '/location/amenities/locationiconsvg-08.svg' },
  ]

  // Transport provided by user
  const transport = [
    { name: "Sheikh Mohammed bin Zayed Road (E311)", time: "3 min", distance: "1.4 km", icon: '/location/transport/locationiconsvg-13.svg' },
    { name: "Al Khail Road (E44)", time: "8 min", distance: "3.3 km", icon: '/location/transport/locationiconsvg-14.svg' },
    { name: "Jumeirah Golf Estates Metro Station", time: "11 min", distance: "8.9 km", icon: '/location/transport/locationiconsvg-11.svg' },
    { name: "Al Maktoum International Airport", time: "22 min", distance: "27.6 km", icon: '/location/landmark/locationiconsvg-02.svg' },
    { name: "Dubai International Airport", time: "35 min", distance: "47.3 km", icon: '/location/landmark/locationiconsvg-02.svg' },
  ]

  const data = activeTab === "landmark" ? landmarks : activeTab === "amenities" ? amenitiesData : transport

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-1.5 sm:py-3 rounded-[4px] bg-[#DAAA97]/10 border border-[#DAAA97]/20 mb-4 sm:mb-6">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#DAAA97]" />
            <p className="text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#DAAA97] font-bold">Location</p>
          </div>
        </div>

        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 md:mb-8 leading-tight text-gray-900 px-4">
          Centre of Dubai with Seamless Connectivity
        </h2>

        <p className="text-center text-gray-700 mb-8 sm:mb-12 md:mb-16 max-w-3xl mx-auto text-sm sm:text-base md:text-lg px-4">
          Treppan Serenique Prive is strategically located with seamless access to key city destinations, business hubs, and lifestyle
          attractions.
        </p>

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

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              {[
                { label: "Beach", value: "12 min" },
                { label: "Airport", value: "22 min" },
                { label: "Business Bay", value: "28 min" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-2 sm:p-3 md:p-4 text-center shadow-md hover:shadow-lg transition-shadow"
                >
                  <p className="text-xl md:text-2xl font-bold text-[#334058]">{stat.value}</p>
                  <p className="text-xs md:text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
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
              <Button
                onClick={() => setActiveTab("transport")}
                variant={activeTab === "transport" ? "default" : "ghost"}
                className={`flex-1 sm:min-w-[90px] min-w-[64px] transition-all duration-300 text-xs md:text-sm py-4 md:py-5 ${activeTab === "transport" ? "bg-[#334058] hover:bg-[#2c4460] text-white shadow-md" : "text-gray-700 hover:bg-gray-100"}`}
              >
                Transport
              </Button>
            </div>

            <div className="bg-white rounded-[4px] p-3 sm:p-4 md:p-6 shadow-lg space-y-2 sm:space-y-3 max-h-[340px] sm:max-h-[500px] md:max-h-[600px] overflow-y-auto">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-4 md:p-5 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100 hover:border-[#DAAA97]/50 hover:shadow-md transition-all duration-300 group gap-2 sm:gap-3"
                >
                  <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
                    <div className="bg-[#DAAA97]/10 rounded-lg group-hover:bg-[#DAAA97]/20 transition-colors flex-shrink-0">
                      {/* <MapPin className="w-4 md:w-5 h-4 md:h-5 text-[#DAAA97]" /> */}
                      <Image src={item.icon} alt={item.name} width={50} height={50} className="w-12 md:w-12 h-12 md:h-12 p-0 text-[#DAAA97]" />
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

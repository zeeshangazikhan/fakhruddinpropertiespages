"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Phone } from "lucide-react"

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-2xl shadow-black/5"
          : "bg-gradient-to-b from-black/50 to-transparent backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-24">
          <Link href="/" className="flex-shrink-0 transform hover:scale-105 transition-all duration-500">
            <Image
              src="/fakhruddin-properties-logo.jpg"
              alt="Fakhruddin Properties"
              width={180}
              height={50}
              className="h-12 w-auto drop-shadow-lg"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {[
              { href: "#about", label: "About Us" },
              { href: "#projects", label: "Projects" },
              { href: "#media", label: "Media Center" },
              { href: "#contact", label: "Contact Us" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-500 group ${
                  scrolled ? "text-gray-900 hover:text-[#d4a574]" : "text-white hover:text-[#d4a574]"
                }`}
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-[#d4a574] to-[#b8956a] transition-all duration-500 group-hover:w-full" />
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#d4a574] blur-sm transition-all duration-500 group-hover:w-full opacity-50" />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+9718005253"
              className={`flex items-center gap-2 px-6 py-3 rounded-[4px] font-semibold text-sm uppercase tracking-wider transition-all duration-500 ${
                scrolled
                  ? "bg-gradient-to-r from-[#d4a574] to-[#b8956a] text-white hover:shadow-xl hover:shadow-[#d4a574]/30"
                  : "bg-white/10 backdrop-blur-lg text-white border border-white/30 hover:bg-white hover:text-[#3d5a80]"
              } transform hover:scale-105`}
            >
              <Phone className="w-4 h-4" />
              800 5253
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#d4a574] py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <Image
              src="/fakhruddin-properties-logo-white.jpg"
              alt="Fakhruddin Properties"
              width={150}
              height={40}
              className="h-10 w-auto mx-auto md:mx-0 mb-4"
            />
            <p className="text-white text-2xl font-light">800 5253</p>
          </div>

          <div className="flex gap-6">
            <Link href="#" className="text-white hover:text-white/80 transition">
              <Facebook className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-white hover:text-white/80 transition">
              <Instagram className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-white hover:text-white/80 transition">
              <Linkedin className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-white hover:text-white/80 transition">
              <Youtube className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

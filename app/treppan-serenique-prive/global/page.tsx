"use client"
import { Hero } from "@/components/hero"
import { Overview } from "@/components/overview"
import { EOIForm } from "@/components/eoi-form"
import { VisualTour } from "@/components/visual-tour"
import { CallToAction } from "@/components/call-to-action"
import { Amenities } from "@/components/amenities"
import { FloorPlans } from "@/components/floor-plans"
import { Location } from "@/components/location"
import { ContactForm } from "@/components/contact-form"
import StickyFooter from "@/components/sticky-footer"

const isGlobalPage = true;

export default function TreppanSereniquePriveInternational() {
  return (
    <main className="min-h-screen">
      <Hero isGlobalPage={isGlobalPage} />
      <Overview isGlobalPage={isGlobalPage} />
      <EOIForm />
      <VisualTour />
      <CallToAction />
      <FloorPlans />
      <Location />
      <Amenities />
      <ContactForm />
      <StickyFooter />
    </main>
  )
}

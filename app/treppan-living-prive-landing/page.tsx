"use client"
import { Hero } from "@/components/hero"
import { ResortLiving } from "@/components/resort-living"
import { AvailableUnits } from "@/components/available-units"
import { TreppanLivingFeatures } from "@/components/treppan-living-features"
import { AlaCarteServices } from "@/components/alacarte-services"
import { CoreServices } from "@/components/core-services"
import { VisualTour } from "@/components/visual-tour"
import { CallToAction } from "@/components/call-to-action"
import { Amenities } from "@/components/amenities"
import { FloorPlans } from "@/components/floor-plans"
import { Location } from "@/components/location"
import { ContactForm } from "@/components/contact-form"
import StickyFooter from "@/components/sticky-footer"
import { HeroContent, defaultOverviewContent } from "@/lib/strapi"

const heroContent: HeroContent = {
  tagline: 'Treppan Living Privé',
  title: 'Treppan Living Privé',
  subtitle: '',
  description:
    'A fully serviced wellness residence by Fakhruddin Properties, designed for balanced living, smart-home ease, and everyday comfort near the beach.',
  buttonText: 'Contact Us',
  stats: [],
}

export default function TreppanLivingPriveLanding() {
  const overviewContent = defaultOverviewContent;

  return (
    <main className="min-h-screen">
      <Hero content={heroContent} />
      <ResortLiving />
      <AvailableUnits content={overviewContent} />
      <TreppanLivingFeatures />
      <CoreServices />
      <AlaCarteServices />
   
      <VisualTour />
      <CallToAction />
      <FloorPlans />
      <Location />
      <Amenities />
      <div id="eoi-form">
        <ContactForm />
      </div>
      <StickyFooter />
    </main>
  )
}

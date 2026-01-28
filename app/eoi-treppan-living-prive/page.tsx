"use client"
import { useEffect, useState } from "react"
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
import {
  HeroContent,
  OverviewContent,
  EOIFormContent,
  defaultHeroContent,
  defaultOverviewContent,
  defaultEOIFormContent,
} from "@/lib/strapi"

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// Helper to build deep populate query for nested components
const buildPopulateQuery = (fields: string[]) => {
  return fields.map(f => `populate[${f}][populate]=*`).join('&');
};

export default function TreppanLivingPrive() {
  const [heroContent, setHeroContent] = useState<HeroContent>(defaultHeroContent);
  const [overviewContent, setOverviewContent] = useState<OverviewContent>(defaultOverviewContent);
  const [eoiContent, setEoiContent] = useState<EOIFormContent>(defaultEOIFormContent);

  useEffect(() => {
    async function fetchContent() {
      try {
        // Build queries with deep populate for nested components
        const heroQuery = `${STRAPI_URL}/api/hero?populate=*`;
        const overviewQuery = `${STRAPI_URL}/api/overview?populate=*`;
        const eoiQuery = `${STRAPI_URL}/api/eoi-form?${buildPopulateQuery([
          'developerInfo',
          'eoiSteps', 
          'downPaymentOptions',
          'unitNumberOptions',
          'salesManagers',
          'formSections'
        ])}`;

        // Fetch all content in parallel
        const [heroRes, overviewRes, eoiRes] = await Promise.allSettled([
          fetch(heroQuery),
          fetch(overviewQuery),
          fetch(eoiQuery),
        ]);

        // Process Hero content
        if (heroRes.status === 'fulfilled' && heroRes.value.ok) {
          const heroData = await heroRes.value.json();
          console.log('Hero response:', heroData);
          if (heroData?.data) {
            setHeroContent(heroData.data);
          }
        }

        // Process Overview content
        if (overviewRes.status === 'fulfilled' && overviewRes.value.ok) {
          const overviewData = await overviewRes.value.json();
          console.log('Overview response:', overviewData);
          if (overviewData?.data) {
            setOverviewContent(overviewData.data);
          }
        }

        // Process EOI Form content
        if (eoiRes.status === 'fulfilled' && eoiRes.value.ok) {
          const eoiData = await eoiRes.value.json();
          console.log('EOI response:', eoiData);
          if (eoiData?.data) {
            // Map developerInfo to legacy fields for backward compatibility
            const data = eoiData.data;
            if (data.developerInfo) {
              data.developerName = data.developerInfo.name;
              data.developerAddress = data.developerInfo.address;
              data.developerTel = data.developerInfo.telephone;
              data.developerEmail = data.developerInfo.email;
              data.reraNumber = data.developerInfo.reraNumber;
            }
            setEoiContent(data);
          }
        }
      } catch (error) {
        console.error('Error fetching content from Strapi:', error);
        // If API fails, defaults are already set - no action needed
      }
    }

    fetchContent();
  }, []);

  // Static defaults load immediately - no skeleton needed
  return (
    <main className="min-h-screen">
      <Hero content={heroContent} />
      <Overview content={overviewContent} />
      <EOIForm content={eoiContent} />
      {/* <VisualTour /> */}
      {/* <CallToAction /> */}
      {/* <FloorPlans /> */}
      {/* <Location /> */}
      {/* <Amenities /> */}
      {/* <ContactForm /> */}
      {/* <StickyFooter /> */}
    </main>
  )
}

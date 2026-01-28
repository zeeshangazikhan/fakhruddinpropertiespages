"use client"

import { Skeleton } from "@/components/ui/skeleton"

// ============================================================================
// Hero Skeleton - Matches ACTIVE Hero section layout only
// ============================================================================
export function HeroSkeleton() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden py-20 md:py-20 lg:py-0 lg:h-screen bg-gradient-to-br from-[#334058] via-[#3d4d6a] to-[#2c3a4f]">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Floating elements - same as actual hero */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-[#DAAA97]/10 rounded-lg blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#334058]/10 rounded-lg blur-3xl animate-pulse" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Content container - matches actual hero's max-w-3xl */}
        <div className="max-w-3xl mx-auto mb-8 sm:mb-10 space-y-4">
          {/* Tagline skeleton - small uppercase text */}
          <Skeleton className="h-4 sm:h-5 w-40 sm:w-56 mx-auto bg-[#DAAA97]/30" />
          
          {/* Title skeleton - large heading */}
          <Skeleton className="h-10 sm:h-14 md:h-16 w-full max-w-md mx-auto bg-white/20" />
          
          {/* Subtitle skeleton - medium text */}
          <Skeleton className="h-6 sm:h-8 md:h-10 w-3/4 max-w-sm mx-auto bg-white/20" />
          
          {/* Description skeleton - italic smaller text, 2 lines */}
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-full max-w-lg mx-auto bg-white/15" />
            <Skeleton className="h-4 w-4/5 max-w-md mx-auto bg-white/15" />
          </div>
          
          {/* Divider line - matches actual hero */}
          <Skeleton className="h-1 w-16 sm:w-24 mx-auto mt-4 bg-[#DAAA97]/40" />
        </div>

        {/* Button skeleton - matches actual button styling */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <Skeleton className="h-12 sm:h-14 w-52 sm:w-60 rounded-lg bg-white/20 border-2 border-white/30" />
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// Overview Skeleton - Matches Overview section layout
// ============================================================================
export function OverviewSkeleton() {
  return (
    <section className="relative py-20 md:py-28 lg:py-28 bg-gradient-to-br from-white via-[#f7f5f2] to-[#f3efe9] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#DAAA97]/10 via-[#DAAA97]/5 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#334058]/10 via-[#334058]/5 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header skeleton */}
        <div className="text-center mb-12 md:mb-16">
          <Skeleton className="h-8 sm:h-10 md:h-12 lg:h-14 w-64 sm:w-80 md:w-96 mx-auto bg-gradient-to-r from-[#334058]/20 via-[#DAAA97]/20 to-[#334058]/20" />
          <Skeleton className="h-1 w-36 mx-auto mt-3 bg-[#DAAA97]/30" />
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Units Grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="group relative p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-lg overflow-hidden"
              >
                {/* Icon skeleton */}
                <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl mb-5 bg-gradient-to-br from-[#334058]/20 to-[#4a5d7a]/20" />

                {/* Title skeleton */}
                <Skeleton className="h-6 sm:h-7 w-32 sm:w-40 mb-4 bg-[#334058]/20" />

                {/* Details skeleton */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-2 h-2 rounded-full bg-[#DAAA97]/40" />
                    <Skeleton className="h-4 w-40 sm:w-48 bg-gray-200" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-2 h-2 rounded-full bg-[#DAAA97]/40" />
                    <Skeleton className="h-4 w-36 sm:w-44 bg-gray-200" />
                  </div>
                  <div className="pt-3 mt-3 border-t border-gray-100">
                    <Skeleton className="h-4 w-44 sm:w-52 bg-[#DAAA97]/20" />
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#DAAA97]/20 to-[#334058]/20" />
              </div>
            ))}
          </div>

          {/* Total Units Card skeleton */}
          <div className="relative p-8 sm:p-10 md:p-12 rounded-3xl bg-gradient-to-br from-[#334058] via-[#3d4d6a] to-[#2c3a4f] overflow-hidden">
            {/* Background glow */}
            <div className="absolute -right-20 -top-20 w-60 h-60 bg-[#DAAA97]/20 rounded-full blur-3xl" />
            <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-[#DAAA97]/10 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-center">
              {/* Icon skeleton */}
              <Skeleton className="hidden sm:block w-20 h-20 rounded-2xl bg-[#DAAA97]/20" />
              
              <div className="space-y-3">
                {/* Badge skeleton */}
                <Skeleton className="h-6 w-32 mx-auto rounded-full bg-[#DAAA97]/20" />
                
                {/* Number skeleton */}
                <Skeleton className="h-14 sm:h-16 md:h-20 w-32 sm:w-40 mx-auto bg-white/20" />
                
                {/* Subtitle skeleton */}
                <Skeleton className="h-4 w-48 sm:w-56 mx-auto bg-white/15" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// EOI Form Skeleton - Matches EOI Form section layout
// ============================================================================
export function EOIFormSkeleton() {
  return (
    <section className="relative py-20 md:py-28 lg:py-28 bg-gradient-to-br from-[#f7f5f2] via-white to-[#f3efe9] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-[#DAAA97]/10 via-[#DAAA97]/5 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#334058]/10 via-[#334058]/5 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header skeleton */}
        <div className="text-center mb-12 md:mb-16">
          <Skeleton className="h-8 sm:h-10 md:h-12 lg:h-14 w-72 sm:w-96 md:w-[28rem] mx-auto bg-gradient-to-r from-[#334058]/20 via-[#DAAA97]/20 to-[#334058]/20" />
          <Skeleton className="h-1 w-36 mx-auto mt-3 bg-[#DAAA97]/30" />
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Form Section 1 - Interested Party */}
          <FormSectionSkeleton 
            title="1. Interested Party"
            subtitle="Primary applicant details"
            bgColor="from-[#334058] to-[#4a5d7a]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-20 bg-[#334058]/15" />
                  <Skeleton className="h-10 w-full rounded-md bg-gray-100" />
                </div>
              ))}
            </div>
          </FormSectionSkeleton>

          {/* Form Section 2 - Unit Preferences */}
          <FormSectionSkeleton 
            title="2. Unit Preferences"
            subtitle="Select your preferred options"
            bgColor="from-[#DAAA97] to-[#c99b86]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-32 bg-[#334058]/15" />
                  <Skeleton className="h-10 w-full rounded-md bg-gray-100" />
                </div>
              ))}
            </div>
          </FormSectionSkeleton>

          {/* Form Section 3 - EOI Value */}
          <FormSectionSkeleton 
            title="3. EOI Value"
            subtitle="Expression of Interest deposit amount"
            bgColor="from-[#334058] to-[#4a5d7a]"
          >
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 bg-[#334058]/15" />
              <Skeleton className="h-10 w-full rounded-md bg-gray-100" />
              <Skeleton className="h-3 w-64 bg-gray-200" />
            </div>
          </FormSectionSkeleton>

          {/* Form Section 4 - Sales Manager */}
          <FormSectionSkeleton 
            title="4. Fakhruddin Sales Manager"
            subtitle="Select your assigned sales manager"
            bgColor="from-[#DAAA97] to-[#c99b86]"
          >
            <div className="space-y-2">
              <Skeleton className="h-4 w-36 bg-[#334058]/15" />
              <Skeleton className="h-10 w-full rounded-md bg-gray-100" />
            </div>
          </FormSectionSkeleton>

          {/* Form Section 5 - Agency Info */}
          <FormSectionSkeleton 
            title="5. Agency Information"
            subtitle="If applicable, provide agency details"
            bgColor="from-[#334058] to-[#4a5d7a]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-[#334058]/15" />
                  <Skeleton className="h-10 w-full rounded-md bg-gray-100" />
                </div>
              ))}
            </div>
          </FormSectionSkeleton>

          {/* Developer Info Skeleton */}
          <div className="bg-gradient-to-br from-[#334058] via-[#3d4d6a] to-[#2c3a4f] rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden relative">
            <div className="absolute -right-20 -top-20 w-60 h-60 bg-[#DAAA97]/20 rounded-full blur-3xl" />
            <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-[#DAAA97]/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Skeleton className="w-6 h-6 rounded bg-[#DAAA97]/30" />
                <Skeleton className="h-6 sm:h-7 w-48 bg-white/20" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-3 w-28 bg-[#DAAA97]/30" />
                    <Skeleton className="h-5 w-full max-w-xs bg-white/20" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* EOI Process Skeleton */}
          <FormSectionSkeleton 
            title="EOI Process"
            subtitle="Important information about the EOI process"
            bgColor="from-[#DAAA97] to-[#c99b86]"
          >
            <div className="space-y-4">
              {/* Description paragraphs */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-gray-200" />
                <Skeleton className="h-4 w-11/12 bg-gray-200" />
                <Skeleton className="h-4 w-4/5 bg-gray-200" />
              </div>
              
              {/* Steps */}
              <div className="border-t border-gray-100 pt-6 space-y-3">
                <Skeleton className="h-5 w-24 bg-[#334058]/20" />
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Skeleton className="w-6 h-6 rounded-full flex-shrink-0 bg-[#DAAA97]/20" />
                    <Skeleton className="h-4 w-full bg-gray-200" />
                  </div>
                ))}
              </div>
            </div>
          </FormSectionSkeleton>

          {/* Terms & Conditions Skeleton */}
          <FormSectionSkeleton 
            title="EOI Terms and Conditions"
            subtitle="Please read carefully before submitting"
            bgColor="from-[#334058] to-[#4a5d7a]"
          >
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 space-y-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <Skeleton key={i} className="h-3 w-full bg-gray-200" style={{ width: `${90 - i * 3}%` }} />
                ))}
              </div>
              
              {/* Checkbox */}
              <div className="flex items-start gap-3">
                <Skeleton className="w-5 h-5 rounded bg-[#DAAA97]/30" />
                <Skeleton className="h-4 w-80 bg-gray-200" />
              </div>
            </div>
          </FormSectionSkeleton>

          {/* Submit Button Skeleton */}
          <Skeleton className="h-14 sm:h-16 w-full rounded-2xl bg-gradient-to-r from-[#DAAA97]/40 to-[#c99b86]/40" />
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// Helper Component - Form Section Skeleton
// ============================================================================
interface FormSectionSkeletonProps {
  title: string;
  subtitle: string;
  bgColor: string;
  children: React.ReactNode;
}

function FormSectionSkeleton({ title, subtitle, bgColor, children }: FormSectionSkeletonProps) {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${bgColor} p-4 sm:p-6`}>
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20" />
          <div className="space-y-1">
            <Skeleton className="h-5 sm:h-6 w-36 sm:w-44 bg-white/30" />
            <Skeleton className="h-3 sm:h-4 w-28 sm:w-36 bg-white/20" />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 sm:p-8">
        {children}
      </div>
    </div>
  )
}

// ============================================================================
// Full Page Skeleton - Combines all skeletons
// ============================================================================
export function PageSkeleton() {
  return (
    <main className="min-h-screen">
      <HeroSkeleton />
      <OverviewSkeleton />
      <EOIFormSkeleton />
    </main>
  )
}

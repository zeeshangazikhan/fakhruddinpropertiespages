
"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function TreppanTowerThankYouRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/eoi-treppan-living-prive/thank-you')
  }, [router])

  return null
}

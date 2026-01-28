"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function TreppanTowerGlobalRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/eoi-treppan-living-prive/global')
  }, [router])

  return null
}

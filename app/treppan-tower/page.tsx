"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function TreppanTowerRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/eoi-treppan-living-prive')
  }, [router])

  return null
}

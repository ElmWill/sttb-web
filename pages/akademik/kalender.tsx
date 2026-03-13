import { useEffect } from "react"
import { useRouter } from "next/router"

// Redirect /akademik/kalender → /kalender-akademik
export default function AkademikKalenderRedirect() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/kalender-akademik")
  }, [router])
  return null
}

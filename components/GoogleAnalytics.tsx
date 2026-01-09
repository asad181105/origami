'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track page view on route change
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      window.gtag('config', 'G-DX2ZL47E1G', {
        page_path: url,
      })
    }
  }, [pathname, searchParams])

  return null
}


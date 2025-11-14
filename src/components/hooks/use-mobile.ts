'use client'

import { useEffect, useState } from 'react'

/**
 * Small utility hook for toggling UI between mobile/desktop breakpoints.
 * Defaults to Tailwind's `md` breakpoint (768px).
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window === 'undefined' ? false : window.innerWidth <= breakpoint
  )

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint)

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [breakpoint])

  return isMobile
}


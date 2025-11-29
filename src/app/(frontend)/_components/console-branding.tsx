'use client'

import { printBranding } from '@/lib/branding'
import { useEffect } from 'react'

export default function ConsoleBranding() {
  useEffect(() => {
    printBranding()
  }, [])
  
  return null
}

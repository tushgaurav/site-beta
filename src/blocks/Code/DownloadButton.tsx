'use client'

import { DownloadIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

export default function DownloadButton({ code, filename }: { code: string; filename?: string }) {
  const handleDownload = () => {
    const name = filename || 'others.txt'
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = name
    anchor.click()

    URL.revokeObjectURL(url)
    toast.success(`Downloaded ${name}`)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDownload}
      aria-label="Download code"
      className="h-7 w-7 text-muted-foreground/70 transition-colors hover:text-foreground"
    >
      <DownloadIcon className="h-3.5 w-3.5" />
    </Button>
  )
}

'use client'

import { useState } from 'react'
import { CopyIcon, ClipboardCheck } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    toast.success('Code copied to clipboard.')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      aria-label="Copy code"
      className="h-7 w-7 text-muted-foreground/70 transition-colors hover:text-foreground"
    >
      {copied ? <ClipboardCheck className="h-3.5 w-3.5" /> : <CopyIcon className="h-3.5 w-3.5" />}
    </Button>
  )
}

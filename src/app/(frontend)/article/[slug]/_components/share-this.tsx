'use client'

import { Separator } from '@/components/ui/separator'
import { Linkedin, Facebook } from 'lucide-react'

interface ShareThisProps {
  title?: string
  url?: string
}

export default function ShareThis({ title, url }: ShareThisProps) {
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const shareTitle = title || 'Check this out!'

  const handleShare = (platform: string) => {
    let shareLink = ''

    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
        break
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        break
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
        break
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'noopener,noreferrer,width=600,height=400')
    }
  }

  return (
    <>
      <Separator className="mb-4 mt-8" />

      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-sm">Share:</span>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleShare('twitter')}
            className="hover:text-muted-foreground transition-colors"
            aria-label="Share on X (Twitter)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
              <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
            </svg>
          </button>
          <button
            onClick={() => handleShare('facebook')}
            className="hover:text-muted-foreground transition-colors"
            aria-label="Share on Facebook"
          >
            <Facebook size={20} />
          </button>
          <button
            onClick={() => handleShare('linkedin')}
            className="hover:text-muted-foreground transition-colors"
            aria-label="Share on LinkedIn"
          >
            <Linkedin size={20} />
          </button>
        </div>
      </div>
    </>
  )
}

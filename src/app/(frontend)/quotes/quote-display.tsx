'use client'

import { useEffect, useState } from 'react'
import { Shuffle } from 'lucide-react'

type QuoteItem = {
  id: number
  quote: string
  author: string | null
}

/* Scale the type down as quotes get longer so short aphorisms feel
   monumental and long passages stay readable. */
function quoteSizeClass(length: number): string {
  if (length <= 90) return 'text-4xl md:text-6xl leading-[1.15]'
  if (length <= 200) return 'text-3xl md:text-5xl leading-[1.2]'
  return 'text-2xl md:text-4xl leading-[1.3]'
}

export default function QuoteDisplay({ quotes }: { quotes: QuoteItem[] }) {
  const [index, setIndex] = useState<number | null>(null)

  useEffect(() => {
    setIndex(Math.floor(Math.random() * quotes.length))
  }, [quotes.length])

  const shuffle = () => {
    if (quotes.length < 2 || index === null) return
    let next = index
    while (next === index) {
      next = Math.floor(Math.random() * quotes.length)
    }
    setIndex(next)
  }

  if (quotes.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-24 text-center">
        <p className="font-serif text-3xl italic text-muted-foreground">
          Nothing here yet.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Quotes will appear once they are added to the collection.
        </p>
      </div>
    )
  }

  const current = index !== null ? quotes[index] : null

  return (
    <section className="flex min-h-[calc(100dvh-10rem)] flex-1 flex-col">
      {/* Stage */}
      <div className="relative flex flex-1 items-center py-16 md:py-20">
        {current && (
          <figure key={current.id} className="w-full">
            <span
              aria-hidden
              className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-700 block select-none font-serif text-8xl leading-none text-muted-foreground/40 md:text-9xl"
            >
              &ldquo;
            </span>
            <blockquote
              className={`motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700 -mt-8 max-w-4xl font-serif ${quoteSizeClass(current.quote.length)} md:-mt-12`}
            >
              {current.quote}
            </blockquote>
            {current.author && (
              <figcaption className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-700 motion-safe:delay-150 motion-safe:fill-mode-both mt-8 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                &mdash;&nbsp;{current.author}
              </figcaption>
            )}
          </figure>
        )}
      </div>

      {quotes.length > 1 && (
        <div className="flex justify-end pb-6">
          <button
            type="button"
            onClick={shuffle}
            aria-label="Show another quote"
            title="Show another quote"
            className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-xs transition-all hover:bg-accent hover:text-foreground hover:shadow-sm active:translate-y-px active:shadow-none"
          >
            <Shuffle className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
          </button>
        </div>
      )}
    </section>
  )
}

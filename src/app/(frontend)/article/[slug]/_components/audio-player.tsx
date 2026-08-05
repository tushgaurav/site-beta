'use client'

import { useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'

const BAR_COUNT = 56
const PLAYBACK_RATES = [1, 1.25, 1.5, 2]

// Deterministic pseudo-random bar heights (same on server and client),
// giving the progress track a waveform feel without decoding the audio.
function barHeight(index: number): number {
  const x = Math.sin(index * 12.9898 + 78.233) * 43758.5453
  const fract = x - Math.floor(x)
  return 0.3 + 0.7 * fract
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return '--:--'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function ArticleAudioPlayer({ src, title }: { src: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(NaN)
  const [rateIndex, setRateIndex] = useState(0)

  const progress = duration > 0 ? currentTime / duration : 0

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
    }
  }

  const seek = (value: number) => {
    const audio = audioRef.current
    if (!audio || !Number.isFinite(duration)) return
    audio.currentTime = value * duration
    setCurrentTime(value * duration)
  }

  const cycleRate = () => {
    const next = (rateIndex + 1) % PLAYBACK_RATES.length
    setRateIndex(next)
    if (audioRef.current) {
      audioRef.current.playbackRate = PLAYBACK_RATES[next]
    }
  }

  return (
    <div className="group flex items-center gap-4 rounded-lg border bg-card px-4 py-3 my-4">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />

      <button
        onClick={togglePlay}
        aria-label={playing ? `Pause audio narration of ${title}` : `Listen to ${title}`}
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-105 active:scale-95"
      >
        {playing ? (
          <Pause size={16} fill="currentColor" strokeWidth={0} />
        ) : (
          <Play size={16} fill="currentColor" strokeWidth={0} className="translate-x-[1px]" />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex items-baseline justify-between gap-2">
          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
            Listen to this article
          </span>
          <span className="text-muted-foreground text-xs tabular-nums">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <div className="relative flex h-6 items-center" aria-hidden="false">
          <div className="flex h-full w-full items-center gap-[2px]">
            {Array.from({ length: BAR_COUNT }, (_, i) => (
              <span
                key={i}
                className={`min-w-0 flex-1 rounded-full transition-colors duration-150 ${
                  i / BAR_COUNT < progress ? 'bg-foreground' : 'bg-border'
                }`}
                style={{ height: `${barHeight(i) * 100}%` }}
              />
            ))}
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={progress}
            onChange={(e) => seek(Number(e.target.value))}
            aria-label="Seek audio narration"
            className="absolute inset-0 w-full cursor-pointer opacity-0"
          />
        </div>
      </div>

      <button
        onClick={cycleRate}
        aria-label={`Playback speed ${PLAYBACK_RATES[rateIndex]}x`}
        className="text-muted-foreground hover:text-foreground shrink-0 rounded-md border px-2 py-1 text-xs font-semibold tabular-nums transition-colors"
      >
        {PLAYBACK_RATES[rateIndex]}&times;
      </button>
    </div>
  )
}

'use client'

import { useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'

const PLAYBACK_RATES = [1, 1.25, 1.5, 2]

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return '--:--'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function ArticleAudioPlayer({ src, title }: { src: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(NaN)
  const [rateIndex, setRateIndex] = useState(0)

  const progress = duration > 0 ? currentTime / duration : 0

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play()
      setStarted(true)
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
    <div className="my-4 flex h-8 items-center gap-3">
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
        className="text-muted-foreground hover:border-foreground hover:text-foreground flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors"
      >
        {playing ? (
          <Pause size={11} fill="currentColor" strokeWidth={0} />
        ) : (
          <Play size={11} fill="currentColor" strokeWidth={0} className="translate-x-[1px]" />
        )}
      </button>

      {!started ? (
        <button
          onClick={togglePlay}
          className="text-muted-foreground hover:text-foreground flex items-baseline gap-2 text-xs font-semibold tracking-wider uppercase transition-colors"
        >
          Listen to this article
          <span className="text-muted-foreground/40 normal-case">&middot;</span>
          <span className="tabular-nums">{formatTime(duration)}</span>
        </button>
      ) : (
        <>
          <div className="group relative flex h-full min-w-0 flex-1 items-center">
            <div className="bg-muted-foreground/20 h-px w-full overflow-visible">
              <div
                className="bg-foreground relative h-px"
                style={{ width: `${progress * 100}%` }}
              >
                <span className="bg-foreground absolute top-1/2 right-0 size-[5px] -translate-y-1/2 translate-x-1/2 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </div>
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

          <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <button
            onClick={cycleRate}
            aria-label={`Playback speed ${PLAYBACK_RATES[rateIndex]}x`}
            className="text-muted-foreground hover:text-foreground shrink-0 text-xs font-semibold tabular-nums transition-colors"
          >
            {PLAYBACK_RATES[rateIndex]}&times;
          </button>
        </>
      )}
    </div>
  )
}

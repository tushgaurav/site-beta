import { elevenLabsProvider } from './elevenlabs'
import type { TTSProvider } from './types'

export type { SynthesizedAudio, TTSProvider } from './types'

/**
 * Single place to swap TTS vendors — add a provider module and switch here
 * (or branch on an env var) without touching the generation pipeline.
 */
export function getTTSProvider(): TTSProvider {
  return elevenLabsProvider
}

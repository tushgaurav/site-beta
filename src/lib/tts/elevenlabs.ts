import type { SynthesizedAudio, TTSProvider } from './types'

// "George" — a warm narration voice from the ElevenLabs default library.
const DEFAULT_VOICE_ID = process.env.ELEVENLABS_VOICE_ID || '0muxiGNHAVvmM1qWRtyV'
const DEFAULT_MODEL_ID = 'eleven_multilingual_v2'

// eleven_multilingual_v2 accepts up to 10,000 characters per request,
// so longer articles are synthesized in chunks and concatenated.
const MAX_CHUNK_CHARS = 9_000

function splitIntoChunks(text: string): string[] {
  const paragraphs = text.split('\n\n')
  const chunks: string[] = []
  let current = ''

  for (const paragraph of paragraphs) {
    const candidate = current ? `${current}\n\n${paragraph}` : paragraph
    if (candidate.length > MAX_CHUNK_CHARS && current) {
      chunks.push(current)
      current = paragraph
    } else {
      current = candidate
    }
  }

  if (current) chunks.push(current)
  return chunks
}

async function synthesizeChunk(
  chunk: string,
  context: { previousText?: string; nextText?: string },
): Promise<Buffer> {
  const voiceId = process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID
  const modelId = process.env.ELEVENLABS_MODEL_ID || DEFAULT_MODEL_ID

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: chunk,
        model_id: modelId,
        // Helps ElevenLabs keep prosody consistent across chunk boundaries.
        previous_text: context.previousText,
        next_text: context.nextText,
      }),
    },
  )

  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    throw new Error(`ElevenLabs request failed (${response.status}): ${detail}`)
  }

  return Buffer.from(await response.arrayBuffer())
}

export const elevenLabsProvider: TTSProvider = {
  name: 'elevenlabs',

  async synthesize(text: string): Promise<SynthesizedAudio> {
    if (!process.env.ELEVENLABS_API_KEY) {
      throw new Error('ELEVENLABS_API_KEY is not set')
    }

    const chunks = splitIntoChunks(text)
    const buffers: Buffer[] = []

    for (let i = 0; i < chunks.length; i++) {
      buffers.push(
        await synthesizeChunk(chunks[i], {
          previousText: i > 0 ? chunks[i - 1] : undefined,
          nextText: i < chunks.length - 1 ? chunks[i + 1] : undefined,
        }),
      )
    }

    return {
      // Same-bitrate CBR MP3 streams can be safely concatenated.
      audio: Buffer.concat(buffers),
      mimeType: 'audio/mpeg',
      fileExtension: 'mp3',
    }
  },
}

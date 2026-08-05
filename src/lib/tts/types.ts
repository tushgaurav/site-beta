export type SynthesizedAudio = {
  audio: Buffer
  mimeType: string
  fileExtension: string
}

export interface TTSProvider {
  name: string
  synthesize(text: string): Promise<SynthesizedAudio>
}

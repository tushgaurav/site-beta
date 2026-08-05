import { createHash } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { lexicalToScript } from '@/lib/narration/lexical-to-script'
import { polishScript } from '@/lib/narration/polish'
import { getTTSProvider } from '@/lib/tts'
import type { User } from '@/payload-types'

// Narration polish + TTS for a full article takes well over a minute.
export const maxDuration = 300

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const payload = await getPayload({ config: await config })

    const { user } = await payload.auth({ headers: request.headers })
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const article = await payload.findByID({
      collection: 'articles',
      id,
      depth: 1,
    })

    if (!article) {
      return Response.json({ error: 'Article not found' }, { status: 404 })
    }

    const draftScript = lexicalToScript(article.content)
    if (!draftScript) {
      return Response.json({ error: 'Article has no narratable content' }, { status: 400 })
    }

    const author = typeof article.author === 'object' ? (article.author as User) : null
    const intro = [article.title, author?.name ? `Written by ${author.name}.` : null]
      .filter(Boolean)
      .join('\n\n')

    const polished = await polishScript(draftScript)
    const script = `${intro}\n\n${polished}`

    const { audio, mimeType, fileExtension } = await getTTSProvider().synthesize(script)

    const media = await payload.create({
      collection: 'media',
      data: {
        alt: `Audio narration of “${article.title}”`,
      },
      file: {
        data: audio,
        mimetype: mimeType,
        name: `${article.slug}-narration-${Date.now()}.${fileExtension}`,
        size: audio.length,
      },
    })

    const previousAudioId =
      typeof article.audio === 'object' ? article.audio?.id : article.audio

    await payload.update({
      collection: 'articles',
      id,
      data: {
        audio: media.id,
        audioContentHash: createHash('sha256')
          .update(JSON.stringify(article.content))
          .digest('hex'),
        audioGeneratedAt: new Date().toISOString(),
      },
    })

    if (previousAudioId) {
      // Best effort — a stale media doc is not worth failing the request over.
      try {
        await payload.delete({ collection: 'media', id: previousAudioId })
      } catch (error) {
        payload.logger.warn(`Failed to delete previous narration media ${previousAudioId}: ${error}`)
      }
    }

    revalidatePath(`/article/${article.slug}`)

    return Response.json({
      success: true,
      mediaId: media.id,
      url: media.url,
      characters: script.length,
    })
  } catch (error) {
    console.error('Audio generation failed:', error)
    const message = error instanceof Error ? error.message : 'Audio generation failed'
    return Response.json({ error: message }, { status: 500 })
  }
}

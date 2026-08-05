/**
 * Deterministically converts Lexical rich text into a draft narration script.
 *
 * Blocks that can't be spoken (code, images, tables) are replaced with
 * bracketed markers like [CODE: typescript] which a later LLM pass turns
 * into natural spoken asides. Everything else is passed through verbatim
 * so the narration stays faithful to the written article.
 */

type LexicalNode = {
  type?: string
  tag?: string
  text?: string
  listType?: string
  children?: LexicalNode[]
  fields?: Record<string, unknown>
  value?: unknown
  [k: string]: unknown
}

function inlineText(node: LexicalNode): string {
  if (node.type === 'text') return node.text ?? ''
  if (node.type === 'linebreak') return ' '
  return (node.children ?? []).map(inlineText).join('')
}

function uploadMarker(node: LexicalNode): string {
  const value = node.value
  if (value && typeof value === 'object') {
    const media = value as { alt?: string; mimeType?: string }
    const kind = media.mimeType?.startsWith('video/') ? 'VIDEO' : 'IMAGE'
    return media.alt ? `[${kind}: ${media.alt}]` : `[${kind}]`
  }
  return '[IMAGE]'
}

function blockMarker(node: LexicalNode): string {
  const fields = (node.fields ?? {}) as {
    blockType?: string
    language?: string
    filename?: string
  }

  if (fields.blockType === 'code') {
    const parts = [fields.language, fields.filename && `file ${fields.filename}`].filter(Boolean)
    return parts.length > 0 ? `[CODE: ${parts.join(', ')}]` : '[CODE]'
  }

  return `[${(fields.blockType ?? 'block').toUpperCase()}]`
}

function nodeToScript(node: LexicalNode): string {
  switch (node.type) {
    case 'paragraph':
    case 'heading':
      return inlineText(node).trim()

    case 'quote':
      return `Quote — ${inlineText(node).trim()}`

    case 'list': {
      const ordered = node.listType === 'number'
      return (node.children ?? [])
        .map((item, index) => {
          const text = inlineText(item).trim()
          if (!text) return ''
          return ordered ? `${index + 1}. ${text}` : text
        })
        .filter(Boolean)
        .join('\n')
    }

    case 'upload':
      return uploadMarker(node)

    case 'block':
      return blockMarker(node)

    case 'horizontalrule':
      return ''

    default:
      // Unknown top-level node: fall back to its plain text.
      return inlineText(node).trim()
  }
}

export function lexicalToScript(content: unknown): string {
  const root = (content as { root?: LexicalNode } | null)?.root

  return (root?.children ?? [])
    .map(nodeToScript)
    .filter((section) => section.length > 0)
    .join('\n\n')
}

import { slugifyHeading } from '@/lib/utils'

type LexicalNode = {
  type?: string
  tag?: string
  text?: string
  format?: number | string
  children?: LexicalNode[]
  [k: string]: unknown
}

export type ArticleHeading = {
  id: string
  text: string
  level: 2 | 3
}

function fullText(node: LexicalNode): string {
  if (node.type === 'text') return node.text ?? ''
  return (node.children ?? []).map(fullText).join('')
}

export function extractHeadings(content: unknown): ArticleHeading[] {
  const root = (content as { root?: LexicalNode } | null)?.root
  const headings: ArticleHeading[] = []

  for (const node of root?.children ?? []) {
    if (node.type !== 'heading' || (node.tag !== 'h2' && node.tag !== 'h3')) continue

    const text = fullText(node).trim()
    // Same helper as headingConverter, so TOC anchors always match rendered ids.
    const id = slugifyHeading(text)
    if (!id) continue

    headings.push({
      id,
      text: text || id,
      level: node.tag === 'h2' ? 2 : 3,
    })
  }

  return headings
}

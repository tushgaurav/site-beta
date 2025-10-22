import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'

export const inlineConverters: JSXConverters = {
  text: ({ node }) => {
    let text = <>{node.text}</>

    if (node.format & 1) {
      text = <strong className="font-bold text-foreground">{text}</strong>
    }

    if (node.format & 2) {
      text = <em className="italic">{text}</em>
    }

    if (node.format & 8) {
      text = <s className="line-through opacity-70">{text}</s>
    }

    if (node.format & 4) {
      text = <u className="underline underline-offset-2">{text}</u>
    }

    if (node.format & 16) {
      text = (
        <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm border border-border text-foreground">
          {text}
        </code>
      )
    }

    if (node.format & 32) {
      text = <sub className="text-xs">{text}</sub>
    }

    if (node.format & 64) {
      text = <sup className="text-xs">{text}</sup>
    }

    return text
  },

  link: ({ node, nodesToJSX }) => {
    const fields = node.fields
    const children = nodesToJSX({ nodes: node.children })

    if (fields.linkType === 'internal' && fields.doc?.value) {
      const href =
        typeof fields.doc.value === 'string'
          ? fields.doc.value
          : `/article/${(fields.doc.value as unknown as { slug: string }).slug}`

      return (
        <Link
          href={href}
          className="text-primary hover:text-primary/80 underline underline-offset-2 decoration-primary/30 hover:decoration-primary/50 transition-colors font-medium"
        >
          {children}
        </Link>
      )
    }

    if (fields.linkType === 'custom' && fields.url) {
      const isExternal = fields.newTab || fields.url.startsWith('http')

      return (
        <a
          href={fields.url}
          target={fields.newTab ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-primary hover:text-primary/80 underline underline-offset-2 decoration-primary/30 hover:decoration-primary/50 transition-colors font-medium"
        >
          {children}
          {isExternal && <span className="ml-1 text-xs">↗</span>}
        </a>
      )
    }

    return <>{children}</>
  },
}

import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import {
  SerializedParagraphNode,
  SerializedListNode,
  SerializedListItemNode,
  SerializedBlockNode,
  SerializedQuoteNode,
  SerializedLineBreakNode,
} from '@payloadcms/richtext-lexical'

export const paragraphConverter: JSXConverters<SerializedParagraphNode> = {
  paragraph: ({ nodesToJSX, node }) => {
    return (
      <p className="mb-6 leading-relaxed text-foreground/90">
        {nodesToJSX({ nodes: node.children })}
      </p>
    )
  },
}

export const listConverter: JSXConverters<SerializedListNode | SerializedListItemNode> = {
  list: ({ node, nodesToJSX }) => {
    const Tag = node.listType === 'bullet' ? 'ul' : 'ol'
    return (
      <Tag
        className={`mb-6 space-y-2 ${node.listType === 'bullet' ? 'list-disc' : 'list-decimal'} pl-6 marker:text-muted-foreground`}
      >
        {nodesToJSX({ nodes: node.children })}
      </Tag>
    )
  },
  listitem: ({ node, nodesToJSX }) => {
    return (
      <li className="leading-relaxed text-foreground/90 pl-2">
        {nodesToJSX({ nodes: node.children })}
      </li>
    )
  },
}

export const codeConverter: JSXConverters<SerializedBlockNode> = {
  code: ({ node, nodesToJSX }) => {
    return (
      <pre className="mb-6 overflow-x-auto rounded-lg bg-muted p-4 border border-border">
        <code className="text-sm font-mono text-foreground">
          {nodesToJSX({ nodes: node.children })}
        </code>
      </pre>
    )
  },
}

export const quoteConverter: JSXConverters<SerializedQuoteNode> = {
  quote: ({ node, nodesToJSX }) => {
    return (
      <blockquote className="mb-6 border-l-4 border-primary pl-6 pr-4 py-2 italic text-foreground/80 bg-muted/30">
        {nodesToJSX({ nodes: node.children })}
      </blockquote>
    )
  },
}

export const linebreakConverter: JSXConverters<SerializedLineBreakNode> = {
  linebreak: () => {
    return <br />
  },
}

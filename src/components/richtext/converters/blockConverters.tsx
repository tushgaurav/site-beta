import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { CodeBlock } from '@/blocks/Code/Component'

export const blockConverter: JSXConverters<SerializedBlockNode> = {
  block: ({ node }) => {
    if (node.fields.blockType === 'code') {
      // @ts-expect-error
      return <CodeBlock {...node.fields} />
    }
    return null
  },
}

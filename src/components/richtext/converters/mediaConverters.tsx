import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedUploadNode, SerializedHorizontalRuleNode } from '@payloadcms/richtext-lexical'
import Image from 'next/image'

export const uploadConverter: JSXConverters<SerializedUploadNode> = {
  upload: ({ node }) => {
    const { value } = node

    if (!value || typeof value === 'string') {
      return null
    }

    const { url, alt, width, height, filename } = value

    if (!url) {
      return null
    }

    return (
      <figure className="my-8">
        <Image
          src={url}
          alt={alt || filename || 'Article image'}
          width={width || 1200}
          height={height || 800}
          className="rounded-lg shadow-md w-full h-auto"
          priority={false}
        />
        {alt && (
          <figcaption className="text-sm text-muted-foreground text-center mt-3 italic">
            {alt}
          </figcaption>
        )}
      </figure>
    )
  },
}

export const horizontalRuleConverter: JSXConverters<SerializedHorizontalRuleNode> = {
  horizontalrule: () => {
    return <hr className="my-12 border-t-2 border-border/50" />
  },
}

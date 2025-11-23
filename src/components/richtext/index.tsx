import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { jsxConverter } from '@/components/richtext/converters'
import { cn } from '@/lib/utils'

type Props = {
  data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>

export function RichText(props: Props) {
  const { className, ...rest } = props

  return (
    <article className={cn('prose dark:prose-invert lg:prose-xl', className)}>
      <RichTextConverter {...rest} converters={jsxConverter} />
    </article>
  )
}

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
    <div className={cn('prose-article max-w-none', 'text-base md:text-lg', className)}>
      <RichTextConverter {...rest} converters={jsxConverter} />
    </div>
  )
}

import React from 'react'
import { Code } from './Component.client'
import { cn } from '@/lib/utils'

export type CodeBlockProps = {
  code: string
  language?: string
  blockType: 'code'
  filename?: string
}

type Props = CodeBlockProps & { className?: string }

export const CodeBlock: React.FC<Props> = ({ className, code, language, filename }: Props) => {
  return (
    <div className={cn('bg-muted p-4 rounded-md', className)}>
      <Code code={code} language={language} filename={filename} />
    </div>
  )
}

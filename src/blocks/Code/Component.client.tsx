'use client'

import { Highlight, type PrismTheme } from 'prism-react-renderer'
import CopyButton from './CopyButton'
import DownloadButton from './DownloadButton'

type Props = {
  code: string
  language?: string
  filename?: string
}

// Muted, near-monochrome palette driven by CSS variables so it follows the
// site theme in both light and dark mode (see globals.css --code-* tokens).
const quietTheme: PrismTheme = {
  plain: {
    color: 'var(--code-plain)',
    backgroundColor: 'transparent',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: 'var(--code-comment)', fontStyle: 'italic' },
    },
    {
      types: ['punctuation', 'operator'],
      style: { color: 'var(--code-punctuation)' },
    },
    {
      types: ['keyword', 'atrule', 'selector', 'important'],
      style: { color: 'var(--code-keyword)' },
    },
    {
      types: ['string', 'char', 'inserted', 'attr-value', 'regex', 'url'],
      style: { color: 'var(--code-string)' },
    },
    {
      types: ['function', 'class-name', 'tag', 'deleted'],
      style: { color: 'var(--code-function)' },
    },
    {
      types: ['number', 'boolean', 'constant', 'symbol', 'builtin', 'attr-name', 'property', 'variable'],
      style: { color: 'var(--code-constant)' },
    },
  ],
}

export const Code: React.FC<Props> = ({ code, language = 'typescript', filename }) => {
  if (!code) return null

  const label = filename || language

  return (
    <figure className="not-prose group/code my-8 min-w-0 max-w-full overflow-hidden rounded-lg border border-border bg-card">
      {label && (
        <figcaption className="flex items-center justify-between gap-2 border-b border-border/60 py-1 pl-4 pr-1.5">
          <span className="truncate font-mono text-xs text-muted-foreground">
            {filename || <span className="lowercase">{language}</span>}
          </span>
          <div className="flex items-center">
            <DownloadButton code={code} filename={filename} />
            <CopyButton code={code} />
          </div>
        </figcaption>
      )}

      <Highlight theme={quietTheme} code={code.trimEnd()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} relative max-w-full whitespace-pre-wrap break-words px-4 py-3.5 font-mono text-[0.8125rem] leading-relaxed [tab-size:2]`}
            style={style}
          >
            {!label && (
              <div className="absolute right-1.5 top-1.5 flex items-center">
                <DownloadButton code={code} filename={filename} />
                <CopyButton code={code} />
              </div>
            )}
            {tokens.map((line, i) => (
              <span key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
                {'\n'}
              </span>
            ))}
          </pre>
        )}
      </Highlight>
    </figure>
  )
}

'use client'

import { Highlight, themes } from 'prism-react-renderer'
import CopyButton from './CopyButton'

type Props = {
  code: string
  language?: string
  filename?: string
}

export const Code: React.FC<Props> = ({ code, language = 'typescript', filename }) => {
  if (!code) return null

  return (
    <Highlight theme={themes.nightOwl} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          <CopyButton code={code} />
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

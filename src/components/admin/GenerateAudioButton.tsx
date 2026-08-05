'use client'

import { useState } from 'react'
import { Button, toast, useDocumentInfo, useFormFields, useFormModified } from '@payloadcms/ui'

export function GenerateAudioButton() {
  const { id } = useDocumentInfo()
  const modified = useFormModified()
  const hasAudio = useFormFields(([fields]) => Boolean(fields.audio?.value))
  const [generating, setGenerating] = useState(false)

  // New, unsaved documents have nothing to narrate yet.
  if (!id) return null

  const handleClick = async () => {
    if (modified) {
      toast.warning('Save your changes first — audio is generated from the saved article.')
      return
    }

    setGenerating(true)
    try {
      const res = await fetch(`/api/articles/${id}/generate-audio`, { method: 'POST' })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.error || 'Audio generation failed')
      }

      toast.success('Audio narration generated')
      window.location.reload()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Audio generation failed')
      setGenerating(false)
    }
  }

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <Button
        onClick={handleClick}
        disabled={generating}
        buttonStyle="secondary"
        size="medium"
        icon={generating ? undefined : 'plus'}
      >
        {generating
          ? 'Generating audio… this takes a minute'
          : hasAudio
            ? 'Regenerate audio narration'
            : 'Generate audio narration'}
      </Button>
    </div>
  )
}

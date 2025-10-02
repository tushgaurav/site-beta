import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import ArticlesSection from './_components/articles'
import { Page } from '@/components/page'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <Page>
      <h1>Hello {user?.name}</h1>
      <ArticlesSection />
    </Page>
  )
}

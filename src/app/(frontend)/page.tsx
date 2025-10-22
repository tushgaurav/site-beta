import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import ArticlesSection from './_components/articles'
import { Page, PageTitle, Paragraph } from '@/components/page'
import { Separator } from '@/components/ui/separator'
import SocialLinks from './_components/social-links'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const homepage = await payload.findGlobal({
    slug: 'homepage',
    depth: 1,
  })

  return (
    <Page>
      <PageTitle className="mt-10 mb-4">{homepage.heroTitle}</PageTitle>
      <Paragraph className="mt-4 mb-12 max-w-[60ch] text-gray-400">{homepage.bio}</Paragraph>
      <SocialLinks />
      <ArticlesSection />
    </Page>
  )
}

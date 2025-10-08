import type { Metadata, ResolvingMetadata } from 'next'
import { RichText } from '@/components/richtext'
import { Page, PageTitle, Paragraph } from '@/components/page'
import config from '@/payload.config'
import { getPayload } from 'payload'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'articles',
    depth: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })
  const article = docs[0]

  return {
    title: article.title,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'articles',
    depth: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })
  const article = docs[0]

  return (
    <Page>
      <PageTitle>{article.title}</PageTitle>

      <Paragraph className="mt-2 mb-10 max-w-[65ch] text-muted-foreground text-lg">
        {article.excerpt}
      </Paragraph>

      <article className="max-w-[75ch]">
        <RichText data={article.content} />
      </article>
    </Page>
  )
}

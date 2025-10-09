import type { Metadata, ResolvingMetadata } from 'next'
import { RichText } from '@/components/richtext'
import { Page, PageTitle, Paragraph } from '@/components/page'
import config from '@/payload.config'
import { getPayload } from 'payload'
import MoreArticles from './_components/more-articles'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import ShareThis from './_components/share-this'

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
      <div className="flex items-center gap-2 lg:gap-4 mt-10">
        {article.tags?.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}

        <div className="text-muted-foreground text-sm font-semibold uppercase">
          {new Date(article.publishedAt!).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
        <span className="mx-2 text-muted-foreground/40">|</span>
        <div className="text-muted-foreground text-sm font-semibold uppercase">
          {article.readingTime} min read
        </div>
      </div>
      <PageTitle>{article.title}</PageTitle>

      <Paragraph className="mt-2 mb-4 text-muted-foreground text-lg max-w-xl">
        {article.excerpt}
      </Paragraph>

      <Image
        src={article.featuredImage?.url!}
        alt={article.featuredImage?.alt!}
        width={800}
        height={800}
        className="rounded-lg max-w-2xl h-auto mb-4"
      />

      <div className="dark mx-auto grid gap-x-10 xl:grid-cols-[1fr_300px]">
        <RichText data={article.content} />
        <aside className="sticky top-20 self-start h-fit">
          <MoreArticles currentArticleSlug={slug} />
          <ShareThis />
        </aside>
      </div>
    </Page>
  )
}

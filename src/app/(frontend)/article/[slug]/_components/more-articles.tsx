import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import { Media } from '@/payload-types'

export default async function MoreArticles({ currentArticleSlug }: { currentArticleSlug: string }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: articles } = await payload.find({
    collection: 'articles',
    where: {
      slug: {
        not_equals: currentArticleSlug,
      },
    },
    limit: 3,
  })

  const recommendedArticles = articles.slice(0, 3)

  return (
    <div className="mt-10">
      <h4 className="uppercase text-sm text-muted-foreground font-semibold mb-4">More Articles</h4>
      <div className="flex flex-col gap-6">
        {recommendedArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/article/${article.slug}`}
            className="grid grid-cols-[1.4fr_1fr] gap-4 group"
          >
            <div>
              <h5 className="text-sm font-semibold line-clamp-2 group-hover:text-muted-foreground transition-colors">
                {article.title}
              </h5>
              <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
            </div>
            <Image
              src={(article.featuredImage as Media)?.url!}
              alt={(article.featuredImage as Media)?.alt!}
              width={100}
              height={100}
              className="rounded-xl h-full w-full"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

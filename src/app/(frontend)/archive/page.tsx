import { getPayload } from 'payload'
import config from '@/payload.config'
import { Page, PageTitle, Paragraph } from '@/components/page'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { Article } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Archive',
  description: 'Browse all blog posts organized by month',
}

function groupByYearAndMonth(articles: Article[]) {
  const yearGroups = new Map<string, Map<string, Article[]>>()

  for (const article of articles) {
    if (!article.publishedAt) continue

    const date = new Date(article.publishedAt)
    const year = date.getFullYear().toString()
    const monthKey = String(date.getMonth() + 1).padStart(2, '0')

    if (!yearGroups.has(year)) {
      yearGroups.set(year, new Map())
    }

    const monthsInYear = yearGroups.get(year)!
    if (!monthsInYear.has(monthKey)) {
      monthsInYear.set(monthKey, [])
    }
    monthsInYear.get(monthKey)!.push(article)
  }

  const sortedYears = Array.from(yearGroups.keys()).sort((a, b) => Number(b) - Number(a))

  for (const months of yearGroups.values()) {
    const sortedMonths = new Map(
      Array.from(months.entries()).sort(([a], [b]) => Number(b) - Number(a)),
    )
    months.clear()
    for (const [key, value] of sortedMonths) {
      months.set(key, value)
    }
  }

  return { yearGroups, sortedYears }
}

export default async function ArchivePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: articles } = await payload.find({
    collection: 'articles',
    where: {
      status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
    limit: 100,
  })

  if (!articles || articles.length === 0) {
    return (
      <Page>
        <PageTitle className="mt-10 mb-4">Archive</PageTitle>
        <Paragraph className="text-muted-foreground">No articles published yet.</Paragraph>
      </Page>
    )
  }

  const { yearGroups, sortedYears } = groupByYearAndMonth(articles)

  return (
    <Page>
      <PageTitle className="mt-10 mb-4">Archive</PageTitle>
      <Paragraph className="mb-8 text-muted-foreground">
        A chronological collection of all {articles.length}{' '}
        {articles.length === 1 ? 'article' : 'articles'} I've written, organized by year and month.
      </Paragraph>

      <div className="max-w-3xl">
        {sortedYears.map((year) => {
          const monthsInYear = yearGroups.get(year)!
          const totalArticlesInYear = Array.from(monthsInYear.values()).reduce(
            (sum, articles) => sum + articles.length,
            0,
          )

          return (
            <div key={year} className="mb-12">
              <h2 className="text-2xl font-bold mb-2 flex justify-between items-center gap-2">
                {year}
                <span className="text-muted-foreground text-lg font-normal">
                  ({totalArticlesInYear})
                </span>
              </h2>

              <Accordion type="single" collapsible className="w-full">
                {Array.from(monthsInYear.entries()).map(([monthKey, monthArticles]) => {
                  const monthDate = new Date(Number(year), Number(monthKey) - 1, 1)
                  const monthLabel = monthDate.toLocaleDateString('en-US', { month: 'long' })

                  return (
                    <AccordionItem key={`${year}-${monthKey}`} value={`${year}-${monthKey}`}>
                      <AccordionTrigger className="text-base hover:no-underline">
                        <div className="flex items-center justify-between w-full pr-4">
                          <span>{monthLabel}</span>
                          <span className="text-muted-foreground text-sm">
                            ({monthArticles.length})
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-3 ml-4">
                          {monthArticles.map((article) => (
                            <li
                              key={article.id}
                              className="flex flex-col sm:flex-row sm:items-baseline gap-2"
                            >
                              <Link
                                href={`/article/${article.slug}`}
                                className="text-foreground hover:underline font-medium"
                              >
                                {article.title}
                              </Link>
                              <span className="text-muted-foreground text-xs sm:ml-auto whitespace-nowrap">
                                {new Date(article.publishedAt!).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </div>
          )
        })}
      </div>
    </Page>
  )
}

import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import QuoteDisplay from './quote-display'

export const metadata: Metadata = {
  title: 'Quotes',
  description: 'A collection of words worth keeping. One at a time.',
}

export default async function QuotesPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'quotes',
    limit: 0,
    pagination: false,
    sort: 'createdAt',
  })

  const quotes = docs.map((doc) => ({
    id: doc.id,
    quote: doc.quote,
    author: doc.author ?? null,
  }))

  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-1 flex-col px-8 py-4">
      <QuoteDisplay quotes={quotes} />
    </div>
  )
}

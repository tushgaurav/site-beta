import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Media } from '@/payload-types'
import Image from 'next/image'

export default async function Hobbies() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: hobbies } = await payload.find({
    collection: 'hobbies',
    where: {
      status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
    limit: 6,
  })

  if (!hobbies || hobbies.length === 0) {
    return (
      <div className="my-4 mt-12">
        <h1 className="text-2xl font-semibold mb-2 mt-6">Hobbies</h1>
        <p className="text-muted-foreground">No hobbies published yet.</p>
      </div>
    )
  }

  return (
    <div className="my-4 mt-12">
      <h1 className="text-2xl font-semibold mb-2 mt-6">Hobbies</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hobbies.map((hobby) => {
          const featuredImage = hobby.featuredImage as Media | null
          const imageUrl = featuredImage?.url

          return (
            <div key={hobby.id} className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {imageUrl && (
                <div className="relative w-full h-48">
                  <Image src={imageUrl} alt={featuredImage?.alt || hobby.title} fill className="object-cover" />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{hobby.title}</h2>
                {hobby.description && (
                  <p className="text-sm text-muted-foreground line-clamp-3">{hobby.description}</p>
                )}
                <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                  {hobby.publishedAt && (
                    <span>
                      {new Date(hobby.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
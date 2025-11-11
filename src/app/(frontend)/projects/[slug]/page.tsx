import type { Metadata } from 'next'
import { Page, PageTitle, Paragraph } from '@/components/page'
import config from '@/payload.config'
import { getPayload } from 'payload'
import { RichText } from '@/components/richtext'
import { Media } from '@/payload-types'
import Image from 'next/image'
import { Github, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'projects',
    depth: 1,
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const project = docs[0]

  return {
    title: project.title,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'projects',
    depth: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })
  const project = docs[0]

  // Sort links to show non-GitHub links first, then GitHub
  const sortedLinks = project.links?.sort((a, b) => {
    const aIsGithub = a.url.toLowerCase().includes('github.com')
    const bIsGithub = b.url.toLowerCase().includes('github.com')
    if (!aIsGithub && bIsGithub) return -1
    if (aIsGithub && !bIsGithub) return 1
    return 0
  })

  return (
    <Page>
      <PageTitle>{project.title}</PageTitle>
      <Paragraph className="mb-8 text-muted-foreground">{project.description}</Paragraph>

      {/* Links Section */}
      {sortedLinks && sortedLinks.length > 0 && (
        <div className="mb-8 flex gap-4">
          {sortedLinks.map((link, index) => {
            const isGithub = link.url.toLowerCase().includes('github.com')
            return (
              <Link
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {isGithub ? (
                  <>
                    <Github className="h-4 w-4" />
                    View on GitHub
                  </>
                ) : (
                  <>
                    <ExternalLink className="h-4 w-4" />
                    View Project
                  </>
                )}
              </Link>
            )
          })}
        </div>
      )}

      <Image
        src={(project.image as Media)?.url!}
        alt={(project.image as Media)?.alt!}
        width={800}
        height={600}
        className="object-cover"
      />
      <RichText data={project.content} />
    </Page>
  )
}

import type { Metadata } from 'next'
import { Page, PageTitle, Paragraph, Subtitle } from '@/components/page'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { About } from '@/payload-types'
import { SerializedEditorState, SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'

export const metadata: Metadata = {
  title: 'About Me',
  description: 'About me',
}

const richTextClassName =
  'prose prose-neutral dark:prose-invert max-w-none text-base leading-relaxed'

export default async function About() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const about = (await payload.findGlobal({
    slug: 'about',
    depth: 1,
  })) as About

  const missions = about.mission.missions ?? []
  const beliefs = about.beliefs.beliefsList ?? []
  const wisdom = about.wisdom ?? []

  return (
    <Page>
      <PageTitle className="mt-6">{about.hero.title}</PageTitle>

      <Paragraph className="text-lg">{about.hero.tagline}</Paragraph>

      <AboutSubSection
        title={about.history.heading}
        content={about.history.content as unknown as SerializedEditorState<SerializedLexicalNode>}
      />

      <section className="mt-12 max-w-[90ch]">
        <Subtitle>{about.mission.heading}</Subtitle>
        {missions.length > 0 && (
          <ul className="mt-4 list-disc space-y-2 pl-6">
            {missions.map((mission) => (
              <li key={mission.id ?? mission.mission}>{mission.mission}</li>
            ))}
          </ul>
        )}
        {about.mission.currentFocus && (
          <div className="mt-6 rounded-xl border border-border/60 bg-muted/10 p-5 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Current focus
            </p>
            <div className="mt-3">
              <RichText data={about.mission.currentFocus} className={richTextClassName} />
            </div>
          </div>
        )}
      </section>

      <AboutSubSection
        title={about.realTalk.heading}
        content={about.realTalk.content as unknown as SerializedEditorState<SerializedLexicalNode>}
      />

      {/* BELIEFS */}
      <section className="mt-12 max-w-[90ch]">
        <Subtitle>{about.beliefs.heading}</Subtitle>
        {beliefs.length > 0 ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {beliefs.map((belief) => (
              <blockquote
                key={belief.id ?? belief.belief}
                className="rounded-xl border border-border/60 bg-card/30 p-4 text-base"
              >
                {belief.belief}
              </blockquote>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No beliefs added yet.</p>
        )}
      </section>

      <AboutSubSection
        title={about.interests.heading}
        content={about.interests.content as unknown as SerializedEditorState<SerializedLexicalNode>}
      />

      {wisdom.length > 0 && (
        <section className="mt-12 max-w-[90ch]">
          <Subtitle>Wisdom & Quotes</Subtitle>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {wisdom.map((item) => (
              <blockquote
                key={item.id ?? item.quote}
                className="rounded-xl border border-border/60 bg-muted/10 p-4 italic text-muted-foreground"
              >
                “{item.quote}”
              </blockquote>
            ))}
          </div>
        </section>
      )}
    </Page>
  )
}

function AboutSubSection({
  title,
  content,
}: {
  title: string
  content: SerializedEditorState<SerializedLexicalNode>
}) {
  return (
    <section className="mt-12 max-w-[90ch]">
      <Subtitle>{title}</Subtitle>
      <RichText data={content} className={richTextClassName} />
    </section>
  )
}

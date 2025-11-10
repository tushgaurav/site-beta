import { Page, PageTitle, Paragraph } from '@/components/page'
import type { Metadata } from 'next'
import ProjectsAtGlance from './_component/projects-at-glance'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A collection of my projects',
}

export default function ProjectsPage() {
  return (
    <Page>
      <PageTitle>Projects</PageTitle>
      <Paragraph className="mb-8 text-muted-foreground">
        Some of the things I've worked on. Most of them are open source.
      </Paragraph>

      <ProjectsAtGlance />
    </Page>
  )
}

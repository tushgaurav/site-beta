import { Page, PageTitle } from '@/components/page'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import Hobbies from '../_components/hobbies'

export default async function About() {
  const payload = await getPayload({ config })
  const about = await payload.findGlobal({ slug: 'about', depth: 1 })
  console.log(about)

  const profileImage =
    typeof about.profileImage === 'object' && about.profileImage !== null
      ? (about.profileImage as Media)
      : null

  return (
    <Page>
      <PageTitle>About</PageTitle>

      <section className="flex gap-4">
        <RichText data={about.content} />
        {profileImage && (
          <Image src={profileImage.url!} alt={profileImage.alt!} width={300} height={300} />
        )}
      </section>

      <Hobbies />
    </Page>
  )
}

import type { Metadata } from 'next'
import { Page, PageTitle } from '@/components/page'
import ContactForm from './_components/contact-form'
import MediaSection from './_components/media-section'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Contact | Tushar Gaurav',
  description: 'Contact me',
}

export default function Contact() {
  return (
    <Page>
      <PageTitle className="text-center">Drop me a line</PageTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-8">
        <div className="flex flex-col order-2 lg:order-1">
          <ContactForm />
        </div>

        <div className="order-1 lg:order-2">
          <MediaSection
            // Uncomment and add your video/image source when ready
            videoSrc="https://s3.ap-south-1.amazonaws.com/tushgaurav.com/contact.mp4"
            // imageSrc="/path/to/your/image.jpg"
            overlayText="Say Hello"
            overlaySubtext="Whether it's about a project, collaboration, or just to say hi—I'd love to hear from you."
          />
        </div>
      </div>
    </Page>
  )
}

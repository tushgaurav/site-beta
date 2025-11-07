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
      <PageTitle className="text-center">Get in touch</PageTitle>

      <Script
        defer
        type="text/javascript"
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-8">
        <div className="flex flex-col order-2 lg:order-1">
          <ContactForm />
        </div>

        <div className="order-1 lg:order-2">
          <MediaSection
            // Uncomment and add your video/image source when ready
            videoSrc="https://s3.ap-south-1.amazonaws.com/tushgaurav.com/contact.mp4"
            // imageSrc="/path/to/your/image.jpg"
            overlayText="Let's Connect"
            overlaySubtext="I'd love to hear from you. Send me a message and I'll respond as soon as possible."
          />
        </div>
      </div>
    </Page>
  )
}

'use server'

import ContactResponseEmail from '@/../emails/contact-responses'
import { formSchema } from './_components/contact-form'
import { z } from 'zod'
import config from '@/payload.config'
import { getPayload } from 'payload'
import { render } from '@react-email/components'

export async function processContactFormSubmission(formData: z.infer<typeof formSchema>) {
  const { name, email, message, category, sendCopy } = formData

  const payload = await getPayload({ config })
  const contactMessage = await payload.create({
    collection: 'contact-messages',
    data: {
      name,
      email,
      message,
      category,
    },
  })

  if (sendCopy) {
    const emailHtml = await render(
      <ContactResponseEmail
        name={name}
        email={email}
        category={category}
        message={message}
        submittedAt={new Date()}
      />,
    )
    await payload.sendEmail({
      to: email,
      subject: 'Message from Tushar Gaurav',
      html: emailHtml,
    })
  }

  return {
    success: 'Message saved',
  }
}

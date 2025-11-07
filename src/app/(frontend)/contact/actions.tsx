"use server"

import ContactResponseEmail from "@/../emails/contact-responses"
import { formSchema } from "./_components/contact-form"
import { z } from "zod"
import { validateCaptchaToken } from "@/lib/utils"
import config from "@/payload.config"
import { getPayload } from "payload"
import { render } from "@react-email/components"

export async function processContactFormSubmission(formData: z.infer<typeof formSchema>, token: string) {
    if (!token) {
        return { error: "Invalid request" }
    }

    const isValid = await validateCaptchaToken(token)

    console.log(isValid)

    // if (!isValid) {
    //     return { error: "Invalid captcha token"}
    // }

    const { name, email, message, category, sendCopy } = formData

    const payload = await getPayload({ config })
    const contactMessage = await payload.create({
        collection: 'contact-messages',
        data: {
            name,
            email,
            message,
            category,
        }
    })

    if (sendCopy) {
        const emailHtml = await render(<ContactResponseEmail name={name} email={email} category={category} message={message} submittedAt={new Date()} />)
        await payload.sendEmail({
            to: email,
            subject: "Message from Tushar Gaurav",
            html: emailHtml,
        })
    }

    return {
        success: "Message saved"
    }
}
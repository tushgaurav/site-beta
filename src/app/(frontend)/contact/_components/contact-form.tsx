"use client"

import { useEffect } from "react"
import { Field, FieldGroup, FieldLabel, FieldError, FieldDescription } from "@/components/ui/field"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { processContactFormSubmission } from "../actions"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"

const categoryOptions = [
    { label: "General", value: "general" },
    { label: "Hiring", value: "hiring" },
    { label: "Support", value: "support" },
    { label: "Collaboration", value: "collaboration" },
    { label: "Projects", value: "projects" },
    { label: "Misc", value: "misc" },
] as const

export const formSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters.")
        .max(50, "Name must be less than 50 characters."),
    email: z
        .string()
        .email("Invalid email address."),
    message: z
        .string()
        .min(10, "Message must be at least 10 characters.")
        .max(10000, "Message is too long."),
    category: z
        .string()
        .min(1, "Please select a category.")
        .refine((val) => categoryOptions.some((option) => option.value === val), {
            message: "Invalid category.",
        }),
    sendCopy: z.boolean().default(false).optional(),
})

export default function ContactForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
            category: "",
            sendCopy: false,
        },
    })

    useEffect(() => {
        if (form.formState.isSubmitSuccessful) {
            toast("Message sent, I'll get back to you as soon as possible.")
            form.reset()
        }
    }, [form.formState.isSubmitSuccessful])

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data)
        return new Promise((resolve, reject) => {
            // @ts-ignore
            grecaptcha.ready(function () {
                // @ts-ignore
                grecaptcha
                    .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, {
                        action: "submit",
                    })
                    .then(function (token: string) {
                        processContactFormSubmission(data, token)
                            .then(() => {
                                resolve(true)
                            })
                            .catch((err: any) => {
                                reject(err)
                            })
                    })
                    .catch((err: any) => {
                        //error
                        console.error(err)
                        reject(err)
                    })
            })
        })
    }

    return (
        <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup className="gap-6">
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input
                                {...field}
                                id="name"
                                aria-invalid={fieldState.invalid}
                                placeholder="Your name"
                                autoComplete="name"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                {...field}
                                id="email"
                                type="email"
                                aria-invalid={fieldState.invalid}
                                placeholder="your@email.com"
                                autoComplete="email"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="category"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="category-select">Category</FieldLabel>
                            <FieldDescription id="category-description">
                                Select the category of your message
                            </FieldDescription>
                            <Select
                                name={field.name}
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger
                                    id="category-select"
                                    aria-invalid={fieldState.invalid}
                                    className="w-full sm:w-auto sm:min-w-[200px]"
                                >
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categoryOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="message"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="message">Message</FieldLabel>
                            <Textarea
                                {...field}
                                id="message"
                                aria-invalid={fieldState.invalid}
                                placeholder="Your message..."
                                autoComplete="off"
                                className="min-h-32 resize-y"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="sendCopy"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} orientation="horizontal" className="items-center">
                            <Checkbox
                                id="send-copy"
                                name={field.name}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                            <FieldLabel htmlFor="send-copy" className="!mt-0">
                                Send me a copy
                            </FieldLabel>
                        </Field>
                    )}
                />
            </FieldGroup>

            <div className="pt-2">
                <Button type="submit" form="contact-form" size="lg" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                        <>
                            <Spinner /> Submitting...
                        </>
                    ) : (
                        "Submit"
                    )}
                </Button>
            </div>
        </form>
    )
}

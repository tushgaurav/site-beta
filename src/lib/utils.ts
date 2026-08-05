import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

/**
 * Turns heading text into an anchor id. Used by both the heading renderer and
 * the table-of-contents extractor — keep them in sync via this single helper.
 */
export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export async function validateCaptchaToken(token: string) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    url: 'https://www.google.com/recaptcha/api/siteverify',
  }

  const response = await fetch(options.url, options)
  const data = await response.json()
  return data.success
}
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
import type { Config } from 'drizzle-kit'

export default {
  schema: './src/db/schema/',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.DATABASE_URI! },
  strict: true,
} satisfies Config

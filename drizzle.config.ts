import type { Config } from 'drizzle-kit'

// Mirrors the SSL handling in src/payload.config.ts. drizzle-kit ignores a
// separate ssl option when a url is given, so encode it in the url itself.
function databaseUrl(): string {
  const url = process.env.DATABASE_URI!
  if (url.includes('sslmode=') || process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === undefined) {
    return url
  }
  const sslmode =
    process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === 'false' ? 'no-verify' : 'require'
  return `${url}${url.includes('?') ? '&' : '?'}sslmode=${sslmode}`
}

export default {
  schema: './src/db/schema/',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: { url: databaseUrl() },
  strict: true,
} satisfies Config

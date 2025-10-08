import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

const db = drizzle(process.env.DATABASE_URI!, { schema })

export { db }

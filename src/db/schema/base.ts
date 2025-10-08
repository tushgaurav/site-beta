import { pgTable, serial, text, timestamp, jsonb } from '@payloadcms/db-postgres/drizzle/pg-core'

export const auditLogs = pgTable('audit_logs', {
  id: serial('id').primaryKey(),
  event: text('event').notNull(),
  payload: jsonb('payload'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

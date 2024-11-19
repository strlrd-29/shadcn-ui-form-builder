import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const forms = sqliteTable("forms", {
  id: integer("id").primaryKey(),
  content: text("content").notNull(),
  created_at: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})

export type InsertForms = typeof forms.$inferInsert

import "dotenv/config"

import dotenv from "dotenv"
import type { Config } from "drizzle-kit"

dotenv.config({
  path: ".env.local",
})

export default {
  schema: "./db/schema/*",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_DATABASE_AUTH_TOKEN!,
  },
  out: "./drizzle",
} satisfies Config

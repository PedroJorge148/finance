// src/seed.ts

import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'

import * as schema from '@/db/schema'

config({ path: '.env.local' })

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql, { schema })

async function seed() {
  await db.delete(schema.accounts)
}

async function main() {
  try {
    await seed()
    console.log('Seeding completed')
  } catch (error) {
    console.error('Error during seeding:', error)
    process.exit(1)
  }
}

main()

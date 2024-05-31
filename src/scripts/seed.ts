import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'

import * as schema from '@/db/schema'
import { convertAmountToCents } from '@/lib/utils'
import { eachDayOfInterval, format, subDays } from 'date-fns'

config({ path: '.env.local' })

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

const SEED_USER_ID = 'user_2gVcRYL2sWKyYQbA2SndSb6RIit'
const SEED_CATEGORIES = [
  { id: 'category_1', name: 'Food', userId: SEED_USER_ID, plaidId: null },
  { id: 'category_2', name: 'Rent', userId: SEED_USER_ID, plaidId: null },
  { id: 'category_3', name: 'Utilities', userId: SEED_USER_ID, plaidId: null },
  { id: 'category_7', name: 'Clothing', userId: SEED_USER_ID, plaidId: null },
]

const SEED_ACCOUNTS = [
  { id: 'account_1', name: 'Checking', userId: SEED_USER_ID, plaidId: null },
  { id: 'account_2', name: 'Savings', userId: SEED_USER_ID, plaidId: null },
]

const defaultTo = new Date()
const defaultFrom = subDays(defaultTo, 90)

const SEED_TRANSACTION: (typeof schema.transactions.$inferSelect)[] = []

function generateRandomAmount(category: typeof schema.categories.$inferInsert) {
  switch (category.name) {
    case 'Rent':
      return Math.floor(Math.random() * 400 + 90) // Rent will likely be a larger
    case 'Utilities':
      return Math.floor(Math.random() * 200 + 50)
    case 'Food':
      return Math.floor(Math.random() * 30 + 10)
    case 'Health':
      return Math.floor(Math.random() * 50 + 15)
    case 'Miscellaneous':
      return Math.floor(Math.random() * 100 + 20)
    default:
      return Math.floor(Math.random() * 50 + 10)
  }
}

function generateTransctionsForDay(day: Date) {
  const numTransaction = Math.floor(Math.random() * 4) + 1 // 1 to 4 transactions per day

  for (let i = 0; i < numTransaction; i++) {
    const category =
      SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)]
    const isExpense = Math.random() > 0.6 // 60% chance of being an expense
    const amount = generateRandomAmount(category)
    const formattedAmount = convertAmountToCents(isExpense ? -amount : amount)

    SEED_TRANSACTION.push({
      id: `transaction_${format(day, 'yyyy-MM-dd')}_${i}`,
      accountId: SEED_ACCOUNTS[0].id, // Assuming always using the first account for simplicity
      categoryId: category.id,
      date: day,
      amountInCents: formattedAmount,
      payee: 'Merchant',
      notes: 'Random transaction',
    })
  }
}

function generateTransactions() {
  const days = eachDayOfInterval({ start: defaultFrom, end: defaultTo })
  days.forEach((day) => generateTransctionsForDay(day))
}

generateTransactions()

async function main() {
  try {
    console.log('Seeding the database...')
    await db.delete(schema.transactions).execute()
    await db.delete(schema.accounts).execute()
    await db.delete(schema.categories).execute()
    console.log('Database reseted!')

    console.log('Seeding categories...')
    await db.insert(schema.categories).values(SEED_CATEGORIES).execute()

    console.log('Seeding accounts...')
    await db.insert(schema.accounts).values(SEED_ACCOUNTS).execute()

    console.log('Seeding trasactions...')
    await db.insert(schema.transactions).values(SEED_TRANSACTION).execute()

    console.log('Seeding completed')
  } catch (error) {
    console.error('Error during seeding:', error)
    process.exit(1)
  }
}

main()

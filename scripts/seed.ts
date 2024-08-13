import { accounts, categories, transactions } from '@/db/schema'
import { convertAmountToMiliunits } from '@/lib/utils'
import { neon } from '@neondatabase/serverless'
import { eachDayOfInterval, format, subDays } from 'date-fns'
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/neon-http'

config({ path: '.env' })

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

const SEED_USER_ID = 'user_2hz88GO8wRme8s7ljH7OJNXMirw'
const SEED_CATEGORIES = [
  { id: 'category_1', name: 'Food', userId: SEED_USER_ID, plaidId: null },
  { id: 'category_2', name: 'Rent', userId: SEED_USER_ID, plaidId: null },
  { id: 'category_3', name: 'Utilities', userId: SEED_USER_ID, plaidId: null },
  {
    id: 'category_4',
    name: 'Transportation',
    userId: SEED_USER_ID,
    plaidId: null,
  },
  { id: 'category_5', name: 'Health', userId: SEED_USER_ID, plaidId: null },
  {
    id: 'category_6',
    name: 'Entertainment',
    userId: SEED_USER_ID,
    plaidId: null,
  },
  {
    id: 'category_7',
    name: 'Miscellaneous',
    userId: SEED_USER_ID,
    plaidId: null,
  },
]

const SEED_ACCOUNTS = [
    {
        id: 'account_1',
        name: 'Checking',
        userId: SEED_USER_ID,
        plaidId: null,
    },
    {
        id: 'account_2',
        name: 'Savings',
        userId: SEED_USER_ID,
        plaidId: null
    }
    ]

const defaultTo = new Date()
const defaultFrom = subDays(defaultTo, 30)

const SEED_TRANSACTIONS: (typeof transactions.$inferInsert)[] = []

const generateRamdomAmount = (category: typeof categories.$inferInsert) => {
  switch (category.name) {
    case 'Food':
      return Math.random() * 50
    case 'Rent':
      return Math.random() * 400 + 20
    case 'Utilities':
      return Math.random() * 100 + 10
    case 'Transportation':
      return Math.random() * 50 + 5
    case 'Health':
      return Math.random() * 100 + 10
    case 'Entertainment':
      return Math.random() * 50 + 5
    case 'Miscellaneous':
      return Math.random() * 50 + 5
    default:
      return Math.random() * 100 + 10
  }
}

const generateTransactionsForDay = (day: Date) => {
  const numTransactions = Math.floor(Math.random() * 4) + 1
  for (let i = 0; i < numTransactions; i++) {
    const category =
      SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)]
    const isExpense = Math.random() > 0.6
    const amount = generateRamdomAmount(category)
    const formattedAmount = convertAmountToMiliunits(
      isExpense ? -amount : amount
    )
    SEED_TRANSACTIONS.push({
      id: `transaction_${format(day, 'yyyyMMdd')}_${i}`,
      accountId: SEED_ACCOUNTS[0].id,
      categoryId: category.id,
      date: day,
      amount: formattedAmount,
      payee: 'Merchant',
      notes: 'Transaction notes',
    })
  }
}

const generateTransactions = () => {
  const days = eachDayOfInterval({
    start: defaultFrom,
    end: defaultTo,
  })
  days.forEach((day) => {
    generateTransactionsForDay(day)
  })
}

generateTransactions()

const main = async () => {
  try {
    await db.delete(transactions).execute()
    await db.delete(accounts).execute()
    await db.delete(categories).execute()
    await db.insert(categories).values(SEED_CATEGORIES).execute()
    await db.insert(accounts).values(SEED_ACCOUNTS).execute()
    await db.insert(transactions).values(SEED_TRANSACTIONS).execute()
  } catch (error) {
    console.error('Error seeding database', error)
    process.exit(1)
  }
}

main()

import { Hono } from 'hono'
import { z } from 'zod'


const expenseSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(3).max(100),
  amount: z.number().nonnegative(),
})

type Expense = z.infer<typeof expenseSchema>

const expenseCreateSchema = expenseSchema.omit({ id: true })

const EXPENSES: Expense[] = [
  {
    id: 1,
    name: 'Internet',
    amount: 40
  },
  {
    id: 2,
    name: 'Rent',
    amount: 1000
  },
  {
    id: 3,
    name: 'Food',
    amount: 300
  }
]


export const expensesRoute = new Hono()
  .get('/', (c) => {
    return c.json(EXPENSES)
  })
  .get('/:id', (c) => {
    const id = Number(c.req.param('id'))
    const expense = EXPENSES.find(e => e.id === id)
    if (!expense) {
      return c.notFound()
    }
    return c.json(expense)
  })
  .post('/', async (c) => {
    const data = await c.req.json()
    const expense = expenseCreateSchema.parse(data)
    console.log('expense :', expense)
    EXPENSES.push({
      ...expense,
      id: EXPENSES.length + 1
    })
    return c.json({ expense })
  })
  .delete('/:id', (c) => {
    const id = Number(c.req.param('id'))
    const index = EXPENSES.findIndex(e => e.id === id)
    if (index === -1) {
      return c.notFound()
    }
    EXPENSES.splice(index, 1)
    return c.json(EXPENSES)
  })


import { zValidator } from '@hono/zod-validator'
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

const getExpenseById = (id: number) => {
  return EXPENSES.find(expense => expense.id === id)
}

const getExpenseIndexById = (id: number) => {
  return EXPENSES.findIndex(expense => expense.id === id)
}


export const expensesRoute = new Hono()
  .get('/', (c) => {
    return c.json(EXPENSES)
  })
  .get('/:id{[0-9]+}', (c) => {
    const id = Number(c.req.param('id'))
    const expense = getExpenseById(id)

    if (!expense) {
      return c.notFound()
    }
    return c.json(expense)
  })
  .post('/', zValidator('json', expenseCreateSchema), async (c) => {
    const data = c.req.valid('json')

    const expense = {
      ...data,
      id: EXPENSES.length + 1
    }
    EXPENSES.push(expense)
    return c.json({ expense })
  })
  .put('/:id{[0-9]+}', zValidator('json', expenseCreateSchema), async (c) => {
    const id = Number(c.req.param('id'))
    const expense = c.req.valid('json')

    const index = getExpenseIndexById(id)
    if (index === -1) {
      return c.notFound()
    }
    EXPENSES[index] = {
      ...expense,
      id,
    }
    return c.json({ expense: EXPENSES[index] })
  })
  .delete('/:id{[0-9]+}', (c) => {
    const id = Number(c.req.param('id'))

    const index = getExpenseIndexById(id)
    if (index === -1) {
      return c.notFound()
    }
    EXPENSES.splice(index, 1)
    return c.json(EXPENSES)
  })


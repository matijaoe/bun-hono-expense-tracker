import { Hono } from 'hono'
import { logger } from 'hono/logger';
import { expensesRoute } from './routes/expenses';

const app = new Hono()


app.use("*", logger());

app.basePath('/api')
  .get('/', (c) => c.text('Up and running! ✨'))
  .route('/expenses', expensesRoute)

export default app

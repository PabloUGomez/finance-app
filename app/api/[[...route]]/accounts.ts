import { Hono } from 'hono'

const app = new Hono().basePath('/api')

app.get('/', (c) => {
  return c.json({
    accounts: [],
  })
})

export default app
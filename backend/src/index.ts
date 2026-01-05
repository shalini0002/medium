import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono()



app.post('/api/v1/user/signup', (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: env.DATABASE_URL,
}).$extends(withAccelerate())
  return c.text("signup done!")
})
app.post('/api/v1/user/signin', (c) => {
  return c.text("signin done!")
})
app.post('/api/v1/user/blog', (c) => {
  return c.text("blog done!")
})
app.put('/api/v1/user/blog', (c) => {
  return c.text("signup done!")
})
app.get('/api/v1/user/blog/:id', (c) => {
  return c.text("signup done!")
})


export default app

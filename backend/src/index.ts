import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
  }
}>()

app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const body = await c.req.json()
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password // Note: Hash password in production
      }
    })
  
    const token = await sign({ id: user.id }, 'secret') // Await async sign; use env secret in prod
    
    return c.json({ jwt: token })
  } catch (error) {
    return c.json({ error: 'Signup failed' }, 400)
  }
})

app.post('/api/v1/user/signin', (c) => {
  return c.text('signin done!')
})

app.post('/api/v1/user/blog', (c) => {
  return c.text('blog done!')
})

app.put('/api/v1/user/blog', (c) => {
  return c.text('update done!')
})

app.get('/api/v1/user/blog/:id', (c) => {
  return c.text(`blog ${c.req.param('id')} done!`)
})

export default app

import { Hono } from 'hono'
import Environment from './utils/HonoEnv'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt"

import blog from './routes/blog'
import User from './routes/user'

const app = new Hono<Environment>()

//middlewares
app.use("*", async (c, next) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate())
    c.set("prisma", prisma)
    await next()
})

app.use("/api/v1/blog/*", async (c, next) => {
    const token = c.req.header("Authorization") || ""

    if (!token) return c.json({ error: "Not an authorized user" })
    // const token = jwt.split(' ')[1]; //if 'Bearer xyztoken'
    const response = await verify(token, c.env.JWT_SECRET)

    if (!response.id) {
        c.status(403)
        return c.json({ error: "Not an Authorized user" })
    }

    c.set("id", response.id);
    await next()
})
//

app.get('/', async (c) => {
  const prisma = c.get("prisma")
  const res = await prisma.user.findMany();
  console.log(res)
  return c.text('Hello Hono!')
})

//routes
app.route("/api/1/user",User)

app.route("/api/v1/blog",blog)


app.onError((err, c) => {
  console.error("Error occurred:", err); // Log the error (optional)

  // Return a generic error response
  return c.json(
    {
      success: false,
      message: err.message || "Internal Server Error",
    },
    500
  );
});

export default app

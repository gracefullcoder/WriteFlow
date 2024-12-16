import { sign } from 'hono/jwt'
import { Context } from "hono";
import { signinInput, signupInput } from '@vaibhavgupta11/writeflow_validation'

const createUser = async (c: Context) => {
    const body = await c.req.json();
    const success = signupInput.safeParse(body);

    if (!success) {
        throw new Error("invalid input")
    }

    const { email, password } = body;
    const prisma = c.get("prisma")

    let userData = await prisma.user.findUnique({ where: { email } });

    if (userData) {
        return c.json({ error: "User already exists" })
    }

    userData = await prisma.user.create({
        data: {
            email,
            password
        }
    });

    const secret = c.env.JWT_SECRET
    const token = await sign({ id: userData.id }, secret)

    return c.json({ jwt: token });
}


const signInUser = async (c: Context) => {
    const body = await c.req.json();
    const success = signupInput.safeParse(body);

    if (!success) {
        throw new Error("invalid input")
    }
    
    const { email, password } = body
    const prisma = c.get("prisma")

    const user = await prisma.user.findUnique({
        where: {
            email: email,
            password: password
        }
    })

    if (!user) {
        c.status(403)
        return c.json({ error: "Invalid credenetials" })
    }

    const secret = c.env.JWT_SECRET
    const token = await sign({ id: user.id }, secret)

    return c.json({ jwt: token });
}

export { createUser, signInUser }
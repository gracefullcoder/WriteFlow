import { Context } from "hono";
import { createPostInput, updatePostInput } from '@vaibhavgupta11/writeflow_validation'

const getBlog = async (c: Context) => {
    const prisma = c.get("prisma")
    const blogId = c.req.param("id")

    const blog = await prisma.post.findUnique({
        where: {
            id: blogId
        }
    })

    return c.json(blog)
}

const allBlogs = async (c: Context) => {
    const prisma = c.get("prisma")

    const posts = await prisma.post.findMany();

    return c.json({ posts: posts });
}

const createBlog = async (c: Context) => {
    const prisma = c.get("prisma")
    const id = c.get("id")

    const body = await c.req.json()

    const success = createPostInput.safeParse(body)

    if(!success) throw new Error("Wrong Input");

    const { title, content } = body

    const post = await prisma.post.create({
        data: {
            title,
            content,
            authorId: id
        }
    })

    return c.json({ id: post.id });
}

const updateBlog = async (c: Context) => {
    const prisma = c.get("prisma")
    const postId = c.req.param("id")

    const body = await c.req.json()

    const success = updatePostInput.safeParse(body)

    if(!success) throw new Error("Wrong Input");

    const { title, content } = body

    const blog = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            title: title,
            content: content
        }
    })

    return c.json({ id: blog.id })
}

export { getBlog, allBlogs, createBlog, updateBlog }
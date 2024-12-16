import { Context } from "hono";

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

const allBlogs = async (c:Context) => {
	const prisma = c.get("prisma")
	
    const posts = await prisma.post.findMany();

	return c.json({posts:posts});
}

const createBlog = async (c: Context) => {
    const prisma = c.get("prisma")
    const id = c.get("id")

    const { title, content } = await c.req.json()

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
    const id = c.get("id")
    const postId = c.req.param("id")
    const { title, content } = await c.req.json()

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

export { getBlog,allBlogs, createBlog, updateBlog }
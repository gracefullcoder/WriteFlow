import { Hono } from "hono";
import Environment from "../utils/HonoEnv";
import { createBlog, getBlog, updateBlog,allBlogs } from "../controllers/blogController";
import wrapAsync from "../utils/WrapAsync";

const blog = new Hono<Environment>();

blog.get('/:id', getBlog)

blog.get('/bulk/all', wrapAsync(allBlogs))

blog.post('/', createBlog)

blog.put('/:id', updateBlog)



export default blog

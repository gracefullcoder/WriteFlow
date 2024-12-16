import { Hono } from "hono";
import Environment from "../utils/HonoEnv";
import { createUser, signInUser } from "../controllers/userController";
import wrapAsync from "../utils/WrapAsync";

const User = new Hono<Environment>();

User.post('/api/v1/signup', wrapAsync(createUser))

User.post('/api/v1/signin', wrapAsync(signInUser))

export default User
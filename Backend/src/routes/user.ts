import { Hono } from "hono";
import Environment from "../utils/HonoEnv";
import { createUser, signInUser } from "../controllers/userController";
import wrapAsync from "../utils/WrapAsync";

const User = new Hono<Environment>();

User.post('/signup', wrapAsync(createUser))

User.post('/signin', wrapAsync(signInUser))

export default User
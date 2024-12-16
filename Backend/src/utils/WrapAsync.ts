import { Context } from "hono";

function wrapAsync<T> (fn: (c: Context) => Promise<T>) {
    return async (c: Context) => {
        try { return fn(c) }
        catch (e: any) {
            throw new Error(e)
        }
    }
};

export default wrapAsync;
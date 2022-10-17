// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { postRouter } from "./post";
import { commentRouter } from "./comment";
import { profileRouter } from "./profile";
import { UserRouter } from "./user";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("post.", postRouter)
  .merge("comment.", commentRouter)
  .merge("profile.", profileRouter)
  .merge("user.", UserRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

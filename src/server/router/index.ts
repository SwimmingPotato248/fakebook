// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { postRouter } from "./post";
import { commentRouter } from "./comment";
import { uploadRouter } from "./upload";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("post.", postRouter)
  .merge("comment.", commentRouter)
  .merge("upload.", uploadRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

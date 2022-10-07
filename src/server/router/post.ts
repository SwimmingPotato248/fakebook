import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

export const postRouter = createRouter()
  .query("all", {
    async resolve({ ctx }) {
      return await ctx.prisma.post.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
        },
      });
    },
  })
  .mutation("create", {
    input: z.object({
      content: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.session?.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must sign in to post",
        });
      }
      await ctx.prisma.post.create({
        data: {
          content: input.content,
          userId: ctx.session?.user?.id,
        },
      });
    },
  });

import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

export const commentRouter = createRouter()
  .query("get", {
    input: z.object({
      postId: z.number(),
    }),
    async resolve({ ctx, input }) {
      return ctx.prisma.comment.findMany({
        where: { postId: input.postId },
        include: {
          user: true,
        },
      });
    },
  })
  .mutation("create", {
    input: z.object({
      content: z.string(),
      parentId: z.number().int().nullish(),
      postId: z.number().int(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.session?.user)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be sign in to comment",
        });
      await ctx.prisma.comment.create({
        data: {
          content: input.content,
          parentComment: input.parentId
            ? { connect: { id: input.parentId } }
            : undefined,
          user: {
            connect: { id: ctx.session.user.id },
          },
          post: {
            connect: { id: input.postId },
          },
        },
      });
    },
  });

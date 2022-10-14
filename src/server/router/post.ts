import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

export const postRouter = createRouter()
  .query("all", {
    input: z.object({
      limit: z.number().int().min(1).max(10).nullish(),
      cursor: z.number().nullish(),
    }),
    async resolve({ ctx, input }) {
      const limit = input.limit || 5;
      const posts = await ctx.prisma.post.findMany({
        orderBy: {
          createdAt: "desc",
        },
        skip: input.cursor ? 1 : 0,
        take: limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        select: { id: true },
      });
      let nextCursor: typeof input.cursor | undefined = undefined;
      if (posts.length > limit) {
        const nextPost = posts.pop();
        nextCursor = nextPost?.id;
      }
      return {
        posts,
        nextCursor,
      };
    },
  })
  .query("byId", {
    input: z.object({
      postId: z.number(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.post.findUnique({
        where: { id: input.postId },
        include: { user: true, likedBy: true },
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
  })
  .mutation("like", {
    input: z.object({
      postId: z.number(),
      like: z.boolean(),
    }),
    async resolve({ ctx, input }) {
      if (!ctx.session?.user)
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      await ctx.prisma.post.update({
        where: { id: input.postId },
        data: {
          likedBy: input.like
            ? { connect: { id: ctx.session?.user?.id } }
            : { disconnect: { id: ctx.session.user.id } },
        },
      });
    },
  });

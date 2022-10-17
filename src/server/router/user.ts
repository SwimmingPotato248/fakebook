import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";

export const UserRouter = createRouter()
  .query("savedPosts", {
    async resolve({ ctx }) {
      if (!ctx.session?.user) throw new TRPCError({ code: "UNAUTHORIZED" });
      return await ctx.prisma.post.findMany({
        where: { savedBy: { some: { id: ctx.session.user.id } } },
        select: { id: true },
      });
    },
  })
  .query("likedPosts", {
    async resolve({ ctx }) {
      if (!ctx.session?.user) throw new TRPCError({ code: "UNAUTHORIZED" });
      return await ctx.prisma.post.findMany({
        where: { likedBy: { some: { id: ctx.session.user.id } } },
        select: { id: true },
      });
    },
  });

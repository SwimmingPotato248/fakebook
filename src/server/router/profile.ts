import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

export const profileRouter = createRouter()
  .query("me", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      try {
        return await ctx.prisma.profile.findUnique({
          where: { userId: input.userId },
        });
      } catch {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
    },
  })
  .mutation("create", {
    input: z.object({
      fName: z.string(),
      lName: z.string(),
      dateOfBirth: z.date(),
      bio: z.string(),
      image: z.string().nullable(),
    }),
    async resolve({ ctx, input }) {
      if (!ctx.session?.user)
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      try {
        await ctx.prisma.profile.create({
          data: {
            fName: input.fName,
            lName: input.lName,
            dateOfBirth: input.dateOfBirth,
            image: input.image,
            bio: input.bio,
            userId: ctx.session.user.id,
          },
        });
      } catch {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    },
  });

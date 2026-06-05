import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "@/server/api/trpc";

export const achievementRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.achievement.findMany({
      orderBy: { date: "desc" },
    });
  }),

  getFeatured: publicProcedure.query(({ ctx }) => {
    return ctx.db.achievement.findMany({
      where: { featured: true },
      orderBy: { date: "desc" },
    });
  }),

  create: protectedProcedure
    .input(z.object({
      studentName: z.string().min(1),
      photoUrl: z.string().optional(),
      title: z.string().min(1),
      description: z.string().optional(),
      type: z.string().min(1),
      featured: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.achievement.create({ data: input });
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      studentName: z.string().optional(),
      photoUrl: z.string().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
      type: z.string().optional(),
      featured: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.achievement.update({ where: { id }, data });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.achievement.delete({ where: { id: input.id } });
    }),
});

import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "@/server/api/trpc";

export const curriculumRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.curriculumTopic.findMany({ orderBy: { order: "asc" } });
  }),

  getByCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.curriculumTopic.findMany({
        where: { category: input.category },
        orderBy: { order: "asc" },
      });
    }),

  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
      description: z.string().optional(),
      icon: z.string().optional(),
      category: z.string().default("core"),
      order: z.number().optional(),
      duration: z.string().optional(),
      topics: z.string().optional(),
      pdfUrl: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.curriculumTopic.create({ data: input });
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      title: z.string().optional(),
      description: z.string().optional(),
      icon: z.string().optional(),
      category: z.string().optional(),
      order: z.number().optional(),
      duration: z.string().optional(),
      topics: z.string().optional(),
      pdfUrl: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.curriculumTopic.update({ where: { id }, data });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.curriculumTopic.delete({ where: { id: input.id } });
    }),
});

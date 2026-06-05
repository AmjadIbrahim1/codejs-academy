import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "@/server/api/trpc";

export const roundRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.trainingRound.findMany({
      orderBy: { order: "asc" },
      include: { highlights: { orderBy: { createdAt: "desc" } } },
    });
  }),

  getCurrent: publicProcedure.query(({ ctx }) => {
    return ctx.db.trainingRound.findFirst({
      where: { isCurrent: true },
      include: { highlights: { orderBy: { createdAt: "desc" } } },
    });
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.trainingRound.findUnique({
        where: { slug: input.slug },
        include: { highlights: { orderBy: { createdAt: "desc" } } },
      });
    }),

  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1),
      slug: z.string().min(1),
      description: z.string().optional(),
      status: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      priceEGP: z.number().optional(),
      priceUSD: z.number().optional(),
      isCurrent: z.boolean().optional(),
      order: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const data = {
        ...input,
        startDate: input.startDate ? new Date(input.startDate) : undefined,
        endDate: input.endDate ? new Date(input.endDate) : undefined,
      };
      return ctx.db.trainingRound.create({ data });
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().optional(),
      slug: z.string().optional(),
      description: z.string().optional(),
      status: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      priceEGP: z.number().optional(),
      priceUSD: z.number().optional(),
      isCurrent: z.boolean().optional(),
      order: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const updateData = {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      };
      return ctx.db.trainingRound.update({ where: { id }, data: updateData });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.trainingRound.delete({ where: { id: input.id } });
    }),

  // Student Highlights
  createHighlight: protectedProcedure
    .input(z.object({
      studentName: z.string().min(1),
      photoUrl: z.string().optional(),
      category: z.string().min(1),
      description: z.string().optional(),
      rank: z.string().optional(),
      roundId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.studentHighlight.create({ data: input });
    }),

  updateHighlight: protectedProcedure
    .input(z.object({
      id: z.string(),
      studentName: z.string().optional(),
      photoUrl: z.string().optional(),
      category: z.string().optional(),
      description: z.string().optional(),
      rank: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.studentHighlight.update({ where: { id }, data });
    }),

  deleteHighlight: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.studentHighlight.delete({ where: { id: input.id } });
    }),

  getHighlightsByCategory: publicProcedure
    .input(z.object({ category: z.string(), roundId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.studentHighlight.findMany({
        where: {
          category: input.category,
          ...(input.roundId ? { roundId: input.roundId } : {}),
        },
        orderBy: { createdAt: "desc" },
      });
    }),
});

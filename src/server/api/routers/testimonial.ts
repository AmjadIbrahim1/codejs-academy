import { z } from "zod";
import { createTRPCRouter, publicProcedure, adminProcedure } from "@/server/api/trpc";


export const testimonialRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.testimonial.findMany({ orderBy: { order: "asc" } });
  }),

  getFeatured: publicProcedure.query(({ ctx }) => {
    return ctx.db.testimonial.findMany({
      where: { featured: true },
      orderBy: { order: "asc" },
    });
  }),

  create: adminProcedure
    .input(z.object({
      name: z.string().min(1),
      role: z.string().optional(),
      content: z.string().min(1),
      avatarUrl: z.string().optional(),
      rating: z.number().optional(),
      featured: z.boolean().optional(),
      order: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.testimonial.create({ data: input });
    }),

  update: adminProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().optional(),
      role: z.string().optional(),
      content: z.string().optional(),
      avatarUrl: z.string().optional(),
      rating: z.number().optional(),
      featured: z.boolean().optional(),
      order: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.testimonial.update({ where: { id }, data });
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.testimonial.delete({ where: { id: input.id } });
    }),
});

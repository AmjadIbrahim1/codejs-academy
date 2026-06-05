import { z } from "zod";
import { createTRPCRouter, publicProcedure, adminProcedure } from "@/server/api/trpc";


export const serviceRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.service.findMany({ orderBy: { order: "asc" } });
  }),

  create: adminProcedure
    .input(z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      status: z.string().min(1),
      icon: z.string().optional(),
      order: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.service.create({ data: input });
    }),

  update: adminProcedure
    .input(z.object({
      id: z.string(),
      title: z.string().optional(),
      description: z.string().optional(),
      status: z.string().optional(),
      icon: z.string().optional(),
      order: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.service.update({ where: { id }, data });
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.service.delete({ where: { id: input.id } });
    }),
});

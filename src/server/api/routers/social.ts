import { z } from "zod";
import { createTRPCRouter, publicProcedure, adminProcedure } from "@/server/api/trpc";


export const socialRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.socialLink.findMany({ orderBy: { order: "asc" } });
  }),

  create: adminProcedure
    .input(z.object({
      name: z.string().min(1),
      url: z.string().url(),
      icon: z.string(),
      order: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.socialLink.create({ data: input });
    }),

  update: adminProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().optional(),
      url: z.string().optional(),
      icon: z.string().optional(),
      order: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.socialLink.update({ where: { id }, data });
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.socialLink.delete({ where: { id: input.id } });
    }),
});

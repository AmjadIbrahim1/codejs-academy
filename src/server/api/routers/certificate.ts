import { z } from "zod";
import { createTRPCRouter, publicProcedure, adminProcedure } from "@/server/api/trpc";


export const certificateRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.certificate.findMany({ orderBy: { createdAt: "desc" } });
  }),

  create: adminProcedure
    .input(z.object({
      title: z.string().min(1),
      description: z.string().optional(),
      imageUrl: z.string().optional(),
      type: z.string().min(1),
      priceEGP: z.number().optional(),
      priceUSD: z.number().optional(),
      available: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.certificate.create({ data: input });
    }),

  update: adminProcedure
    .input(z.object({
      id: z.string(),
      title: z.string().optional(),
      description: z.string().optional(),
      imageUrl: z.string().optional(),
      type: z.string().optional(),
      priceEGP: z.number().optional(),
      priceUSD: z.number().optional(),
      available: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.certificate.update({ where: { id }, data });
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.certificate.delete({ where: { id: input.id } });
    }),
});

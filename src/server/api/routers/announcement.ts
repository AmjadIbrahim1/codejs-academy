import { z } from "zod";
import { createTRPCRouter, publicProcedure, adminProcedure } from "@/server/api/trpc";


export const announcementRouter = createTRPCRouter({
  getActive: publicProcedure.query(({ ctx }) => {
    return ctx.db.announcement.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    });
  }),

  getAll: adminProcedure.query(({ ctx }) => {
    return ctx.db.announcement.findMany({ orderBy: { createdAt: "desc" } });
  }),

  create: adminProcedure
    .input(z.object({
      title: z.string().min(1),
      content: z.string().min(1),
      type: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.announcement.create({ data: input });
    }),

  update: adminProcedure
    .input(z.object({
      id: z.string(),
      title: z.string().optional(),
      content: z.string().optional(),
      type: z.string().optional(),
      active: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.announcement.update({ where: { id }, data });
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.announcement.delete({ where: { id: input.id } });
    }),
});

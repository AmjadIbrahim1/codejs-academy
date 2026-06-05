import { z } from "zod";
import { createTRPCRouter, publicProcedure, adminProcedure } from "@/server/api/trpc";


export const settingRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.setting.findMany();
  }),

  getByKey: publicProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.setting.findUnique({ where: { key: input.key } });
    }),

  upsert: adminProcedure
    .input(z.object({
      key: z.string(),
      value: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.setting.upsert({
        where: { key: input.key },
        update: { value: input.value },
        create: input,
      });
    }),

  delete: adminProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.setting.delete({ where: { key: input.key } });
    }),
});

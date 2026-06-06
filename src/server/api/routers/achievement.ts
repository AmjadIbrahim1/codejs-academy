import { z } from "zod";
import { createTRPCRouter, publicProcedure, adminProcedure } from "@/server/api/trpc";


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

  getByType: publicProcedure
    .input(z.object({ type: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.achievement.findMany({
        where: { type: input.type },
        orderBy: [{ featured: "desc" }, { date: "desc" }],
      });
    }),

  create: adminProcedure
    .input(z.object({
      studentName: z.string().min(1, "اسم الطالب مطلوب"),
      link: z.string().optional(),
      type: z.string().min(1, "نوع الإنجاز مطلوب"),
      featured: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // If featured, unfeature all others in the same type
      if (input.featured) {
        await ctx.db.achievement.updateMany({
          where: { type: input.type, featured: true },
          data: { featured: false },
        });
      }
      return ctx.db.achievement.create({
        data: {
          studentName: input.studentName,
          link: input.link ?? null,
          type: input.type,
          featured: input.featured ?? false,
        },
      });
    }),

  update: adminProcedure
    .input(z.object({
      id: z.string(),
      studentName: z.string().optional(),
      link: z.string().optional(),
      type: z.string().optional(),
      featured: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;

      // If setting featured, unfeature all others in the same type first
      if (data.featured) {
        // Get current achievement to know its type
        const current = await ctx.db.achievement.findUnique({ where: { id } });
        const type = data.type ?? current?.type;
        if (type) {
          await ctx.db.achievement.updateMany({
            where: { type, featured: true, id: { not: id } },
            data: { featured: false },
          });
        }
      }

      // Clean up optional fields
      const updateData: Record<string, unknown> = {};
      if (data.studentName !== undefined) updateData.studentName = data.studentName;
      if (data.link !== undefined) updateData.link = data.link || null;
      if (data.type !== undefined) updateData.type = data.type;
      if (data.featured !== undefined) updateData.featured = data.featured;

      return ctx.db.achievement.update({ where: { id }, data: updateData });
    }),

  setFeatured: adminProcedure
    .input(z.object({
      id: z.string(),
      type: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Unfeature all in this type
      await ctx.db.achievement.updateMany({
        where: { type: input.type, featured: true },
        data: { featured: false },
      });
      // Feature the selected one
      return ctx.db.achievement.update({
        where: { id: input.id },
        data: { featured: true },
      });
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.achievement.delete({ where: { id: input.id } });
    }),
});

import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "@/server/api/trpc";

export const courseSectionRouter = createTRPCRouter({
  // ── Get sections for a round ──
  getByRound: publicProcedure
    .input(z.object({ roundId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.courseSection.findMany({
        where: { roundId: input.roundId },
        orderBy: { order: "asc" },
        include: { images: { orderBy: { order: "asc" } } },
      });
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string(), roundSlug: z.string() }))
    .query(async ({ ctx, input }) => {
      const round = await ctx.db.trainingRound.findUnique({
        where: { slug: input.roundSlug },
      });
      if (!round) return null;
      return ctx.db.courseSection.findFirst({
        where: { slug: input.slug, roundId: round.id },
        include: { images: { orderBy: { order: "asc" } } },
      });
    }),

  getByRoundSlug: publicProcedure
    .input(z.object({ roundSlug: z.string() }))
    .query(async ({ ctx, input }) => {
      const round = await ctx.db.trainingRound.findUnique({
        where: { slug: input.roundSlug },
      });
      if (!round) return [];
      return ctx.db.courseSection.findMany({
        where: { roundId: round.id },
        orderBy: { order: "asc" },
        include: { images: { orderBy: { order: "asc" } } },
      });
    }),

  // ── Create / Update / Delete sections (admin only) ──

  upsert: protectedProcedure
    .input(z.object({
      id: z.string().optional(),
      name: z.string().min(1),
      slug: z.string().min(1),
      icon: z.string().optional(),
      description: z.string().optional(),
      roundId: z.string().min(1),
      order: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      if (id) {
        return ctx.db.courseSection.update({ where: { id }, data });
      }
      return ctx.db.courseSection.create({ data });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.courseSection.delete({ where: { id: input.id } });
    }),

  // ── Initialize the 6 default sections for a round ──
  initializeDefaults: protectedProcedure
    .input(z.object({ roundId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const defaults = [
        { name: "أوائل الاختبارات", slug: "quiz-champions", icon: "📊", description: "أعلى الطلاب درجات في اختبارات البرمجة الأسبوعية", order: 0 },
        { name: "الأوائل في المهام", slug: "task-champions", icon: "💻", description: "أداء متميز في مهام البرمجة الأسبوعية", order: 1 },
        { name: "الأفضل في المحاضرات", slug: "session-stars", icon: "🎤", description: "طلاب شاركوا وأجابوا بنشاط خلال المحاضرات", order: 2 },
        { name: "أفضل المساهمين", slug: "community-contributors", icon: "🤝", description: "أعضاء المجتمع اللي ساعدوا غيرهم أكتر", order: 3 },
        { name: "مقابلات متميزة", slug: "distinguished-interviews", icon: "🎯", description: "طلاب أظهروا مهارات مقابلات استثنائية", order: 4 },
        { name: "أبطال الامتحانات", slug: "exam-performers", icon: "🏅", description: "أعلى الدرجات في الامتحانات الشاملة الأسبوعية", order: 5 },
      ];

      const results = [];
      for (const section of defaults) {
        const existing = await ctx.db.courseSection.findFirst({
          where: { slug: section.slug, roundId: input.roundId },
        });
        if (!existing) {
          const created = await ctx.db.courseSection.create({
            data: { ...section, roundId: input.roundId },
          });
          results.push(created);
        } else {
          results.push(existing);
        }
      }
      return results;
    }),

  // ── Images ──

  addImage: protectedProcedure
    .input(z.object({
      sectionId: z.string().min(1),
      imageUrl: z.string().min(1),
      caption: z.string().optional(),
      order: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.sectionImage.create({ data: input });
    }),

  deleteImage: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.sectionImage.delete({ where: { id: input.id } });
    }),

  updateImageOrder: protectedProcedure
    .input(z.object({
      id: z.string(),
      order: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.sectionImage.update({
        where: { id: input.id },
        data: { order: input.order },
      });
    }),
});

import { z } from "zod";
import { del } from "@vercel/blob";
import { createTRPCRouter, publicProcedure, adminProcedure } from "@/server/api/trpc";

export const reviewImageRouter = createTRPCRouter({
  /**
   * Get all review images by type.
   * Public — anyone can view the images.
   */
  getByType: publicProcedure
    .input(z.object({ type: z.enum(["customer", "student"]) }))
    .query(({ ctx, input }) => {
      return ctx.db.reviewImage.findMany({
        where: { type: input.type },
        orderBy: { order: "asc" },
      });
    }),

  /**
   * Create a new review image (admin only).
   */
  create: adminProcedure
    .input(
      z.object({
        imageUrl: z.string().min(1),
        caption: z.string().optional(),
        type: z.enum(["customer", "student"]),
        order: z.number().int().min(0).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const maxOrder = await ctx.db.reviewImage.findFirst({
        where: { type: input.type },
        orderBy: { order: "desc" },
        select: { order: true },
      });

      return ctx.db.reviewImage.create({
        data: {
          imageUrl: input.imageUrl,
          caption: input.caption ?? null,
          type: input.type,
          order: input.order ?? (maxOrder?.order ?? 0) + 1,
        },
      });
    }),

  /**
   * Delete a review image (admin only).
   * Also removes the file from Vercel Blob.
   */
  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const img = await ctx.db.reviewImage.findUnique({ where: { id: input.id } });
      if (!img) throw new Error("Image not found");

      // Remove from Vercel Blob if it's a blob URL
      if (img.imageUrl && img.imageUrl.includes(".public.blob.vercel-storage.com")) {
        try {
          await del(img.imageUrl);
        } catch (e) {
          console.error("Failed to delete blob:", e);
        }
      }

      return ctx.db.reviewImage.delete({ where: { id: input.id } });
    }),

  /**
   * Reorder images (admin only).
   */
  reorder: adminProcedure
    .input(
      z.object({
        items: z.array(
          z.object({
            id: z.string(),
            order: z.number().int().min(0),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      for (const item of input.items) {
        await ctx.db.reviewImage.update({
          where: { id: item.id },
          data: { order: item.order },
        });
      }
      return { success: true };
    }),
});

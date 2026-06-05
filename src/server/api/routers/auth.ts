import { z } from "zod";
import { hash } from "bcryptjs";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.object({
      name: z.string().min(2, "الاسم لازم يكون 2 أحرف على الأقل"),
      email: z.string().email().refine(
        (email) => email.endsWith("@codejs.com"),
        "الإيميل لازم يكون من @codejs.com"
      ),
      password: z.string()
        .min(8, "كلمة السر لازم تكون 8 أحرف على الأقل")
        .regex(/[A-Z]/, "كلمة السر لازم تحتوي على حرف كبير واحد على الأقل")
        .regex(/[a-z]/, "كلمة السر لازم تحتوي على حرف صغير واحد على الأقل")
        .regex(/[0-9]/, "كلمة السر لازم تحتوي على رقم واحد على الأقل")
        .regex(/[^A-Za-z0-9]/, "كلمة السر لازم تحتوي على رمز خاص واحد على الأقل"),
    }))
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.user.findUnique({
        where: { email: input.email },
      });
      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "في حساب بالفعل بنفس الإيميل",
        });
      }

      const hashedPassword = await hash(input.password, 12);

      const user = await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
          role: input.email === "Admin_Amjad_Ahd@codejs.com" ? "admin" : "student",
        },
      });

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    }),

  getUsers: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }),

  updateRole: protectedProcedure
    .input(z.object({
      userId: z.string(),
      role: z.enum(["student", "admin"]),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "الأدمن بس" });
      }
      return ctx.db.user.update({
        where: { id: input.userId },
        data: { role: input.role },
      });
    }),
});

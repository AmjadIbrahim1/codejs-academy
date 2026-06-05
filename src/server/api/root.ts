import { postRouter } from "@/server/api/routers/post";
import { testimonialRouter } from "@/server/api/routers/testimonial";
import { serviceRouter } from "@/server/api/routers/service";
import { achievementRouter } from "@/server/api/routers/achievement";
import { socialRouter } from "@/server/api/routers/social";
import { roundRouter } from "@/server/api/routers/round";
import { faqRouter } from "@/server/api/routers/faq";
import { curriculumRouter } from "@/server/api/routers/curriculum";
import { announcementRouter } from "@/server/api/routers/announcement";
import { certificateRouter } from "@/server/api/routers/certificate";
import { authRouter } from "@/server/api/routers/auth";
import { settingRouter } from "@/server/api/routers/setting";
import { courseSectionRouter } from "@/server/api/routers/courseSection";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  testimonial: testimonialRouter,
  service: serviceRouter,
  achievement: achievementRouter,
  social: socialRouter,
  round: roundRouter,
  faq: faqRouter,
  curriculum: curriculumRouter,
  announcement: announcementRouter,
  certificate: certificateRouter,
  auth: authRouter,
  setting: settingRouter,
  courseSection: courseSectionRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);

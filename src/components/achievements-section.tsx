"use client";

import Link from "next/link";
import { api } from "@/trpc/react";

const categories = [
  {
    title: "أوائل الاختبارات",
    slug: "quiz_champion",
    description: "أعلى الطلاب درجات في اختبارات البرمجة الأسبوعية",
    icon: "📊",
  },
  {
    title: "الأوائل في المهام",
    slug: "task_champion",
    description: "أداء متميز في مهام البرمجة الأسبوعية",
    icon: "💻",
  },
  {
    title: "الأفضل في المحاضرات",
    slug: "session_star",
    description: "طلاب شاركوا وأجابوا بنشاط خلال المحاضرات",
    icon: "🎤",
  },
  {
    title: "أفضل المساهمين",
    slug: "best_contributor",
    description: "أعضاء المجتمع اللي ساعدوا غيرهم أكتر",
    icon: "🤝",
  },
  {
    title: "مقابلات متميزة",
    slug: "distinguished_interview",
    description: "طلاب أظهروا مهارات مقابلات استثنائية",
    icon: "🎯",
  },
  {
    title: "أبطال الامتحانات الأسبوعية",
    slug: "exam_performer",
    description: "أعلى الدرجات في الامتحانات الشاملة الأسبوعية",
    icon: "🏅",
  },
];

export function AchievementsSection() {
  const { data: achievements } = api.achievement.getAll.useQuery();

  // Group achievements by type and find featured ones
  const achievementsByType = new Map<string, typeof achievements>();
  const featuredByType = new Map<string, NonNullable<typeof achievements>[number]>();

  for (const ach of achievements ?? []) {
    if (!achievementsByType.has(ach.type)) achievementsByType.set(ach.type, []);
    achievementsByType.get(ach.type)!.push(ach);
    if (ach.featured && !featuredByType.has(ach.type)) {
      featuredByType.set(ach.type, ach);
    }
  }

  return (
    <section id="achievements" className="border-t border-theme divider-theme py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center fade-in-up">
          <span className="inline-block rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300">
            نظام التكريم
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            إنجازات{" "}
            <span className="text-gradient">الطلاب</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-theme-secondary">
            إحنا بنؤمن بالتكريم. نظام المكافآت بتاعنا بيحتفي بالأوائل، المساهمين،
            وقادة المجتمع.
          </p>
        </div>

        <div className="stagger-children grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const featured = featuredByType.get(cat.slug);
            const totalCount = achievementsByType.get(cat.slug)?.length ?? 0;

            return (
              <Link
                key={cat.title}
                href={`/achievements/${cat.slug}`}
                className="card-hover card-theme rounded-2xl p-6 group block"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-theme">{cat.title}</h3>
                    <p className="text-xs text-theme-tertiary truncate">{cat.description}</p>
                  </div>
                </div>

                {/* Featured student */}
                {featured ? (
                  <div className="rounded-xl border border-accent-500/20 bg-accent-500/[0.04] p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-medium uppercase tracking-wider text-accent-400">
                          🏆 الطالب المميز
                        </span>
                        <p className="mt-1 text-sm font-semibold text-theme">{featured.studentName}</p>
                        {featured.link ? (
                          <a
                            href={featured.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="mt-1 inline-flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300 hover:underline"
                          >
                            LinkedIn
                            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ) : (
                          <p className="mt-1 text-xs text-theme-tertiary">لا يوجد رابط</p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-theme-card bg-theme-card p-3">
                    <p className="text-center text-xs text-theme-tertiary">
                      {totalCount > 0
                        ? "لم يتم تعيين طالب مميز بعد"
                        : "لا يوجد طلاب حتى الآن"}
                    </p>
                  </div>
                )}

                {/* View all button */}
                {totalCount > 0 && (
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-theme-tertiary">
                      {totalCount} طالب{totalCount !== 1 ? "ًا" : ""}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-400 transition group-hover:text-brand-300">
                      عرض الكل
                      <svg className="h-3 w-3 rtl:-scale-x-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                )}
                {totalCount === 0 && (
                  <div className="mt-3">
                    <span className="text-xs text-theme-tertiary">لم يتم إضافة طلاب بعد</span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Recognition system */}
        <div className="mt-12 rounded-2xl border border-brand-500/20 bg-gradient-to-br from-brand-500/[0.05] to-accent-500/[0.05] p-8 text-center">
          <h3 className="mb-4 text-xl font-bold text-theme">
            🏆 برنامج التكريم الأسبوعي
          </h3>
          <p className="mx-auto max-w-xl text-sm text-theme-secondary">
            كل أسبوع، إحنا بنحتفي بأفضل المؤدين بتنويهات في المجتمع، ميزات على
            السوشيال ميديا، ورتب خاصة على ديسكورد. شارك إنجازاتك على فيسبوك
            ولينكد إن عشان تلهم غيرك.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs">
            {["🎥 فيديو أسبوعي", "📱 ميزة على السوشيال ميديا", "🎭 رتبة خاصة على ديسكورد", "🏅 تكريم عام"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-lg border border-theme-card bg-theme-card px-3 py-1.5 text-theme-secondary"
                >
                  {item}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

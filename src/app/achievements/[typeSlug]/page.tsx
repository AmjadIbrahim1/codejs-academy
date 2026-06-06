"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/trpc/react";

const categories: Record<string, { title: string; icon: string; description: string }> = {
  quiz_champion: {
    title: "أوائل الاختبارات",
    icon: "📊",
    description: "أعلى الطلاب درجات في اختبارات البرمجة الأسبوعية",
  },
  task_champion: {
    title: "الأوائل في المهام",
    icon: "💻",
    description: "أداء متميز في مهام البرمجة الأسبوعية",
  },
  session_star: {
    title: "الأفضل في المحاضرات",
    icon: "🎤",
    description: "طلاب شاركوا وأجابوا بنشاط خلال المحاضرات",
  },
  best_contributor: {
    title: "أفضل المساهمين",
    icon: "🤝",
    description: "أعضاء المجتمع اللي ساعدوا غيرهم أكتر",
  },
  distinguished_interview: {
    title: "مقابلات متميزة",
    icon: "🎯",
    description: "طلاب أظهروا مهارات مقابلات استثنائية",
  },
  exam_performer: {
    title: "أبطال الامتحانات الأسبوعية",
    icon: "🏅",
    description: "أعلى الدرجات في الامتحانات الشاملة الأسبوعية",
  },
};

export default function AchievementCategoryPage() {
  const params = useParams<{ typeSlug: string }>();
  const typeSlug = params?.typeSlug ?? "";
  const category = categories[typeSlug];

  const { data: achievements, isLoading } = api.achievement.getByType.useQuery(
    { type: typeSlug },
    { enabled: !!typeSlug },
  );

  if (!typeSlug || !category) {
    return (
      <div className="min-h-screen pt-24">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="mb-4 text-6xl">❓</div>
          <h1 className="text-2xl font-bold text-theme">التصنيف غير موجود</h1>          <Link
              href="/program-overview#achievements"
              className="mt-4 inline-flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300"
            >
              ← العودة للإنجازات
            </Link>
        </div>
      </div>
    );
  }

  const featured = achievements?.find((a) => a.featured);

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="border-b border-theme divider-theme py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="fade-in-up">
            <Link
              href="/program-overview#achievements"
              className="mb-6 inline-flex items-center gap-1 text-sm text-theme-tertiary transition hover:text-brand-400"
            >
              <svg className="h-4 w-4 rtl:-scale-x-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              العودة للإنجازات
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-5xl">{category.icon}</span>
              <div>
                <h1 className="text-3xl font-bold text-theme sm:text-4xl">{category.title}</h1>
                <p className="mt-2 text-theme-secondary">{category.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Students List */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
            </div>
          ) : !achievements || achievements.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-theme-card bg-theme-card p-12 text-center">
              <div className="mb-4 text-4xl">📭</div>
              <h2 className="text-lg font-semibold text-theme">لا يوجد طلاب في هذا التصنيف</h2>
              <p className="mt-2 text-sm text-theme-tertiary">
                لم يتم إضافة أي طلاب لهذا التصنيف بعد. تابع مع الأدمن لإضافتهم.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Featured student first */}
              {featured && (
                <div className="rounded-2xl border border-accent-500/20 bg-gradient-to-br from-accent-500/[0.06] to-brand-500/[0.04] p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-lg">🏆</span>
                    <span className="rounded-full bg-accent-500/15 px-3 py-0.5 text-xs font-semibold text-theme-gold">
                      الطالب المميز
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-theme">{featured.studentName}</h3>
                    </div>
                    <div>
                      {featured.link ? (
                        <a
                          href={featured.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
                        >
                          LinkedIn
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : (
                        <span className="rounded-xl border border-theme-card bg-theme-card px-5 py-2.5 text-sm text-theme-tertiary">
                          لا يوجد رابط
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* All students */}
              <div className="grid gap-4">
                {achievements.map((ach, index) => (
                  <div
                    key={ach.id}
                    className={`rounded-xl border bg-theme-card p-5 transition hover:border-brand-500/20 ${
                      ach.featured ? "border-accent-500/30" : "border-theme-card"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-xs font-bold text-brand-400">
                          {index + 1}
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-medium text-theme truncate">{ach.studentName}</h3>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {ach.link ? (
                          <a
                            href={ach.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-brand-500/20 bg-brand-500/10 px-4 py-2 text-xs font-medium text-brand-400 transition hover:bg-brand-500/20"
                          >
                            LinkedIn
                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ) : (
                          <span className="rounded-lg border border-theme-input bg-theme-input px-4 py-2 text-xs text-theme-tertiary">
                            لا يوجد رابط
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Count */}
              <p className="pt-4 text-center text-xs text-theme-tertiary">
                إجمالي {achievements.length} طالب{achievements.length !== 1 ? "ًا" : ""}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

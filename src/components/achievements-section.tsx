"use client";

import Link from "next/link";
import { api } from "@/trpc/react";

const categories = [
  {
    title: "أوائل الاختبارات",
    slug: "quiz-champions",
    description: "أعلى الطلاب درجات في اختبارات البرمجة الأسبوعية",
    icon: "📊",
    type: "quiz_champion",
  },
  {
    title: "الأوائل في المهام",
    slug: "task-champions",
    description: "أداء متميز في مهام البرمجة الأسبوعية",
    icon: "💻",
    type: "task_champion",
  },
  {
    title: "الأفضل في المحاضرات",
    slug: "session-stars",
    description: "طلاب شاركوا وأجابوا بنشاط خلال المحاضرات",
    icon: "🎤",
    type: "session_star",
  },
  {
    title: "أفضل المساهمين",
    slug: "community-contributors",
    description: "أعضاء المجتمع اللي ساعدوا غيرهم أكتر",
    icon: "🤝",
    type: "best_contributor",
  },
  {
    title: "مقابلات متميزة",
    slug: "distinguished-interviews",
    description: "طلاب أظهروا مهارات مقابلات استثنائية",
    icon: "🎯",
    type: "distinguished_interview",
  },
  {
    title: "أبطال الامتحانات الأسبوعية",
    slug: "exam-performers",
    description: "أعلى الدرجات في الامتحانات الشاملة الأسبوعية",
    icon: "🏅",
    type: "exam_performer",
  },
];

export function AchievementsSection() {
  const { data: currentRound } = api.round.getCurrent.useQuery();
  const { data: achievements } = api.achievement.getAll.useQuery();
  const roundSlug = currentRound?.slug ?? "";

  // Group achievements by type
  const achievementsByType = new Map<string, typeof achievements>();
  for (const ach of achievements ?? []) {
    if (!achievementsByType.has(ach.type)) achievementsByType.set(ach.type, []);
    achievementsByType.get(ach.type)!.push(ach);
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
            const catAchievements = achievementsByType.get(cat.type) ?? [];
            return (
              <div
                key={cat.title}
                className="card-hover card-theme rounded-2xl p-6"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-theme">{cat.title}</h3>
                    <p className="text-xs text-theme-tertiary">{cat.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {catAchievements.length > 0 ? (
                    catAchievements.map((ach) => (
                      <span
                        key={ach.id}
                        className="rounded-lg border border-theme-card bg-theme-card px-2.5 py-1 text-xs text-theme-secondary"
                      >
                        {ach.studentName}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-theme-tertiary">لا يوجد طلاب حتى الآن</span>
                  )}
                </div>
                {roundSlug && (
                  <Link
                    href={`/rounds/${roundSlug}/${cat.slug}`}
                    className="mt-3 inline-flex items-center gap-1 text-xs text-brand-400 transition hover:text-brand-300"
                  >
                    عرض الصور
                    <svg className="h-3 w-3 rtl:-scale-x-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                )}
              </div>
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

"use client";

import Link from "next/link";
import { api } from "@/trpc/react";

const marqueeStudents = [
  { name: "أحمد محمد", achievement: "أفضل طالب - الدفعة الأولى" },
  { name: "سارة حسن", achievement: "أفضل مساهم" },
  { name: "عمر علي", achievement: "بطل الاختبارات" },
  { name: "مريم خالد", achievement: "امتياز في المهام" },
  { name: "خالد سعيد", achievement: "أفضل مقابلة" },
  { name: "نور الدين", achievement: "قائد مجتمع" },
  { name: "يوسف ر.", achievement: "رابح الامتحان الأسبوعي" },
  { name: "منى ت.", achievement: "الأفضل أداءً" },
];

const categories = [
  {
    title: "أفضل الطلاب",
    slug: "session-stars",
    description: "طلاب شاركوا في المحاضرات",
    icon: "🎤",
    students: ["أحمد م.", "سارة ه.", "عمر أ.", "مريم ك.", "خالد س.", "نور إ."],
  },
  {
    title: "أبطال الاختبارات",
    slug: "quiz-champions",
    description: "طلاب تميزوا في الاختبارات القصيرة",
    icon: "📊",
    students: ["يوسف ر.", "منى ت.", "حسن م.", "سلمى أ.", "إبراهيم ف."],
  },
  {
    title: "امتياز في المهام",
    slug: "task-champions",
    description: "طلاب أدوا بشكل ممتاز في المهام",
    icon: "💻",
    students: ["علي ه.", "مريم ك.", "عمرو ك.", "ليلى ن.", "دينا و."],
  },
  {
    title: "مساهمون مجتمعيون",
    slug: "community-contributors",
    description: "طلاب ساهموا في المجتمع",
    icon: "🤝",
    students: ["محمد ج.", "نور إ.", "حسن م.", "سلمى أ."],
  },
  {
    title: "مقابلات متميزة",
    slug: "distinguished-interviews",
    description: "طلاب تميزوا في المقابلات",
    icon: "🎯",
    students: ["خالد س.", "دينا و.", "محمود ب.", "إسلام ر."],
  },
  {
    title: "أداء امتحانات",
    slug: "exam-performers",
    description: "طلاب تميزوا في الامتحانات الأسبوعية",
    icon: "🏅",
    students: ["ندى أ.", "كريم ه.", "آية س.", "يوسف ر.", "منى ت."],
  },
];

const testimonials = [
  {
    name: "مريم ك.",
    role: "طالب بالدفعة الأولى",
    content:
      "نظام الدفعات المنظمة خلاني متحمس طوال البرنامج. المنافسة مع زملائي دفعتني للأفضل.",
  },
  {
    name: "أحمد م.",
    role: "طالب بالدفعة الأولى",
    content:
      "التكريم كأفضل مؤدي أداني الثقة إني أكمل في مجال التطوير. الدعم المجتمعي لا يُعقَل.",
  },
  {
    name: "سارة ه.",
    role: "طالب بالدفعة الأولى",
    content:
      "التحديات الأسبوعية والتكريم المجتمعي خلوا التعلم ممتع وتنافسي بأحسن شكل ممكن.",
  },
];

export default function RoundsPage() {
  const { data: currentRound } = api.round.getCurrent.useQuery();
  const roundSlug = currentRound?.slug ?? "";

  return (
    <div className="min-h-screen pt-16 bg-theme">
      {/* Marquee */}
      <div className="overflow-hidden border-b border-theme divider-theme py-3">
        <div className="marquee flex gap-8">
          {[...marqueeStudents, ...marqueeStudents].map((s, i) => (
            <div key={i} className="flex items-center gap-2 whitespace-nowrap text-sm">
              <span className="h-2 w-2 rounded-full bg-brand-400" />
              <span className="font-medium text-theme">{s.name}</span>
              <span className="text-theme-tertiary">— {s.achievement}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials strip */}
      <div className="border-b border-theme divider-theme bg-theme-card py-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="marquee-reverse flex gap-6">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="flex-shrink-0 rounded-xl border border-theme-card bg-theme-card px-5 py-3">
                <p className="mb-1 text-sm text-theme-secondary">&ldquo;{t.content}&rdquo;</p>
                <div className="text-xs text-theme-tertiary">— {t.name}, {t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current Round */}
      <section className="border-b border-theme divider-theme py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-br from-brand-500/[0.08] via-theme-secondary to-accent-500/[0.05] p-8 text-center lg:p-16"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 via-accent-500 to-brand-500" />
            <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-brand-500/20 blur-[100px]" />

            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-brand-400" />
                الدفعة الحالية
              </div>
              <h1 className="mb-4 text-4xl font-bold text-theme sm:text-5xl">
                الدفعة{" "}
                <span className="text-gradient">الأولى</span>
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-theme-secondary">
                أول دفعة تدريبية. 6 شهور من التدريب المكثف في البرمجة
                بتغطية HTML، CSS، JavaScript، TypeScript، والتطوير الحديث.
              </p>
              <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
                <div className="flex-1 rounded-xl border border-brand-500/20 bg-brand-500/5 p-4">
                  <div className="text-2xl font-bold text-brand-400">1,100 ج.م</div>
                  <div className="text-xs text-theme-tertiary">مصر - خصم 45%</div>
                </div>
                <div className="flex-1 rounded-xl border border-accent-500/20 bg-accent-500/5 p-4">
                  <div className="text-2xl font-bold text-accent-400">$30 USD</div>
                  <div className="text-xs text-theme-tertiary">خارج مصر - خصم 45%</div>
                </div>
              </div>
            </div>            </div>
          </div>
        </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-theme sm:text-4xl">
              أبرز أحداث{" "}
              <span className="text-gradient">الدفعة الأولى</span>
            </h2>
            <p className="mt-4 text-theme-secondary">
              إحنا بنحتفي بأفضل الطلاب أداءً في كل الفئات
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => {
              const href = roundSlug ? `/rounds/${roundSlug}/${cat.slug}` : "#";
              const cardContent = (
                <>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-theme">{cat.title}</h3>
                      <p className="text-xs text-theme-tertiary">{cat.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.students.map((student) => (
                      <span
                        key={student}
                        className="rounded-lg border border-theme-card bg-theme-card px-2.5 py-1 text-xs text-theme-secondary"
                      >
                        {student}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-xs text-brand-400">
                    عرض الصور
                    <svg className="h-3 w-3 rtl:-scale-x-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </>
              );

              return roundSlug ? (
                <Link
                  key={cat.title}
                  href={href}
                  className="card-hover rounded-2xl border border-theme-card bg-theme-card p-6 block transition hover:border-brand-500/30 hover:shadow-lg hover:shadow-brand-500/5"
                >
                  {cardContent}
                </Link>
              ) : (
                <div
                  key={cat.title}
                  className="card-hover rounded-2xl border border-theme-card bg-theme-card p-6"
                >
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

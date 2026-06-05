"use client";

import Link from "next/link";
import { api } from "@/trpc/react";

// Maps CourseSection slugs to StudentHighlight categories
const SECTION_HIGHLIGHT_MAP: Record<string, string[]> = {
  "session-stars": ["session_answer", "top_student"],
  "quiz-champions": ["top_quiz"],
  "task-champions": ["top_task"],
  "community-contributors": ["community_contributor"],
  "distinguished-interviews": ["interviewed"],
  "exam-performers": ["exam_performer"],
};

export default function RoundDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const { data: round, isLoading } = api.round.getBySlug.useQuery({ slug });
  const { data: sections } = api.courseSection.getByRoundSlug.useQuery({ roundSlug: slug });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 bg-theme">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="mx-auto h-6 w-48 rounded-full bg-theme-card" />
            <div className="mx-auto h-10 w-96 rounded-lg bg-theme-card" />
            <div className="mx-auto h-4 w-72 rounded bg-theme-card" />
          </div>
        </div>
      </div>
    );
  }

  if (!round) {
    return (
      <div className="min-h-screen pt-16 bg-theme">
        <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <p className="text-xl text-theme-tertiary">لم يتم العثور على الدفعة</p>
          <Link href="/rounds" className="mt-4 inline-block text-brand-400 hover:underline">
            العودة إلى الدورات
          </Link>
        </div>
      </div>
    );
  }

  // Build a lookup of highlights by category
  const highlightsByCategory = new Map<string, typeof round.highlights>();
  for (const h of round.highlights ?? []) {
    const cat = h.category;
    if (!highlightsByCategory.has(cat)) {
      highlightsByCategory.set(cat, []);
    }
    highlightsByCategory.get(cat)!.push(h);
  }

  // Group sections: those with highlights mapped first, then those without
  const sectionsWithHighlights: typeof sections = [];
  const sectionsWithoutHighlights: typeof sections = [];

  for (const section of sections ?? []) {
    const mappedCats = SECTION_HIGHLIGHT_MAP[section.slug];
    const hasMatch = mappedCats?.some((c) => highlightsByCategory.has(c));
    if (hasMatch) {
      sectionsWithHighlights.push(section);
    } else {
      sectionsWithoutHighlights.push(section);
    }
  }

  const orderedSections = [...sectionsWithHighlights, ...sectionsWithoutHighlights];

  return (
    <div className="min-h-screen pt-16 bg-theme">
      {/* Breadcrumb */}
      <div className="border-b border-theme divider-theme bg-theme-card/50 py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/rounds"
            className="inline-flex items-center gap-1 text-sm text-theme-secondary transition hover:text-brand-400"
          >
            <svg className="h-4 w-4 rtl:-scale-x-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            الدورات / {round.name}
          </Link>
        </div>
      </div>

      {/* Round Header */}
      <section className="border-b border-theme divider-theme py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="fade-in-up relative overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-br from-brand-500/[0.08] via-theme-secondary to-accent-500/[0.05] p-8 text-center lg:p-16">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 via-accent-500 to-brand-500" />
            <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-brand-500/20 blur-[100px]" />

            <div className="relative">
              {/* Status Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300">
                <span className={`h-2 w-2 animate-pulse rounded-full ${
                  round.isCurrent
                    ? "bg-brand-400"
                    : round.status === "upcoming"
                      ? "bg-accent-400"
                      : "bg-theme-tertiary"
                }`} />
                {round.isCurrent
                  ? "الدفعة الحالية"
                  : round.status === "upcoming"
                    ? "قريباً"
                    : round.status === "completed"
                      ? "مكتملة"
                      : round.status}
              </div>

              <h1 className="mb-4 text-4xl font-bold text-theme sm:text-5xl">
                {round.name}
              </h1>

              <p className="mx-auto mb-8 max-w-2xl text-lg text-theme-secondary">
                {round.description ?? ""}
              </p>

              {/* Pricing */}
              {(round.priceEGP || round.priceUSD) && (
                <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
                  {round.priceEGP && (
                    <div className="flex-1 rounded-xl border border-brand-500/20 bg-brand-500/5 p-4">
                      <div className="text-2xl font-bold text-brand-400">
                        {round.priceEGP.toLocaleString()} ج.م
                      </div>
                      <div className="text-xs text-theme-tertiary">مصر</div>
                    </div>
                  )}
                  {round.priceUSD && (
                    <div className="flex-1 rounded-xl border border-accent-500/20 bg-accent-500/5 p-4">
                      <div className="text-2xl font-bold text-accent-400">
                        ${round.priceUSD} USD
                      </div>
                      <div className="text-xs text-theme-tertiary">خارج مصر</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Course Sections as Achievement Categories */}
      {orderedSections.length > 0 && (
        <section className="border-b border-theme divider-theme py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center fade-in-up">
              <h2 className="text-3xl font-bold text-theme sm:text-4xl">
                أبرز أحداث{" "}
                <span className="text-gradient">{round.name}</span>
              </h2>
              <p className="mt-4 text-theme-secondary">
                إحنا بنحتفي بأفضل الطلاب أداءً في كل الفئات
              </p>
            </div>

            <div className="stagger-children grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {orderedSections.map((section) => {
                // Find highlights that match this section
                const mappedCats = SECTION_HIGHLIGHT_MAP[section.slug] ?? [];
                const sectionHighlights = mappedCats.flatMap(
                  (cat) => highlightsByCategory.get(cat) ?? [],
                );

                return (
                  <Link
                    key={section.id}
                    href={`/rounds/${slug}/${section.slug}`}
                    className="group rounded-2xl border border-theme-card bg-theme-card p-6 transition hover:border-brand-500/30 hover:shadow-lg hover:shadow-brand-500/5"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <span className="text-2xl">{section.icon ?? "⭐"}</span>
                      <div>
                        <h3 className="text-sm font-semibold text-theme">{section.name}</h3>
                        {section.description && (
                          <p className="text-xs text-theme-tertiary">{section.description}</p>
                        )}
                      </div>
                    </div>

                    {/* Student names from highlights */}
                    {sectionHighlights.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-2">
                        {sectionHighlights.map((h) => (
                          <span
                            key={h.id}
                            className="rounded-lg border border-theme-card bg-theme px-2.5 py-1 text-xs text-theme-secondary"
                          >
                            {h.studentName}
                            {h.rank && (
                              <span className="mr-1 text-brand-400">— {h.rank}</span>
                            )}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Image count and gallery link */}
                    {section.images && section.images.length > 0 ? (
                      <div className="flex items-center gap-1 text-xs text-brand-400">
                        <span>{section.images.length} صورة</span>
                        <span className="mx-1">·</span>
                        <span className="flex items-center gap-1">
                          عرض الصور
                          <svg className="h-3 w-3 rtl:-scale-x-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </div>
                    ) : (
                      <div className="text-xs text-theme-tertiary">
                        {sectionHighlights.length > 0 ? "لا توجد صور بعد" : "لا توجد بيانات بعد"}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

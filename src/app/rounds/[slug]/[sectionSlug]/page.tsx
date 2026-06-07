"use client";

import { use } from "react";
import Link from "next/link";
import { api } from "@/trpc/react";

const SECTION_META: Record<string, { icon: string; label: string }> = {
  "quiz-champions": { icon: "📊", label: "أوائل الاختبارات" },
  "task-champions": { icon: "💻", label: "الأوائل في المهام" },
  "session-stars": { icon: "🎤", label: "الأفضل في المحاضرات" },
  "community-contributors": { icon: "🤝", label: "أفضل المساهمين" },
  "distinguished-interviews": { icon: "🎯", label: "مقابلات متميزة" },
  "exam-performers": { icon: "🏅", label: "أبطال الامتحانات" },
};

export default function SectionGalleryPage({
  params,
}: {
  params: Promise<{ slug: string; sectionSlug: string }>;
}) {
  const { slug, sectionSlug } = use(params);

  const { data: round } = api.round.getBySlug.useQuery({ slug });
  const { data: section, isLoading } = api.courseSection.getBySlug.useQuery({
    roundSlug: slug,
    slug: sectionSlug,
  });

  const meta = SECTION_META[sectionSlug];
  const sectionName = section?.name ?? meta?.label ?? sectionSlug;
  const sectionIcon = section?.icon ?? meta?.icon ?? "📸";

  const images = section?.images ?? [];

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 bg-theme">
        <section className="border-b border-theme divider-theme py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-4">
              <div className="h-4 w-32 rounded bg-theme-card" />
              <div className="h-10 w-64 rounded-lg bg-theme-card" />
              <div className="h-4 w-48 rounded bg-theme-card" />
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="mb-4 aspect-square rounded-2xl bg-theme-card animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-theme">
      {/* Header */}
      <section className="border-b border-theme divider-theme py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Link
              href={round ? `/rounds` : "/"}
              className="inline-flex items-center gap-1 text-sm text-theme-secondary transition hover:text-brand-400"
            >
              <svg className="h-4 w-4 rtl:-scale-x-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              {round ? `الدفعات / ${round.name}` : "الرئيسية"}
            </Link>
          </div>

          <div className="fade-in-up">
            <span className="inline-block rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300">
              {round?.name ?? slug}
            </span>
            <h1 className="mt-4 text-3xl font-bold text-theme sm:text-4xl">
              {sectionIcon}{" "}
              <span className="text-gradient">{sectionName}</span>
            </h1>
            {section?.description && (
              <p className="mx-auto mt-3 max-w-xl text-sm text-theme-secondary">
                {section.description}
              </p>
            )}
            <p className="mt-2 text-xs text-theme-tertiary">
              {images.length} صورة
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {images.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 text-6xl opacity-30">{sectionIcon}</div>
              <p className="text-lg text-theme-tertiary">لا توجد صور لهذا القسم بعد</p>
              <p className="mt-1 text-sm text-theme-gold">قريباً</p>
            </div>
          )}

          {images.length > 0 && (
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
              {images.map((img, i) => (
                <div
                  key={img.id}
                  className="mb-4 break-inside-avoid fade-in-up"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="group relative overflow-hidden rounded-2xl border border-theme-card bg-theme-card">
                    <img
                      src={img.imageUrl}
                      alt={img.caption ?? `صورة ${i + 1}`}
                      className="h-auto w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    {img.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition group-hover:opacity-100">
                        <p className="text-sm text-white">{img.caption}</p>
                      </div>
                    )}
                  </div>                  </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

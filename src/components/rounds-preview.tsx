"use client";

import Link from "next/link";
import { api } from "@/trpc/react";

export function RoundsPreview() {
  const { data: rounds } = api.round.getAll.useQuery();

  const currentRound = rounds?.find((r) => r.isCurrent);
  const upcomingRounds = rounds?.filter((r) => !r.isCurrent && r.status === "upcoming") ?? [];
  const completedRounds = rounds?.filter((r) => r.status === "completed") ?? [];

  return (
    <section id="rounds" className="border-t border-theme divider-theme py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center fade-in-up">
          <span className="inline-block rounded-full border border-accent-500/20 bg-accent-500/10 px-4 py-1.5 text-sm text-accent-400">
            الدورات التدريبية
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            الدفعات{" "}
            <span className="text-gradient-accent">التدريبية</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-theme-secondary">
            دفعات تدريبية منظمة بأماكن محدودة. كل دفعة بتجيب معاها مجتمع جديد من
            المتعلمين الجادين.
          </p>
        </div>

        {/* Current Round Card */}
        {currentRound ? (
          <div className="relative overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-br from-brand-500/[0.08] via-theme-secondary to-accent-500/[0.05] p-8 lg:p-12">
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-brand-500/20 blur-[80px]" />

            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-brand-400" />
                التسجيل مفتوح
              </div>

              <h3 className="mb-2 text-3xl font-bold text-theme">{currentRound.name}</h3>
              <p className="mb-8 max-w-xl text-theme-secondary">{currentRound.description ?? ""}</p>

              {currentRound.highlights && currentRound.highlights.length > 0 && (
                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {currentRound.highlights.slice(0, 4).map((h, i) => (
                    <div
                      key={h.id ?? i}
                      className="rounded-xl border border-theme-card bg-theme-card p-4"
                    >
                      <div className="mb-1 text-xs text-theme-tertiary">{h.category}</div>
                      <div className="font-semibold text-theme">{h.studentName}</div>
                      {h.rank && <div className="text-sm text-brand-400">الترتيب: {h.rank}</div>}
                    </div>
                  ))}
                </div>
              )}

              <Link
                href="/rounds"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                شوف تفاصيل الدفعة كاملة
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-theme-card bg-theme-card p-12 text-center">
            <p className="text-theme-tertiary">لا توجد دفعة حالية</p>
          </div>
        )}

        {/* Upcoming Rounds */}
        {upcomingRounds.length > 0 && (
          <div className="stagger-children mt-6 grid gap-6 md:grid-cols-2">
            {upcomingRounds.map((r) => (
              <div
                key={r.id}
                className="rounded-2xl border border-theme-card bg-theme-card p-6 opacity-60"
              >
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-3 py-1 text-xs text-accent-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                  قريباً
                </div>
                <h3 className="mb-1 text-xl font-bold text-theme">{r.name}</h3>
                <p className="text-sm text-theme-tertiary">{r.description ?? ""}</p>
              </div>
            ))}
          </div>
        )}

        {(!rounds || rounds.length === 0) && (
          <div className="py-12 text-center text-theme-tertiary">
            لا توجد دفعات تدريبية متاحة حالياً
          </div>
        )}
      </div>
    </section>
  );
}

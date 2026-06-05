"use client";

import Link from "next/link";
import { api } from "@/trpc/react";

export default function RoundsPage() {
  const { data: rounds, isLoading } = api.round.getAll.useQuery();

  const currentRound = rounds?.find((r) => r.isCurrent);
  const otherRounds = rounds?.filter((r) => !r.isCurrent) ?? [];

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 bg-theme">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="mx-auto h-6 w-32 rounded-full bg-theme-card" />
            <div className="mx-auto h-10 w-96 rounded-lg bg-theme-card" />
            <div className="mx-auto h-4 w-72 rounded bg-theme-card" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-theme">
      {/* Hero */}
      <section className="border-b border-theme divider-theme py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-8 fade-in-up">
            <span className="inline-block rounded-full border border-accent-500/20 bg-accent-500/10 px-4 py-1.5 text-sm text-accent-400">
              الدورات التدريبية
            </span>
          </div>
          <h1 className="fade-in-up mb-4 text-4xl font-bold text-theme sm:text-5xl">
            الدفعات{" "}
            <span className="text-gradient-accent">التدريبية</span>
          </h1>
          <p className="fade-in-up mx-auto mb-12 max-w-2xl text-lg text-theme-secondary">
            دفعات تدريبية منظمة بأماكن محدودة. كل دفعة بتجيب معاها مجتمع جديد من
            المتعلمين الجادين.
          </p>

          {/* Current Round Hero Card */}
          {currentRound ? (
            <div className="fade-in-up relative overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-br from-brand-500/[0.08] via-theme-secondary to-accent-500/[0.05] p-8 text-center lg:p-16">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 via-accent-500 to-brand-500" />
              <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-brand-500/20 blur-[100px]" />

              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-brand-400" />
                  {currentRound.status === "upcoming" ? "قريباً" : "التسجيل مفتوح"}
                </div>

                <h2 className="mb-4 text-3xl font-bold text-theme sm:text-4xl">
                  {currentRound.name}
                </h2>

                <p className="mx-auto mb-8 max-w-2xl text-lg text-theme-secondary">
                  {currentRound.description ?? ""}
                </p>

                {/* Pricing */}
                {(currentRound.priceEGP || currentRound.priceUSD) && (
                  <div className="mx-auto mb-10 flex max-w-md flex-col gap-4 sm:flex-row">
                    {currentRound.priceEGP && (
                      <div className="flex-1 rounded-xl border border-brand-500/20 bg-brand-500/5 p-4">
                        <div className="text-2xl font-bold text-brand-400">
                          {currentRound.priceEGP.toLocaleString()} ج.م
                        </div>
                        <div className="text-xs text-theme-tertiary">مصر</div>
                      </div>
                    )}
                    {currentRound.priceUSD && (
                      <div className="flex-1 rounded-xl border border-accent-500/20 bg-accent-500/5 p-4">
                        <div className="text-2xl font-bold text-accent-400">
                          ${currentRound.priceUSD} USD
                        </div>
                        <div className="text-xs text-theme-tertiary">خارج مصر</div>
                      </div>
                    )}
                  </div>
                )}

                <Link
                  href={`/rounds/${currentRound.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-brand-600 glow-green"
                >
                  شوف تفاصيل الدفعة كاملة
                  <svg className="h-4 w-4 rtl:-scale-x-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        </div>
      </section>

      {/* Other Rounds */}
      {otherRounds.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-2xl font-bold text-theme">
              الدفعات الأخرى
            </h2>
            <div className="stagger-children grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherRounds.map((round) => (
                <Link
                  key={round.id}
                  href={`/rounds/${round.slug}`}
                  className="group rounded-2xl border border-theme-card bg-theme-card p-6 transition hover:border-brand-500/30 hover:shadow-lg hover:shadow-brand-500/5"
                >
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-3 py-1 text-xs text-accent-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                    {round.status === "upcoming" ? "قريباً" : round.status === "completed" ? "مكتملة" : round.status}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-theme group-hover:text-brand-400 transition-colors">
                    {round.name}
                  </h3>
                  <p className="mb-4 text-sm text-theme-tertiary line-clamp-2">
                    {round.description ?? ""}
                  </p>
                  {round.highlights && round.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {round.highlights.slice(0, 3).map((h, i) => (
                        <span
                          key={h.id ?? i}
                          className="rounded-lg border border-theme-card bg-theme px-2 py-0.5 text-[11px] text-theme-secondary"
                        >
                          {h.studentName}
                        </span>
                      ))}
                      {round.highlights.length > 3 && (
                        <span className="text-xs text-theme-tertiary">
                          +{round.highlights.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="mt-4 flex items-center gap-1 text-sm text-brand-400 opacity-0 transition group-hover:opacity-100">
                    عرض التفاصيل
                    <svg className="h-3.5 w-3.5 rtl:-scale-x-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {(!rounds || rounds.length === 0) && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-theme-tertiary">لا توجد دفعات تدريبية متاحة حالياً</p>
          </div>
        </section>
      )}
    </div>
  );
}

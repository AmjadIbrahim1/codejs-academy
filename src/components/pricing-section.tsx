"use client";

import Link from "next/link";

export function PricingSection() {
  return (
    <section id="pricing" className="border-t border-theme divider-theme py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center fade-in-up">
          <span className="inline-block rounded-full border border-accent-500/20 bg-accent-500/10 px-4 py-1.5 text-sm text-accent-400">
            عرض لفترة محدودة
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            استثمر في{" "}
            <span className="text-gradient-accent">مستقبلك</span>
          </h2>
        </div>

        <div className="stagger-children mx-auto grid max-w-3xl gap-8 lg:grid-cols-2">
          {/* Egypt Price */}
          <div className="relative overflow-hidden rounded-2xl border border-brand-500/20 bg-gradient-to-br from-brand-500/[0.08] to-[var(--theme-bg-secondary)] p-8">
            <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-brand-500/20 blur-[60px]" />
            <div className="relative">
              <div className="mb-2 inline-block rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-400">
                45% خصم
              </div>
              <h3 className="mb-1 text-lg font-bold text-theme">داخل مصر</h3>
              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-brand-400">1,100 ج.م</span>
                <span className="text-sm text-theme-tertiary line-through">2,000 ج.م</span>
              </div>
              <ul className="mb-6 space-y-2 text-sm text-theme-secondary">
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  برنامج 6 شهور كامل
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  محاضرات مباشرة ومسجلة
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  تحضير مهني
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  وصول للمجتمع
                </li>
              </ul>
              <Link
                href="/register"
                className="block w-full rounded-xl bg-brand-500 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                سجل دلوقتي
              </Link>
            </div>
          </div>

          {/* International Price */}
          <div className="relative overflow-hidden rounded-2xl border border-accent-500/20 bg-gradient-to-br from-accent-500/[0.08] to-[var(--theme-bg-secondary)] p-8">
            <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-accent-500/20 blur-[60px]" />
            <div className="relative">
              <div className="mb-2 inline-block rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-400">
                45% خصم
              </div>
              <h3 className="mb-1 text-lg font-bold text-theme">خارج مصر</h3>
              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-accent-400">$30</span>
                <span className="text-sm text-theme-tertiary line-through">$55</span>
              </div>
              <ul className="mb-6 space-y-2 text-sm text-theme-secondary">
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  برنامج 6 شهور كامل
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  محاضرات مباشرة ومسجلة
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  تحضير مهني
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  وصول للمجتمع
                </li>
              </ul>
              <Link
                href="/register"
                className="block w-full rounded-xl bg-accent-500 py-3 text-center text-sm font-semibold text-dark-900 transition hover:bg-accent-400"
              >
                سجل دلوقتي
              </Link>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 rounded-2xl border border-theme-card bg-theme-card p-6 text-center">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-theme-secondary">
            وسائل الدفع
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-theme-secondary">
            <span className="flex items-center gap-2 text-brand-300">
              <span className="font-semibold">انستا باي</span>
            </span>
            <span className="flex items-center gap-2 text-accent-300">
              <span className="font-semibold">كاش واليت</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="font-semibold text-theme">تليفون:</span> 01030615045
            </span>
          </div>
          <p className="mt-4 text-xs text-theme-tertiary">
            الأماكن محدودة. البرنامج بيكمل بسرعة.
          </p>
        </div>
      </div>
    </section>
  );
}

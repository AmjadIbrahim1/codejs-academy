"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-brand-500/10 blur-[120px]" />
      <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 fade-in-up inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300">
            <span className="h-2 w-2 rounded-full bg-brand-400 animate-pulse" />
            التسجيل مفتوح — الدفعة الأولى
          </div>

          {/* Headline */}
          <h1 className="fade-in-up-delay-1 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            من{" "}
            <span className="text-gradient">الصفر للجهزية لسوق العمل</span>{" "}
            كمطور في{" "}
            <span className="text-gradient">6 شهور</span>
          </h1>

          {/* Subheadline */}
          <p className="fade-in-up-delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-theme-secondary sm:text-xl">
            أتقن HTML، CSS، JavaScript، TypeScript، وتطوير الويب الحديث
            من خلال تدريب منظم، محاضرات مباشرة، مشاريع حقيقية،
            وتحضير مهني مركز. انضم لمجتمع متميز من المطورين المستقبليين.
          </p>

          {/* CTA Buttons */}
          <div className="fade-in-up-delay-3 mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="group relative inline-flex items-center gap-2 rounded-xl bg-brand-500 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-brand-600 pulse-glow"
            >
              ابدأ رحلتك دلوقتي
              <svg className="h-4 w-4 transition ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/program-overview#curriculum"
              className="inline-flex items-center gap-2 rounded-xl border border-theme-secondary bg-theme-card px-8 py-3.5 text-base font-semibold text-theme transition hover:border-brand-500/30 hover:bg-brand-500/10"
            >
              شوف المنهج
            </Link>
          </div>

          {/* Trust stats */}
          <div className="fade-in-up-delay-5 mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { value: "6+", label: "شهور تدريب" },
              { value: "15+", label: "تقنية" },
              { value: "100+", label: "ساعة محتوى" },
              { value: "24/7", label: "دعم مجتمعي" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-brand-400 sm:text-3xl">{stat.value}</div>
                <div className="mt-1 text-xs text-theme-tertiary sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--theme-bg)] to-transparent" />
    </section>
  );
}

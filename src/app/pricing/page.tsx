import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-16 bg-theme">
      {/* Hero */}
      <section className="border-b border-theme divider-theme py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-theme sm:text-5xl">
            استثمر في{" "}
            <span className="bg-gradient-to-r from-brand-400 via-accent-400 to-brand-300 bg-clip-text text-transparent">
              مستقبلك
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-theme-secondary">
            خصم 45% لفترة محدودة على برنامج التدريب الشامل بتاعنا لمدة 6 شهور.
            أماكن محدودة متاحة.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="border-b border-theme divider-theme py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Egypt */}
            <div className="relative overflow-hidden rounded-2xl border border-brand-500/20 bg-gradient-to-br from-brand-500/[0.08] to-theme-secondary p-8">
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-brand-500/20 blur-[80px]" />
              <div className="relative">
                <div className="mb-4 inline-block rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-400">
                  45% خصم — لفترة محدودة
                </div>
                <h2 className="mb-2 text-xl font-bold text-theme">داخل مصر</h2>
                <div className="mb-6 flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-brand-400">1,100 ج.م</span>
                  <span className="text-lg text-theme-tertiary line-through">2,000 ج.م</span>
                </div>
                <ul className="mb-8 space-y-3 text-sm text-theme-secondary">
                  {[
                    "برنامج 6 شهور منظم بالكامل",
                    "محاضرات مباشرة ومسجلة",
                    "مهام واختبارات وامتحانات أسبوعية",
                    "مشاريع عملية من الواقع",
                    "تحضير مهني ومراجعة سيرة ذاتية",
                    "وصول للمجتمع وإرشاد",
                    "شهادات إتمام",
                    "وصول مدى الحياة للمحتوى",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <svg className="h-4 w-4 flex-shrink-0 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className="block w-full rounded-xl bg-brand-500 py-3 text-center font-semibold text-white transition hover:bg-brand-600"
                >
                  سجل دلوقتي — 1,100 ج.م
                </Link>
              </div>
            </div>

            {/* International */}
            <div className="relative overflow-hidden rounded-2xl border border-accent-500/20 bg-gradient-to-br from-accent-500/[0.08] to-theme-secondary p-8">
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-accent-500/20 blur-[80px]" />
              <div className="relative">
                <div className="mb-4 inline-block rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-400">
                  45% خصم — لفترة محدودة
                </div>
                <h2 className="mb-2 text-xl font-bold text-theme">خارج مصر</h2>
                <div className="mb-6 flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-accent-400">$30 USD</span>
                  <span className="text-lg text-theme-tertiary line-through">$55 USD</span>
                </div>
                <ul className="mb-8 space-y-3 text-sm text-theme-secondary">
                  {[
                    "برنامج 6 شهور منظم بالكامل",
                    "محاضرات مباشرة ومسجلة",
                    "مهام واختبارات وامتحانات أسبوعية",
                    "مشاريع عملية من الواقع",
                    "تحضير مهني ومراجعة سيرة ذاتية",
                    "وصول للمجتمع وإرشاد",
                    "شهادات إتمام",
                    "وصول مدى الحياة للمحتوى",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <svg className="h-4 w-4 flex-shrink-0 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className="block w-full rounded-xl bg-accent-500 py-3 text-center font-semibold text-dark-900 transition hover:bg-accent-400"
                >
                  سجل دلوقتي — $30 USD
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Info */}
      <section className="py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-theme-card bg-theme-card p-8">
            <h2 className="mb-6 text-xl font-bold text-theme">وسائل الدفع</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-brand-500/20 bg-brand-500/5 p-4">
                <div className="font-semibold text-brand-400">انستا باي</div>
                <div className="mt-1 text-xs text-theme-tertiary">حول الفلوس مباشرة</div>
              </div>
              <div className="rounded-xl border border-accent-500/20 bg-accent-500/5 p-4">
                <div className="font-semibold text-accent-400">كاش واليت</div>
                <div className="mt-1 text-xs text-theme-tertiary">تحويل من المحفظة</div>
              </div>
              <div className="rounded-xl border border-theme-secondary bg-theme-card p-4">
                <div className="font-semibold text-theme">تليفون</div>
                <div className="mt-1 text-xs text-theme-tertiary">01030615045</div>
              </div>
            </div>
            <p className="mt-6 text-sm text-theme-tertiary">
              الأماكن محدودة. البرنامج بيكمل بسرعة — احجز مكانك النهاردة.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { api } from "@/trpc/react";

export function TestimonialsSection() {
  const { data: testimonials } = api.testimonial.getAll.useQuery();

  return (
    <section id="testimonials" className="border-t border-theme divider-theme py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center fade-in-up">
          <span className="inline-block rounded-full border border-accent-500/20 bg-accent-500/10 px-4 py-1.5 text-sm text-accent-400">
            نجاح الطلاب
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            إيه اللي{" "}
            <span className="text-gradient-accent">الطلاب بيقولوه</span>
          </h2>
        </div>

        <div className="stagger-children grid gap-6 md:grid-cols-2">
          {(testimonials ?? []).map((t) => (
            <div
              key={t.id}
              className="card-hover card-theme rounded-2xl p-6"
            >
              <div className="mb-3 flex">
                {Array.from({ length: t.rating ?? 5 }).map((_, j) => (
                  <svg key={j} className="h-4 w-4 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 text-sm leading-relaxed text-theme-secondary">&ldquo;{t.content}&rdquo;</p>
              <div>
                <div className="text-sm font-semibold text-theme">{t.name}</div>
                {t.role && <div className="text-xs text-theme-tertiary">{t.role}</div>}
              </div>
            </div>
          ))}
          {(!testimonials || testimonials.length === 0) && (
            <div className="col-span-full py-12 text-center text-theme-tertiary">
              لا توجد آراء بعد
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

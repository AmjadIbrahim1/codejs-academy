"use client";

import { api } from "@/trpc/react";

export function TestimonialsSection() {
  const { data: testimonials } = api.testimonial.getAll.useQuery();

  return (
    <section id="testimonials" className="border-t border-theme divider-theme py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center fade-in-up">
          <span className="inline-block rounded-full border border-accent-500/20 bg-accent-500/10 px-4 py-1.5 text-sm text-theme-gold">
            نجاح الطلاب
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            إيه اللي{" "}
            <span className="text-gradient-accent">الطلاب بيقولوه</span>
          </h2>
        </div>

        <div className="stagger-children grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(testimonials ?? []).map((t) => (
            <div
              key={t.id}
              className="group card-hover card-theme flex flex-col overflow-hidden rounded-2xl border border-theme-card bg-theme-card transition-all duration-500 hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-xl hover:shadow-brand-500/10"
            >
              {/* Image */}
              {t.avatarUrl && (
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              )}

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                {/* Stars */}
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: t.rating ?? 5 }).map((_, j) => (
                    <svg key={j} className="h-4 w-4 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <div className="relative mb-5 flex-1">
                  <svg className="mb-2 h-6 w-6 text-accent-500/40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-sm leading-relaxed text-theme-secondary italic">{t.content}</p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-theme-card pt-4">
                  {!t.avatarUrl && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-sm font-bold text-brand-400">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-semibold text-theme">{t.name}</div>
                    {t.role && <div className="text-xs text-theme-gold">{t.role}</div>}
                    
                  </div>
                </div>
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
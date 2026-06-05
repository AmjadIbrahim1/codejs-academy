"use client";

import { useState } from "react";
import { api } from "@/trpc/react";

export function FAQSection() {
  const { data: faqs } = api.faq.getAll.useQuery();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="border-t border-theme divider-theme py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center fade-in-up">
          <span className="inline-block rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300">
            الأسئلة الشائعة
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            أسئلة{" "}
            <span className="text-gradient">بتتكرر كتير</span>
          </h2>
        </div>

        <div className="stagger-children space-y-3">
          {(faqs ?? []).map((faq, i) => (
            <div
              key={faq.id}
              className="overflow-hidden rounded-xl border border-theme-card"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between p-4 text-left transition hover:bg-theme-card"
              >
                <span className="text-sm font-medium text-theme">{faq.question}</span>
                <svg
                  className={`h-4 w-4 flex-shrink-0 text-theme-secondary transition ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="border-t border-theme-card px-4 py-3">
                  <p className="text-sm leading-relaxed text-theme-secondary">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
          {(!faqs || faqs.length === 0) && (
            <div className="py-12 text-center text-theme-tertiary">
              لا توجد أسئلة بعد
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

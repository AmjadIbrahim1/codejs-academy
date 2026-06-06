"use client";

import { api } from "@/trpc/react";

const categoryMeta: Record<string, { title: string; color: string }> = {
  core: { title: "الأساسيات", color: "from-brand-500/20 to-brand-600/10" },
  advanced: { title: "مفاهيم متقدمة", color: "from-accent-500/20 to-accent-600/10" },
  tools: { title: "أدوات وأطر عمل", color: "from-blue-500/20 to-blue-600/10" },
  career: { title: "مهارات مهنية", color: "from-purple-500/20 to-purple-600/10" },
};

export function CurriculumSection() {
  const { data: topics } = api.curriculum.getAll.useQuery();
  const { data: settings } = api.setting.getAll.useQuery();

  // Group topics by category
  const grouped = new Map<string, typeof topics>();
  for (const topic of topics ?? []) {
    const cat = topic.category;
    if (!grouped.has(cat)) grouped.set(cat, []);
    grouped.get(cat)!.push(topic);
  }

  const categoryOrder = ["core", "advanced", "tools", "career"];

  // PDF URL from settings
  const pdfSetting = settings?.find((s) => s.key === "curriculum_pdf_url");
  const pdfUrl = pdfSetting?.value ?? "";

  return (
    <section id="curriculum" className="border-t border-theme divider-theme py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center fade-in-up">
          <span className="inline-block rounded-full border border-accent-500/20 bg-accent-500/10 px-4 py-1.5 text-sm text-theme-gold">
            المنهج التدريبي
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            برنامج شامل{" "}
            <span className="text-gradient-accent">لمدة 6 شهور</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-theme-secondary">
            منهج عميق ومنظم بيغطي كل محتاج عشان تبقى مطور محترف من الصفر.
          </p>
        </div>

        <div className="stagger-children grid gap-8 lg:grid-cols-2">
          {categoryOrder.map((catKey) => {
            const cat = categoryMeta[catKey];
            const catTopics = grouped.get(catKey) ?? [];
            if (!cat || catTopics.length === 0) return null;
            return (
              <div
                key={catKey}
                className={`rounded-2xl border border-theme-card bg-gradient-to-br ${cat.color} p-6`}
              >
                <h3 className="mb-4 text-lg font-bold text-theme">{cat.title}</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {catTopics.map((topic) => (
                    <div
                      key={topic.id}
                      className="rounded-xl border border-theme-card bg-theme-card p-4 transition hover:border-white/10"
                    >
                      <div className="mb-1 font-semibold text-theme">{topic.title}</div>
                      {topic.description && (
                        <div className="text-xs text-theme-tertiary">{topic.description}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {(!topics || topics.length === 0) && (
          <div className="py-12 text-center text-theme-tertiary">
            لم يتم إضافة محتوى المنهج بعد
          </div>
        )}

        {/* Training format */}
        <div className="mt-12 rounded-2xl border border-theme-card bg-gradient-to-r from-brand-500/5 via-accent-500/5 to-brand-500/5 p-8">
          <h3 className="mb-6 text-center text-xl font-bold">طريقة التدريب</h3>
          <div className="stagger-children grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "📝", label: "مهام وواجبات" },
              { icon: "📊", label: "اختبارات وامتحانات" },
              { icon: "💻", label: "مشاريع وتطبيقات" },
              { icon: "🎯", label: "حل مشكلات" },
              { icon: "🎤", label: "محاضرات مباشرة" },
              { icon: "📹", label: "محاضرات مسجلة" },
              { icon: "👥", label: "متابعة أسبوعية" },
              { icon: "🏆", label: "تفاعل مجتمعي" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-theme-card bg-theme-card p-3 text-center text-sm transition hover:border-brand-500/20 hover:bg-brand-500/5"
              >
                <span className="me-2">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Curriculum PDF Download */}
        {pdfUrl && (
          <div className="mt-12 rounded-2xl border border-brand-500/20 bg-gradient-to-br from-brand-500/[0.08] to-accent-500/[0.05] p-8 text-center fade-in-up">
            <div className="mx-auto max-w-xl">
              <div className="mb-4 text-4xl">📄</div>
              <h3 className="mb-2 text-xl font-bold text-theme">منهج Code JS Academy كامل</h3>
              <p className="mb-6 text-sm text-theme-secondary">
                حمل المنهج الكامل بتفصيل كل المواضيع، المدة، والمهارات اللي هتكتسبها —
                كل ده في ملف PDF واحد.
              </p>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                عرض المنهج الكامل
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

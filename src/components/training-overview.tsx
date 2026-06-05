"use client";

import Link from "next/link";

const trainingFeatures = [
  { icon: "📅", title: "6 شهور تدريب مكثف", desc: "برنامج منظم من الصفر للاحتراف" },
  { icon: "📆", title: "4 محاضرات أسبوعياً", desc: "جدول مكثف ومنتظم" },
  { icon: "🎤", title: "محاضرات مباشرة", desc: "تفاعل فوري مع المدربين" },
  { icon: "📹", title: "محاضرات مسجلة", desc: "المحتوى متاح للمشاهدة في أي وقت" },
  { icon: "📋", title: "امتحانات أسبوعية", desc: "تقييم دوري لقياس مستواك" },
  { icon: "📊", title: "اختبارات أسبوعية", desc: "اختبارات قصيرة لترسيخ المفاهيم" },
  { icon: "💻", title: "مهام برمجة", desc: "تطبيق عملي لكل مفهوم بتتعلمه" },
  { icon: "🚀", title: "مشاريع عملية", desc: "ابني بورتفوليو قوي بمشاريع حقيقية" },
  { icon: "📄", title: "واجبات منزلية", desc: "تدريبات إضافية على كل درس" },
  { icon: "🧩", title: "حل مشكلات", desc: "تحديات خوارزمية ومنطقية" },
  { icon: "👥", title: "دعم مجتمعي", desc: "مجتمع ديسكورد للدعم والمساعدة" },
  { icon: "🏆", title: "تكريم وتحفيز", desc: "نظام مكافآت وتقدير للمتميزين" },
];

export function TrainingOverview() {
  return (
    <section id="program-overview" className="border-t border-theme divider-theme py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center fade-in-up">
          <span className="inline-block rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300">
            اتعلم أساسيات البرمجة
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            كل اللي محتاجه عشان تبدأ رحلتك في{" "}
              <span className="text-gradient">البرمجة</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-theme-secondary">
            برنامج متكامل لمدة 6 شهور، 4 محاضرات في الأسبوع، بمزيج من المحاضرات
            المباشرة والمسجلة، مع امتحانات، مهام، مشاريع، ودعم مجتمعي على مدار الساعة.
          </p>
        </div>

        <div className="stagger-children grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {trainingFeatures.map((feature) => (
            <div
              key={feature.title}
              className="group card-theme rounded-xl p-4 text-center transition hover:border-brand-500/20"
            >
              <div className="mb-2 text-2xl transition group-hover:scale-110">{feature.icon}</div>
              <h3 className="text-sm font-semibold text-theme">{feature.title}</h3>
              <p className="mt-1 text-xs text-theme-tertiary">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-brand-600 pulse-glow"
          >
            سجل دلوقتي وابدأ رحلتك
            <svg className="h-4 w-4 rtl:-scale-x-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

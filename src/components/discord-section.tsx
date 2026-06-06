"use client";

import { useState } from "react";
import { DiscordModal } from "@/components/discord-modal";

const rules = [
  "احترم الجميع وكن محترفاً في كل الأوقات",
  "ساعد غيرك لما تقدر — مشاركة المعرفة هي الأساس",
  "ممنوع السبام أو الترويج من غير إذن",
  "خلي النقاشات متعلقة بالبرمجة والتعليم",
  "احترم قرارات الإدارة والمشرفين",
  "حافظ على بيئة إيجابية وداعمة",
];

const roles = [
  { name: "طالب", desc: "متعلم نشط في البرنامج", color: "text-brand-400" },
  { name: "مساعد", desc: "أعضاء المجتمع اللي بيساعدوا غيرهم", color: "text-green-400" },
  { name: "مساعد متقدم", desc: "أعضاء متمرسين عندهم معرفة عميقة", color: "text-blue-400" },
  { name: "مرشد", desc: "مرشدين البرنامج الرسميين", color: "text-purple-400" },
  { name: "بطل اختبارات", desc: "أفضل المؤدين في الاختبارات", color: "text-theme-gold" },
  { name: "أستاذ مهام", desc: "امتياز في مهام البرمجة", color: "text-orange-400" },
];

export function DiscordSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="discord" className="border-t border-theme divider-theme py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center fade-in-up">
          <span className="inline-block rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-400">
            مركز المجتمع
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            مجتمع{" "}
            <span className="text-gradient">ديسكورد</span>
          </h2>
        </div>

        <div className="stagger-children grid gap-8 lg:grid-cols-2">
          {/* Rules */}
          <div className="rounded-2xl border border-theme-card bg-theme-card p-6">
            <h3 className="mb-4 text-lg font-bold text-theme">📋 قوانين المجتمع</h3>
            <ul className="space-y-2">
              {rules.map((rule) => (
                <li key={rule} className="flex items-start gap-2 text-sm text-theme-secondary">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          {/* Roles */}
          <div className="rounded-2xl border border-theme-card bg-theme-card p-6">
            <h3 className="mb-4 text-lg font-bold text-theme">🎭 نظام الرتب</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {roles.map((role) => (
                <div
                  key={role.name}
                  className="rounded-xl border border-theme-card bg-theme-card p-3"
                >
                  <div className={`text-sm font-semibold ${role.color}`}>{role.name}</div>
                  <div className="text-xs text-theme-tertiary">{role.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Welcome message */}
        <div className="mt-8 rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/[0.05] via-theme-secondary to-purple-500/[0.05] p-6 text-center">
          <h3 className="mb-2 text-lg font-bold text-theme">
            👋 مرحب بيك في مجتمع Code JS Academy
          </h3>
          <p className="mx-auto mb-4 max-w-xl text-sm text-theme-secondary">
            انضميت لمجتمع من المتعلمين والمطورين المتحمسين. عرّف عن نفسك، استكشف
            القنوات، اسأل، وابدأ رحلتك. إحنا هنا عشان نساعدك تكبر!
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-600"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M16 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M15.5 8.5c-1.5-.8-3-.8-4.5 0" />
            </svg>
            انضم لسيرفر ديسكورد
          </button>
        </div>
      </div>

      <DiscordModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}

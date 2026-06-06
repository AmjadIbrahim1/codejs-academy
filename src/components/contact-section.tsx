"use client";

import { useState } from "react";
import { DiscordModal } from "@/components/discord-modal";

const WHATSAPP_URL = "https://wa.me/201030615045";

const socials = [
  {
    name: "فيسبوك",
    url: "https://www.facebook.com/profile.php?id=61582055140693",
    color: "hover:border-blue-500/50 hover:text-blue-400",
    icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    name: "لينكد إن",
    url: "https://www.linkedin.com/company/code1-js",
    color: "hover:border-blue-400/50 hover:text-blue-300",
    icon: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  },
  {
    name: "يوتيوب",
    url: "https://www.youtube.com/@MegoCode",
    color: "hover:border-red-500/50 hover:text-red-400",
    icon: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z M9.75 15.02V8.98L15.5 12z",
  },
  {
    name: "تليجرام",
    url: "https://t.me/Code1_JS",
    color: "hover:border-sky-500/50 hover:text-sky-400",
    icon: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  },
  {
    name: "واتساب",
    url: WHATSAPP_URL,
    color: "hover:border-green-500/50 hover:text-green-400",
    icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
  },
];

const trainingVideos = [
  { title: "نظرة عامة على التدريب", url: "https://www.youtube.com/watch?v=-iSZd-BaZkE", thumbnail: "🎬" },
  { title: "نظام المنافسة على ديسكورد", url: "https://www.youtube.com/watch?v=nygzzHxAlgA", thumbnail: "🎮" },
  { title: "طريقة التسجيل", url: "https://www.youtube.com/watch?v=ONa6SwScoR4", thumbnail: "📝" },
];

export function ContactSection() {
  const [discordOpen, setDiscordOpen] = useState(false);

  return (
    <section id="contact" className="border-t border-theme divider-theme py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center fade-in-up">
          <span className="inline-block rounded-full border border-accent-500/20 bg-accent-500/10 px-4 py-1.5 text-sm text-theme-gold">
            ابقي على تواصل
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            تواصل مع{" "}
            <span className="text-gradient-accent">مجتمعنا</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-theme-secondary">
            تابعنا على السوشيال ميديا، أو كلمنا على واتساب عشان تبدأ رحلتك.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          {/* Social Media Grid */}
          <div className="stagger-children grid grid-cols-3 gap-4 sm:grid-cols-5">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col items-center gap-2 rounded-2xl border border-theme-card bg-theme-card p-6 transition ${social.color}`}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={social.icon} />
                </svg>
                <span className="text-xs text-theme-tertiary group-hover:text-current">
                  {social.name}
                </span>
              </a>
            ))}
          </div>

          {/* Training Videos */}
          <div className="mt-8 rounded-2xl border border-theme-card bg-theme-card p-6">
            <h3 className="mb-4 text-center text-lg font-bold text-theme">🎥 فيديوهات تعليمية</h3>
            <div className="stagger-children grid gap-3 sm:grid-cols-3">
              {trainingVideos.map((video) => (
                <a
                  key={video.title}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-theme-card bg-theme-card p-3 transition hover:border-brand-500/20 hover:bg-brand-500/5"
                >
                  <span className="text-xl">{video.thumbnail}</span>
                  <span className="text-xs text-theme-secondary">{video.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Direct Contact */}
          <div className="mt-8 rounded-2xl border border-theme-card bg-theme-card p-6 text-center">
            <h3 className="mb-4 text-lg font-semibold text-theme">تواصل مباشر</h3>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400 transition hover:bg-green-500/20"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                واتساب
              </a>
              <a href="tel:01030615045" className="text-brand-400 transition hover:text-brand-300">
                📞 01030615045
              </a>
              <a href="mailto:amjadibrahim218@gmail.com" className="text-theme-secondary transition hover:text-brand-400">
                ✉️ amjadibrahim218@gmail.com
              </a>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="mt-6 rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/[0.08] to-theme-secondary p-6 text-center">
            <h3 className="mb-2 text-lg font-bold text-theme">💬 كلمنا على واتساب</h3>
            <p className="mb-4 text-sm text-theme-secondary">
            عشان تسجل في الأكاديمية أو عندك أي استفسار، كلمنا مباشرة.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              كلمنا على واتساب
            </a>
          </div>
        </div>
      </div>

      <DiscordModal isOpen={discordOpen} onClose={() => setDiscordOpen(false)} />
    </section>
  );
}

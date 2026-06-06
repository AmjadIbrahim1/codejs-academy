"use client";

import Link from "next/link";
import { useState } from "react";
import { DiscordModal } from "@/components/discord-modal";

const WHATSAPP_URL = "https://wa.me/201030615045";

export function Footer() {
  const [discordOpen, setDiscordOpen] = useState(false);

  const socialLinks = [
    { name: "لينكد إن", url: "https://www.linkedin.com/company/code1-js", icon: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
    { name: "فيسبوك", url: "https://www.facebook.com/profile.php?id=61582055140693", icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
    { name: "يوتيوب", url: "https://www.youtube.com/@MegoCode", icon: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z M9.75 15.02V8.98L15.5 12z" },
    { name: "تليجرام", url: "https://t.me/Code1_JS", icon: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" },
    { name: "واتساب", url: WHATSAPP_URL, icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" },
  ];

  const footerLinks = {
    التصفح: [
      { label: "الرئيسية", href: "/", external: false },
      { label: "اتعلم أساسيات البرمجة", href: "/#curriculum", external: false },
      { label: "ابني موقع وتطبيق", href: "/#services", external: false },
      { label: "كورسات مسجلة", href: "/#services", external: false },
      { label: "كتب برمجة عربية", href: "/#services", external: false },
      { label: "منتجات برمجة", href: "/#services", external: false },
    ],
    "السوشيال ميديا": [
      { label: "لينكد إن", href: "https://www.linkedin.com/company/code1-js", external: true },
      { label: "فيسبوك", href: "https://www.facebook.com/profile.php?id=61582055140693", external: true },
      { label: "يوتيوب", href: "https://www.youtube.com/@MegoCode", external: true },
      { label: "تليجرام", href: "https://t.me/Code1_JS", external: true },
    ],
    "تواصل مع الأكاديمية": [
      { label: "واتساب", href: WHATSAPP_URL, external: true },
      { label: "تليفون: 01030615045", href: "tel:01030615045", external: false },
      { label: "إيميل: amjadibrahim218@gmail.com", href: "mailto:amjadibrahim218@gmail.com", external: false },
    ],
  };

  return (
    <footer className="border-t border-theme bg-theme theme-transition">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
              <img src="/logo.png" alt="Code JS Academy" className="h-8 w-auto drop-shadow-[0_0_8px_rgba(51,153,51,0.3)]" />
              <span className="text-lg font-bold text-theme">
                Code <span className="text-accent-400">JS</span> <span className="text-brand-400">Academy</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-theme-secondary">
              أكاديمية برمجة متميزة. حوّل نفسك من مبتدئ إلى مطور جاهز لسوق العمل
              من خلال برنامَجنا المنظم لمدة 6 شهور.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-theme-secondary text-theme-secondary transition hover:border-brand-500/50 hover:text-brand-400"
                  title={social.name}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-theme">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-theme-tertiary transition hover:text-brand-400"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-theme-tertiary transition hover:text-brand-400"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-theme pt-8 text-center text-sm text-theme-tertiary">
          <p>© {new Date().getFullYear()} Code JS Academy. كل الحقوق محفوظة.</p>
        </div>
      </div>

      <DiscordModal isOpen={discordOpen} onClose={() => setDiscordOpen(false)} />
    </footer>
  );
}

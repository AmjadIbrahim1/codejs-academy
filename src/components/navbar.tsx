"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useTheme, type Theme } from "@/components/theme-provider";

const themeIcons: Record<Theme, string> = {
  dark: "🌙",
  light: "☀️",
  neon: "💚",
};

const themeLabels: Record<Theme, string> = {
  dark: "داكن",
  light: "فاتح",
  neon: "نيون",
};

const nextTheme: Record<Theme, Theme> = {
  dark: "light",
  light: "neon",
  neon: "dark",
};

export function Navbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLandingPage = pathname === "/";

  // Common links: "خدماتنا" always visible on every page
  // Plus page-specific links for non-landing pages
  const commonLinks = [{ href: "/#services", label: "خدماتنا" }];
  const pageLinks = isLandingPage
    ? []
    : [
        { href: "/program-overview#curriculum", label: "المنهج" },
        { href: "/program-overview#about", label: "عن الأكاديمية" },
        { href: "/rounds", label: "الدورات" },
        { href: "/program-overview#pricing", label: "الأسعار" },
        { href: "/program-overview#faq", label: "الأسئلة" },
        { href: "/program-overview#contact", label: "تواصل معنا" },
      ];
  const navLinks = [...commonLinks, ...pageLinks];

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-theme bg-theme-navbar backdrop-blur-xl theme-transition">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2 transition-transform hover:scale-105">
            <img src="/logo.png" alt="Code JS Academy" className="h-8 w-auto drop-shadow-[0_0_8px_rgba(51,153,51,0.3)]" />
            <span className="hidden text-lg font-bold sm:inline text-theme">
              Code <span className="text-accent-400">JS</span> <span className="text-brand-400">Academy</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative rounded-lg px-3 py-2 text-sm text-theme-secondary transition-all duration-300 hover:bg-white/5 hover:text-theme hover:shadow-[0_0_20px_rgba(51,153,51,0.08)] after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-gradient-to-r after:from-brand-400 after:to-accent-400 after:transition-all after:duration-300 hover:after:w-3/4"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth / CTA + Theme Toggle */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(nextTheme[theme])}
              className="group relative rounded-lg border border-theme-secondary px-3 py-1.5 text-sm transition-all duration-300 hover:border-brand-500/30 hover:bg-brand-500/5 hover:shadow-[0_0_20px_rgba(51,153,51,0.12)] active:scale-95"
              title={`الوضع ${themeLabels[nextTheme[theme]]}`}
            >
              <span className="inline-block transition-transform duration-300 group-hover:scale-110">{themeIcons[theme]}</span>
              {/* Tooltip */}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-dark-800 px-2 py-1 text-[10px] text-dark-300 opacity-0 transition-all duration-200 group-hover:opacity-100">
                {themeLabels[theme]}
              </span>
            </button>

            {session?.user ? (
              <div className="flex items-center gap-3">
                {session.user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="rounded-lg bg-accent-500/10 px-3 py-1.5 text-sm font-medium text-accent-400 transition-all duration-300 hover:bg-accent-500/20 hover:shadow-[0_0_20px_rgba(247,223,30,0.15)] active:scale-95"
                  >
                    لوحة التحكم
                  </Link>
                )}
                <span className="hidden text-sm text-theme-secondary sm:inline">
                  {session.user.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="rounded-lg border border-theme-secondary px-4 py-1.5 text-sm text-theme-secondary transition-all duration-300 hover:border-brand-500/50 hover:text-theme hover:shadow-[0_0_20px_rgba(51,153,51,0.1)] active:scale-95"
                >
                  تسجيل الخروج
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="group relative overflow-hidden rounded-lg bg-brand-500 px-5 py-1.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-600 glow-green active:scale-95"
              >
                <span className="relative z-10">تسجيل الدخول</span>
                <span className="absolute inset-0 translate-y-full bg-gradient-to-t from-white/10 to-transparent transition-transform duration-300 group-hover:translate-y-0" />
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 text-theme-secondary transition-all duration-300 hover:bg-white/5 hover:text-theme active:scale-90 md:hidden"
            >
              <svg className="h-5 w-5 transition-transform duration-300" style={{ transform: mobileOpen ? 'rotate(90deg)' : 'rotate(0deg)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-theme pb-4 pt-2 md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-theme-secondary transition-all duration-200 hover:bg-white/5 hover:text-theme hover:-translate-x-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

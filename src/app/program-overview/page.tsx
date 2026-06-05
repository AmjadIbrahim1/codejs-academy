import Link from "next/link";
import { Hero } from "@/components/hero";
import { TrainingOverview } from "@/components/training-overview";
import { CurriculumSection } from "@/components/curriculum-section";
import { AboutSection } from "@/components/about-section";
import { RoundsPreview } from "@/components/rounds-preview";
import { AchievementsSection } from "@/components/achievements-section";
import { CertificatesSection } from "@/components/certificates-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { PricingSection } from "@/components/pricing-section";
import { DiscordSection } from "@/components/discord-section";
import { FAQSection } from "@/components/faq-section";
import { ContactSection } from "@/components/contact-section";

const quickLinks = [
  { label: "نظرة عامة", href: "#program-overview", icon: "📖" },
  { label: "المنهج", href: "#curriculum", icon: "📚" },
  { label: "عن الأكاديمية", href: "#about", icon: "🏛️" },
  { label: "الدورات", href: "#rounds", icon: "🏆" },
  { label: "الإنجازات", href: "#achievements", icon: "⭐" },
  { label: "الشهادات", href: "#certificates", icon: "🎓" },
  { label: "الأسعار", href: "#pricing", icon: "💰" },
  { label: "الأسئلة", href: "#faq", icon: "❓" },
  { label: "تواصل معنا", href: "#contact", icon: "📞" },
];

export default function ProgramOverviewPage() {
  return (
    <div className="min-h-screen">
      <Hero />
      {/* Page Header */}
      <section className="border-b border-theme divider-theme py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-brand-400" />
            اكتشف كل خدمات Code JS Academy
          </div>
          <h1 className="text-4xl font-bold text-theme sm:text-5xl">
            كل اللي محتاجه عشان{" "}
            <span className="text-gradient">تنجح</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-theme-secondary">
            من التعليم والتدريب للتطوير المهني — كل حاجة في مكان واحد
          </p>

          {/* Quick Navigation */}
          <div className="mx-auto mt-10 flex flex-wrap justify-center gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="inline-flex items-center gap-1.5 rounded-xl border border-theme-card bg-theme-card px-3.5 py-2 text-sm text-theme-secondary transition hover:border-brand-500/20 hover:bg-brand-500/5 hover:text-white"
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TrainingOverview />
      <CurriculumSection />
      <AboutSection />
      <RoundsPreview />
      <AchievementsSection />
      <CertificatesSection />
      <TestimonialsSection />
      <PricingSection />
      <DiscordSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
}

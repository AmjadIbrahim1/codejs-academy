import Link from "next/link";

const services = [
  {
    title: "اتعلم أساسيات البرمجة",
    description:
      "الخدمة الرئيسية الشغالة دلوقتي! HTML, CSS, JavaScript, TypeScript — منهج منظم لمدة 6 شهور بمحاضرات مباشرة، مشاريع حقيقية، ومتابعة أسبوعية. من الصفر للجهزية لسوق العمل.",
    status: "شغال",
    icon: "💻",
    href: "/program-overview",
  },
  {
    title: "ابني موقع وتطبيقك الخاص",
    description:
      "خلينا نبني مشروعك الجاي. من مواقع الهبوط البسيطة لتطبيقات ويب كاملة، إحنا بنقدم حلول جاهزة للإنتاج بإحترافية.",
    status: "قريباً",
    icon: "🚀",
    href: "#",
  },
  {
    title: "مكتبة كورسات مسجلة",
    description:
      "مكتبة ضخمة من الكورسات المسجلة عالية الجودة بتغطي مواضيع متقدمة في البرمجة والتطوير. اتعلم براحتك وبوصول مدى الحياة.",
    status: "قريباً",
    icon: "📹",
    href: "#",
  },
  {
    title: "اتعلم برمجة من كتب مصرية",
    description:
      "مفاهيم البرمجة المهمة بشرح بالعربية المصرية وبأحسن المراجع المحلية. عشان الكود يبقى سهل ومفهوم لكل الناس.",
    status: "قريباً",
    icon: "📚",
    href: "#",
  },
  {
    title: "صمم تيشيرت أو كوب برمجة",
    description:
      "عبر عن شخصيتك البرمجية مع تيشيرتات وأكواب مخصصة بتصميمات programming فريدة. أي ستيل تختاره، إحنا بنصنعهولك.",
    status: "قريباً",
    icon: "👕",
    href: "#",
  },
];

const statusColors: Record<string, string> = {
  شغال: "bg-brand-500/10 text-brand-400 border-brand-500/20",
  متاح: "bg-brand-500/10 text-brand-400 border-brand-500/20",
  "قريباً": "bg-accent-500/10 text-accent-400 border-accent-500/20",
  Beta: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "قيد التطوير": "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export function ServicesSection() {
  return (
    <section id="services" className="border-t border-theme divider-theme py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center fade-in-up">
          <span className="inline-block rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300">
            خدماتنا
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            كل اللي محتاجه عشان{" "}
            <span className="text-gradient">تنجح</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-theme-secondary sm:text-lg">
            من التعليم إلى التطوير إلى المنتجات — إحنا بنوفرلك نظام متكامل لرحلتك
            البرمجية. اختار الخدمة اللي تناسبك من تحت.
          </p>
        </div>

        {/* Services Grid */}
        <div className="stagger-children grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`group card-hover rounded-2xl border ${
                i === 0
                  ? "border-brand-500/30 bg-gradient-to-br from-brand-500/[0.12] via-theme-secondary to-brand-500/[0.06] md:col-span-2 lg:col-span-2"
                  : "border-theme-card bg-theme-card"
              } p-6 lg:p-8`}
            >
              <div className={`mb-4 ${i === 0 ? "text-4xl" : "text-3xl"}`}>{service.icon}</div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className={`font-semibold text-theme ${i === 0 ? "text-xl lg:text-2xl" : "text-lg"}`}>
                  {service.title}
                </h3>
                <span
                  className={`rounded-full border px-3 py-0.5 text-[11px] font-medium uppercase tracking-wider ${
                    statusColors[service.status] ?? "bg-theme-card text-theme-secondary"
                  }`}
                >
                  {service.status}
                </span>
              </div>
              <p className={`mb-4 leading-relaxed text-theme-secondary ${i === 0 ? "text-sm lg:text-base" : "text-sm"}`}>
                {service.description}
              </p>
              {service.href && service.href !== "#" && (
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
                >
                  شوف البرنامج
                  <svg className="h-4 w-4 rtl:-scale-x-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

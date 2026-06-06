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
  "قريباً": "bg-accent-500/10 text-theme-gold border-accent-500/20",
  Beta: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "قيد التطوير": "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const LI_SVG_PATH = "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

type FounderCardProps = {
  name: string;
  image: string;
  linkedin: string;
  featured?: boolean;
};

function FounderCard({ name, image, linkedin, featured }: FounderCardProps) {
  return (
    <a
      href={linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 ${
        featured
          ? "shadow-brand-500/20 hover:-translate-y-3 hover:shadow-2xl hover:shadow-brand-500/40"
          : "shadow-black/10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-500/15"
      }`}
    >
      {/* Ambient glow */}
      <div
        className={`pointer-events-none absolute -inset-16 rounded-full opacity-0 blur-3xl transition-all duration-700 group-hover:opacity-100 ${
          featured
            ? "bg-brand-500/25"
            : "bg-brand-500/15"
        }`}
      />

      {/* Border glow */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-all duration-700 ${
          featured
            ? "ring-2 ring-brand-500/60 group-hover:opacity-100"
            : "ring-1 ring-brand-500/40 group-hover:opacity-100"
        }`}
      />

      {/* Image */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className={`w-full object-cover transition-all duration-700 group-hover:scale-110 ${
            featured ? "h-80" : "h-72"
          }`}
        />

        {/* Hover overlay with name */}
        <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-5 opacity-0 transition-all duration-500 group-hover:opacity-100">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d={LI_SVG_PATH} />
            </svg>
            <span className="text-sm font-medium text-white">{name}</span>
          </div>
        </div>
      </div>

      {/* Bottom cinematic flare */}
      <div
        className={`pointer-events-none absolute -bottom-10 left-1/2 h-16 w-3/4 -translate-x-1/2 rounded-full opacity-0 blur-2xl transition-all duration-700 group-hover:opacity-100 ${
          featured
            ? "bg-gradient-to-r from-brand-500/0 via-brand-500/40 to-brand-500/0"
            : "bg-gradient-to-r from-brand-500/0 via-brand-500/20 to-brand-500/0"
        }`}
      />
    </a>
  );
}

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

        {/* Founders Section */}
        <div className="mb-16 fade-in-up">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full border border-accent-500/20 bg-accent-500/10 px-4 py-1.5 text-sm text-theme-gold">
              المؤسسون
            </span>
            <h3 className="mt-4 text-2xl font-bold sm:text-3xl">
              فريق{" "}
              <span className="text-gradient">Code JS Academy</span>
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-theme-secondary">
              ناس شغوفة بتعليم البرمجة وبناء مجتمع تقني عربي قوي
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <FounderCard
                name="Belal Samir"
                image="/1.png"
                linkedin="https://www.linkedin.com/in/belal-samir-385b3328b/"
              />
              <FounderCard
                name="Amjad Ibrahim"
                image="/2.png"
                linkedin="https://www.linkedin.com/in/amjad-ibrahim-5a647525a/"
                featured
              />
              <FounderCard
                name="Ismail Ahmed"
                image="/3.png"
                linkedin="https://www.linkedin.com/in/ismail-ahmed-1438b42a5/"
              />
            </div>
          </div>
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
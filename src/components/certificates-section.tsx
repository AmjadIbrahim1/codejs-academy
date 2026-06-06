const certs = [
  {
    title: "شهادة HTML & CSS",
    description:
      "أكمل موديول HTML و CSS واحصل على أول شهادة ليك. دليل على مهاراتك الأساسية في تطوير الويب.",
    icon: "🎨",
    status: "متاحة",
  },
  {
    title: "شهادة التدريب الكامل",
    description:
      "أكمل الـ 6 شهور كلها، المشاريع، والامتحانات عشان تاخد شهادة إتمام Code JS Academy.",
    icon: "🏆",
    status: "متاحة",
  },
];

export function CertificatesSection() {
  return (
    <section id="certificates" className="border-t border-theme divider-theme py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center fade-in-up">
          <span className="inline-block rounded-full border border-accent-500/20 bg-accent-500/10 px-4 py-1.5 text-sm text-theme-gold">
            الشهادات
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            احصل على{" "}
            <span className="text-gradient-accent">تقديرك</span>
          </h2>
        </div>

        <div className="stagger-children mx-auto grid max-w-2xl gap-6 md:grid-cols-2">
          {certs.map((cert, i) => (
            <div
              key={cert.title}
              className="card-hover card-theme rounded-2xl p-6 text-center"
            >
              <div className="mb-4 text-4xl">{cert.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-theme">{cert.title}</h3>
              <p className="text-sm text-theme-secondary">{cert.description}</p>
              <div className="mt-4 inline-block rounded-full bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-400">
                {cert.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const highlights = [
  {
    number: "01",
    title: "منهج منظم",
    description:
      "برنامج مدروس لمدة 6 شهور بيغطي كل حاجة من أساسيات HTML لحد TypeScript المتقدم، الخوارزميات، والتحضير المهني.",
  },
  {
    number: "02",
    title: "محاضرات مباشرة ومسجلة",
    description:
      "احضر محاضرات تفاعلية مباشرة مع خبراء، أو اتعلم براحتك من مكتبة المحاضرات المسجلة الشاملة.",
  },
  {
    number: "03",
    title: "مشاريع حقيقية",
    description:
      "ابني تطبيقات جاهزة للإنتاج من خلال مهام عملية، اختبارات، امتحانات، ومشاريع بتجهزك لشغل فعلي.",
  },
  {
    number: "04",
    title: "مجتمع تفاعلي",
    description:
      "انضم لمجتمع نشط على ديسكورد. احصل على إرشاد، شارك في تحديات، وكبر مع زملائك المطورين.",
  },
  {
    number: "05",
    title: "تحضير مهني",
    description:
      "احصل على مراجعات احترافية للسيرة الذاتية، تحسين لينكد إن، بناء حساب GitHub، ومقابلات وهمية عشان تشتغل.",
  },
  {
    number: "06",
    title: "شهادات وتقدير",
    description:
      "احصل على شهادات لإتمام HTML/CSS وإتمام التدريب الكامل. وخليك معترف بيك من خلال نظام التكريم وجوائز المجتمع.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative border-t border-theme divider-theme py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-500/[0.02] to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center fade-in-up">
          <span className="inline-block rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300">
            عن Code JS Academy
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            ليه تختار{" "}
            <span className="text-gradient">Code JS Academy</span>؟
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-theme-secondary">
            إحنا مش بس بنعلم كود — إحنا بنحول المبتدئين إلى مطورين واثقين
            وجاهزين لسوق العمل من خلال تجربة تعليمية منظمة ومدعومة بالمجتمع.
          </p>
        </div>

        <div className="stagger-children grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.number}
              className="group card-theme rounded-2xl p-6 transition-all hover:border-brand-500/20"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-lg font-bold text-brand-400">
                {item.number}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-theme">{item.title}</h3>
              <p className="text-sm leading-relaxed text-theme-secondary">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

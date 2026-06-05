"use client";

const topics = [
  { icon: "🌐", name: "HTML", desc: "الوسوم الدلالية، إمكانية الوصول، النماذج، تحسين محركات البحث", duration: "أسبوعين" },
  { icon: "🎨", name: "CSS", desc: "Flexbox, Grid, الرسوم المتحركة، الخصائص المخصصة، التصميم المتجاوب", duration: "3 أسابيع" },
  { icon: "⚡", name: "JavaScript", desc: "ES6+, DOM, closures, promises, async/await, الوحدات", duration: "6 أسابيع" },
  { icon: "📘", name: "TypeScript", desc: "الأنواع، الواجهات، الأدوية، التعدادات، الأنماط المتقدمة", duration: "3 أسابيع" },
  { icon: "📊", name: "هياكل البيانات", desc: "المصفوفات، القوائم المترابطة، الأكوام، الأشجار، الرسوم البيانية", duration: "3 أسابيع" },
  { icon: "🧮", name: "الخوارزميات", desc: "الترتيب، البحث، الاسترجاع، البرمجة الديناميكية، تحليل Big O", duration: "3 أسابيع" },
  { icon: "🔷", name: "OOP", desc: "الكائنات، الوراثة، تعدد الأشكال، التغليف، أنماط التصميم", duration: "أسبوعين" },
  { icon: "💎", name: "SOLID", desc: "المسؤولية الواحدة، Open/Closed, Liskov, فصل الواجهات، قلب التبعيات", duration: "أسبوع" },
  { icon: "🎨", name: "Tailwind CSS", desc: "إطار العمل utility-first، إعدادات مخصصة، تصميم متجاوب", duration: "أسبوعين" },
  { icon: "📱", name: "Bootstrap", desc: "نظام الشبكة، المكونات، الأدوات، التصميم المتجاوب", duration: "أسبوع" },
  { icon: "⚙️", name: "PostCSS", desc: "إضافات PostCSS, Autoprefixer, معالجة CSS", duration: "أسبوع" },
  { icon: "🧪", name: "اختبار الوحدات", desc: "Jest, Vitest, TDD, المحاكاة، تغطية الكود", duration: "أسبوعين" },
  { icon: "🔀", name: "Git & GitHub", desc: "التحكم في الإصدارات، التفرع، الدمج، طلبات السحب", duration: "أسبوعين" },
  { icon: "📖", name: "الكود النظيف", desc: "التسمية، الدوال، التعليقات، معالجة الأخطاء، إعادة الهيكلة", duration: "أسبوع" },
  { icon: "🔄", name: "Agile & Waterfall", desc: "المنهجيات، Scrum، تخطيط السباقات، إدارة المشاريع", duration: "أسبوع" },
  { icon: "🗄️", name: "قواعد البيانات", desc: "SQL, PostgreSQL, نمذجة البيانات، الاستعلامات، الفهرسة", duration: "أسبوعين" },
  { icon: "🤖", name: "AI للمهندسين", desc: "LLMs, هندسة الأوامر، التطوير المدعوم بالذكاء الاصطناعي", duration: "أسبوع" },
  { icon: "💼", name: "التحضير المهني", desc: "كتابة CV, تحسين لينكد إن, حساب GitHub, مقابلات وهمية", duration: "مستمر" },
];

const categories = [
  { title: "الأساسيات", color: "from-brand-500/10 to-brand-600/5", topics: ["HTML", "CSS", "JavaScript", "TypeScript"] },
  { title: "مفاهيم متقدمة", color: "from-accent-500/10 to-accent-600/5", topics: ["هياكل البيانات", "الخوارزميات", "OOP", "SOLID"] },
  { title: "أدوات وأطر عمل", color: "from-blue-500/10 to-blue-600/5", topics: ["Tailwind CSS", "Bootstrap", "PostCSS", "اختبار الوحدات", "Git & GitHub"] },
  { title: "مهارات مهنية", color: "from-purple-500/10 to-purple-600/5", topics: ["الكود النظيف", "Agile & Waterfall", "قواعد البيانات", "AI للمهندسين", "التحضير المهني"] },
];

const learningFormats = [
  { icon: "📝", title: "مهام", desc: "مهام برمجة أسبوعية لترسيخ المفاهيم" },
  { icon: "📊", title: "اختبارات", desc: "اختبارات دورية للتقييم" },
  { icon: "📋", title: "امتحانات", desc: "امتحانات شاملة لقياس التقدم" },
  { icon: "💻", title: "مشاريع", desc: "مشاريع عملية لبناء بورتفوليو" },
  { icon: "📄", title: "واجبات", desc: "واجبات منزلية مع تقييم" },
  { icon: "🧩", title: "حل مشكلات", desc: "تحديات خوارزمية" },
  { icon: "🎤", title: "محاضرات مباشرة", desc: "محاضرات تفاعلية مباشرة" },
  { icon: "📹", title: "محاضرات مسجلة", desc: "محتوى مسجل للتعلم المرن" },
  { icon: "👥", title: "متابعة أسبوعية", desc: "متابعة منتظمة للتقدم" },
  { icon: "🌍", title: "مجتمع", desc: "مجتمع ديسكورد للدعم" },
  { icon: "🎯", title: "تحضير مهني", desc: "CV, لينكد إن, GitHub, مقابلات" },
  { icon: "🏆", title: "شهادات", desc: "تقدير لإتمام الموديولات" },
];

export default function CurriculumPage() {
  return (
    <div className="min-h-screen pt-24 bg-theme">
      {/* Hero */}
      <section className="border-b border-theme divider-theme py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="fade-in-up">
            <h1 className="text-4xl font-bold text-theme sm:text-5xl">
              المنهج{" "}
              <span className="text-gradient">الكامل</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-theme-secondary">
              برنامج شامل لمدة 6 شهور يغطي 18+ تقنية ومهارة مهنية. كل اللي محتاجه
              عشان تطلع من مبتدئ لمطور جاهز لسوق العمل.
            </p>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="border-b border-theme divider-theme py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {categories.map((cat) => (
              <div
                key={cat.title}
                className={`stagger-children rounded-2xl border border-theme-card bg-gradient-to-br ${cat.color} p-6`}
              >
                <h2 className="mb-4 text-lg font-bold text-theme">{cat.title}</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {cat.topics.map((topicName) => {
                    const topic = topics.find((t) => t.name === topicName);
                    return topic ? (
                      <div key={topic.name} className="rounded-xl border border-theme-card bg-theme-card p-4 transition hover:border-theme-secondary">
                        <div className="mb-1 flex items-center gap-2">
                          <span>{topic.icon}</span>
                          <span className="font-semibold text-theme">{topic.name}</span>
                        </div>
                        <div className="mb-1 text-xs text-theme-tertiary">{topic.duration}</div>
                        <div className="text-xs text-theme-secondary">{topic.desc}</div>
                      </div>
                    ) : null;
                  })}
                </div>                </div>
              ))}
          </div>
        </div>
      </section>

      {/* All Topics */}
      <section className="border-b border-theme divider-theme py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-theme sm:text-4xl">
              تفصيل{" "}
              <span className="text-gradient-accent">الموضوعات</span>
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <div
                key={topic.name}
                className="rounded-xl border border-theme-card bg-theme-card p-4 transition hover:border-brand-500/20"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xl">{topic.icon}</span>
                  <div>
                    <div className="font-semibold text-theme">{topic.name}</div>
                    <div className="text-xs text-brand-400">{topic.duration}</div>
                  </div>
                </div>
                <p className="text-xs text-theme-secondary">{topic.desc}</p>                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Learning Format */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-theme sm:text-4xl">
              إزاي{" "}
              <span className="text-gradient">تتعلم</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-theme-secondary">
              أساليب تعلم متعددة تضمنلك إتقان كل مفهوم
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {learningFormats.map((format) => (
              <div
                key={format.title}
                className="rounded-xl border border-theme-card bg-theme-card p-4 text-center transition hover:border-brand-500/20"
              >
                <div className="mb-2 text-2xl">{format.icon}</div>
                <div className="text-sm font-semibold text-theme">{format.title}</div>
                <div className="text-xs text-theme-tertiary">{format.desc}</div>                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

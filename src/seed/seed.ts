import { PrismaClient } from "../../generated/prisma";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 بذرة قاعدة البيانات...");

  // Admin user
  const adminPassword = await hash("Anklm123AmjadQqAhdMCQ852@@!*&", 12);
  const admin = await prisma.user.upsert({
    where: { email: "Admin_Amjad_Ahd@codejs.com" },
    update: {},
    create: {
      name: "Amjad Ahd",
      email: "Admin_Amjad_Ahd@codejs.com",
      password: adminPassword,
      role: "admin",
    },
  });
  console.log(`✅ تم إنشاء الأدمن: ${admin.email}`);

  // Services
  const services = [
    { title: "اتعلم أساسيات البرمجة", description: "الخدمة الرئيسية الشغالة دلوقتي! HTML, CSS, JavaScript, TypeScript — منهج منظم لمدة 6 شهور بمحاضرات مباشرة، مشاريع حقيقية، ومتابعة أسبوعية. من الصفر للجهزية لسوق العمل.", status: "شغال", icon: "💻", order: 1 },
    { title: "ابني موقع وتطبيقك الخاص", description: "خلينا نبني مشروعك الجاي. من مواقع الهبوط البسيطة لتطبيقات ويب كاملة، إحنا بنقدم حلول جاهزة للإنتاج بإحترافية.", status: "قريباً", icon: "🚀", order: 2 },
    { title: "مكتبة كورسات مسجلة", description: "مكتبة ضخمة من الكورسات المسجلة عالية الجودة بتغطي مواضيع متقدمة في البرمجة والتطوير. اتعلم براحتك وبوصول مدى الحياة.", status: "قريباً", icon: "📹", order: 3 },
    { title: "اتعلم برمجة من كتب مصرية", description: "مفاهيم البرمجة المهمة بشرح بالعربية المصرية وبأحسن المراجع المحلية. عشان الكود يبقى سهل ومفهوم لكل الناس.", status: "قريباً", icon: "📚", order: 4 },
    { title: "صمم تيشيرت أو كوب برمجة", description: "عبر عن شخصيتك البرمجية مع تيشيرتات وأكواب مخصصة بتصميمات programming فريدة. أي ستيل تختاره، إحنا بنصنعهولك.", status: "قريباً", icon: "👕", order: 5 },
  ];
  for (const s of services) {
    await prisma.service.create({ data: s });
  }
  console.log(`✅ ${services.length} خدمة تم إنشاؤها`);

  // Training Round
  const round = await prisma.trainingRound.create({
    data: {
      name: "الدفعة الأولى",
      slug: "round-one",
      description: "أول دفعة تدريبية. انضم للدفعة الأولى من المطورين المستقبليين وشارك في بناء المجتمع من البداية. 6 شهور من التدريب المكثف في البرمجة.",
      status: "active",
      isCurrent: true,
      priceEGP: 1100,
      priceUSD: 30,
      order: 1,
    },
  });
  console.log(`✅ تم إنشاء الدفعة: ${round.name}`);

  // Student Highlights
  const highlights = [
    { studentName: "أحمد محمد", category: "top_student", description: "أفضل مؤدي في كل الفئات", rank: "الأول", roundId: round.id },
    { studentName: "سارة حسن", category: "community_contributor", description: "أفضل مساهم مجتمعي", rank: "الأول", roundId: round.id },
    { studentName: "عمر علي", category: "top_quiz", description: "أعلى درجات في الاختبارات", rank: "الأول", roundId: round.id },
    { studentName: "مريم خالد", category: "top_task", description: "أداء متميز في المهام", rank: "الأول", roundId: round.id },
  ];
  for (const h of highlights) {
    await prisma.studentHighlight.create({ data: h });
  }
  console.log(`✅ ${highlights.length} أبرز الأحداث تم إنشاؤها`);

  // Testimonials
  const testimonials = [
    { name: "أحمد محمد", role: "Frontend Developer", content: "Code JS Academy غيرت مسيرتي المهنية تماماً. المنهج المنظم والمشاريع العملية أدوني الثقة إني أتقدم لأول شغل developer. أحسن قرار في حياتي.", rating: 5, featured: true, order: 1 },
    { name: "سارة حسن", role: "Full Stack Developer", content: "المجتمع ده لا يُعقَل. المحاضرات المباشرة، المتابعة الأسبوعية، والإرشاد كلها فرقت جداً. رحت من معرفش حاجة لبناء تطبيقات كاملة.", rating: 5, featured: true, order: 2 },
    { name: "عمر علي", role: "Junior Developer", content: "اللي بيُميّز Code JS هو التحضير المهني. مراجعات السيرة الذاتية، تحسين لينكد إن، والمقابلات الوهمية كانوا game-changer.", rating: 5, featured: true, order: 3 },
    { name: "مريم خالد", role: "Software Engineer", content: "نظام التكريم والتقدير خلاني متحمس طوال ال 6 شهور. إني أتكرّم كأفضل طالب دفعني إني أدي أحسن ما عندي كل أسبوع.", rating: 5, featured: true, order: 4 },
  ];
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log(`✅ ${testimonials.length} شهادة تم إنشاؤها`);

  // FAQ
  const faqs = [
    { question: "إيه هي Code JS Academy؟", answer: "Code JS Academy هي أكاديمية برمجة متميزة بتقدم برنامج تدريبي منظم لمدة 6 شهور، مصمم عشان ياخدك من الصفر للجهزية لسوق العمل.", category: "general", order: 1 },
    { question: "البرنامج ده مناسب لمين؟", answer: "البرنامج مصمم للمبتدئين تماماً اللي معندهمش أي خبرة في البرمجة، وبرضه للناس اللي عندهم أساسيات بسيطة وعايزين يبنوا أساس مهني قوي.", category: "general", order: 2 },
    { question: "مدة البرنامج قد إيه؟", answer: "البرنامج الكامل بيمتد لـ 6 شهور بمنهج منظم. بيشمل محاضرات مباشرة، محتوى مسجل، مهام أسبوعية، اختبارات، امتحانات، ومشاريع.", category: "training", order: 3 },
    { question: "إيه التقنيات اللي هتعلمها؟", answer: "HTML، CSS، JavaScript، TypeScript، هياكل البيانات، الخوارزميات، OOP، SOLID، Git & GitHub، اختبار الوحدات، Tailwind CSS، Bootstrap، PostCSS، الكود النظيف، Agile، Waterfall، قواعد البيانات، AI للمهندسين، ومهارات مهنية.", category: "training", order: 4 },
    { question: "هل بناخد شهادة؟", answer: "أكيد! هتاخد شهادات لإتمام موديول HTML & CSS، وشهادة إتمام التدريب الكامل.", category: "training", order: 5 },
    { question: "أزاي أدفع؟", answer: "بنقبل انستا باي وكاش واليت للطلاب المصريين. للطلاب بره مصر، بنوفر طرق دفع آمنة أونلاين.", category: "pricing", order: 6 },
    { question: "في دعم مجتمعي؟", answer: "طبعاً! هتاخد وصول لمجتمع ديسكورد النشط مع مرشدين، مساعدين، وزملاء. عندنا متابعة أسبوعية وجلسات أسئلة وأجوبة مباشرة.", category: "community", order: 7 },
    { question: "لو فاتتني محاضرة مباشرة؟", answer: "كل المحاضرات المباشرة بتتسجل وتتبقي متاحة للطلاب. تقدر تشوفها في أي وقت.", category: "training", order: 8 },
  ];
  for (const f of faqs) {
    await prisma.fAQ.create({ data: f });
  }
  console.log(`✅ ${faqs.length} سؤال شائع تم إنشاؤه`);

  // Curriculum Topics
  const topics = [
    { title: "HTML", description: "الوسوم الدلالية، إمكانية الوصول، النماذج، أساسيات SEO", icon: "🌐", category: "core", order: 1, duration: "أسبوعين" },
    { title: "CSS", description: "Flexbox, Grid, الرسوم المتحركة، التصميم المتجاوب، المتغيرات", icon: "🎨", category: "core", order: 2, duration: "3 أسابيع" },
    { title: "JavaScript", description: "ES6+, التعامل مع DOM, async/await, الوحدات, closures", icon: "⚡", category: "core", order: 3, duration: "6 أسابيع" },
    { title: "TypeScript", description: "الأنواع، الأدوية، الواجهات، الأنماط المتقدمة", icon: "📘", category: "core", order: 4, duration: "3 أسابيع" },
    { title: "هياكل البيانات", description: "المصفوفات، القوائم المترابطة، الأشجار، الرسوم البيانية", icon: "📊", category: "advanced", order: 5, duration: "3 أسابيع" },
    { title: "الخوارزميات", description: "الترتيب، البحث، البرمجة الديناميكية، تحليل التعقيد", icon: "🧮", category: "advanced", order: 6, duration: "3 أسابيع" },
    { title: "OOP", description: "الكائنات، الوراثة، تعدد الأشكال، أنماط التصميم", icon: "🔷", category: "advanced", order: 7, duration: "أسبوعين" },
    { title: "SOLID", description: "المسؤولية الواحدة، open/closed, Liskov, فصل الواجهات, قلب التبعيات", icon: "💎", category: "advanced", order: 8, duration: "أسبوع" },
    { title: "Git & GitHub", description: "التحكم في الإصدارات، التفرع، التعاون، أساسيات CI/CD", icon: "🔀", category: "tools", order: 9, duration: "أسبوعين" },
    { title: "اختبار الوحدات", description: "Jest, Vitest, TDD, المحاكاة, تغطية الاختبارات", icon: "🧪", category: "tools", order: 10, duration: "أسبوعين" },
    { title: "Tailwind CSS", description: "Utility-first, أنظمة تصميم مخصصة, أنماط متجاوبة", icon: "🎨", category: "tools", order: 11, duration: "أسبوعين" },
    { title: "Bootstrap", description: "المكونات, نظام الشبكة, التخطيطات المتجاوبة", icon: "📱", category: "tools", order: 12, duration: "أسبوع" },
    { title: "PostCSS", description: "إضافات PostCSS, Autoprefixer, معالجة CSS", icon: "⚙️", category: "tools", order: 13, duration: "أسبوع" },
    { title: "الكود النظيف", description: "القراءة، التسمية، إعادة الهيكلة، مراجعات الكود", icon: "📖", category: "career", order: 14, duration: "أسبوع" },
    { title: "Agile & Waterfall", description: "المنهجيات، تخطيط السباقات، إدارة المشاريع", icon: "🔄", category: "career", order: 15, duration: "أسبوع" },
    { title: "قواعد البيانات", description: "SQL, PostgreSQL, نمذجة البيانات، الفهرسة", icon: "🗄️", category: "career", order: 16, duration: "أسبوعين" },
    { title: "AI للمهندسين", description: "LLMs, هندسة الأوامر، التطوير المدعوم بالذكاء الاصطناعي", icon: "🤖", category: "career", order: 17, duration: "أسبوع" },
  ];
  for (const t of topics) {
    await prisma.curriculumTopic.create({ data: t });
  }
  console.log(`✅ ${topics.length} موضوع تعليمي تم إنشاؤه`);

  // Certificates
  const certs = [
    { title: "شهادة HTML & CSS", description: "أكمل موديول HTML و CSS واحصل على أول شهادة ليك. دليل على مهاراتك الأساسية في تطوير الويب.", type: "html_css", available: true },
    { title: "شهادة التدريب الكامل", description: "أكمل الـ 6 شهور كلها، المشاريع، والامتحانات عشان تاخد شهادة إتمام Code JS Academy.", type: "full_training", available: true },
  ];
  for (const c of certs) {
    await prisma.certificate.create({ data: c });
  }
  console.log(`✅ ${certs.length} شهادة تم إنشاؤها`);

  // Social Links (with real URLs)
  const socials = [
    { name: "فيسبوك", url: "https://www.facebook.com/profile.php?id=61582055140693", icon: "facebook", order: 1 },
    { name: "لينكد إن", url: "https://www.linkedin.com/company/code1-js", icon: "linkedin", order: 2 },
    { name: "يوتيوب", url: "https://www.youtube.com/@MegoCode", icon: "youtube", order: 3 },
    { name: "تليجرام", url: "https://t.me/Code1_JS", icon: "telegram", order: 4 },
    { name: "واتساب", url: "https://wa.me/201030615045", icon: "whatsapp", order: 5 },
  ];
  for (const s of socials) {
    await prisma.socialLink.create({ data: s });
  }
  console.log(`✅ ${socials.length} رابط اجتماعي تم إنشاؤه`);

  // Announcement
  await prisma.announcement.create({
    data: {
      title: "🎉 التسجيل مفتوح في الدفعة الأولى!",
      content: "التسجيل في الدفعة الأولى من Code JS Academy مفتوح دلوقتي. أماكن محدودة. انضم لأول دفعة وشكل مستقبل المجتمع.",
      type: "success",
      active: true,
    },
  });
  console.log("✅ تم إنشاء الإعلان");

  // Settings
  const settings = [
    { key: "hero_headline", value: "من الصفر للجهزية لسوق العمل كمطور في 6 شهور" },
    { key: "hero_subheadline", value: "أتقن HTML، CSS، JavaScript، TypeScript، والتطوير الحديث من خلال تدريب منظم، محاضرات مباشرة، مشاريع حقيقية، وتحضير مهني مركز." },
    { key: "current_round", value: "الدفعة الأولى" },
    { key: "price_egp", value: "1100" },
    { key: "price_usd", value: "30" },
    { key: "original_price_egp", value: "2000" },
    { key: "original_price_usd", value: "55" },
    { key: "discount_percentage", value: "45" },
    { key: "phone_number", value: "01030615045" },
    { key: "whatsapp_url", value: "https://wa.me/201030615045" },
    { key: "contact_email", value: "amjadibrahim218@gmail.com" },
    { key: "curriculum_pdf_url", value: "" },  // Admin can set this from dashboard
  ];
  for (const s of settings) {
    await prisma.setting.create({ data: s });
  }
  console.log(`✅ ${settings.length} إعداد تم إنشاؤه`);

  console.log("\n🎉 تمت عملية البذرة بنجاح!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

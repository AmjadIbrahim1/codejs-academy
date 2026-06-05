"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { AdminCourseSections } from "@/components/admin-course-sections";

type Tab = "services" | "rounds" | "testimonials" | "faq" | "curriculum" | "announcements" | "certificates" | "social" | "users" | "courseSections" | "customerReviews" | "studentReviews";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("services");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/");
    }
  }, [status, session, router]);

  if (status !== "authenticated" || session?.user?.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center pt-16">
        <div className="text-dark-400">جاري التحميل...</div>
      </div>
    );
  }

  const tabs = [
    { id: "services" as Tab, label: "الخدمات" },
    { id: "rounds" as Tab, label: "الدورات" },
    { id: "testimonials" as Tab, label: "آراء الطلاب" },
    { id: "faq" as Tab, label: "الأسئلة" },
    { id: "curriculum" as Tab, label: "المنهج" },
    { id: "announcements" as Tab, label: "الإعلانات" },
    { id: "certificates" as Tab, label: "الشهادات" },
    { id: "social" as Tab, label: "روابط التواصل" },
    { id: "users" as Tab, label: "المستخدمين" },
    { id: "courseSections" as Tab, label: "أقسام التكريم" },
    { id: "customerReviews" as Tab, label: "صور العملاء" },
    { id: "studentReviews" as Tab, label: "صور الطلاب" },
  ];

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-theme">لوحة التحكم</h1>
          <p className="text-sm text-theme-secondary">
            إدارة كل محتوى Code JS Academy
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-brand-500 text-white"
                  : "bg-white/5 text-dark-300 hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-6">
          {activeTab === "services" && <ServicesManager />}
          {activeTab === "rounds" && <RoundsManager />}
          {activeTab === "testimonials" && <TestimonialsManager />}
          {activeTab === "faq" && <FAQManager />}
          {activeTab === "curriculum" && <CurriculumManager />}
          {activeTab === "announcements" && <AnnouncementsManager />}
          {activeTab === "certificates" && <CertificatesManager />}
          {activeTab === "social" && <SocialManager />}
          {activeTab === "users" && <UsersManager />}
          {activeTab === "courseSections" && <AdminCourseSections />}
          {activeTab === "customerReviews" && <ReviewImagesManager type="customer" title="صور العملاء" />}
          {activeTab === "studentReviews" && <ReviewImagesManager type="student" title="صور الطلاب" />}
        </div>
      </div>
    </div>
  );
}

// ─── Services Manager ───

function ServicesManager() {
  const { data: services, refetch } = api.service.getAll.useQuery();
  const createService = api.service.create.useMutation({ onSuccess: () => refetch() });
  const deleteService = api.service.delete.useMutation({ onSuccess: () => refetch() });
  const [form, setForm] = useState({ title: "", description: "", status: "متاح", icon: "" });

  return (
    <div>        <h2 className="mb-4 text-lg font-bold text-theme">الخدمات</h2>
      <div className="mb-6 grid gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:grid-cols-4">
        <input placeholder="العنوان" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="rounded-lg border border-theme-input bg-theme-input px-3 py-2 text-sm text-theme placeholder:text-theme-tertiary" />
        <input placeholder="الوصف" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="rounded-lg border border-theme-input bg-theme-input px-3 py-2 text-sm text-theme placeholder:text-theme-tertiary" />
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="rounded-lg border border-theme-input bg-theme-input px-3 py-2 text-sm text-theme">
          <option>متاح</option>
          <option>قريباً</option>
          <option>Beta</option>
          <option>قيد التطوير</option>
        </select>
        <button onClick={() => { createService.mutate(form); setForm({ title: "", description: "", status: "متاح", icon: "" }); }}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">
          إضافة خدمة
        </button>
      </div>
      <div className="space-y-2">
        {services?.map((s) => (
          <div key={s.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3">
            <div>
              <div className="text-sm font-medium text-theme">{s.title}</div>
              <div className="text-xs text-dark-500">{s.status}</div>
            </div>
            <button onClick={() => deleteService.mutate({ id: s.id })}
              className="rounded-lg bg-red-500/10 px-3 py-1 text-xs text-red-400 hover:bg-red-500/20">
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Rounds Manager ───

function RoundsManager() {
  const { data: rounds, refetch } = api.round.getAll.useQuery();
  const createRound = api.round.create.useMutation({ onSuccess: () => refetch() });
  const updateRound = api.round.update.useMutation({ onSuccess: () => refetch() });
  const deleteRound = api.round.delete.useMutation({ onSuccess: () => refetch() });
  const setCurrent = api.round.setCurrent.useMutation({ onSuccess: () => refetch() });
  const [form, setForm] = useState({ name: "", description: "", status: "active", isCurrent: false });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSaveRound = () => {
    const slug = form.name
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\u0600-\u06FF-]/g, "")
      .toLowerCase()
      || Date.now().toString();

    if (editingId) {
      // Update existing round
      updateRound.mutate({ id: editingId, ...form, slug });
      if (form.isCurrent) {
        setCurrent.mutate({ id: editingId });
      }
    } else {
      // Create new round
      createRound.mutate({ ...form, slug }, {
        onSuccess: (newRound) => {
          if (form.isCurrent) {
            setCurrent.mutate({ id: newRound.id });
          }
        },
      });
    }

    resetForm();
  };

  const startEditing = (round: NonNullable<typeof rounds>[number]) => {
    setEditingId(round.id);
    setForm({
      name: round.name,
      description: round.description ?? "",
      status: round.status ?? "active",
      isCurrent: round.isCurrent ?? false,
    });
  };

  const resetForm = () => {
    setForm({ name: "", description: "", status: "active", isCurrent: false });
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الدورة؟")) {
      deleteRound.mutate({ id });
      if (editingId === id) resetForm();
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold text-theme">الدورات التدريبية</h2>

      {/* Form */}
      <div className="mb-6 grid gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:grid-cols-5">
        <input placeholder="الاسم" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-lg border border-theme-input bg-theme-input px-3 py-2 text-sm text-theme placeholder:text-theme-tertiary" />
        <input placeholder="الوصف" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="rounded-lg border border-theme-input bg-theme-input px-3 py-2 text-sm text-theme placeholder:text-theme-tertiary" />
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="rounded-lg border border-theme-input bg-theme-input px-3 py-2 text-sm text-theme">
          <option value="active">نشط</option>
          <option value="upcoming">قادم</option>
          <option value="completed">مكتمل</option>
        </select>
        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-theme-input bg-theme-input px-3 py-2 text-sm text-theme">
          <input
            type="checkbox"
            checked={form.isCurrent}
            onChange={(e) => setForm({ ...form, isCurrent: e.target.checked })}
            className="h-4 w-4 rounded border-white/20 bg-white/10 text-brand-500 focus:ring-brand-500"
          />
          <span>حالية</span>
        </label>
        <div className="flex gap-2">
          <button onClick={handleSaveRound}
            className="flex-1 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">
            {editingId ? "حفظ التعديلات" : "إضافة دورة"}
          </button>
          {editingId && (
            <button onClick={resetForm}
              className="rounded-lg bg-white/10 px-4 py-2 text-sm text-theme-secondary hover:bg-white/20">
              إلغاء
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="space-y-2">
        {rounds?.map((r) => (
          <div key={r.id}
            className={`flex items-center justify-between rounded-lg border px-4 py-3 transition cursor-pointer ${
              editingId === r.id
                ? "border-brand-500/40 bg-brand-500/10"
                : "border-white/10 bg-white/[0.02] hover:border-white/20"
            }`}
            onClick={() => startEditing(r)}
          >
            <div className="flex items-center gap-3">
              {r.isCurrent && (
                <span className="h-2 w-2 animate-pulse rounded-full bg-brand-400" title="الدفعة الحالية" />
              )}
              <div>
                <div className="text-sm font-medium text-theme">
                  {r.name}
                  {r.isCurrent && <span className="mr-2 text-xs text-brand-400">(حالية)</span>}
                </div>
                <div className="text-xs text-dark-500">{r.slug} — {r.status}</div>
              </div>
            </div>
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              {!r.isCurrent && (
                <button onClick={() => setCurrent.mutate({ id: r.id })}
                  className="rounded-lg bg-brand-500/10 px-3 py-1 text-xs text-brand-400 hover:bg-brand-500/20">
                  تعيين كحالية
                </button>
              )}
              <button onClick={() => handleDelete(r.id)}
                className="rounded-lg bg-red-500/10 px-3 py-1 text-xs text-red-400 hover:bg-red-500/20">
                حذف
              </button>
            </div>
          </div>
        ))}
        {(!rounds || rounds.length === 0) && (
          <p className="py-8 text-center text-sm text-theme-tertiary">لا توجد دورات بعد</p>
        )}
      </div>
    </div>
  );
}

// ─── Testimonials Manager ───

function TestimonialsManager() {
  const { data: testimonials, refetch } = api.testimonial.getAll.useQuery();
  const createTestimonial = api.testimonial.create.useMutation({ onSuccess: () => refetch() });
  const deleteTestimonial = api.testimonial.delete.useMutation({ onSuccess: () => refetch() });
  const [form, setForm] = useState({ name: "", content: "" });

  return (
    <div>        <h2 className="mb-4 text-lg font-bold text-theme">آراء الطلاب</h2>
      <div className="mb-6 grid gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:grid-cols-3">
        <input placeholder="الاسم" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-lg border border-theme-input bg-theme-input px-3 py-2 text-sm text-theme placeholder:text-theme-tertiary" />
        <textarea placeholder="المحتوى" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="rounded-lg border border-theme-input bg-theme-input px-3 py-2 text-sm text-theme placeholder:text-theme-tertiary" />
        <button onClick={() => { createTestimonial.mutate(form); setForm({ name: "", content: "" }); }}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">
          إضافة رأي
        </button>
      </div>
      <div className="space-y-2">
        {testimonials?.map((t) => (
          <div key={t.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3">
            <div>
              <div className="text-sm font-medium text-theme">{t.name}</div>
              <div className="text-xs text-dark-500">{t.content.slice(0, 80)}...</div>
            </div>
            <button onClick={() => deleteTestimonial.mutate({ id: t.id })}
              className="rounded-lg bg-red-500/10 px-3 py-1 text-xs text-red-400 hover:bg-red-500/20">
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── FAQ Manager ───

function FAQManager() {
  const { data: faqs, refetch } = api.faq.getAll.useQuery();
  const createFaq = api.faq.create.useMutation({ onSuccess: () => refetch() });
  const deleteFaq = api.faq.delete.useMutation({ onSuccess: () => refetch() });
  const [form, setForm] = useState({ question: "", answer: "" });

  return (
    <div>        <h2 className="mb-4 text-lg font-bold text-theme">الأسئلة الشائعة</h2>
      <div className="mb-6 grid gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:grid-cols-3">
        <input placeholder="السؤال" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })}
          className="rounded-lg border border-theme-input bg-theme-input px-3 py-2 text-sm text-theme placeholder:text-theme-tertiary" />
        <textarea placeholder="الإجابة" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })}
          className="rounded-lg border border-theme-input bg-theme-input px-3 py-2 text-sm text-theme placeholder:text-theme-tertiary" />
        <button onClick={() => { createFaq.mutate(form); setForm({ question: "", answer: "" }); }}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">
          إضافة سؤال
        </button>
      </div>
      <div className="space-y-2">
        {faqs?.map((f) => (
          <div key={f.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3">
            <div>
              <div className="text-sm font-medium text-theme">{f.question}</div>
              <div className="text-xs text-dark-500">{f.answer.slice(0, 80)}...</div>
            </div>
            <button onClick={() => deleteFaq.mutate({ id: f.id })}
              className="rounded-lg bg-red-500/10 px-3 py-1 text-xs text-red-400 hover:bg-red-500/20">
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Curriculum Manager ───

function CurriculumManager() {
  const { data: topics, refetch } = api.curriculum.getAll.useQuery();
  const createTopic = api.curriculum.create.useMutation({ onSuccess: () => refetch() });
  const deleteTopic = api.curriculum.delete.useMutation({ onSuccess: () => refetch() });
  const [form, setForm] = useState({ title: "", description: "", category: "core", duration: "" });

  // Curriculum PDF URL management
  const { data: settings, refetch: refetchSettings } = api.setting.getAll.useQuery();
  const updateSetting = api.setting.upsert.useMutation({
    onSuccess: () => {
      refetchSettings();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    },
  });
  const [pdfUrl, setPdfUrl] = useState("");
  const [saved, setSaved] = useState(false);

  // Load current PDF URL from settings
  useEffect(() => {
    const setting = settings?.find((s) => s.key === "curriculum_pdf_url");
    if (setting) setPdfUrl(setting.value);
  }, [settings]);

  return (
    <div>        <h2 className="mb-4 text-lg font-bold text-theme">المنهج</h2>

      {/* Curriculum PDF Upload */}
      <div className="mb-6 rounded-xl border border-brand-500/20 bg-brand-500/5 p-4">
        <h3 className="mb-3 text-sm font-semibold text-theme">📄 رابط منهج PDF</h3>
        <p className="mb-3 text-xs text-dark-400">
          ضع رابط تحميل PDF الخاص بالمنهج الكامل. الطالب هيشوف زر التحميل في صفحة المنهج.
        </p>
        <div className="flex gap-3">
          <input
            placeholder="https://example.com/curriculum.pdf — رابط ملف PDF"
            value={pdfUrl}
            onChange={(e) => setPdfUrl(e.target.value)}
            className="flex-1 rounded-lg border border-theme-input bg-theme-input px-3 py-2 text-sm text-theme placeholder:text-theme-tertiary"
          />
          <button
            onClick={() => updateSetting.mutate({ key: "curriculum_pdf_url", value: pdfUrl })}
            disabled={updateSetting.isPending}
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${
              saved
                ? "bg-green-500"
                : "bg-brand-500 hover:bg-brand-600"
            } disabled:opacity-50`}
          >
            {updateSetting.isPending ? "جاري الحفظ..." : saved ? "✅ تم الحفظ" : "حفظ الرابط"}
          </button>
        </div>
      </div>

      {/* Add Topic */}
      <div className="mb-6 grid gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:grid-cols-5">
        <input placeholder="العنوان" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="rounded-lg border border-theme-input bg-theme-input px-3 py-2 text-sm text-theme placeholder:text-theme-tertiary" />
        <input placeholder="الوصف" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="rounded-lg border border-theme-input bg-theme-input px-3 py-2 text-sm text-theme placeholder:text-theme-tertiary" />
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="rounded-lg border border-theme-input bg-theme-input px-3 py-2 text-sm text-theme">
          <option value="core">أساسي</option>
          <option value="advanced">متقدم</option>
          <option value="tools">أدوات</option>
          <option value="career">مهني</option>
        </select>
        <input placeholder="المدة" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
          className="rounded-lg border border-theme-input bg-theme-input px-3 py-2 text-sm text-theme placeholder:text-theme-tertiary" />
        <button onClick={() => { createTopic.mutate(form); setForm({ title: "", description: "", category: "core", duration: "" }); }}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">
          إضافة موضوع
        </button>
      </div>
      <div className="space-y-2">
        {topics?.map((t) => (
          <div key={t.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3">
            <div>
              <div className="text-sm font-medium text-theme">{t.title}</div>
              <div className="text-xs text-dark-500">{t.category} — {t.duration ?? "غير محدد"}</div>
            </div>
            <button onClick={() => deleteTopic.mutate({ id: t.id })}
              className="rounded-lg bg-red-500/10 px-3 py-1 text-xs text-red-400 hover:bg-red-500/20">
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Announcements Manager ───

function AnnouncementsManager() {
  const { data: announcements, refetch } = api.announcement.getAll.useQuery();
  const createAnnouncement = api.announcement.create.useMutation({ onSuccess: () => refetch() });
  const deleteAnnouncement = api.announcement.delete.useMutation({ onSuccess: () => refetch() });
  const [form, setForm] = useState({ title: "", content: "", type: "info" });

  return (
    <div>        <h2 className="mb-4 text-lg font-bold text-theme">الإعلانات</h2>
      <div className="mb-6 grid gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:grid-cols-4">
        <input placeholder="العنوان" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="rounded-lg border border-theme-input bg-theme-input px-3 py-2 text-sm text-theme placeholder:text-theme-tertiary" />
        <textarea placeholder="المحتوى" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="rounded-lg border border-theme-input bg-theme-input px-3 py-2 text-sm text-theme placeholder:text-theme-tertiary" />
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="rounded-lg border border-theme-input bg-theme-input px-3 py-2 text-sm text-theme">
          <option value="info">معلومات</option>
          <option value="warning">تحذير</option>
          <option value="success">نجاح</option>
          <option value="event">حدث</option>
        </select>
        <button onClick={() => { createAnnouncement.mutate(form); setForm({ title: "", content: "", type: "info" }); }}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">
          إضافة إعلان
        </button>
      </div>
      <div className="space-y-2">
        {announcements?.map((a) => (
          <div key={a.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3">
            <div>
              <div className="text-sm font-medium text-theme">{a.title}</div>
              <div className="text-xs text-dark-500">{a.type} — {a.active ? "نشط" : "غير نشط"}</div>
            </div>
            <button onClick={() => deleteAnnouncement.mutate({ id: a.id })}
              className="rounded-lg bg-red-500/10 px-3 py-1 text-xs text-red-400 hover:bg-red-500/20">
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Certificates Manager ───

function CertificatesManager() {
  const { data: certificates, refetch } = api.certificate.getAll.useQuery();
  const createCert = api.certificate.create.useMutation({ onSuccess: () => refetch() });
  const deleteCert = api.certificate.delete.useMutation({ onSuccess: () => refetch() });
  const [form, setForm] = useState({ title: "", description: "", type: "html_css" });

  return (
    <div>        <h2 className="mb-4 text-lg font-bold text-theme">الشهادات</h2>
      <div className="mb-6 grid gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:grid-cols-4">
        <input placeholder="العنوان" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="rounded-lg border border-theme-input bg-theme-input px-3 py-2 text-sm text-theme placeholder:text-theme-tertiary" />
        <input placeholder="الوصف" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="rounded-lg border border-theme-input bg-theme-input px-3 py-2 text-sm text-theme placeholder:text-theme-tertiary" />
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="rounded-lg border border-theme-input bg-theme-input px-3 py-2 text-sm text-theme">
          <option value="html_css">HTML & CSS</option>
          <option value="full_training">التدريب الكامل</option>
        </select>
        <button onClick={() => { createCert.mutate(form); setForm({ title: "", description: "", type: "html_css" }); }}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">
          إضافة شهادة
        </button>
      </div>
      <div className="space-y-2">
        {certificates?.map((c) => (
          <div key={c.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3">
            <div>
              <div className="text-sm font-medium text-theme">{c.title}</div>
              <div className="text-xs text-dark-500">{c.type}</div>
            </div>
            <button onClick={() => deleteCert.mutate({ id: c.id })}
              className="rounded-lg bg-red-500/10 px-3 py-1 text-xs text-red-400 hover:bg-red-500/20">
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Review Images Manager ───

function ReviewImagesManager({ type, title }: { type: "customer" | "student"; title: string }) {
  const { data: images, refetch } = api.reviewImage.getByType.useQuery({ type });
  const createMutation = api.reviewImage.create.useMutation({ onSuccess: () => refetch() });
  const deleteMutation = api.reviewImage.delete.useMutation({ onSuccess: () => refetch() });
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error ?? "فشل الرفع");
        return;
      }

      const { url } = await res.json();
      await createMutation.mutateAsync({ imageUrl: url, type });
    } catch (err) {
      alert("فشل الرفع");
      console.error(err);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold text-theme">{title}</h2>

      {/* Upload */}
      <div className="mb-6 rounded-xl border border-dashed border-brand-500/30 bg-brand-500/[0.03] p-6 text-center">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-50">
          {uploading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              جاري الرفع...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              إضافة صورة
            </span>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
        <p className="mt-2 text-xs text-theme-tertiary">JPG, PNG, WebP, GIF — حد أقصى 5 MB</p>
      </div>

      {/* Image Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images?.map((img) => (
          <div key={img.id} className="group relative overflow-hidden rounded-xl border border-theme-card bg-theme-card">
            <img
              src={img.imageUrl}
              alt={img.caption ?? "صورة"}
              className="h-48 w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 opacity-0 transition group-hover:opacity-100">
              <button
                onClick={() => deleteMutation.mutate({ id: img.id })}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                حذف
              </button>
            </div>
            <div className="border-t border-theme-card bg-theme-card px-3 py-2">
              <p className="truncate text-xs text-theme-tertiary">#{img.order} — {new Date(img.createdAt).toLocaleDateString("ar-EG")}</p>
            </div>
          </div>
        ))}
        {(!images || images.length === 0) && (
          <p className="col-span-full py-8 text-center text-sm text-theme-tertiary">لا توجد صور بعد. ارفع أول صورة!</p>
        )}
      </div>
    </div>
  );
}

// ─── Social Links Manager ───

function SocialManager() {
  const { data: links, refetch } = api.social.getAll.useQuery();
  const createLink = api.social.create.useMutation({ onSuccess: () => refetch() });
  const deleteLink = api.social.delete.useMutation({ onSuccess: () => refetch() });
  const [form, setForm] = useState({ name: "", url: "", icon: "link" });

  return (
    <div>        <h2 className="mb-4 text-lg font-bold text-theme">روابط التواصل</h2>
      <div className="mb-6 grid gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:grid-cols-4">
        <input placeholder="الاسم" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-lg border border-theme-input bg-theme-input px-3 py-2 text-sm text-theme placeholder:text-theme-tertiary" />
        <input placeholder="الرابط" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })}
          className="rounded-lg border border-theme-input bg-theme-input px-3 py-2 text-sm text-theme placeholder:text-theme-tertiary" />
        <input placeholder="الأيقونة" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}
          className="rounded-lg border border-theme-input bg-theme-input px-3 py-2 text-sm text-theme placeholder:text-theme-tertiary" />
        <button onClick={() => { createLink.mutate(form); setForm({ name: "", url: "", icon: "link" }); }}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">
          إضافة رابط
        </button>
      </div>
      <div className="space-y-2">
        {links?.map((l) => (
          <div key={l.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3">
            <div>
              <div className="text-sm font-medium text-theme">{l.name}</div>
              <div className="text-xs text-dark-500">{l.url}</div>
            </div>
            <button onClick={() => deleteLink.mutate({ id: l.id })}
              className="rounded-lg bg-red-500/10 px-3 py-1 text-xs text-red-400 hover:bg-red-500/20">
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Users Manager ───

function UsersManager() {
  const { data: users, refetch } = api.auth.getUsers.useQuery();
  const updateRole = api.auth.updateRole.useMutation({ onSuccess: () => refetch() });

  return (
    <div>        <h2 className="mb-4 text-lg font-bold text-theme">المستخدمين</h2>
      <div className="space-y-2">
        {users?.map((u) => (
          <div key={u.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3">
            <div>
              <div className="text-sm font-medium text-theme">{u.name ?? "غير محدد"}</div>
              <div className="text-xs text-dark-500">{u.email} — الدور: {u.role === "admin" ? "أدمن" : "طالب"}</div>
            </div>
            {u.role !== "admin" && (
              <button onClick={() => updateRole.mutate({ userId: u.id, role: "admin" })}
                className="rounded-lg bg-accent-500/10 px-3 py-1 text-xs text-accent-400 hover:bg-accent-500/20">
                تعيين أدمن
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

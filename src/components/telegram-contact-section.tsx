"use client";

import { useState, type FormEvent } from "react";

export function TelegramContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg("من فضلك املأ جميع الحقول المطلوبة");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      // Send to server-side API (keeps bot token secure on the server)
      const res = await fetch("/api/contact-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "فشل الإرسال");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Send error:", err);
      setErrorMsg("فشل الإرسال. حاول تاني.");
      setStatus("error");
    }
  };

  return (
    <section id="telegram-contact" className="border-t border-theme divider-theme py-24 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(51, 153, 51, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(51, 153, 51, 0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(51,153,51,0.09) 0%, rgba(247,223,30,0.04) 50%, transparent 70%)",
          left: "50%",
          top: "50%",
          width: "700px",
          height: "700px",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center fade-in-up">
          <span className="inline-block rounded-full border border-accent-500/20 bg-accent-500/10 px-4 py-1.5 text-sm text-theme-gold">
            تواصل معنا
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            ابعتلنا{" "}
            <span className="bg-gradient-to-r from-brand-400 via-accent-400 to-brand-300 bg-clip-text text-transparent">
              رسالة
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-theme-secondary">
            عندك استفسار؟ محتاج مساعدة؟ ابعتلنا رسالة واحنا هنسعد بخدمتك.
          </p>

          {/* Telegram badge */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-sm text-sky-400">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
            تليجرام: @Code1_JS
          </div>
        </div>

        {/* Form Card */}
        <div className="relative rounded-2xl border border-theme-card bg-theme-card p-8 sm:p-12 fade-in-up-delay-1">
          {/* Animated top border */}
          <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
            style={{
              background: "linear-gradient(90deg, #339933, #f7df1e, #339933)",
              backgroundSize: "200% auto",
              animation: "gradientShift 4s linear infinite",
            }}
          />

          {status === "success" ? (
            /* Success State */
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-brand-400 bg-brand-500/10 shadow-[0_0_30px_rgba(51,153,51,0.3)]"
                style={{ animation: "ctSuccessPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" }}
              >
                <svg className="h-8 w-8 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-theme">تم الإرسال بنجاح! 🎉</h3>
              <p className="mb-6 max-w-xs text-sm text-theme-secondary">
                شكراً لتواصلك. هنرد عليك في أقرب وقت ممكن إن شاء الله.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="text-sm text-brand-400 underline transition hover:text-brand-300"
              >
                إرسال رسالة أخرى
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-5 grid gap-5 sm:grid-cols-2">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-400 font-mono">
                    الاسم *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="اسمك الكريم"
                    className="w-full rounded-xl border border-theme-input bg-theme-input px-4 py-3 text-sm text-theme outline-none placeholder:text-theme-tertiary/60 transition focus:border-brand-400 focus:shadow-[0_0_0_3px_rgba(51,153,51,0.15),0_0_20px_rgba(51,153,51,0.1)]"
                    required
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-400 font-mono">
                    البريد الإلكتروني *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="بريدك الإلكتروني"
                    className="w-full rounded-xl border border-theme-input bg-theme-input px-4 py-3 text-sm text-theme outline-none placeholder:text-theme-tertiary/60 transition focus:border-brand-400 focus:shadow-[0_0_0_3px_rgba(51,153,51,0.15),0_0_20px_rgba(51,153,51,0.1)]"
                    required
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="mb-5 flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-400 font-mono">
                  الموضوع
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="موضوع الرسالة"
                  className="w-full rounded-xl border border-theme-input bg-theme-input px-4 py-3 text-sm text-theme outline-none placeholder:text-theme-tertiary/60 transition focus:border-brand-400 focus:shadow-[0_0_0_3px_rgba(51,153,51,0.15),0_0_20px_rgba(51,153,51,0.1)]"
                />
              </div>

              {/* Message */}
              <div className="mb-6 flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-400 font-mono">
                  الرسالة *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="اكتب رسالتك هنا..."
                  rows={5}
                  className="w-full min-h-[120px] rounded-xl border border-theme-input bg-theme-input px-4 py-3 text-sm text-theme outline-none placeholder:text-theme-tertiary/60 transition focus:border-brand-400 focus:shadow-[0_0_0_3px_rgba(51,153,51,0.15),0_0_20px_rgba(51,153,51,0.1)] resize-none"
                  required
                />
              </div>

              {/* Error message */}
              {status === "error" && errorMsg && (
                <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
                  {errorMsg}
                </div>
              )}

              {/* Submit row */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <span className="flex items-center gap-1.5 text-xs text-theme-tertiary font-mono">
                  <svg className="h-3.5 w-3.5 text-sky-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                  أو ابعت على تليجرام مباشرة @Code1_JS
                </span>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-8 py-3 text-sm font-bold text-dark-900 transition hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(51,153,51,0.4),0_0_0_1px_rgba(247,223,30,0.3)] hover:brightness-105 active:translate-y-0 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {status === "sending" ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-dark-900/30 border-t-dark-900" />
                      <span>جاري الإرسال...</span>
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span>إرسال الرسالة</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

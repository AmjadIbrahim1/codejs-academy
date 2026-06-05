"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";

export default function RegisterPage() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const register = api.auth.register.useMutation({
    onSuccess: async () => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.ok) {
        router.push("/");
        router.refresh();
      } else {
        router.push("/login");
      }
    },
    onError: (err: { message: string }) => {
      setError(err.message);
    },
  });

  const validatePassword = (pass: string) => {
    const errors: string[] = [];
    if (pass.length < 8) errors.push("8 أحرف على الأقل");
    if (!/[A-Z]/.test(pass)) errors.push("حرف كبير واحد");
    if (!/[a-z]/.test(pass)) errors.push("حرف صغير واحد");
    if (!/[0-9]/.test(pass)) errors.push("رقم واحد");
    if (!/[^A-Za-z0-9]/.test(pass)) errors.push("رمز خاص واحد");
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.endsWith("@codejs.com")) {
      setError("الإيميل لازم يكون من @codejs.com");
      return;
    }

    if (password !== confirmPassword) {
      setError("كلمة السر مش متطابقة");
      return;
    }

    const pwdErrors = validatePassword(password);
    if (pwdErrors.length > 0) {
      setError("متطلبات كلمة السر: " + pwdErrors.join(", "));
      return;
    }

    setError("");
    register.mutate({ name, email, password });
  };

  const passwordErrors = password ? validatePassword(password) : [];

  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-16 bg-theme">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-theme-card bg-theme-card p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-theme">
              انضم لـ Code JS Academy
            </h1>
            <p className="mt-2 text-sm text-theme-secondary">
              أنشئ حسابك وابدأ رحلتك البرمجية
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm text-theme-secondary">الاسم بالكامل</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اسمك الكامل"
                required
                className="w-full rounded-xl border border-theme-input bg-theme-input px-4 py-2.5 text-sm text-theme placeholder:text-theme-tertiary focus:border-brand-500/50 focus:outline-none focus:ring-1 focus:ring-brand-500/30"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-theme-secondary">الإيميل</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@codejs.com"
                required
                className="w-full rounded-xl border border-theme-input bg-theme-input px-4 py-2.5 text-sm text-theme placeholder:text-theme-tertiary focus:border-brand-500/50 focus:outline-none focus:ring-1 focus:ring-brand-500/30"
              />
              <p className="mt-1 text-xs text-theme-tertiary">لازم يكون @codejs.com</p>
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-theme-secondary">كلمة السر</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="اعمل كلمة سر قوية"
                required
                className="w-full rounded-xl border border-theme-input bg-theme-input px-4 py-2.5 text-sm text-theme placeholder:text-theme-tertiary focus:border-brand-500/50 focus:outline-none focus:ring-1 focus:ring-brand-500/30"
              />
              {password && (
                <div className="mt-1 space-y-0.5">
                  {[
                    { check: password.length >= 8, label: "8+ أحرف" },
                    { check: /[A-Z]/.test(password), label: "حرف كبير" },
                    { check: /[a-z]/.test(password), label: "حرف صغير" },
                    { check: /[0-9]/.test(password), label: "رقم" },
                    { check: /[^A-Za-z0-9]/.test(password), label: "رمز خاص" },
                  ].map((req) => (
                    <div
                      key={req.label}
                      className={`flex items-center gap-1.5 text-xs ${
                        req.check ? "text-green-400" : "text-theme-tertiary"
                      }`}
                    >
                      {req.check ? "✓" : "○"} {req.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-theme-secondary">
                تأكيد كلمة السر
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="كرر كلمة السر"
                required
                className="w-full rounded-xl border border-theme-input bg-theme-input px-4 py-2.5 text-sm text-theme placeholder:text-theme-tertiary focus:border-brand-500/50 focus:outline-none focus:ring-1 focus:ring-brand-500/30"
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-500/10 px-4 py-2 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={register.isPending}
              className="w-full rounded-xl bg-brand-500 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-50"
            >
              {register.isPending ? "بنشئ الحساب..." : "إنشاء الحساب"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-theme-tertiary">
            عندك حساب؟{" "}
            <Link href="/login" className="text-brand-400 hover:text-brand-300">
              سجل دخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

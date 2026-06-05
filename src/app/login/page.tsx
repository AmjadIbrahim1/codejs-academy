"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("إيميل أو كلمة سر غلط. تأكد إنك بتستخدم إيميل @codejs.com.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("حصل مشكلة. حاول تاني.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-16 bg-theme">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-theme-card bg-theme-card p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-theme">مرحب بيك من تاني</h1>
            <p className="mt-2 text-sm text-theme-secondary">
              سجل الدخول لحسابك في Code JS Academy
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-theme-secondary">كلمة السر</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="اكتب كلمة السر"
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
              disabled={loading}
              className="w-full rounded-xl bg-brand-500 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-50"
            >
              {loading ? "بسجل الدخول..." : "تسجيل الدخول"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-theme-tertiary">
            معندكش حساب؟{" "}
            <Link href="/register" className="text-brand-400 hover:text-brand-300">
              سجل من هنا
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

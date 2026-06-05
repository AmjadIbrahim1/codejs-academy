import "@/styles/globals.css";

import { type Metadata } from "next";
import { Cairo } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: {
    default: "Code JS Academy — أتقن البرمجة وحوّل مستقبلك",
    template: "%s | Code JS Academy",
  },
  description:
    "انضم إلى Code JS Academy، أكاديمية البرمجة المتميزة. أتقن HTML، CSS، JavaScript، TypeScript والمزيد من خلال برنامج تدريبي منظم لمدة 6 أشهر. من المبتدئ إلى الجاهز لسوق العمل.",
  keywords: [
    "أكاديمية برمجة",
    "تعلم البرمجة",
    "JavaScript",
    "TypeScript",
    "تطوير الويب",
    "معسكر برمجة",
    "مصر",
    "كورس برمجة اونلاين",
  ],
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Code JS Academy — أتقن البرمجة وحوّل مستقبلك",
    description:
      "برنامج تدريبي متميز لمدة 6 أشهر. من المبتدئ إلى الجاهز لسوق العمل.",
    type: "website",
    locale: "ar_EG",
    siteName: "Code JS Academy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable}`}>
      <body className="min-h-screen font-sans theme-transition">
        <SessionProvider>
          <TRPCReactProvider>
            <ThemeProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </ThemeProvider>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

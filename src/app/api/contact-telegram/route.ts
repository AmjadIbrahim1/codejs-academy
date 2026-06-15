import { NextResponse } from "next/server";
import { env } from "@/env";

// ─── Environment Variables (server-side only, never exposed to client) ───
const TELEGRAM_BOT_TOKEN = env.TELEGRAM_BOT_TOKEN ?? "";
const TELEGRAM_CHAT_ID = env.TELEGRAM_CHAT_ID ?? "";

/**
 * Escape HTML special characters for safe Telegram HTML formatting.
 * Telegram's HTML parser only supports <b>, <i>, <u>, <s>, <a>, <code>, <pre>, <blockquote>.
 * All other tags and entities will be shown as-is, so we escape to prevent
 * formatting issues and to display literal angle brackets, ampersands, etc.
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "من فضلك املأ جميع الحقول المطلوبة" },
        { status: 400 },
      );
    }

    // Validate Telegram configuration exists
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      // If not configured, just log the message and return success
      // (so the form doesn't break for users even if Telegram isn't configured)
      console.log(
        `[Contact Form] Message from ${name} (${email}): ${subject ? `[${subject}] ` : ""}${message}`,
      );
      return NextResponse.json({
        success: true,
        message: "تم استلام رسالتك. شكراً لتواصلك!",
      });
    }

    // Escape all user-provided values to prevent HTML parsing issues in Telegram
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeSubject = subject?.trim() ? escapeHtml(subject.trim()) : "غير محدد";
    const safeMessage = escapeHtml(message.trim());

    const telegramMessage = [
      `📬 <b>رسالة جديدة من الموقع</b>`,
      ``,
      `👤 <b>الاسم:</b> ${safeName}`,
      `📧 <b>البريد:</b> ${safeEmail}`,
      `📌 <b>الموضوع:</b> ${safeSubject}`,
      `💬 <b>الرسالة:</b> ${safeMessage}`,
    ].join("\n");

    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: "HTML",
        }),
      },
    );

    if (!res.ok) {
      const errData = await res.text();
      console.error("Telegram API error:", errData);
      return NextResponse.json(
        { error: "فشل الإرسال إلى تليجرام" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "تم إرسال رسالتك بنجاح! هنرد عليك في أقرب وقت.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "حدث خطأ. حاول تاني." },
      { status: 500 },
    );
  }
}

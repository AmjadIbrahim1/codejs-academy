import { NextResponse } from "next/server";
import { env } from "@/env";

// ─── Environment Variables (server-side only, never exposed to client) ───
const TELEGRAM_BOT_TOKEN = env.TELEGRAM_BOT_TOKEN ?? "";
const TELEGRAM_CHAT_ID = env.TELEGRAM_CHAT_ID ?? "";

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

    const telegramMessage = [
      `📬 *رسالة جديدة من الموقع*`,
      ``,
      `👤 *الاسم:* ${name}`,
      `📧 *البريد:* ${email}`,
      `📌 *الموضوع:* ${subject || "غير محدد"}`,
      `💬 *الرسالة:* ${message}`,
    ].join("\n");

    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: "Markdown",
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

# 🚀 إرسال رسائل إلى بوت تيليجرام (Telegram Bot API)

## 📋 المحتويات
1. [المقدمة](#المقدمة)
2. [المتطلبات الأساسية](#المتطلبات-الأساسية)
3. [الحصول على توكن البوت (BotFather)](#الحصول-على-توكن-البوت-botfather)
4. [الحصول على Chat ID](#الحصول-على-chat-id)
5. [إعداد متغيرات البيئة](#إعداد-متغيرات-البيئة)
6. [طرق إرسال الرسائل](#طرق-إرسال-الرسائل)
7. [تنسيق النصوص (parse_mode)](#تنسيق-النصوص-parse_mode)
8. [الأزرار والكيبورد (reply_markup)](#الأزرار-والكيبورد-reply_markup)
9. [أمثلة برمجية كاملة](#أمثلة-برمجية-كاملة)
10. [الكود الموجود في المشروع](#الكود-الموجود-في-المشروع)
11. [روابط مفيدة](#روابط-مفيدة)

---

## المقدمة

**Telegram Bot API** هي واجهة HTTP بسيطة تسمح للتطبيقات بالتواصل مع بوتات تيليجرام. كل الطلبات ترسل إلى:

```
https://api.telegram.org/bot<TOKEN>/METHOD_NAME
```

حيث:
- `<TOKEN>`: التوكن الخاص ببوتك
- `METHOD_NAME`: اسم الطريقة (مثل `sendMessage`, `sendPhoto`)

---

## المتطلبات الأساسية

1. **توكن البوت (API Token):** من [BotFather](https://t.me/botfather)
2. **Chat ID:** معرف المحادثة أو المستخدم أو المجموعة

---

## الحصول على توكن البوت (BotFather)

1. افتح [@BotFather](https://t.me/botfather) على تيليجرام
2. أرسل `/newbot` لإنشاء بوت جديد
3. اختر اسم للبوت (مثل `My Test Bot`)
4. اختر username ينتهي بـ `bot` (مثل `my_test_123_bot`)
5. ستحصل على توكن يشبه:
   ```
   123456789:ABCdefGHIjklmNOPqrstUVwxyz-1234567
   ```

### أوامر BotFather المهمة:
| الأمر | الوظيفة |
| :--- | :--- |
| `/newbot` | إنشاء بوت جديد |
| `/token` | الحصول على توكن بوت موجود |
| `/revoke` | إلغاء التوكن الحالي وإنشاء واحد جديد |
| `/setdescription` | تغيير وصف البوت |
| `/setabouttext` | تغيير نص "عن البوت" |
| `/setuserpic` | تغيير صورة البوت |
| `/setcommands` | تعيين أوامر البوت |

---

## الحصول على Chat ID

### الطريقة 1: إرسال رسالة إلى البوت واستخدام getUpdates

```bash
# بعد إرسال رسالة إلى البوت، شغل هذا الأمر
curl "https://api.telegram.org/bot<TOKEN>/getUpdates"
```

في الرد، ابحث عن `chat.id`:

```json
{
  "ok": true,
  "result": [
    {
      "message": {
        "chat": {
          "id": 123456789,  // 👈 هذا هو Chat ID
          "first_name": "...",
          "username": "..."
        }
      }
    }
  ]
}
```

### الطريقة 2: لمجموعة أو قناة
- **مجموعة:** أضف البوت للمجموعة، ثم أرسل رسالة، واستخدم `getUpdates`
- **قناة:** أضف البوت كمسؤول في القناة، ثم أرسل رسالة، واستخدم `getUpdates`
- معرف القنوات عادة يبدأ بعلامة `-100` (مثل `-1001234567890`)

---

## إعداد متغيرات البيئة

### في ملف `.env`:
```env
# Telegram Bot
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklmNOPqrstUVwxyz-1234567
TELEGRAM_CHAT_ID=123456789
```

### في Next.js (باستخدام `@t3-oss/env-nextjs`):
```typescript
// src/env.js
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    TELEGRAM_BOT_TOKEN: z.string().optional(),
    TELEGRAM_CHAT_ID: z.string().optional(),
    // ... باقي المتغيرات
  },
  runtimeEnv: {
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
  },
});
```

---

## طرق إرسال الرسائل

### 1. إرسال رسالة نصية - `sendMessage`

```http
POST https://api.telegram.org/bot<TOKEN>/sendMessage
Content-Type: application/json

{
  "chat_id": "123456789",
  "text": "Hello World!",
  "parse_mode": "HTML",
  "disable_web_page_preview": false,
  "disable_notification": false,
  "reply_to_message_id": null,
  "reply_markup": {}
}
```

### 2. إرسال صورة - `sendPhoto`

```http
POST https://api.telegram.org/bot<TOKEN>/sendPhoto
Content-Type: application/json

{
  "chat_id": "123456789",
  "photo": "https://example.com/image.jpg",
  "caption": "وصف الصورة",
  "parse_mode": "HTML"
}
```

أو عبر `multipart/form-data` لرفع ملف مباشر.

### 3. إرسال مستند - `sendDocument`

```http
POST https://api.telegram.org/bot<TOKEN>/sendDocument
Content-Type: application/json

{
  "chat_id": "123456789",
  "document": "https://example.com/file.pdf",
  "caption": "وصف الملف",
  "parse_mode": "HTML"
}
```

### 4. إرسال فيديو - `sendVideo`

```http
POST https://api.telegram.org/bot<TOKEN>/sendVideo
Content-Type: application/json

{
  "chat_id": "123456789",
  "video": "https://example.com/video.mp4",
  "caption": "وصف الفيديو",
  "duration": 120,
  "width": 1920,
  "height": 1080
}
```

### 5. إرسال صوت - `sendAudio`

```http
POST https://api.telegram.org/bot<TOKEN>/sendAudio
Content-Type: application/json

{
  "chat_id": "123456789",
  "audio": "https://example.com/song.mp3",
  "caption": "وصف الصوت",
  "performer": "المطرب",
  "title": "اسم الأغنية"
}
```

### 6. إرسال مجموعة وسائط (ألبوم) - `sendMediaGroup`

```http
POST https://api.telegram.org/bot<TOKEN>/sendMediaGroup
Content-Type: application/json

{
  "chat_id": "123456789",
  "media": [
    {"type": "photo", "media": "https://example.com/photo1.jpg", "caption": "صورة 1"},
    {"type": "photo", "media": "https://example.com/photo2.jpg", "caption": "صورة 2"},
    {"type": "video", "media": "https://example.com/video.mp4", "caption": "فيديو"}
  ]
}
```

### 7. إرسال موقع - `sendLocation`

```http
POST https://api.telegram.org/bot<TOKEN>/sendLocation
Content-Type: application/json

{
  "chat_id": "123456789",
  "latitude": 30.0444,
  "longitude": 31.2357
}
```

### 8. إرسال جهة اتصال - `sendContact`

```http
POST https://api.telegram.org/bot<TOKEN>/sendContact
Content-Type: application/json

{
  "chat_id": "123456789",
  "phone_number": "+201234567890",
  "first_name": "أحمد"
}
```

### 9. إرسال استطلاع رأي - `sendPoll`

```http
POST https://api.telegram.org/bot<TOKEN>/sendPoll
Content-Type: application/json

{
  "chat_id": "123456789",
  "question": "ما هو أفضل لغة برمجة؟",
  "options": ["JavaScript", "Python", "TypeScript", "Rust"],
  "is_anonymous": true,
  "type": "regular",
  "allows_multiple_answers": false
}
```

### 10. إرسال إجراء (Chat Action) - `sendChatAction`

```http
POST https://api.telegram.org/bot<TOKEN>/sendChatAction
Content-Type: application/json

{
  "chat_id": "123456789",
  "action": "typing"  // typing, upload_photo, record_video, upload_video, record_voice, upload_voice, upload_document, find_location, record_video_note, upload_video_note
}
```

### 11. إرسال زهر نرد - `sendDice`

```http
POST https://api.telegram.org/bot<TOKEN>/sendDice
Content-Type: application/json

{
  "chat_id": "123456789",
  "emoji": "🎲"  // 🎲, 🎯, 🏀, ⚽, 🎰, 🎳
}
```

### 12. إرسال ملصق - `sendSticker`

```http
POST https://api.telegram.org/bot<TOKEN>/sendSticker
Content-Type: application/json

{
  "chat_id": "123456789",
  "sticker": "CAACAgIAAxkBAA..."
}
```

### 13. إرسال فيديو نوت - `sendVideoNote`

```http
POST https://api.telegram.org/bot<TOKEN>/sendVideoNote
Content-Type: application/json

{
  "chat_id": "123456789",
  "video_note": "https://example.com/video_note.mp4",
  "duration": 30,
  "length": 240
}
```

### 14. إرسال أنيميشن (GIF) - `sendAnimation`

```http
POST https://api.telegram.org/bot<TOKEN>/sendAnimation
Content-Type: application/json

{
  "chat_id": "123456789",
  "animation": "https://example.com/animation.gif",
  "caption": "وصف الأنيميشن"
}
```

### 15. تعديل رسالة - `editMessageText`

```http
POST https://api.telegram.org/bot<TOKEN>/editMessageText
Content-Type: application/json

{
  "chat_id": "123456789",
  "message_id": 123,
  "text": "النص الجديد",
  "parse_mode": "HTML"
}
```

### 16. حذف رسالة - `deleteMessage`

```http
POST https://api.telegram.org/bot<TOKEN>/deleteMessage
Content-Type: application/json

{
  "chat_id": "123456789",
  "message_id": 123
}
```

### جدول جميع الطرق

| الطريقة | الوظيفة |
| :--- | :--- |
| `sendMessage` | إرسال رسالة نصية |
| `sendPhoto` | إرسال صورة |
| `sendVideo` | إرسال فيديو |
| `sendAudio` | إرسال ملف صوتي |
| `sendDocument` | إرسال مستند |
| `sendAnimation` | إرسال GIF/أنيميشن |
| `sendVoice` | إرسال رسالة صوتية |
| `sendVideoNote` | إرسال فيديو نوت |
| `sendMediaGroup` | إرسال مجموعة وسائط (ألبوم) |
| `sendLocation` | إرسال موقع |
| `sendContact` | إرسال جهة اتصال |
| `sendPoll` | إرسال استطلاع رأي |
| `sendDice` | إرسال زهر نرد عشوائي |
| `sendSticker` | إرسال ملصق |
| `sendVenue` | إرسال مكان مع التفاصيل |
| `sendInvoice` | إرسال فاتورة دفع |
| `sendGame` | إرسال لعبة HTML5 |
| `sendChatAction` | إرسال حالة الكتابة/الرفع |
| `editMessageText` | تعديل نص رسالة |
| `editMessageCaption` | تعديل وصف وسائط |
| `editMessageMedia` | تعديل الوسائط |
| `editMessageReplyMarkup` | تعديل الأزرار |
| `deleteMessage` | حذف رسالة |
| `forwardMessage` | إعادة توجيه رسالة |
| `copyMessage` | نسخ رسالة |

---

## تنسيق النصوص (parse_mode)

### HTML

```html
<b>نص عريض</b>
<i>نص مائل</i>
<u>نص تحته خط</u>
<s>نص مشطوب</s>
<tg-spoiler>نص مخفي</tg-spoiler>
<b>نص <i>متداخل</i></b>
<a href="https://example.com">رابط</a>
<code>كود في السطر</code>
<pre>كتلة كود</pre>
<pre><code class="language-javascript">console.log("Hello");</code></pre>
<blockquote>نص مقتبس</blockquote>
<blockquote expandable>نص مقتبس قابل للتوسيع</blockquote>
```

### MarkdownV2 (المفضل)

```markdown
*نص عريض*
_نص مائل_
__نص تحته خط__
~نص مشطوب~
||نص مخفي (spoiler)||
*نص عريض مع _نص مائل_*
[رابط](https://example.com)
`كود في السطر`
```javascript
كتلة كود
```
>نص مقتبس
>نص مقتبس قابل للتوسيع
||
```

**ملاحظة هامة:** في MarkdownV2، يجب escape الرموز التالية: `_ * [ ] ( ) ~ ` > # + - = | { } . !`

### Markdown (قديم - غير مفضل)

```markdown
*نص عريض*
_نص مائل_
`كود في السطر`
```javascript
كتلة كود
```
[رابط](https://example.com)
```

---

## الأزرار والكيبورد (reply_markup)

### 1. Inline Keyboard (أزرار مرفقة بالرسالة)

```json
{
  "reply_markup": {
    "inline_keyboard": [
      [
        { "text": "زر 1", "callback_data": "data_1" },
        { "text": "زر 2", "callback_data": "data_2" }
      ],
      [
        { "text": "🔗 فتح رابط", "url": "https://example.com" }
      ],
      [
        { "text": "📞 مشاركة رقم", "callback_data": "share_phone" }
      ]
    ]
  }
}
```

#### أنواع أزرار Inline:
| نوع الزر | الحقل المطلوب | الوظيفة |
| :--- | :--- | :--- |
| Callback | `callback_data` | إرسال إشعار للبوت عند الضغط |
| URL | `url` | فتح رابط |
| Switch Inline Query | `switch_inline_query` | فتح وضع inline بالبوت |
| Switch Inline Query Current Chat | `switch_inline_query_current_chat` | فتح inline في نفس الشات |
| Login | `login_url` | زر تسجيل دخول |
| Pay | `pay` | زر دفع |
| Web App | `web_app` | فتح Web App |
| Callback Game | `callback_game` | زر لعبة |

### 2. Reply Keyboard (كيبورد يظهر بدل الكيبورد العادي)

```json
{
  "reply_markup": {
    "keyboard": [
      ["🥇 الخيار الأول", "🥈 الخيار الثاني"],
      ["❓ مساعدة", "⚙️ إعدادات"]
    ],
    "resize_keyboard": true,
    "one_time_keyboard": true,
    "input_field_placeholder": "اختر خياراً..."
  }
}
```

#### أنواع أزرار Reply Keyboard:
| نوع الزر | الحقل | الوظيفة |
| :--- | :--- | :--- |
| نص | `text` | إرسال النص كرسالة |
| طلب رقم هاتف | `request_contact` | طلب رقم الهاتف |
| طلب موقع | `request_location` | طلب الموقع الجغرافي |
| طلب استطلاع | `request_poll` | إنشاء استطلاع رأي |
| Web App | `web_app` | فتح Web App |

### 3. إزالة الكيبورد

```json
{
  "reply_markup": {
    "remove_keyboard": true
  }
}
```

### 4. إخفاء الرد (Force Reply)

```json
{
  "reply_markup": {
    "force_reply": true,
    "input_field_placeholder": "اكتب ردك هنا..."
  }
}
```

---

## أمثلة برمجية كاملة

### JavaScript / TypeScript (مع fetch)

```typescript
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

/**
 * إرسال رسالة نصية
 */
async function sendMessage(text: string, parseMode: "HTML" | "MarkdownV2" = "HTML") {
  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: parseMode,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("Telegram API error:", err);
    throw new Error("Failed to send message");
  }

  return res.json();
}

/**
 * إرسال رسالة HTML منسقة
 */
await sendMessage(`
<b>📬 رسالة جديدة</b>

👤 <b>الاسم:</b> أحمد
📧 <b>البريد:</b> ahmed@example.com
💬 <b>الرسالة:</b> مرحباً، هذا نص تجريبي
`);

/**
 * إرسال رسالة مع أزرار Inline
 */
async function sendMessageWithButtons(text: string, buttons: { text: string; callback_data?: string; url?: string }[][]) {
  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: buttons,
        },
      }),
    }
  );

  return res.json();
}

await sendMessageWithButtons("اختر خياراً:", [
  [{ text: "✅ تأكيد", callback_data: "confirm" }, { text: "❌ إلغاء", callback_data: "cancel" }],
  [{ text: "🔗 الموقع", url: "https://example.com" }],
]);

/**
 * إرسال صورة
 */
async function sendPhoto(photoUrl: string, caption?: string) {
  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        photo: photoUrl,
        caption,
        parse_mode: "HTML",
      }),
    }
  );

  return res.json();
}

/**
 * إرسال مستند
 */
async function sendDocument(documentUrl: string, caption?: string) {
  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        document: documentUrl,
        caption,
        parse_mode: "HTML",
      }),
    }
  );

  return res.json();
}

/**
 * إرسال إجراء (Chat Action) - مثلاً typing
 */
async function sendChatAction(action: string) {
  await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendChatAction`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        action,
      }),
    }
  );
}

/**
 * الحصول على التحديثات (getUpdates) - لمعرفة Chat ID
 */
async function getUpdates() {
  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`
  );
  return res.json();
}
```

### Python (مع requests)

```python
import requests

TOKEN = "YOUR_BOT_TOKEN"
CHAT_ID = "YOUR_CHAT_ID"

def send_message(text, parse_mode="HTML"):
    url = f"https://api.telegram.org/bot{TOKEN}/sendMessage"
    payload = {
        "chat_id": CHAT_ID,
        "text": text,
        "parse_mode": parse_mode,
    }
    res = requests.post(url, json=payload)
    return res.json()

# مثال
send_message("<b>Hello World!</b>")
```

### curl

```bash
# إرسال رسالة مع HTML
curl -X POST "https://api.telegram.org/bot<TOKEN>/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{
    "chat_id": "<CHAT_ID>",
    "text": "<b>مرحباً</b> <i>بالعالم</i>",
    "parse_mode": "HTML"
  }'

# إرسال رسالة مع أزرار
curl -X POST "https://api.telegram.org/bot<TOKEN>/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{
    "chat_id": "<CHAT_ID>",
    "text": "اختر خياراً:",
    "reply_markup": {
      "inline_keyboard": [[
        {"text": "زر 1", "callback_data": "1"},
        {"text": "زر 2", "callback_data": "2"}
      ]]
    }
  }'

# الحصول على التحديثات
curl "https://api.telegram.org/bot<TOKEN>/getUpdates"
```

---

## الكود الموجود في المشروع

هذا هو الكود الموجود في `src/app/api/contact-telegram/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { env } from "@/env";

const TELEGRAM_BOT_TOKEN = env.TELEGRAM_BOT_TOKEN ?? "";
const TELEGRAM_CHAT_ID = env.TELEGRAM_CHAT_ID ?? "";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // التحقق من الحقول المطلوبة
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "من فضلك املأ جميع الحقول المطلوبة" },
        { status: 400 },
      );
    }

    // إذا لم يتم تكوين التليجرام، نسجل الرسالة ونرجع نجاح
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
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
```

متغيرات البيئة المستخدمة:
- `TELEGRAM_BOT_TOKEN` - توكن البوت
- `TELEGRAM_CHAT_ID` - معرف الشات

القيم الحالية موجودة في ملف `.env`.

---

## نصائح هامة

1. **استخدم POST دائماً** بدلاً من GET لتجنب مشاكل الترميز (URL Encoding)
2. **لا تعرض التوكن للعميل** - استخدمه فقط في السيرفر (Server-side)
3. **التعامل مع الأخطاء:** تحقق دائماً من `res.ok` قبل اعتبار الإرسال ناجحاً
4. **حدود السرعة:** تيليجرام يسمح بـ ~30 رسالة في الثانية لكل شات
5. **الملفات الكبيرة:** استخدم Local Bot API Server للملفات الكبيرة جداً
6. **MarkdownV2:** تذكر escape الرموز: `_ * [ ] ( ) ~ ` > # + - = | { } . !`
7. **HTML أسهل:** إذا كنت تحتار في escape، استخدم HTML بدلاً من MarkdownV2

---

## روابط مفيدة

- [التوثيق الرسمي لـ Telegram Bot API](https://core.telegram.org/bots/api)
- [إنشاء بوت مع BotFather](https://t.me/botfather)
- [مكتبة node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)
- [مكتبة Telegraf.js](https://telegraf.js.org/)
- [اختبار API عبر Postman](https://www.postman.com/)

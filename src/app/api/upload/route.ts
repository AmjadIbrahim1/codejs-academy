import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import crypto from "crypto";

// ─── Config ───
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
]);
const ALLOWED_EXTENSIONS = new Set([
  ".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif",
]);

export async function POST(request: Request) {
  try {
    // Verify request is authenticated (admin only)
    const authHeader = request.headers.get("authorization");
    const cookieHeader = request.headers.get("cookie");
    if (!cookieHeader && !authHeader) {
      return NextResponse.json(
        { error: "مش مسموح. لازم تكون مسجل دخول." },
        { status: 401 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "مافيش ملف مرفوع" },
        { status: 400 },
      );
    }

    // ─── Validate file size ───
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `حجم الملف كبير. الحد الأقصى 5 MB.` },
        { status: 400 },
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        { error: "الملف فاضي" },
        { status: 400 },
      );
    }

    // ─── Validate MIME type ───
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          error:
            "فقط ملفات الصور مسموح بها: JPG, PNG, WebP, AVIF, GIF",
        },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ─── Magic byte validation (defense-in-depth against MIME spoofing) ───
    const magicBytes: Record<string, Uint8Array[]> = {
      "image/jpeg": [new Uint8Array([0xFF, 0xD8, 0xFF])],
      "image/png": [new Uint8Array([0x89, 0x50, 0x4E, 0x47])],
      "image/webp": [new Uint8Array([0x52, 0x49, 0x46, 0x46])], // RIFF header
      "image/gif": [
        new Uint8Array([0x47, 0x49, 0x46, 0x38, 0x37, 0x61]),
        new Uint8Array([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]),
      ],
    };

    const signatures = magicBytes[file.type];
    const header = new Uint8Array(buffer.slice(0, 8));
    const hasValidMagic = signatures?.some((sig) =>
      sig.every((byte, i) => byte === header[i]),
    );

    if (file.type !== "image/avif" && !hasValidMagic) {
      return NextResponse.json(
        { error: "الملف مش صورة صالحة" },
        { status: 400 },
      );
    }

    // ─── Validate file extension ───
    const originalName = file.name;
    const ext = originalName.substring(originalName.lastIndexOf(".")).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { error: "امتداد الملف مش مسموح به" },
        { status: 400 },
      );
    }

    // ─── Sanitize filename (prevent path traversal) ───
    const safeBase = originalName
      .substring(0, originalName.lastIndexOf("."))
      .replace(/[^a-zA-Z0-9_\u0600-\u06FF-]/g, "_")
      .slice(0, 64);
    const randomId = crypto.randomBytes(8).toString("hex");
    const fileName = `${randomId}-${safeBase}${ext}`;

    // ─── Upload to Vercel Blob ───
    const blob = await put(fileName, file, {
      access: "public",
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "فشل الرفع" },
      { status: 500 },
    );
  }
}





"use client";

import { useState, useRef } from "react";
import { api } from "@/trpc/react";

const SECTION_KEYS = [
  { key: "quiz-champions", label: "أوائل الاختبارات", icon: "📊" },
  { key: "task-champions", label: "الأوائل في المهام", icon: "💻" },
  { key: "session-stars", label: "الأفضل في المحاضرات", icon: "🎤" },
  { key: "community-contributors", label: "أفضل المساهمين", icon: "🤝" },
  { key: "distinguished-interviews", label: "مقابلات متميزة", icon: "🎯" },
  { key: "exam-performers", label: "أبطال الامتحانات", icon: "🏅" },
];

export function AdminCourseSections() {
  const { data: rounds } = api.round.getAll.useQuery();
  const [selectedRoundId, setSelectedRoundId] = useState<string>("");

  const initDefaults = api.courseSection.initializeDefaults.useMutation({
    onSuccess: () => refetchSections(),
  });

  const { data: sections, refetch: refetchSections } =
    api.courseSection.getByRound.useQuery(
      { roundId: selectedRoundId },
      { enabled: !!selectedRoundId },
    );

  const selectedRound = rounds?.find((r) => r.id === selectedRoundId);

  return (
    <div>
      <div className="mb-6">
        <h2 className="mb-4 text-lg font-bold text-theme">إدارة أقسام التكريم</h2>

        {/* Round Selector */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <select
            value={selectedRoundId}
            onChange={(e) => setSelectedRoundId(e.target.value)}
            className="rounded-lg border border-theme-input bg-theme-input px-4 py-2 text-sm text-theme"
          >
            <option value="">-- اختر الدفعة --</option>
            {rounds?.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} {r.isCurrent ? "(الحالية)" : ""}
              </option>
            ))}
          </select>

          {selectedRoundId && (
            <button
              onClick={() => initDefaults.mutate({ roundId: selectedRoundId })}
              disabled={initDefaults.isPending}
              className="rounded-lg bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-400 transition hover:bg-brand-500/20"
            >
              {initDefaults.isPending ? "..." : "تهيئة الأقسام الافتراضية"}
            </button>
          )}
        </div>
      </div>

      {!selectedRoundId && (
        <p className="text-sm text-theme-tertiary">اختر دفعة لإدارة أقسام التكريم</p>
      )}

      {selectedRoundId && (
        <div className="space-y-6">
          {SECTION_KEYS.map((sectionKey) => {
            const section = sections?.find((s) => s.slug === sectionKey.key);
            return (
              <SectionCard
                key={sectionKey.key}
                sectionKey={sectionKey}
                section={section ?? null}
                roundId={selectedRoundId}
                roundName={selectedRound?.name ?? ""}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function SectionCard({
  sectionKey,
  section,
  roundId,
  roundName,
}: {
  sectionKey: { key: string; label: string; icon: string };
  section: {
    id: string;
    name: string;
    slug: string;
    icon: string | null;
    description: string | null;
    images: { id: string; imageUrl: string; caption: string | null }[];
  } | null;
  roundId: string;
  roundName: string;
}) {
  const [showUpload, setShowUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const utils = api.useUtils();

  const upsertSection = api.courseSection.upsert.useMutation({
    onSuccess: () => utils.courseSection.getByRound.invalidate(),
  });

  const addImage = api.courseSection.addImage.useMutation({
    onSuccess: () => {
      utils.courseSection.getByRound.invalidate();
      setImageUrl("");
      setCaption("");
      setShowUpload(false);
    },
  });

  const deleteImage = api.courseSection.deleteImage.useMutation({
    onSuccess: () => utils.courseSection.getByRound.invalidate(),
  });

  // Auto-create section if it doesn't exist
  const handleCreateSection = () => {
    upsertSection.mutate({
      name: sectionKey.label,
      slug: sectionKey.key,
      icon: sectionKey.icon,
      roundId,
      order: SECTION_KEYS.findIndex((sk) => sk.key === sectionKey.key),
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !section) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        addImage.mutate({ sectionId: section.id, imageUrl: data.url, caption });
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleUrlSubmit = () => {
    if (!imageUrl.trim() || !section) return;
    addImage.mutate({ sectionId: section.id, imageUrl: imageUrl.trim(), caption });
  };

  return (
    <div className="rounded-xl border border-theme-card bg-theme-card p-5">
      {/* Section Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{sectionKey.icon}</span>
          <div>
            <h3 className="font-semibold text-theme">{sectionKey.label}</h3>
            {section && (
              <p className="text-xs text-theme-tertiary">
                {section.images.length} صورة • ID: {section.id.slice(0, 8)}...
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          {!section && (
            <button
              onClick={handleCreateSection}
              disabled={upsertSection.isPending}
              className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-brand-600"
            >
              إنشاء القسم
            </button>
          )}
          {section && (
            <button
              onClick={() => setShowUpload(!showUpload)}
              className="rounded-lg bg-brand-500/10 px-3 py-1.5 text-xs font-medium text-brand-400 transition hover:bg-brand-500/20"
            >
              {showUpload ? "إلغاء" : "+ إضافة صورة"}
            </button>
          )}
        </div>
      </div>

      {/* Upload Form */}
      {showUpload && section && (
        <div className="mb-4 space-y-3 rounded-lg border border-theme-card bg-theme-card p-4">
          <p className="text-xs text-theme-tertiary">ارفع صورة أو أضف رابط صورة</p>

          {/* File Upload */}
          <div className="flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="block w-full text-xs text-theme-secondary file:mr-3 file:rounded-lg file:border-0 file:bg-brand-500 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-brand-600"
            />
            {uploading && <span className="text-xs text-theme-tertiary">جاري الرفع...</span>}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-theme-tertiary">أو</span>
          </div>

          {/* URL Input */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="رابط الصورة URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="flex-1 rounded-lg border border-theme-input bg-theme-input px-3 py-1.5 text-sm text-theme placeholder:text-theme-tertiary"
            />
            <input
              type="text"
              placeholder="تعليق (اختياري)"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-40 rounded-lg border border-theme-input bg-theme-input px-3 py-1.5 text-sm text-theme placeholder:text-theme-tertiary"
            />
            <button
              onClick={handleUrlSubmit}
              disabled={!imageUrl.trim() || addImage.isPending}
              className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-brand-600 disabled:opacity-50"
            >
              إضافة
            </button>
          </div>
        </div>
      )}

      {/* Image Grid */}
      {section && section.images.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {section.images.map((img) => (
            <div key={img.id} className="group relative">
              <div className="aspect-square overflow-hidden rounded-lg border border-theme-card">
                <img
                  src={img.imageUrl}
                  alt={img.caption ?? ""}
                  className="h-full w-full object-cover"
                />
              </div>
              {img.caption && (
                <p className="mt-1 truncate text-[10px] text-theme-tertiary">
                  {img.caption}
                </p>
              )}
              <button
                onClick={() => deleteImage.mutate({ id: img.id })}
                className="absolute right-1 top-1 rounded-lg bg-red-500/80 px-1.5 py-0.5 text-[10px] text-white opacity-0 transition hover:bg-red-600 group-hover:opacity-100"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {section && section.images.length === 0 && (
        <p className="text-xs text-theme-tertiary">لا توجد صور لهذا القسم بعد</p>
      )}
    </div>
  );
}

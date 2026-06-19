"use client";

import { api } from "@/trpc/react";
import { useState } from "react";

export function StudentReviewsSection() {
  const { data: images, isLoading } = api.reviewImage.getByType.useQuery({ type: "student" });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (isLoading) {
    return (
      <section className="border-t border-theme divider-theme py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
          </div>
        </div>
      </section>
    );
  }

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-theme divider-theme py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center fade-in-up">
          <span className="inline-block rounded-full border border-accent-500/20 bg-accent-500/10 px-4 py-1.5 text-sm text-theme-gold">
            آراء الطلاب
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            آراء الطلاب
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-theme-secondary sm:text-lg">
            شوف إيه اللي بيقوله طلابنا عن تجربتهم مع Code JS Academy
          </p>
        </div>
      </div>

      {/* Marquee section — no padding to allow full-bleed scroll */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="marquee-outer relative overflow-hidden">
          <div className="marquee flex w-max gap-5">
            {[...images, ...images].map((img, i) => (
              <div
                key={`${img.id}-${i}`}
                className="review-pill group cursor-pointer"
                onClick={() => setSelectedImage(img.imageUrl)}
              >
                <div className="relative h-44 w-64 overflow-hidden rounded-2xl border border-theme-card bg-theme-card shadow-lg transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(51,153,51,0.2)] sm:h-56 sm:w-80">
                  <img
                    src={img.imageUrl}
                    alt={img.caption ?? `رأي الطالب`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                {img.caption && (
                  <p className="mt-2.5 max-w-64 truncate text-center text-xs text-theme-secondary font-medium sm:max-w-80">
                    {img.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20"
          >
            ✕
          </button>
          <img
            src={selectedImage}
            alt="صورة مكبرة"
            className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}
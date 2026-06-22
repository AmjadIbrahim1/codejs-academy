"use client";

import { api } from "@/trpc/react";
import { useState } from "react";

export function StudentReviewsSection() {
  const { data: images, isLoading } = api.reviewImage.getByType.useQuery({
    type: "student",
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (isLoading) {
    return (
      <section className="border-theme divider-theme border-t py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="border-brand-500 h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
          </div>
        </div>
      </section>
    );
  }

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className="border-theme divider-theme overflow-hidden border-t py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="fade-in-up mb-16 text-center">
          <span className="border-accent-500/20 bg-accent-500/10 text-theme-gold inline-block rounded-full border px-4 py-1.5 text-sm">
            آراء الطلاب
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            آراء الطلاب
          </h2>
          <p className="text-theme-secondary mx-auto mt-4 max-w-3xl text-base sm:text-lg">
            شوف إيه اللي بيقوله طلابنا عن تجربتهم مع Code JS Academy
          </p>
        </div>
      </div>

      {/* Marquee section — no padding to allow full-bleed scroll */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="marquee-outer relative overflow-hidden">
          <div className="marquee flex w-max gap-5">
            {images.map((img) => (
              <div
                key={img.id}
                className="review-pill group cursor-pointer"
                onClick={() => setSelectedImage(img.imageUrl)}
              >
                <div className="border-theme-card bg-theme-card relative h-44 w-64 overflow-hidden rounded-2xl border shadow-lg transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(51,153,51,0.2)] sm:h-56 sm:w-80">
                  <img
                    src={img.imageUrl}
                    alt={img.caption ?? "رأي الطالب"}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {img.caption && (
                  <p className="text-theme-secondary mt-2.5 max-w-64 truncate text-center text-xs font-medium sm:max-w-80">
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
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20"
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

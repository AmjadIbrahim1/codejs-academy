"use client";

import { api } from "@/trpc/react";
import { useState } from "react";

export function CustomerReviewsSection() {
  const { data: images, isLoading } = api.reviewImage.getByType.useQuery({ type: "customer" });
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
    <section className="border-t border-theme divider-theme py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center fade-in-up">
          <span className="inline-block rounded-full border border-accent-500/20 bg-accent-500/10 px-4 py-1.5 text-sm text-accent-400">
            آراء عملائنا
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            آراء العملاء
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-theme-secondary sm:text-lg">
            شوف إيه اللي بيقوله عملائنا عن تجربتهم مع Code JS Academy
          </p>
        </div>

        {/* Masonry-like grid */}
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {images.map((img, index) => (
            <div
              key={img.id}
              className="group mb-6 cursor-pointer break-inside-avoid"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(img.imageUrl)}
            >
              <div className="relative overflow-hidden rounded-2xl border border-theme-card bg-theme-card transition-all duration-500 hover:shadow-[0_0_30px_rgba(51,153,51,0.15)]">
                <img
                  src={img.imageUrl}
                  alt={img.caption ?? `رأي العميل ${index + 1}`}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {img.caption && (
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
                    <p className="text-sm text-white">{img.caption}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
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

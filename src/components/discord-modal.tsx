"use client";

import { useEffect } from "react";

const WHATSAPP_URL = "https://wa.me/201030615045";

interface DiscordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DiscordModal({ isOpen, onClose }: DiscordModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-theme-modal-overlay backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl border border-theme-secondary bg-theme-modal p-8 shadow-2xl scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute left-4 top-4 rounded-lg p-1 text-theme-tertiary transition hover:text-theme"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div className="mb-4 mt-2 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10">
            <svg className="h-8 w-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M16 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M15.5 8.5c-1.5-.8-3-.8-4.5 0" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="mb-3 text-xl font-bold text-theme">
            🔒 الوصول لديسكورد
          </h3>
          <p className="mb-2 text-sm leading-relaxed text-theme-secondary">
            الوصول لديسكورد متاح بس للطلاب المسجلين في الأكاديمية.
          </p>
          <p className="mb-6 text-sm leading-relaxed text-theme-tertiary">
            عشان تنضم لـ Code JS Academy، كلمنا على واتساب الأول.
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            كلمنا على واتساب
          </a>

          <button
            onClick={onClose}
            className="mt-4 text-xs text-theme-tertiary transition hover:text-theme-secondary"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImagePreviewModalProps {
  images: string[];
  productName: string;
  initialIndex?: number;
  onClose: () => void;
}

export default function ImagePreviewModal({
  images,
  productName,
  initialIndex = 0,
  onClose,
}: ImagePreviewModalProps) {
  const [index, setIndex] = useState(initialIndex);

  const goNext = () => setIndex((prev) => (prev + 1) % images.length);
  const goPrev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition"
        aria-label="Close preview"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        className="relative w-full max-w-2xl flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {images.length > 1 && (
          <button
            onClick={goPrev}
            className="absolute left-0 md:-left-14 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <img
          src={images[index]}
          alt={`${productName} photo ${index + 1}`}
          className="max-h-[80vh] w-auto object-contain rounded-lg"
        />

        {images.length > 1 && (
          <button
            onClick={goNext}
            className="absolute right-0 md:-right-14 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setIndex(i);
              }}
              className={`w-2 h-2 rounded-full transition ${
                i === index ? 'bg-brand-green' : 'bg-white/40'
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
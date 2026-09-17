'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface LightboxImage {
  src: string;
  title: string;
  category?: string;
  description?: string;
}

interface LightboxModalProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function LightboxModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  const currentImage = images[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
    },
    [isOpen, currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown, isOpen]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      id="lightbox-backdrop"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        id="lightbox-close-btn"
        onClick={onClose}
        className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-[#1C1410] text-[#F4EFEA] hover:text-[#D4AF37] hover:bg-[#2A1E17] transition-colors border border-[#3D2B1F]"
        aria-label="Close modal"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      <button
        id="lightbox-prev-btn"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex - 1 + images.length) % images.length);
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#1C1410] text-[#F4EFEA] hover:text-[#D4AF37] hover:bg-[#2A1E17] transition-colors border border-[#3D2B1F]"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        id="lightbox-next-btn"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex + 1) % images.length);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#1C1410] text-[#F4EFEA] hover:text-[#D4AF37] hover:bg-[#2A1E17] transition-colors border border-[#3D2B1F]"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Center Image Content */}
      <div
        className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[65vh] sm:h-[72vh] rounded-lg overflow-hidden border-2 border-[#3D2B1F] shadow-[0_15px_40px_rgba(0,0,0,0.9)] bg-[#12100E]">
          <Image
            src={currentImage.src}
            alt={currentImage.title}
            fill
            className="object-contain"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Captions and thumbnail indicators */}
        <div className="w-full mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left px-2">
          <div>
            {currentImage.category && (
              <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase block font-mono">
                {currentImage.category}
              </span>
            )}
            <h3 className="text-base sm:text-lg font-serif text-[#F4EFEA] tracking-wide">
              {currentImage.title}
            </h3>
            {currentImage.description && (
              <p className="text-xs text-[#F4EFEA]/70 max-w-xl mt-0.5 font-light">
                {currentImage.description}
              </p>
            )}
          </div>
          <div className="text-xs text-[#D4AF37] tracking-widest font-mono">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>
  );
}

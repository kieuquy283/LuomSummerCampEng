import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import type { ActivityGalleryImage } from '../data/activityGallery';

type ImageLightboxProps = {
  images: ActivityGalleryImage[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

const buttonClasses =
  'inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition hover:border-white/25 hover:bg-white/18 sm:h-12 sm:w-12';

const ImageLightbox = ({
  images,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: ImageLightboxProps) => {
  const activeImage = images[activeIndex];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onPrev();
      if (event.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={activeImage.alt}
    >
      <div
        className="relative w-full max-w-6xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Đóng"
          className={`absolute right-3 top-3 z-20 ${buttonClasses}`}
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="Ảnh trước"
          className={`absolute left-3 top-1/2 z-20 -translate-y-1/2 ${buttonClasses}`}
          onClick={onPrev}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="Ảnh tiếp theo"
          className={`absolute right-3 top-1/2 z-20 -translate-y-1/2 ${buttonClasses}`}
          onClick={onNext}
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="overflow-hidden rounded-[30px] border border-cyan-300/12 bg-slate-950/90 shadow-[0_30px_100px_rgba(2,6,23,0.7),0_0_70px_rgba(34,211,238,0.08)]">
          <div className="flex max-h-[78vh] min-h-[18rem] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_35%)] p-4 sm:p-6">
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-h-[72vh] w-full rounded-[22px] border border-white/8 object-contain shadow-[0_18px_60px_rgba(2,6,23,0.5)]"
            />
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-white/8 px-5 py-4 sm:px-6">
            <p className="text-sm font-medium text-slate-200 sm:text-base">{activeImage.title}</p>
            <p className="text-sm text-slate-400">
              {activeIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageLightbox;

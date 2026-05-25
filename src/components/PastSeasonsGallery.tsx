import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import imageOne from '../../public/actpre/472529030_589852713756086_7156911834225834128_n.jpg';
import imageTwo from '../../public/actpre/472891715_589851853756172_930221393671382471_n.jpg';
import imageThree from '../../public/actpre/526605690_748337407939495_2127347254263388152_n.jpg';
import imageFour from '../../public/actpre/527307835_749141204525782_3526778895808506962_n.jpg';

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  title: string;
  tag: string;
  layout: 'feature' | 'wide' | 'small';
};

const galleryImages: GalleryImage[] = [
  {
    id: 'green-camp',
    src: imageOne,
    alt: 'Trại hè thiếu nhi với các hoạt động ngoài trời',
    title: 'Trại hè thiếu nhi',
    tag: 'Cộng đồng',
    layout: 'feature',
  },
  {
    id: 'field-learning',
    src: imageTwo,
    alt: 'Khoảnh khắc trải nghiệm thực tế của học sinh',
    title: 'Trải nghiệm thực tế',
    tag: 'Hoạt động',
    layout: 'wide',
  },
  {
    id: 'tech-class',
    src: imageThree,
    alt: 'Lớp học công nghệ dành cho học sinh',
    title: 'Lớp học công nghệ',
    tag: 'Công nghệ',
    layout: 'small',
  },
  {
    id: 'creative-workshop',
    src: imageFour,
    alt: 'Hoạt động sáng tạo và tương tác nhóm',
    title: 'Hoạt động sáng tạo',
    tag: 'Sáng tạo',
    layout: 'small',
  },
];

const getCardClasses = (layout: GalleryImage['layout']) => {
  switch (layout) {
    case 'feature':
      return 'md:col-span-2 md:row-span-2 min-h-[19rem] sm:min-h-[24rem] lg:min-h-[35rem]';
    case 'wide':
      return 'md:col-span-2 min-h-[14rem] sm:min-h-[17rem] lg:min-h-[16.5rem]';
    default:
      return 'min-h-[13rem] sm:min-h-[15rem] lg:min-h-[17rem]';
  }
};

const iconButtonClasses =
  'inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/10 text-white backdrop-blur-md transition hover:border-white/20 hover:bg-white/16';

type LightboxProps = {
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

const ImageLightbox = ({ activeIndex, onClose, onPrev, onNext }: LightboxProps) => {
  const image = galleryImages[activeIndex];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'ArrowLeft') {
        onPrev();
      }

      if (event.key === 'ArrowRight') {
        onNext();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/88 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={image.title}
    >
      <div
        className="relative w-full max-w-6xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Đóng thư viện ảnh"
          className={`absolute right-3 top-3 z-20 ${iconButtonClasses}`}
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="Ảnh trước"
          className={`absolute left-3 top-1/2 z-20 -translate-y-1/2 ${iconButtonClasses}`}
          onClick={onPrev}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="Ảnh tiếp theo"
          className={`absolute right-3 top-1/2 z-20 -translate-y-1/2 ${iconButtonClasses}`}
          onClick={onNext}
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/90 shadow-[0_28px_90px_rgba(2,6,23,0.62)]">
          <div className="relative max-h-[78vh] min-h-[18rem] bg-slate-950">
            <img
              src={image.src}
              alt={image.alt}
              className="h-full max-h-[78vh] w-full object-contain"
            />
          </div>

          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-cyan/90">
                {image.tag}
              </p>
              <p className="text-base font-semibold text-white sm:text-lg">{image.title}</p>
            </div>
            <p className="text-sm text-slate-300">
              {activeIndex + 1}/{galleryImages.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PastSeasonsGallery = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);
  const showPrev = () =>
    setActiveIndex((current) =>
      current === null ? 0 : (current - 1 + galleryImages.length) % galleryImages.length,
    );
  const showNext = () =>
    setActiveIndex((current) => (current === null ? 0 : (current + 1) % galleryImages.length));

  return (
    <section className="relative overflow-hidden bg-slate-950 py-16 text-white sm:py-20">
      <div className="absolute inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-brand-electric/12 blur-[140px]" />
        <div className="absolute bottom-[-16%] right-[-8%] h-80 w-80 rounded-full bg-brand-yellow/10 blur-[155px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.07),transparent_36%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-brand-cyan">
            Hình ảnh hoạt động
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Hình ảnh từ các mùa hoạt động trước
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
            Một vài khoảnh khắc tiêu biểu từ các chương trình cộng đồng, trại hè và lớp học đã
            triển khai.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-4 md:grid-rows-2">
          {galleryImages.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => openLightbox(index)}
              className={`group relative overflow-hidden rounded-[28px] bg-slate-900 text-left shadow-[0_18px_55px_rgba(2,6,23,0.42)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_72px_rgba(8,47,73,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/80 ${getCardClasses(image.layout)}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.02),rgba(2,6,23,0.12)_44%,rgba(2,6,23,0.68))] transition-colors duration-500 group-hover:bg-[linear-gradient(180deg,rgba(2,6,23,0.06),rgba(2,6,23,0.18)_44%,rgba(2,6,23,0.74))]" />
              <div className="absolute inset-0 border border-white/10" />

              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <div className="inline-flex rounded-full border border-white/12 bg-slate-950/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-cyan backdrop-blur-sm">
                  {image.tag}
                </div>
                <p className="mt-3 text-sm font-semibold text-white sm:text-base">{image.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeIndex !== null ? (
        <ImageLightbox
          activeIndex={activeIndex}
          onClose={closeLightbox}
          onPrev={showPrev}
          onNext={showNext}
        />
      ) : null}
    </section>
  );
};

export default PastSeasonsGallery;

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

type LayoutType = 'feature' | 'tall' | 'wide' | 'small';

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  layout: LayoutType;
};

const imageFiles = [
  '470211335_574229225318435_8173116940107682786_n.jpg',
  '470492696_574241105317247_2186218312385814379_n.jpg',
  '471612061_583274164413941_2634710462787771064_n.jpg',
  '471642407_583274194413938_6532127114811796360_n.jpg',
  '472529030_589852713756086_7156911834225834128_n.jpg',
  '472558032_589851927089498_1119541343011584725_n.jpg',
  '472669133_589851857089505_4055431684776506671_n.jpg',
  '472891715_589851853756172_930221393671382471_n.jpg',
  '525967289_746707874769115_3776670450536789141_n.jpg',
  '526128176_746708228102413_8002761833413269268_n.jpg',
  '526211405_746708424769060_628966600339173001_n.jpg',
  '526216147_748330634606839_6110020271762532803_n.jpg',
  '526605690_748337407939495_2127347254263388152_n.jpg',
  '526627064_748330657940170_2898222636544315169_n.jpg',
  '526648011_749136904526212_7829249425128869264_n.jpg',
  '527307835_749141204525782_3526778895808506962_n.jpg',
  '527314437_749139541192615_8221822334773405084_n.jpg',
  '527780527_749140917859144_8294109078358174194_n.jpg',
] as const;

const layoutPattern: LayoutType[] = [
  'feature', // 1: 2x2
  'tall',    // 2: 1x2
  'small',   // 3: 1x1
  'wide',    // 4: 2x1
  'small',   // 5: 1x1
  'tall',    // 6: 1x2
  'small',   // 7: 1x1
  'small',   // 8: 1x1
  'feature', // 9: 2x2
  'small',   // 10: 1x1
  'wide',    // 11: 2x1
  'small',   // 12: 1x1
  'tall',    // 13: 1x2
  'small',   // 14: 1x1
  'small',   // 15: 1x1
  'wide',    // 16: 2x1
  'small',   // 17: 1x1
  'small',   // 18: 1x1
];

const galleryImages: GalleryImage[] = imageFiles.map((fileName, index) => ({
  id: fileName,
  src: `${import.meta.env.BASE_URL}actpre/${fileName}`,
  alt: `Hình ảnh hoạt động ${index + 1}`,
  layout: layoutPattern[index] || 'small',
}));

const getGridClasses = (layout: LayoutType) => {
  switch (layout) {
    case 'feature':
      return 'col-span-2 row-span-2';
    case 'tall':
      return 'col-span-1 row-span-2';
    case 'wide':
      return 'col-span-2 row-span-1';
    case 'small':
    default:
      return 'col-span-1 row-span-1';
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
      aria-label={image.alt}
    >
      <div className="relative w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
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

          <div className="px-5 py-4 text-right text-sm text-slate-300 sm:px-6">
            {activeIndex + 1}/{galleryImages.length}
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

      <div className="relative z-10 mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-cyan">
            Hình ảnh hoạt động
          </p>
        </div>

        <div className="relative rounded-[2.5rem] bg-slate-900/40 p-3 sm:p-5 lg:p-6 backdrop-blur-xl border border-white/10 shadow-[0_32px_96px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 grid-flow-row-dense auto-rows-[6rem] sm:auto-rows-[8.5rem] lg:auto-rows-[9.5rem] gap-2 sm:gap-3 lg:gap-4">
            {galleryImages.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => openLightbox(index)}
                className={`group relative overflow-hidden rounded-[1.25rem] bg-slate-900 shadow-[0_18px_55px_rgba(2,6,23,0.42)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_72px_rgba(8,47,73,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/80 ${getGridClasses(image.layout)}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-slate-950/8 transition-colors duration-500 group-hover:bg-slate-950/18" />
                <div className="absolute inset-0 border border-white/10 rounded-[1.25rem]" />
              </button>
            ))}
          </div>
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

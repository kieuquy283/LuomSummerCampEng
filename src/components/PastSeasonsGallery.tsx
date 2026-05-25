import imageOne from '../../public/actpre/472529030_589852713756086_7156911834225834128_n.jpg';
import imageTwo from '../../public/actpre/472891715_589851853756172_930221393671382471_n.jpg';
import imageThree from '../../public/actpre/526605690_748337407939495_2127347254263388152_n.jpg';
import imageFour from '../../public/actpre/527307835_749141204525782_3526778895808506962_n.jpg';

type GalleryPhoto = {
  image: string;
  alt: string;
  caption: string;
  badge: string;
  className?: string;
};

const galleryPhotos: GalleryPhoto[] = [
  {
    image: imageOne,
    alt: 'Trại hè thiếu nhi',
    caption: 'Trại hè thiếu nhi',
    badge: 'Mùa hè cộng đồng',
    className: 'min-h-[22rem] sm:min-h-[28rem] lg:min-h-[35rem]',
  },
  {
    image: imageTwo,
    alt: 'Trải nghiệm thực tế',
    caption: 'Trải nghiệm thực tế',
    badge: 'Hoạt động ngoài trời',
    className: 'min-h-[15rem] sm:min-h-[18rem]',
  },
  {
    image: imageThree,
    alt: 'Lớp học công nghệ',
    caption: 'Lớp học công nghệ',
    badge: 'Năng lực số',
    className: 'min-h-[14rem] sm:min-h-[16rem]',
  },
  {
    image: imageFour,
    alt: 'Hoạt động sáng tạo',
    caption: 'Hoạt động sáng tạo',
    badge: 'Tình nguyện viên',
    className: 'min-h-[14rem] sm:min-h-[16rem]',
  },
];

const GalleryCard = ({ photo, priority = false }: { photo: GalleryPhoto; priority?: boolean }) => (
  <article
    className={`group relative overflow-hidden rounded-[28px] bg-slate-900 shadow-[0_18px_55px_rgba(2,6,23,0.45)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_70px_rgba(8,47,73,0.42)] ${photo.className ?? ''}`}
  >
    <img
      src={photo.image}
      alt={photo.alt}
      loading={priority ? 'eager' : 'lazy'}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
    />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.04),rgba(2,6,23,0.12)_45%,rgba(2,6,23,0.8))]" />
    <div className="absolute inset-0 border border-white/10" />
    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
      <span className="inline-flex rounded-full border border-white/14 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100 backdrop-blur-md">
        {photo.badge}
      </span>
      <p className="mt-3 text-base font-bold text-white sm:text-lg">{photo.caption}</p>
    </div>
  </article>
);

const PastSeasonsGallery = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-16 text-white sm:py-20">
      <div className="absolute inset-0">
        <div className="absolute left-[-8%] top-[-12%] h-72 w-72 rounded-full bg-brand-electric/14 blur-[130px]" />
        <div className="absolute bottom-[-18%] right-[-10%] h-80 w-80 rounded-full bg-brand-yellow/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.06),transparent_36%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-brand-cyan">
            Hình ảnh hoạt động
          </p>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            Hình ảnh từ các mùa hoạt động trước
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Một vài khoảnh khắc tiêu biểu từ các chương trình cộng đồng, trại hè và lớp học đã
            triển khai.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.28fr)_minmax(0,0.92fr)]">
          <GalleryCard photo={galleryPhotos[0]} priority />

          <div className="grid gap-5">
            <GalleryCard photo={galleryPhotos[1]} />
            <div className="grid gap-5 sm:grid-cols-2">
              <GalleryCard photo={galleryPhotos[2]} />
              <GalleryCard photo={galleryPhotos[3]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PastSeasonsGallery;

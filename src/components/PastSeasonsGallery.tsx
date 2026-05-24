import { Camera, ImageIcon } from 'lucide-react';

type GalleryItem = {
  title: string;
  caption: string;
  season: string;
  image?: string;
  accentClass: string;
  layoutClass?: string;
};

const galleryItems: GalleryItem[] = [
  {
    title: 'Sinh hoạt hè cộng đồng',
    caption: 'Những buổi tập thể, trò chơi và hoạt động gắn kết cùng học sinh tại địa phương.',
    season: 'Mùa hoạt động 2023',
    accentClass:
      'from-cyan-500/20 via-sky-500/10 to-brand-navy/90 border-cyan-400/25',
    layoutClass: 'lg:col-span-2 lg:min-h-[24rem]',
  },
  {
    title: 'Lớp học công nghệ',
    caption: 'Không khí học tập sôi nổi qua các buổi hướng dẫn kỹ năng số và thực hành.',
    season: 'Mùa hoạt động 2024',
    accentClass:
      'from-brand-yellow/20 via-amber-400/10 to-brand-navy/90 border-brand-yellow/25',
  },
  {
    title: 'Khoảnh khắc tình nguyện',
    caption: 'Các khung hình ghi lại tinh thần đồng hành, sẻ chia và hỗ trợ học sinh.',
    season: 'Mùa hoạt động 2025',
    accentClass:
      'from-emerald-400/20 via-teal-400/10 to-brand-navy/90 border-emerald-400/25',
  },
];

const PastSeasonsGallery = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-16 text-white sm:py-20">
      <div className="absolute inset-0 opacity-70">
        <div className="absolute left-[-8%] top-[-12%] h-72 w-72 rounded-full bg-brand-electric/20 blur-[120px]" />
        <div className="absolute bottom-[-16%] right-[-8%] h-80 w-80 rounded-full bg-brand-yellow/10 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-brand-cyan">
            Hình ảnh mùa trước
          </p>
          <h2 className="text-2xl font-extrabold sm:text-3xl md:text-4xl">
            Một vài khoảnh khắc từ những mùa hoạt động trước
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Section này đã sẵn cấu trúc gallery để đưa ảnh hoạt động thật vào bất cứ lúc nào.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <article
              key={item.title}
              className={`group relative overflow-hidden rounded-[28px] border bg-gradient-to-br p-6 shadow-[0_22px_60px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:p-7 ${item.accentClass} ${item.layoutClass ?? ''}`}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : null}

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_42%)]" />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />

              <div className="relative z-10 flex h-full min-h-[18rem] flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex items-center rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100 backdrop-blur">
                    {item.season}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white shadow-[0_0_24px_rgba(255,255,255,0.08)]">
                    <Camera className="h-5 w-5" />
                  </div>
                </div>

                {!item.image ? (
                  <div className="my-8 flex flex-1 items-center justify-center">
                    <div className="flex h-28 w-28 items-center justify-center rounded-[32px] border border-white/12 bg-white/6 text-slate-200 shadow-[0_0_32px_rgba(34,211,238,0.08)]">
                      <ImageIcon className="h-10 w-10" />
                    </div>
                  </div>
                ) : null}

                <div className="max-w-xl">
                  <h3 className="text-xl font-extrabold sm:text-2xl">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-200">{item.caption}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastSeasonsGallery;

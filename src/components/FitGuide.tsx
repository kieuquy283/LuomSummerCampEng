import { fitGuide } from '../data/programData';

const FitGuide = () => {
  return (
    <section id="vi-tri-phu-hop" className="bg-slate-950 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-brand-cyan">
            Bạn phù hợp với vị trí nào?
          </p>
          <h2 className="text-2xl font-extrabold sm:text-3xl md:text-4xl">
            Chọn nhanh theo sở thích, thế mạnh và cách bạn muốn tham gia
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {fitGuide.map((item, index) => (
            <article
              key={item.title}
              className={`rounded-[28px] border p-6 shadow-[0_18px_50px_rgba(2,6,23,0.35)] sm:p-8 ${
                index === fitGuide.length - 1
                  ? 'border-brand-yellow/30 bg-brand-yellow/10 md:col-span-2'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              <h3 className="text-xl font-bold sm:text-2xl">{item.title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FitGuide;

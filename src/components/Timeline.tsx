import { timeline } from '../data/programData';

const Timeline = () => {
  return (
    <section id="lich-trinh" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-brand-cyan">
            Lịch trình tổng quan
          </p>
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl md:text-4xl">
            Theo dõi mạch thời gian của toàn bộ chiến dịch hè 2026
          </h2>
        </div>

        <div className="relative space-y-6 before:absolute before:left-[1.35rem] before:top-0 before:h-full before:w-0.5 before:bg-slate-200 md:before:left-1/2">
          {timeline.map((entry) => (
            <article
              key={entry.month}
              className="relative rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg sm:p-8 md:mx-auto md:max-w-[42rem]"
            >
              <div className="absolute left-4 top-8 h-4 w-4 rounded-full border-4 border-white bg-brand-cyan shadow md:left-1/2 md:-translate-x-1/2" />
              <div className="pl-8 md:pl-0">
                <div className="inline-flex rounded-full bg-brand-navy px-4 py-2 text-sm font-bold text-white">
                  {entry.month}
                </div>
                <ul className="mt-5 space-y-3">
                  {entry.items.map((item) => (
                    <li key={item} className="flex gap-3 text-slate-700">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-brand-yellow" />
                      <span className="font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
                {entry.note ? <p className="mt-5 text-sm font-medium text-brand-cyan">{entry.note}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;

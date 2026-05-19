import { CalendarDays, Clock3, MapPin, School, Users, WandSparkles } from 'lucide-react';

import { programInfo } from '../data/programData';

const ProgramInfo = () => {
  const icons = [MapPin, School, Clock3, CalendarDays, Users, WandSparkles];
  const iconColors = [
    'text-brand-secondary bg-brand-sky',
    'text-brand-primary bg-brand-mint',
    'text-brand-orange bg-brand-warm',
    'text-brand-accentDark bg-brand-accent/20',
    'text-brand-primary bg-brand-mint',
    'text-brand-secondary bg-brand-sky',
  ];

  return (
    <section className="border-y border-brand-border bg-brand-surface py-20" id="thong-tin">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-secondary">
            Thông tin chương trình
          </p>
          <h2 className="mb-4 text-3xl font-extrabold text-slate-900 md:text-4xl">
            Những điều bạn cần biết trước khi đăng ký
          </h2>
          <p className="text-lg leading-8 text-slate-600">
            Chương trình được thiết kế cho học sinh tiểu học, theo hướng gần gũi, giàu tương tác và
            đủ linh hoạt để các tình nguyện viên phối hợp hiệu quả cùng nhau.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {programInfo.map((info, idx) => {
            const Icon = icons[idx];

            return (
              <article
                key={info.label}
                className="rounded-[24px] border border-brand-border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover"
              >
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${iconColors[idx]}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">{info.label}</h3>
                <p className="text-sm leading-7 text-slate-600">{info.value}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProgramInfo;

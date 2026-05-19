import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Megaphone,
  Sparkles,
  Users,
} from 'lucide-react';

import { heroCards, program, registrationLink } from '../data/programData';

const Hero = () => {
  const icons = [MapPin, Users, CalendarDays, Megaphone, Sparkles];

  return (
    <section
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.12),_transparent_34%),linear-gradient(135deg,_#eff6ff_0%,_#ecfdf5_46%,_#ffffff_100%)] pb-24 pt-16"
      id="gioi-thieu"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute left-[-6%] top-[-8%] h-72 w-72 rounded-full bg-brand-accent/20 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-4%] h-80 w-80 rounded-full bg-brand-mint blur-3xl" />
        <div className="absolute left-1/3 top-1/2 h-44 w-44 rounded-full bg-brand-sky blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12">
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center rounded-full border border-brand-strong bg-white/80 px-4 py-2 text-sm font-semibold text-brand-primary shadow-sm">
              <span className="mr-2 inline-flex h-2.5 w-2.5 rounded-full bg-brand-primary" />
              Dự án {program.projectName}
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-secondary">
              Dự án nâng cao năng lực ngoại ngữ
            </p>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
              Đội Áo Xanh Anh ngữ phường Vĩnh Phúc
            </h1>

            <ul className="mb-8 max-w-2xl space-y-3 text-left text-lg leading-8 text-slate-600 md:text-xl lg:mx-0">
              <li className="flex gap-3">
                <span className="mt-3 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-brand-primary" />
                <span>
                  Bạn có mong muốn mang kiến thức ngoại ngữ và tư duy hội nhập đến gần hơn với các
                  em học sinh?
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-3 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-brand-primary" />
                <span>
                  Bạn muốn trực tiếp đóng góp sức trẻ vào hoạt động tình nguyện hè ý nghĩa ngay tại
                  địa phương?
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-3 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-brand-primary" />
                <span>
                  Hãy đồng hành cùng Đội Áo xanh Anh ngữ phường Vĩnh Phúc trong chiến dịch tình
                  nguyện hè năm nay!
                </span>
              </li>
            </ul>

            <div className="mb-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <a
                href={registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand-primary px-8 py-4 text-base font-bold text-white shadow-cta transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-primaryDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-4 sm:w-auto"
              >
                Đăng ký tham gia
              </a>
              <a
                href="#vi-tri-tnv"
                className="group inline-flex min-h-11 w-full items-center justify-center rounded-full border border-brand-soft bg-white/80 px-8 py-4 text-base font-bold text-brand-secondary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-secondary hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-4 sm:w-auto"
              >
                Xem vị trí phù hợp
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {heroCards.map((card, index) => {
                const Icon = icons[index];

                return (
                  <div
                    key={card.label}
                    className="rounded-[24px] border border-brand-soft bg-white/85 p-5 text-left shadow-card backdrop-blur"
                  >
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-sky text-brand-secondary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-semibold text-slate-500">{card.label}</p>
                    <p className="mt-1 text-base font-bold leading-6 text-slate-900">{card.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

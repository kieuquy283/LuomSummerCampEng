import { ArrowRight, Sparkles } from 'lucide-react';

import FloatingVolunteerCards from './FloatingVolunteerCards';
import { activities, site } from '../data/programData';

const Hero = () => {
  return (
    <section
      id="gioi-thieu"
      className="relative flex min-h-[calc(100svh-5rem)] items-start overflow-hidden bg-brand-navy pb-10 pt-20 text-white sm:pb-14 sm:pt-24"
    >
      <div className="absolute inset-0 opacity-70">
        <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-brand-deep blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-brand-cyan blur-[150px] opacity-20" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 md:-translate-y-4 lg:grid-cols-[minmax(0,1fr)_30rem] lg:gap-12 lg:-translate-y-6">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-brand-electric/30 bg-brand-electric/10 px-3 py-2 text-xs font-semibold text-brand-cyan backdrop-blur sm:px-4 sm:text-sm">
              <Sparkles className="mr-2 h-4 w-4" />
              Tuyển tình nguyện viên
            </div>

            <h1 className="max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl md:text-[3.35rem] lg:text-[4.1rem]">
              {site.headline}
            </h1>

            <p className="mt-6 max-w-3xl text-justify text-sm leading-[1.5] text-slate-200 sm:text-base sm:leading-[1.55] md:text-lg">
              {site.heroSubtitle}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {activities.map((activity) => (
                <span
                  key={activity.id}
                  className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 backdrop-blur"
                >
                  {activity.heroTag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a
                href="#dang-ky-truc-tiep"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand-yellow px-6 py-3.5 text-base font-bold text-brand-navy shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all hover:-translate-y-0.5 hover:bg-brand-yellow-hover sm:w-auto sm:px-8 sm:py-4"
              >
                Đăng ký TNV
              </a>
              <a
                href="#bo-phan-tuyen"
                className="group inline-flex min-h-11 w-full items-center justify-center rounded-full border border-slate-500 bg-transparent px-6 py-3.5 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:border-white hover:bg-white/5 sm:w-auto sm:px-8 sm:py-4"
              >
                Xem vị trí phù hợp
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[30rem] lg:justify-self-end">
            <FloatingVolunteerCards />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

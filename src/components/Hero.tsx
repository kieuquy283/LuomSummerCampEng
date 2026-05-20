import { ArrowRight, Sparkles } from 'lucide-react';

import { registrationLink } from '../data/programData';

const Hero = () => {
  return (
    <section
      id="gioi-thieu"
      className="relative flex min-h-screen items-start overflow-hidden bg-brand-navy pt-28 text-white"
    >
      <div className="absolute inset-0 opacity-70">
        <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-brand-deep blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-brand-cyan blur-[150px] opacity-20" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-brand-electric/30 bg-brand-electric/10 px-4 py-2 text-sm font-semibold text-brand-cyan backdrop-blur">
            <Sparkles className="mr-2 h-4 w-4" />
            Tuyển tình nguyện viên
          </div>

          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            Trở thành tình nguyện viên Lượm Summer Camp 2026
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 md:text-xl">
            Đội Dạy học tình nguyện phường Vĩnh Phúc tìm kiếm tình nguyện viên đồng hành chiến
            dịch mùa hè. Mang kiến thức Công nghệ và Ngoại ngữ đến gần hơn với học sinh Tiểu học
            &amp; THCS!
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-yellow px-8 py-4 text-base font-bold text-brand-navy shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all hover:-translate-y-0.5 hover:bg-brand-yellow-hover"
            >
              Đăng ký TNV
            </a>
            <a
              href="#vi-tri-phu-hop"
              className="group inline-flex min-h-11 items-center justify-center rounded-full border border-slate-500 bg-transparent px-8 py-4 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:border-white hover:bg-white/5"
            >
              Xem vị trí phù hợp
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

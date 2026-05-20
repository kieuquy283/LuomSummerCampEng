import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Heart,
  Laptop,
  MessageCircleMore,
  Sparkles,
  Users,
} from 'lucide-react';

import { heroCards, registrationLink, site } from '../data/programData';

const icons = [Users, Laptop, BookOpen, GraduationCap];

const Hero = () => {
  return (
    <section
      id="gioi-thieu"
      className="relative overflow-hidden bg-brand-navy pb-24 pt-16 text-white"
    >
      <div className="absolute inset-0 opacity-70">
        <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-brand-deep blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-brand-cyan blur-[150px] opacity-20" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-6 inline-flex items-center rounded-full border border-brand-electric/30 bg-brand-electric/10 px-4 py-2 text-sm font-semibold text-brand-cyan backdrop-blur">
              <Sparkles className="mr-2 h-4 w-4" />
              {site.eventName} • Tuyển tình nguyện viên
            </div>

            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              Trở thành tình nguyện viên Lượm Summer Camp 2026
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 md:text-xl">
              Cùng Lượm mang những giờ học công nghệ số và tiếng Anh đầy cảm hứng đến với học
              sinh địa phương trong mùa hè này.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-yellow px-8 py-4 text-base font-bold text-brand-navy shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all hover:-translate-y-0.5 hover:bg-brand-yellow-hover"
              >
                Đăng ký làm TNV
              </a>
              <a
                href="#vi-tri-phu-hop"
                className="group inline-flex min-h-11 items-center justify-center rounded-full border border-slate-500 bg-transparent px-8 py-4 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:border-white hover:bg-white/5"
              >
                Xem vị trí phù hợp
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {heroCards.map((card, index) => {
                const Icon = icons[index];

                return (
                  <div
                    key={card.label}
                    className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:bg-white/10"
                  >
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-brand-cyan">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-semibold text-slate-200">{card.label}</p>
                    <p className="mt-1 text-base font-bold leading-6 text-white">{card.value}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative hidden min-h-[520px] lg:block">
            <div className="absolute left-12 top-12 flex h-28 w-28 items-center justify-center rounded-[28px] bg-brand-electric/15 text-brand-cyan ring-1 ring-brand-electric/20 backdrop-blur">
              <Laptop className="h-12 w-12" />
            </div>
            <div className="absolute right-6 top-24 flex h-24 w-24 items-center justify-center rounded-full bg-brand-yellow/15 text-brand-yellow ring-1 ring-brand-yellow/20 backdrop-blur">
              <Heart className="h-10 w-10" />
            </div>
            <div className="absolute left-20 top-44 rounded-[32px] border border-brand-electric/30 bg-brand-deep/40 p-7 shadow-2xl backdrop-blur-md">
              <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-cyan/20 text-brand-cyan">
                  <Laptop className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-cyan">
                    Đội 1
                  </p>
                  <p className="text-2xl font-bold">Năng lực số</p>
                </div>
              </div>
              <p className="max-w-xs text-sm leading-7 text-slate-200">
                Internet an toàn, kỹ năng số cơ bản, công cụ học tập số và AI cho học sinh THCS.
              </p>
            </div>

            <div className="absolute bottom-16 right-0 rounded-[32px] border border-brand-cyan/30 bg-brand-deep/40 p-7 shadow-2xl backdrop-blur-md">
              <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-yellow/20 text-brand-yellow">
                  <MessageCircleMore className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-yellow">
                    Đội 2
                  </p>
                  <p className="text-2xl font-bold">Tiếng Anh</p>
                </div>
              </div>
              <p className="max-w-xs text-sm leading-7 text-slate-200">
                Giao tiếp tiếng Anh qua trò chơi, bài hát, flashcard và hoạt động nhóm dành cho
                học sinh tiểu học.
              </p>
            </div>

            <div className="absolute bottom-48 left-0 rounded-full border border-brand-cyan/30 bg-brand-navy/80 px-5 py-3 text-sm font-semibold text-slate-100 backdrop-blur">
              <Users className="mr-2 inline h-4 w-4" />
              2 đội tuyển • 1 chiến dịch chung
            </div>
            <div className="absolute right-12 top-12 rounded-full border border-brand-electric/30 bg-brand-navy/80 px-5 py-3 text-sm font-semibold text-slate-100 backdrop-blur">
              <BookOpen className="mr-2 inline h-4 w-4" />
              Giáo dục cộng đồng
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

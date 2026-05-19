import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Globe2,
  MapPin,
  Megaphone,
  MessageCircleMore,
  MicVocal,
  Pencil,
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
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center rounded-full border border-brand-strong bg-white/80 px-4 py-2 text-sm font-semibold text-brand-primary shadow-sm">
              <span className="mr-2 inline-flex h-2.5 w-2.5 rounded-full bg-brand-primary" />
              Dự án {program.projectName}
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-secondary">
              {program.shortTeamName}
            </p>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
              Dự án Giáo dục nâng cao năng lực ngoại ngữ - Đội Áo Xanh Anh ngữ phường Vĩnh Phúc
            </h1>

            <p className="mb-8 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl lg:mx-0">
              Với mong muốn lan tỏa kiến thức ngoại ngữ và khơi dậy tư duy hội nhập cho các em học
              sinh, Đội Áo Xanh Anh ngữ phường Vĩnh Phúc được thành lập như một hoạt động tình
              nguyện hè ý nghĩa tại địa phương. Đây là cơ hội để các bạn trẻ cùng đóng góp sức trẻ,
              sự nhiệt huyết và tinh thần trách nhiệm của mình vào việc hỗ trợ học sinh tiếp cận
              tiếng Anh một cách gần gũi, tự tin và hiệu quả hơn.
            </p>

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

          <div className="relative lg:min-h-[560px]">
            <div className="relative overflow-hidden rounded-[32px] border border-brand-soft bg-white/85 p-6 shadow-card backdrop-blur sm:p-8">
              <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-r from-brand-secondary/10 via-brand-accent/15 to-brand-primary/10" />
              <div className="relative">
                <div className="mb-6 inline-flex items-center rounded-full bg-brand-warm px-4 py-2 text-sm font-semibold text-brand-orange">
                  Lớp tiếng Anh giao tiếp mùa hè
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-brand-soft bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-sky text-brand-secondary">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-500">Chủ đề gần gũi</p>
                        <p className="font-bold text-slate-900">Bản thân, gia đình, trường lớp</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm font-semibold">
                      <span className="rounded-full bg-brand-mint px-3 py-1 text-brand-primary">Flashcard</span>
                      <span className="rounded-full bg-brand-sky px-3 py-1 text-brand-secondary">Mini game</span>
                      <span className="rounded-full bg-brand-warm px-3 py-1 text-brand-orange">Bài hát</span>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-brand-soft bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-mint text-brand-primary">
                        <Globe2 className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-500">Tinh thần hội nhập</p>
                        <p className="font-bold text-slate-900">Tự tin sử dụng tiếng Anh</p>
                      </div>
                    </div>
                    <p className="text-sm leading-7 text-slate-600">
                      Mỗi buổi học được thiết kế để học sinh cảm thấy gần gũi, hứng thú và dám cất
                      tiếng nói tiếng Anh nhiều hơn.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                  <div className="relative rounded-[28px] bg-gradient-to-br from-brand-primary to-brand-secondary p-6 text-white shadow-cta">
                    <div className="mb-5 flex items-center gap-3">
                      <MessageCircleMore className="h-7 w-7" />
                      <p className="text-lg font-bold">Một mùa hè nhiều giá trị</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-2xl bg-white/15 p-4">
                        <Users className="mb-3 h-6 w-6" />
                        <p className="text-sm font-semibold">Làm việc nhóm</p>
                      </div>
                      <div className="rounded-2xl bg-white/15 p-4">
                        <MicVocal className="mb-3 h-6 w-6" />
                        <p className="text-sm font-semibold">Hoạt động nói</p>
                      </div>
                      <div className="rounded-2xl bg-white/15 p-4">
                        <Pencil className="mb-3 h-6 w-6" />
                        <p className="text-sm font-semibold">Thiết kế bài giảng</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="rounded-[24px] border border-brand-strong bg-brand-mint p-5">
                      <p className="mb-2 text-sm font-semibold text-brand-primary">Được tập huấn trước</p>
                      <p className="text-base font-bold text-slate-900">
                        Trang bị kỹ năng sư phạm, quản lý lớp và thống nhất giáo án trước khi đứng lớp
                      </p>
                    </div>
                    <div className="rounded-[24px] border border-brand-soft bg-white p-5">
                      <p className="mb-2 text-sm font-semibold text-brand-orange">Chứng nhận cộng đồng</p>
                      <p className="text-base font-bold text-slate-900">
                        Ghi nhận đóng góp tích cực từ Đoàn thanh niên phường Vĩnh Phúc
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

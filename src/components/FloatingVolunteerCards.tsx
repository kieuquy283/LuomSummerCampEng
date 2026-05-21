import { BadgeDollarSign, BookOpen, Cpu, Megaphone, MessageSquare } from 'lucide-react';

type StaticCardProps = {
  icon: React.ReactNode;
  title: string;
  accentClass: string;
  iconClass: string;
};

const StaticCard = ({ icon, title, accentClass, iconClass }: StaticCardProps) => {
  return (
    <article className="flex min-h-[10.5rem] flex-col items-center justify-center rounded-[26px] border border-cyan-400/24 bg-slate-950/90 p-4 text-center text-white shadow-[0_18px_45px_rgba(2,6,23,0.52),0_0_35px_rgba(34,211,238,0.14)] backdrop-blur-xl">
      <div
        className={`mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[18px] border border-white/10 shadow-[0_0_28px_rgba(34,211,238,0.14)] sm:h-14 sm:w-14 ${accentClass} ${iconClass}`}
      >
        {icon}
      </div>
      <p className="text-sm font-extrabold leading-tight sm:text-base">{title}</p>
    </article>
  );
};

const FloatingVolunteerCards = () => {
  return (
    <div className="relative mx-auto w-full max-w-[24rem] sm:max-w-[27rem] lg:max-w-[30rem]">
      <div className="relative h-[25rem] overflow-visible sm:h-[27rem] lg:h-[31rem]">
        <div className="absolute inset-0 rounded-[42px] bg-[radial-gradient(circle_at_42%_48%,rgba(37,99,235,0.34),rgba(14,165,233,0.16)_28%,rgba(15,23,42,0.04)_55%,transparent_76%)]" />
        <div className="absolute left-[40%] top-[48%] h-[56%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-[36%] bg-brand-electric/30 blur-[88px]" />
        <div className="absolute left-[41%] top-[49%] h-[42%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-[34%] bg-brand-cyan/24 blur-[62px]" />
        <div className="absolute right-[10%] bottom-[10%] h-[40%] w-[40%] rounded-full border border-cyan-300/12" />
        <div className="absolute right-[4%] bottom-[2%] h-[52%] w-[52%] rounded-full border border-cyan-400/10" />
        <div className="absolute left-[20%] top-[55%] h-px w-[56%] border-t border-dashed border-cyan-300/14" />
        <div className="absolute left-[48%] top-[25%] h-[52%] w-px border-l border-dashed border-cyan-300/12" />
        <div className="absolute right-[10%] top-[16%] grid grid-cols-4 gap-1 opacity-20">
          {Array.from({ length: 12 }).map((_, index) => (
            <span key={index} className="h-1 w-1 rounded-full bg-cyan-200/75" />
          ))}
        </div>
        <div className="absolute bottom-[18%] left-[14%] grid grid-cols-5 gap-1 opacity-14">
          {Array.from({ length: 15 }).map((_, index) => (
            <span key={index} className="h-1 w-1 rounded-full bg-sky-300/70" />
          ))}
        </div>
        <div className="absolute right-[18%] bottom-[18%] h-2.5 w-2.5 rounded-full bg-cyan-300/75 shadow-[0_0_18px_rgba(34,211,238,0.7)]" />

        <div className="absolute left-1/2 top-[3%] z-10 -translate-x-1/2 sm:top-[5%]">
          <div className="min-w-max whitespace-nowrap rounded-[18px] border border-brand-yellow/28 bg-slate-900/94 px-4 py-2.5 text-white shadow-[0_18px_45px_rgba(2,6,23,0.48),0_0_28px_rgba(251,191,36,0.1)] backdrop-blur-xl sm:px-5 sm:py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-brand-yellow/30 bg-brand-yellow/12 text-brand-yellow shadow-[0_0_18px_rgba(251,191,36,0.2)] sm:h-9 sm:w-9">
                <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
              <p className="whitespace-nowrap text-sm font-semibold leading-4 sm:text-[15px]">
                Trở thành tình nguyện viên!
              </p>
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 top-[63%] grid w-full max-w-[20rem] -translate-x-1/2 -translate-y-1/2 grid-cols-2 gap-4 sm:top-[58%] sm:max-w-[22rem] sm:gap-5">
          <StaticCard
            icon={<Cpu className="h-7 w-7 sm:h-8 sm:w-8" />}
            title="Bình dân học vụ số"
            accentClass="bg-brand-electric/14"
            iconClass="text-cyan-200"
          />
          <StaticCard
            icon={<BookOpen className="h-7 w-7 sm:h-8 sm:w-8" />}
            title="Áo xanh Anh ngữ"
            accentClass="bg-emerald-400/10"
            iconClass="text-emerald-200"
          />
          <StaticCard
            icon={<BadgeDollarSign className="h-7 w-7 sm:h-8 sm:w-8" />}
            title="Hậu cần - Tài chính"
            accentClass="bg-brand-yellow/14"
            iconClass="text-brand-yellow"
          />
          <StaticCard
            icon={<Megaphone className="h-7 w-7 sm:h-8 sm:w-8" />}
            title="Truyền thông"
            accentClass="bg-fuchsia-400/10"
            iconClass="text-fuchsia-200"
          />
        </div>
      </div>
    </div>
  );
};

export default FloatingVolunteerCards;

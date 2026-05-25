import { Cpu, HandHeart, Megaphone, MessageSquare, Wrench } from 'lucide-react';

import { heroVisualCards } from '../data/programData';

type StaticCardProps = {
  icon: React.ReactNode;
  title: string;
  accentClass: string;
  iconClass: string;
  className?: string;
};

const StaticCard = ({ icon, title, accentClass, iconClass, className = '' }: StaticCardProps) => {
  return (
    <article
      className={`flex min-h-[8.5rem] flex-col items-center justify-center rounded-[24px] border border-cyan-400/24 bg-slate-950/90 p-3.5 text-center text-white shadow-[0_18px_45px_rgba(2,6,23,0.52),0_0_35px_rgba(34,211,238,0.14)] backdrop-blur-xl sm:min-h-[9rem] sm:p-4 ${className}`}
    >
      <div
        className={`mx-auto mb-3 inline-flex h-11 w-11 items-center justify-center rounded-[16px] border border-white/10 shadow-[0_0_28px_rgba(34,211,238,0.14)] sm:mb-3.5 sm:h-12 sm:w-12 ${accentClass} ${iconClass}`}
      >
        {icon}
      </div>
      <p className="text-[13px] font-extrabold leading-tight sm:text-[15px]">{title}</p>
    </article>
  );
};

const iconMap = {
  emerald: <Cpu className="h-7 w-7 sm:h-8 sm:w-8" />,
  cyan: <Cpu className="h-7 w-7 sm:h-8 sm:w-8" />,
  blue: <Wrench className="h-7 w-7 sm:h-8 sm:w-8" />,
  pink: <Megaphone className="h-7 w-7 sm:h-8 sm:w-8" />,
  amber: <HandHeart className="h-7 w-7 sm:h-8 sm:w-8" />,
} as const;

const toneClassMap = {
  emerald: {
    accentClass: 'bg-emerald-400/10',
    iconClass: 'text-emerald-200',
  },
  cyan: {
    accentClass: 'bg-brand-electric/14',
    iconClass: 'text-cyan-200',
  },
  blue: {
    accentClass: 'bg-sky-400/12',
    iconClass: 'text-sky-200',
  },
  pink: {
    accentClass: 'bg-fuchsia-400/10',
    iconClass: 'text-fuchsia-200',
  },
  amber: {
    accentClass: 'bg-amber-400/14',
    iconClass: 'text-amber-200',
  },
} as const;

const FloatingVolunteerCards = () => {
  return (
    <div className="relative mx-auto w-full max-w-[21rem] sm:max-w-[23rem] lg:max-w-[24rem]">
      <div className="relative overflow-visible px-2 pb-2 pt-16 sm:px-2.5 sm:pb-2.5 sm:pt-20">
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
          <div className="min-w-max whitespace-nowrap rounded-[18px] border border-brand-yellow/28 bg-slate-900/94 px-3.5 py-2 text-white shadow-[0_18px_45px_rgba(2,6,23,0.48),0_0_28px_rgba(251,191,36,0.1)] backdrop-blur-xl sm:px-4 sm:py-2.5">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-brand-yellow/30 bg-brand-yellow/12 text-brand-yellow shadow-[0_0_18px_rgba(251,191,36,0.2)] sm:h-8 sm:w-8">
                <MessageSquare className="h-3.5 w-3.5" />
              </div>
              <p className="whitespace-nowrap text-xs font-semibold leading-4 sm:text-sm">
                Trở thành tình nguyện viên!
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-[17rem] grid-cols-1 gap-3.5 sm:max-w-[22rem] sm:grid-cols-2 sm:gap-4 lg:max-w-[23rem]">
          {heroVisualCards.map((card) => (
            <StaticCard
              key={card.title}
              icon={iconMap[card.tone]}
              title={card.title}
              accentClass={toneClassMap[card.tone].accentClass}
              iconClass={toneClassMap[card.tone].iconClass}
              className={undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FloatingVolunteerCards;

import type { CSSProperties, ReactNode } from 'react';
import {
  BadgeDollarSign,
  BookOpen,
  Cpu,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';

type CardProps = {
  icon: ReactNode;
  title: string;
  subtitle: string;
  accentClass: string;
  iconClass: string;
  style: CSSProperties;
  duration: string;
  delay?: string;
  compact?: boolean;
};

const Card = ({
  icon,
  title,
  subtitle,
  accentClass,
  iconClass,
  style,
  duration,
  delay = '0s',
  compact = false,
}: CardProps) => {
  return (
    <div style={style} className="absolute [transform-style:preserve-3d]">
      <article
        className={`float-card group rounded-[26px] border border-cyan-400/24 bg-slate-950/90 p-4 text-center text-white shadow-[0_18px_45px_rgba(2,6,23,0.52),0_0_35px_rgba(34,211,238,0.14)] backdrop-blur-xl transition-all duration-300 ease-out will-change-transform hover:-translate-y-1.5 hover:scale-[1.03] hover:border-cyan-300/40 hover:shadow-[0_24px_60px_rgba(2,6,23,0.56),0_0_40px_rgba(34,211,238,0.24)] motion-reduce:transform-none motion-reduce:hover:transform-none ${
          compact ? 'w-[8.25rem] sm:w-[9rem] md:w-[9.5rem]' : 'w-[9.6rem] sm:w-[10.75rem] md:w-[11.4rem]'
        }`}
        style={{ animationDuration: duration, animationDelay: delay }}
      >
        <div
          className={`mb-3 inline-flex items-center justify-center rounded-[18px] border border-white/10 shadow-[0_0_28px_rgba(34,211,238,0.14)] ${
            compact ? 'h-11 w-11 sm:h-12 sm:w-12' : 'h-12 w-12 sm:h-16 sm:w-16'
          } ${accentClass} ${iconClass} mx-auto`}
        >
          {icon}
        </div>
        <p className={`${compact ? 'text-sm sm:text-base' : 'text-base sm:text-lg'} font-extrabold leading-tight`}>
          {title}
        </p>
        <p className={`mt-1 ${compact ? 'text-xs sm:text-sm' : 'text-sm'} font-semibold leading-5 text-slate-300`}>
          {subtitle}
        </p>
      </article>
    </div>
  );
};

const FloatingVolunteerCards = () => {
  return (
    <div className="relative mx-auto w-full max-w-[24rem] sm:max-w-[27rem] lg:max-w-[30rem] perspective-[1600px]">
      <div className="relative h-[25rem] overflow-visible sm:h-[27rem] lg:h-[31rem] [transform-style:preserve-3d]">
        <div className="absolute inset-0 rounded-[42px] bg-[radial-gradient(circle_at_42%_48%,rgba(37,99,235,0.34),rgba(14,165,233,0.16)_28%,rgba(15,23,42,0.04)_55%,transparent_76%)]" />
        <div className="absolute left-[40%] top-[48%] h-[56%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-[36%] bg-brand-electric/30 blur-[88px]" />
        <div className="absolute left-[41%] top-[49%] h-[42%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-[34%] bg-brand-cyan/24 blur-[62px]" />
        <div className="absolute right-[10%] bottom-[8%] h-[42%] w-[42%] rounded-full border border-cyan-300/12" />
        <div className="absolute right-[4%] bottom-[0%] h-[54%] w-[54%] rounded-full border border-cyan-400/10" />
        <div className="orbit-drift absolute right-[0%] bottom-[-1%] h-[58%] w-[58%] rounded-full border border-dashed border-cyan-300/12 motion-reduce:animate-none" />
        <div className="absolute left-[24%] top-[51%] h-px w-[14%] rotate-[-36deg] border-t border-dashed border-cyan-300/18" />
        <div className="absolute left-[36%] top-[38%] h-[12%] w-px rotate-[16deg] border-l border-dashed border-cyan-300/14" />
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
        <div className="absolute left-[9%] top-[18%] h-2.5 w-2.5 rounded-full bg-brand-yellow/70 shadow-[0_0_18px_rgba(251,191,36,0.72)]" />
        <div className="absolute right-[18%] bottom-[18%] h-2.5 w-2.5 rounded-full bg-cyan-300/75 shadow-[0_0_18px_rgba(34,211,238,0.7)]" />

        <Card
          icon={<Cpu className="h-7 w-7 sm:h-10 sm:w-10" />}
          title="AI"
          subtitle="Công nghệ số"
          accentClass="bg-brand-electric/14"
          iconClass="text-cyan-200"
          duration="5s"
          style={{
            top: '5%',
            left: '8%',
            transform: 'translate3d(0,0,34px) rotate(-8deg) rotateY(14deg) rotateX(8deg)',
          }}
        />

        <Card
          icon={<BadgeDollarSign className="h-6 w-6 sm:h-8 sm:w-8" />}
          title="Hậu cần, tài chính"
          subtitle="Điều phối hỗ trợ"
          accentClass="bg-brand-yellow/14"
          iconClass="text-brand-yellow"
          duration="5.4s"
          delay="0.2s"
          compact
          style={{
            top: '6%',
            right: '9%',
            transform: 'translate3d(0,0,24px) rotate(6deg) rotateY(-10deg) rotateX(4deg)',
          }}
        />

        <Card
          icon={<BookOpen className="h-6 w-6 sm:h-8 sm:w-8" />}
          title="English"
          subtitle="Giao tiếp tự tin"
          accentClass="bg-emerald-400/10"
          iconClass="text-emerald-200"
          duration="6.2s"
          delay="0.8s"
          compact
          style={{
            bottom: '7%',
            left: '10%',
            transform: 'translate3d(0,0,20px) rotate(-5deg) rotateY(8deg) rotateX(2deg)',
          }}
        />

        <Card
          icon={<ShieldCheck className="h-7 w-7 sm:h-10 sm:w-10" />}
          title="Không gian mạng"
          subtitle="An toàn số"
          accentClass="bg-cyan-400/12"
          iconClass="text-sky-200"
          duration="5.8s"
          delay="0.4s"
          style={{
            right: '6%',
            bottom: '7%',
            transform: 'translate3d(0,0,34px) rotate(8deg) rotateY(-13deg) rotateX(6deg)',
          }}
        />

        <div className="absolute left-1/2 top-[46%] z-10 [transform:translate3d(-50%,-50%,42px)] [transform-style:preserve-3d]">
          <div
            className="float-bubble min-w-max whitespace-nowrap rounded-[18px] border border-brand-yellow/28 bg-slate-900/94 px-4 py-2.5 text-white shadow-[0_18px_45px_rgba(2,6,23,0.48),0_0_28px_rgba(251,191,36,0.1)] backdrop-blur-xl transition-all duration-300 ease-out will-change-transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_18px_55px_rgba(2,6,23,0.52),0_0_34px_rgba(251,191,36,0.16)] motion-reduce:transform-none sm:px-5 sm:py-3"
            style={{ animationDuration: '4.8s' }}
          >
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
      </div>
    </div>
  );
};

export default FloatingVolunteerCards;

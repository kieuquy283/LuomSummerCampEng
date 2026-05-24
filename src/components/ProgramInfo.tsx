import { ArrowRight, BookOpenText, CalendarDays, MapPin, Users } from 'lucide-react';

import { teamCards } from '../data/programData';

const ProgramInfo = () => {
  return (
    <section id="hai-doi-tuyen" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-brand-cyan">
            Ba chương trình tuyển tình nguyện viên
          </p>
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl md:text-4xl">
            Một landing page chung cho ba hành trình giáo dục mùa hè
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {teamCards.map((team, index) => {
            const themeClasses =
              index === 0
              ? {
                    badge: 'bg-brand-electric/10 text-brand-electric',
                    button: 'bg-brand-yellow text-brand-navy hover:bg-brand-yellow-hover',
                    icon: 'bg-brand-electric/10 text-brand-electric',
                    ring: 'border-brand-electric',
                  }
                : {
                    badge: 'bg-brand-cyan/10 text-brand-cyan',
                    button: 'bg-brand-navy text-white hover:bg-brand-deep',
                    icon: 'bg-brand-cyan/10 text-brand-cyan',
                    ring: 'border-brand-cyan',
                  };

            return (
              <article
                key={team.title}
                className={`rounded-[24px] border-t-4 ${themeClasses.ring} bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:rounded-[32px] sm:p-8 lg:p-10`}
              >
                <span
                  className={`inline-flex rounded-full px-4 py-2 text-sm font-bold ${themeClasses.badge}`}
                >
                  {team.subtitle}
                </span>

                <h3 className="mt-6 text-2xl font-extrabold text-slate-900 sm:text-3xl">{team.title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-600 sm:leading-8">{team.description}</p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] bg-slate-50 p-5">
                    <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-2xl ${themeClasses.icon}`}>
                      <MapPin className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-semibold text-slate-500">Địa điểm</p>
                    <p className="mt-1 font-bold text-slate-900">{team.location}</p>
                  </div>
                  <div className="rounded-[24px] bg-slate-50 p-5">
                    <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-2xl ${themeClasses.icon}`}>
                      <Users className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-semibold text-slate-500">Học sinh</p>
                    <p className="mt-1 font-bold text-slate-900">{team.students}</p>
                  </div>
                  <div className="rounded-[24px] bg-slate-50 p-5">
                    <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-2xl ${themeClasses.icon}`}>
                      <CalendarDays className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-semibold text-slate-500">Thời gian</p>
                    <p className="mt-1 font-bold text-slate-900">{team.schedule}</p>
                    <p className="mt-1 text-sm text-slate-500">{team.kickoff}</p>
                  </div>
                  <div className="rounded-[24px] bg-slate-50 p-5">
                    <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-2xl ${themeClasses.icon}`}>
                      <BookOpenText className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-semibold text-slate-500">Quy mô</p>
                    <p className="mt-1 font-bold text-slate-900">{team.scale}</p>
                  </div>
                </div>

                <div className="mt-8 rounded-[20px] bg-slate-50 p-5 sm:rounded-[24px] sm:p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Vị trí tuyển
                  </p>
                  <ul className="mt-4 space-y-3 text-slate-700">
                    {team.roles.map((role) => (
                      <li key={role} className="flex gap-3">
                        <span className={`mt-2 h-2.5 w-2.5 rounded-full ${index === 0 ? 'bg-brand-electric' : 'bg-brand-cyan'}`} />
                        <span>{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={team.buttonHref}
                  className={`mt-8 inline-flex min-h-11 w-full items-center justify-center rounded-full px-6 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 sm:w-auto sm:px-7 ${themeClasses.button}`}
                >
                  {team.buttonLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProgramInfo;

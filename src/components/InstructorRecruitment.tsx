import { ArrowRight, BadgeCheck, ClipboardList, Presentation, Users } from 'lucide-react';

import { positions, registrationLink } from '../data/programData';

const InstructorRecruitment = () => {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,_#ffffff_0%,_#eff6ff_100%)] py-24" id="vi-tri-tnv">
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-brand-sky blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-brand-mint blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 text-xl font-semibold uppercase tracking-[0.2em] text-brand-secondary">
            Tìm kiếm Tình nguyện viên ở các vị trí
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {positions.map((position, index) => {
            const Icon = index === 0 ? Presentation : Users;

            return (
              <article
                key={position.title}
                className="rounded-[28px] border border-brand-soft bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover lg:p-10"
              >
                <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${index === 0 ? 'bg-brand-sky text-brand-secondary' : 'bg-brand-mint text-brand-primary'}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold leading-snug text-slate-900">{position.title}</h3>
                      <p className="mt-2 text-sm font-semibold text-slate-500">Vai trò nòng cốt trong lớp học</p>
                    </div>
                  </div>
                  <span className={`inline-flex rounded-full px-4 py-2 text-sm font-bold ${index === 0 ? 'bg-brand-sky text-brand-secondary' : 'bg-brand-warm text-brand-orange'}`}>
                    {position.badge}
                  </span>
                </div>

                <div className="grid gap-8">
                  <div>
                    <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
                      <ClipboardList className="h-5 w-5 text-brand-secondary" />
                      Nhiệm vụ
                    </h4>
                    <ul className="space-y-3 text-base leading-7 text-slate-600">
                      {position.tasks.map((task) => (
                        <li key={task} className="flex gap-3">
                          <span className="mt-2 h-2.5 w-2.5 rounded-full bg-brand-primary" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
                      <BadgeCheck className="h-5 w-5 text-brand-primary" />
                      Yêu cầu
                    </h4>
                    <ul className="space-y-3 text-base leading-7 text-slate-600">
                      {position.requirements.map((requirement) => (
                        <li key={requirement} className="flex gap-3">
                          <span className="mt-2 h-2.5 w-2.5 rounded-full bg-brand-accentDark" />
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href={registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-primary px-10 py-4 text-base font-bold text-white shadow-cta transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-primaryDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-4"
          >
            Đăng ký ngay
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstructorRecruitment;

import { BadgeCheck, Megaphone, MonitorCog, Wrench } from 'lucide-react';

import { type DepartmentId, departments } from '../data/programData';

const iconMap: Record<DepartmentId, typeof MonitorCog> = {
  'tin-hoc-ky-thuat': MonitorCog,
  'truyen-thong': Megaphone,
  'ho-tro': Wrench,
};

const RecruitmentDepartments = () => {
  return (
    <section id="bo-phan-tuyen" className="relative overflow-hidden bg-brand-navy py-16 text-white sm:py-24">
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand-electric blur-[150px] opacity-20" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-4xl text-center sm:mb-12">
          <h2 className="text-2xl font-extrabold uppercase tracking-[0.18em] text-brand-cyan sm:text-3xl md:text-4xl">
            Các vị trí tìm kiếm
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {departments.map((department) => {
            const Icon = iconMap[department.id];

            return (
              <article
                key={department.id}
                className="flex h-full flex-col rounded-[28px] border border-white/10 bg-brand-deep/40 p-6 shadow-2xl backdrop-blur-md sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-brand-electric/20 text-brand-electric">
                    <Icon className="h-7 w-7" />
                  </div>
                </div>

                <h3 className="mt-6 text-2xl font-extrabold">{department.title}</h3>
                <p className="mt-4 leading-7 text-slate-300">{department.description}</p>

                {department.subRoles ? (
                  <div className="mt-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-cyan">
                      Vai trò
                    </p>
                    <ul className="mt-3 space-y-3 text-slate-200">
                      {department.subRoles.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-2.5 w-2.5 rounded-full bg-brand-yellow" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {department.fields ? (
                  <div className="mt-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-cyan">
                      Lĩnh vực
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {department.fields.map((field) => (
                        <span
                          key={field}
                          className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold text-slate-100"
                        >
                          {field}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {department.tasks ? (
                  <div className="mt-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-cyan">
                      Công việc
                    </p>
                    <ul className="mt-3 space-y-3 text-slate-200">
                      {department.tasks.map((task) => (
                        <li key={task} className="flex gap-3">
                          <span className="mt-2 h-2.5 w-2.5 rounded-full bg-brand-yellow" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-6 flex-1">
                  <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-green-300">
                    <BadgeCheck className="h-4 w-4" />
                    Yêu cầu
                  </p>
                  <ul className="mt-3 space-y-3 text-slate-200">
                    {department.requirements.map((requirement) => (
                      <li key={requirement} className="flex gap-3">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-brand-cyan" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecruitmentDepartments;

import { ArrowRight, CalendarDays } from 'lucide-react';

import { activities, departments } from '../data/programData';

const departmentNameMap = Object.fromEntries(
  departments.map((department) => [department.id, department.title]),
);

const Activities = () => {
  return (
    <section id="hoat-dong" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-brand-cyan">
            Hoạt động chính
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {activities.map((activity, index) => (
            <article
              key={activity.id}
              id={activity.id}
              className={`rounded-[28px] border bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8 ${
                index === 0
                  ? 'border-emerald-200'
                  : index === 1
                    ? 'border-cyan-200'
                    : 'border-sky-200'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
                  {activity.time}
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-navy text-white">
                  <CalendarDays className="h-5 w-5" />
                </div>
              </div>

              <h3 className="mt-6 text-2xl font-extrabold text-slate-900">{activity.title}</h3>
              <p className="mt-2 text-sm font-semibold text-brand-cyan">
                {activity.orderNote ?? 'Hoạt động chính của chiến dịch'}
              </p>
              <p className="mt-4 leading-7 text-slate-600">{activity.description}</p>

              <div className="mt-6">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Bộ phận liên quan
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activity.relatedDepartments.map((departmentId) => (
                    <span
                      key={departmentId}
                      className="inline-flex rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700"
                    >
                      {departmentNameMap[departmentId]}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href="#dang-ky-truc-tiep"
                className="mt-8 inline-flex min-h-11 items-center rounded-full bg-brand-yellow px-5 py-3 text-sm font-bold text-brand-navy transition-all hover:-translate-y-0.5 hover:bg-brand-yellow-hover"
              >
                Đăng ký TNV
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Activities;

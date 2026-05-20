import { BadgeCheck, ClipboardList, Laptop, MessageCircleMore, Users } from 'lucide-react';

import { recruitmentGroups } from '../data/programData';

const InstructorRecruitment = () => {
  return (
    <section
      id="vi-tri-phu-hop"
      className="relative overflow-hidden bg-brand-navy py-24"
    >
      <div className="absolute top-0 right-0 h-full w-1/2 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand-electric blur-[150px] opacity-20"></div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-brand-cyan">
            Chi tiết vị trí tuyển dụng
          </p>
          <h2 className="text-3xl font-extrabold text-white md:text-4xl">
            Chọn đội phù hợp với năng lực và cách bạn muốn đóng góp
          </h2>
        </div>

        <div className="space-y-10">
          {recruitmentGroups.map((group, groupIndex) => {
            const isDigital = group.theme === 'digital';
            const titleBoxClass = isDigital
              ? 'border-brand-electric/30 bg-brand-deep/40'
              : 'border-brand-cyan/30 bg-brand-deep/40';
            const accentClass = isDigital ? 'text-brand-cyan' : 'text-brand-yellow';
            const iconBoxClass = isDigital
              ? 'bg-brand-electric/20 text-brand-electric'
              : 'bg-brand-cyan/20 text-brand-cyan';
            const dotClass = isDigital ? 'bg-brand-electric' : 'bg-brand-cyan';
            const Icon = groupIndex === 0 ? Laptop : MessageCircleMore;

            return (
              <div key={group.title} id={group.id} className="space-y-6">
                <div className={`rounded-[32px] border p-8 shadow-2xl backdrop-blur-md ${titleBoxClass}`}>
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`flex h-16 w-16 items-center justify-center rounded-3xl ${iconBoxClass}`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-extrabold text-white">{group.title}</h3>
                        <p className={`mt-2 text-base font-semibold ${accentClass}`}>{group.subtitle}</p>
                      </div>
                    </div>
                    <div className="rounded-full bg-white/10 px-5 py-3 text-sm font-bold text-slate-100 shadow-sm backdrop-blur">
                      {group.positions.reduce((sum, position) => sum + Number.parseInt(position.quantity, 10), 0)}{' '}
                      vị trí mở
                    </div>
                  </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                  {group.positions.map((position, positionIndex) => (
                    <article
                      key={position.title}
                      className="rounded-[28px] border border-white/10 bg-brand-deep/40 p-8 shadow-2xl backdrop-blur-md"
                    >
                      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBoxClass}`}>
                            {positionIndex === 0 ? (
                              <ClipboardList className="h-7 w-7" />
                            ) : (
                              <Users className="h-7 w-7" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-2xl font-bold leading-snug text-white">
                              {position.title}
                            </h4>
                            <p className={`mt-2 text-sm font-semibold ${accentClass}`}>
                              Số lượng: {position.quantity}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-8">
                        <div>
                          <h5 className="mb-4 flex items-center gap-2 text-lg font-bold text-brand-yellow">
                            <ClipboardList className={`h-5 w-5 ${accentClass}`} />
                            Nhiệm vụ
                          </h5>
                          <ul className="space-y-3 leading-7 text-slate-300">
                            {position.tasks.map((task) => (
                              <li key={task} className="flex gap-3">
                                <span className={`mt-2 h-2.5 w-2.5 rounded-full ${dotClass}`} />
                                <span>{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="mb-4 flex items-center gap-2 text-lg font-bold text-green-400">
                            <BadgeCheck className={`h-5 w-5 ${accentClass}`} />
                            Yêu cầu
                          </h5>
                          <ul className="space-y-3 leading-7 text-slate-300">
                            {position.requirements.map((requirement) => (
                              <li key={requirement} className="flex gap-3">
                                <span className={`mt-2 h-2.5 w-2.5 rounded-full ${dotClass}`} />
                                <span>{requirement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InstructorRecruitment;

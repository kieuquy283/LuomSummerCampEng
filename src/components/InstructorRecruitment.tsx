import { useState } from 'react';
import { BadgeCheck, ClipboardList, Laptop, MessageCircleMore, Users } from 'lucide-react';

import { recruitmentGroups as defaultRecruitmentGroups } from '../data/programData';

type RecruitmentPosition = {
  title: string;
  quantity: string;
  tasks: string[];
  requirements: string[];
};

type RecruitmentGroup = {
  id: string;
  title: string;
  subtitle: string;
  theme: string;
  positions: RecruitmentPosition[];
};

type InstructorRecruitmentProps = {
  groups?: RecruitmentGroup[];
  eyebrow?: string;
  title?: string;
};

const InstructorRecruitment = ({
  groups = defaultRecruitmentGroups,
  eyebrow = 'Vị trí tìm kiếm',
  title,
}: InstructorRecruitmentProps) => {
  const [selectedGroupId, setSelectedGroupId] = useState(groups[0]?.id ?? '');
  const selectedGroups =
    groups.length > 1
      ? groups.filter((group) => group.id === selectedGroupId)
      : groups;

  return (
    <section
      id="vi-tri-phu-hop"
      className="relative overflow-hidden bg-brand-navy py-16 sm:py-24"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand-electric blur-[150px] opacity-20" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-4xl text-center sm:mb-12">
          <p className="mb-3 text-2xl font-extrabold uppercase tracking-[0.08em] text-brand-cyan sm:text-3xl md:text-4xl">
            {eyebrow}
          </p>
          {title ? (
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">{title}</h2>
          ) : null}
        </div>

        {groups.length > 1 ? (
          <div className="mb-10 flex flex-col items-stretch justify-center gap-3 sm:mb-12 sm:flex-row sm:items-center sm:gap-4">
            {groups.map((group) => {
              const isActive = group.id === selectedGroupId;
              const isDigital = group.theme === 'digital';
              const activeClass = isDigital
                ? 'border-brand-electric bg-brand-electric text-brand-navy'
                : 'border-brand-cyan bg-brand-cyan text-brand-navy';

              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setSelectedGroupId(group.id)}
                  className={`inline-flex min-h-11 w-full items-center justify-center rounded-full border px-5 py-3 text-sm font-bold transition-all sm:w-auto sm:px-6 ${
                    isActive
                      ? activeClass
                      : 'border-white/20 bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  {group.title}
                </button>
              );
            })}
          </div>
        ) : null}

        <div className="space-y-10">
          {selectedGroups.map((group) => {
            const isDigital = group.theme === 'digital';
            const titleBoxClass = isDigital
              ? 'border-brand-electric/30 bg-brand-deep/40'
              : 'border-brand-cyan/30 bg-brand-deep/40';
            const accentClass = isDigital ? 'text-brand-cyan' : 'text-brand-yellow';
            const iconBoxClass = isDigital
              ? 'bg-brand-electric/20 text-brand-electric'
              : 'bg-brand-cyan/20 text-brand-cyan';
            const dotClass = isDigital ? 'bg-brand-electric' : 'bg-brand-cyan';
            const Icon = isDigital ? Laptop : MessageCircleMore;

            return (
              <div key={group.title} id={group.id} className="space-y-6">
                <div className={`rounded-[24px] border p-5 shadow-2xl backdrop-blur-md sm:rounded-[32px] sm:p-8 ${titleBoxClass}`}>
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-3xl sm:h-16 sm:w-16 ${iconBoxClass}`}>
                        <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-extrabold text-white sm:text-3xl">{group.title}</h3>
                        <p className={`mt-2 text-base font-semibold ${accentClass}`}>{group.subtitle}</p>
                      </div>
                    </div>
                    <div className="w-full rounded-full bg-white/10 px-4 py-3 text-center text-sm font-bold text-slate-100 shadow-sm backdrop-blur sm:w-auto sm:px-5">
                      {group.positions.reduce((sum, position) => sum + Number.parseInt(position.quantity, 10), 0)} vị trí mở
                    </div>
                  </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                  {group.positions.map((position, positionIndex) => (
                    <article
                      key={position.title}
                      className={`rounded-[24px] border border-white/10 bg-brand-deep/40 p-5 shadow-2xl backdrop-blur-md sm:rounded-[28px] sm:p-8 ${
                        group.positions.length === 1 ||
                        position.title === 'TNV thiết kế ấn phẩm'
                          ? 'lg:col-span-2'
                          : ''
                      }`}
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
                            <h4 className="text-xl font-bold leading-snug text-white sm:text-2xl">
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

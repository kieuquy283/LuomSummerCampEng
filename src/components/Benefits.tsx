import { Award, BriefcaseBusiness, HeartHandshake, Users } from 'lucide-react';

import { benefits } from '../data/programData';

const styles = [
  {
    icon: BriefcaseBusiness,
    iconClass: 'text-brand-electric',
    boxClass: 'bg-brand-electric/10',
    borderClass: 'border-brand-electric',
  },
  {
    icon: Award,
    iconClass: 'text-brand-cyan',
    boxClass: 'bg-brand-cyan/10',
    borderClass: 'border-brand-cyan',
  },
  {
    icon: Users,
    iconClass: 'text-green-500',
    boxClass: 'bg-green-500/10',
    borderClass: 'border-green-500',
  },
  {
    icon: HeartHandshake,
    iconClass: 'text-brand-yellow',
    boxClass: 'bg-brand-yellow/10',
    borderClass: 'border-brand-yellow',
  },
];

const Benefits = () => {
  return (
    <section id="vi-sao-tham-gia" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-brand-cyan">
            Vì sao nên tham gia?
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = styles[index].icon;

            return (
              <article
                key={benefit.title}
                className={`rounded-2xl border-t-4 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-8 ${styles[index].borderClass}`}
              >
                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-3xl sm:mb-6 sm:h-16 sm:w-16 ${styles[index].boxClass}`}
                >
                  <Icon className={`h-7 w-7 sm:h-8 sm:w-8 ${styles[index].iconClass}`} />
                </div>
                <h3 className="mb-3 text-lg font-bold text-slate-900 sm:text-xl">{benefit.title}</h3>
                <p className="leading-7 text-slate-600">{benefit.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;

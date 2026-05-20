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
    <section id="quyen-loi" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-3xl font-extrabold uppercase tracking-[0.12em] text-brand-cyan md:text-4xl">
            Vì sao bạn nên tham gia?
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = styles[index].icon;

            return (
              <article
                key={benefit.title}
                className={`rounded-2xl border-t-4 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${styles[index].borderClass}`}
              >
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-3xl ${styles[index].boxClass}`}
                >
                  <Icon className={`h-8 w-8 ${styles[index].iconClass}`} />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">{benefit.title}</h3>
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

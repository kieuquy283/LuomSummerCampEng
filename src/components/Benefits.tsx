import { Award, Presentation, TrendingUp, Users } from 'lucide-react';

import { benefits } from '../data/programData';

const Benefits = () => {
  const styles = [
    {
      icon: <Presentation className="h-8 w-8 text-brand-secondary" />,
      borderColor: 'border-brand-secondary',
      bgColor: 'bg-brand-sky',
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-brand-primary" />,
      borderColor: 'border-brand-primary',
      bgColor: 'bg-brand-mint',
    },
    {
      icon: <Users className="h-8 w-8 text-brand-orange" />,
      borderColor: 'border-brand-orange',
      bgColor: 'bg-brand-warm',
    },
    {
      icon: <Award className="h-8 w-8 text-brand-accentDark" />,
      borderColor: 'border-brand-accent',
      bgColor: 'bg-brand-accent/20',
    },
  ];

  return (
    <section className="bg-white py-20" id="loi-ich">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 text-xl font-semibold uppercase tracking-[0.2em] text-brand-secondary">
            Tại sao nên tham gia
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit, index) => (
            <article
              key={benefit.title}
              className={`rounded-[24px] border ${styles[index].borderColor} bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-cardHover`}
            >
              <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${styles[index].bgColor}`}>
                {styles[index].icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">{benefit.title}</h3>
              <p className="leading-7 text-slate-600">{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;

import { BookOpen, Gamepad2, MessageCircleHeart, Sparkles } from 'lucide-react';

import { learningTopics } from '../data/programData';

const Curriculum = () => {
  const icons = [BookOpen, MessageCircleHeart, Gamepad2, Sparkles];
  const styles = [
    'bg-brand-sky text-brand-secondary',
    'bg-brand-mint text-brand-primary',
    'bg-brand-warm text-brand-orange',
    'bg-brand-accent/20 text-brand-accentDark',
  ];

  return (
    <section className="bg-brand-surface py-20" id="noi-dung-hoc">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-secondary">
            Nội dung chương trình
          </p>
          <h2 className="mb-4 text-3xl font-extrabold text-slate-900 md:text-4xl">
            Học sinh sẽ được học gì?
          </h2>
          <p className="text-lg leading-8 text-slate-600">
            Chương trình ưu tiên giao tiếp tự nhiên, tạo hứng thú học tập và giúp các em tự tin
            hơn khi sử dụng tiếng Anh trong các tình huống gần gũi.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {learningTopics.map((topic, index) => {
            const Icon = icons[index];

            return (
              <article
                key={topic.title}
                className="rounded-[24px] border border-brand-border bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover"
              >
                <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${styles[index]}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">{topic.title}</h3>
                <p className="text-base leading-7 text-slate-600">{topic.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Curriculum;

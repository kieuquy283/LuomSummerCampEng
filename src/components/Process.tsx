import { ClipboardPenLine, HandHeart, MessagesSquare, NotebookPen } from 'lucide-react';

import { processSteps } from '../data/programData';

const icons = [ClipboardPenLine, MessagesSquare, NotebookPen, HandHeart];

const Process = () => {
  return (
    <section className="bg-white py-20" id="quy-trinh">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-secondary">
            Quy trình tham gia
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Hành trình trở thành TNV Đội Áo Xanh Anh ngữ
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => {
            const Icon = icons[index];

            return (
              <article
                key={step.title}
                className="relative overflow-hidden rounded-[24px] border border-brand-border bg-brand-surface p-7 shadow-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-cardHover"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-mint text-brand-primary">
                  <Icon className="h-7 w-7" />
                </div>
                <span className="mb-3 inline-flex rounded-full bg-brand-warm px-3 py-1 text-sm font-semibold text-brand-orange">
                  Bước {index + 1}
                </span>
                <h3 className="mb-3 text-xl font-bold text-slate-900">{step.title}</h3>
                <p className="text-base leading-7 text-slate-600">{step.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;

import { processSteps } from '../data/programData';

const Process = () => {
  return (
    <section id="quy-trinh" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-brand-cyan">
            Quy trình tham gia
          </p>
          <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
            Bốn bước để bắt đầu một mùa hè tình nguyện cùng Lượm
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <article
              key={step.title}
              className="relative rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-navy text-lg font-extrabold text-white">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
              <p className="mt-4 leading-7 text-slate-600">{step.description}</p>
              {index < processSteps.length - 1 && (
                <div className="absolute right-[-14px] top-1/2 hidden h-0.5 w-7 -translate-y-1/2 bg-brand-cyan/30 lg:block" />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;

import { processSteps } from '../data/programData';

const Process = () => {
  return (
    <section id="quy-trinh" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-brand-cyan">
            Quy trình tham gia
          </p>
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl md:text-4xl">
            Bốn bước để bắt đầu một mùa hè tình nguyện cùng nhau
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <article
              key={step.title}
              className="relative rounded-[24px] border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-[28px] sm:p-8"
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

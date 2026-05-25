import { ArrowRight, ExternalLink, FilePenLine } from 'lucide-react';

import { registrationMethods } from '../data/programData';

const icons = [ExternalLink, FilePenLine];

const RegistrationOptions = () => {
  return (
    <section className="bg-slate-950 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <h2 className="text-2xl font-extrabold sm:text-3xl md:text-4xl">
            Chọn cách đăng ký phù hợp với bạn
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Bạn chỉ cần đăng ký một lần. BTC sẽ liên hệ lại để xác nhận hoạt động, vị trí và lịch
            tham gia phù hợp.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {registrationMethods.map((method, index) => {
            const Icon = icons[index];

            return (
              <article
                key={method.title}
                className="rounded-[28px] border border-white/10 bg-brand-deep/40 p-6 shadow-[0_22px_60px_rgba(2,6,23,0.45)] backdrop-blur-md sm:p-8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-brand-electric/20 text-brand-electric">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-2xl font-extrabold">{method.title}</h3>
                <p className="mt-4 leading-7 text-slate-300">{method.description}</p>
                <a
                  href={method.href}
                  target={method.external ? '_blank' : undefined}
                  rel={method.external ? 'noopener noreferrer' : undefined}
                  className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-brand-yellow px-6 py-3 text-sm font-bold text-brand-navy transition-all hover:-translate-y-0.5 hover:bg-brand-yellow-hover"
                >
                  {method.buttonLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RegistrationOptions;

import { ArrowRight, Globe2, HeartHandshake, PhoneCall } from 'lucide-react';

import { fanpageLink, registrationLink, site, zaloLink } from '../data/programData';

const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-24">
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/2 h-64 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-brand-electric opacity-30 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-md md:p-12">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <h2 className="text-3xl font-extrabold leading-tight text-white md:text-4xl">
                Bạn muốn dành một mùa hè rực rỡ và ý nghĩa?
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Hãy đồng hành cùng Đội dạy học tình nguyện phường Vĩnh Phúc trong chiến dịch hè năm
                nay!
              </p>

              <div className="mt-8 grid gap-4">
                <a
                  href={fanpageLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-start gap-4 rounded-[24px] border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-electric/20 text-brand-electric">
                    <Globe2 className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-400">Fanpage</p>
                    <p className="text-base font-bold text-white sm:whitespace-nowrap">
                      {site.organization}
                    </p>
                  </div>
                </a>

                <a
                  href={zaloLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-start gap-4 rounded-[24px] border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-cyan/20 text-brand-cyan">
                    <PhoneCall className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-400">Hotline/Zalo</p>
                    <p className="text-lg font-bold text-white">{site.hotline}</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="rounded-[32px] bg-brand-deep/40 p-8 text-white shadow-2xl backdrop-blur-md md:p-10">
              <div className="relative flex justify-start">
                <HeartHandshake className="absolute -inset-2 h-20 w-20 text-brand-yellow opacity-20 blur-md" />
                <HeartHandshake className="relative h-16 w-16 text-brand-yellow" />
              </div>

              <h3 className="mt-8 text-3xl font-extrabold leading-tight md:text-4xl">
                Cùng Lượm tạo nên một mùa hè giáo dục thật ý nghĩa
              </h3>
              <p className="mt-5 text-lg leading-8 text-slate-200">
                Dù bạn yêu thích công nghệ hay tiếng Anh, luôn có một vị trí phù hợp để bạn đóng
                góp và trưởng thành.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-yellow px-8 py-4 text-base font-bold text-brand-navy shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all hover:-translate-y-0.5 hover:bg-brand-yellow-hover"
                >
                  Đăng ký TNV
                </a>
                <a
                  href={fanpageLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-brand-cyan bg-transparent px-8 py-4 text-base font-bold text-brand-cyan transition-all hover:-translate-y-0.5 hover:bg-brand-cyan/10"
                >
                  Liên hệ Fanpage
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

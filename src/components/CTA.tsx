import { Globe2, HeartHandshake, PhoneCall } from 'lucide-react';

import { fanpageLink, program, registrationLink, zaloLink } from '../data/programData';

const CTA = () => {
  return (
    <section className="bg-[linear-gradient(180deg,_#ecfdf5_0%,_#ffffff_48%,_#eff6ff_100%)] py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-1">
          <div className="rounded-[32px] border border-brand-border bg-white p-8 shadow-card md:p-10">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <HeartHandshake className="absolute -inset-2 h-24 w-24 text-brand-accent/40 blur-md" />
                <HeartHandshake className="relative h-20 w-20 text-brand-accent" />
              </div>
            </div>
            <p className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-brand-secondary">
              Thông tin liên hệ
            </p>
            <h3 className="mb-6 text-center text-2xl font-extrabold text-slate-900">
              Liên hệ BTC khi cần hỗ trợ thêm
            </h3>

            <div className="grid gap-4">
              <a
                href={fanpageLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-[24px] border border-brand-soft bg-brand-surface p-5 transition-colors hover:bg-brand-sky/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-sky text-brand-secondary">
                  <Globe2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500">Fanpage</p>
                  <p className="text-lg font-bold text-slate-900">{program.organization}</p>
                </div>
              </a>

              <a
                href={zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-[24px] border border-brand-soft bg-brand-surface p-5 transition-colors hover:bg-brand-mint/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-mint text-brand-primary">
                  <PhoneCall className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500">Hotline/Zalo</p>
                  <p className="text-lg font-bold text-slate-900">{program.hotline}</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-brand-soft bg-white p-8 text-center shadow-card md:p-12">
          <h2 className="mb-5 text-3xl font-extrabold leading-tight text-slate-900 md:text-5xl">
            Sẵn sàng khoác lên mình màu áo xanh và lan tỏa tình yêu tiếng Anh?
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-lg leading-8 text-slate-600">
            Đồng hành cùng {program.shortTeamName} để tạo nên một mùa hè tích cực, chỉn chu và ý nghĩa
            cho các em học sinh tiểu học.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;

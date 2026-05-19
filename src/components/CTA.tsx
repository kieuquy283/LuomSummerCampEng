import { ArrowRight, Globe2, HeartHandshake, PhoneCall } from 'lucide-react';

import { fanpageLink, program, registrationLink, zaloLink } from '../data/programData';

const CTA = () => {
  return (
    <section className="bg-[linear-gradient(180deg,_#ecfdf5_0%,_#ffffff_48%,_#eff6ff_100%)] py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-primary to-brand-secondary p-8 text-white shadow-cta md:p-10">
            <div className="mb-6 flex justify-center lg:justify-start">
              <div className="relative">
                <HeartHandshake className="absolute -inset-2 h-24 w-24 text-brand-accent/40 blur-md" />
                <HeartHandshake className="relative h-20 w-20 text-brand-accent" />
              </div>
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
              Cách thức ứng tuyển
            </p>
            <h2 className="mb-5 text-3xl font-extrabold leading-tight md:text-4xl">
              Muốn dành trọn một mùa hè rực rỡ và ý nghĩa?
            </h2>
            <p className="mb-8 max-w-2xl text-lg leading-8 text-white/85">
              Hãy bấm trực tiếp vào link đăng ký để trở thành một phần của {program.teamName} trong
              chiến dịch tình nguyện hè năm nay.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href={registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-8 py-4 text-base font-bold text-brand-primary transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-warm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-primary"
              >
                Đăng ký ngay
              </a>
              <a
                href="#vi-tri-tnv"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/40 px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-primary"
              >
                Xem vị trí phù hợp
              </a>
            </div>
          </div>

          <div className="rounded-[32px] border border-brand-border bg-white p-8 shadow-card md:p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-secondary">
              Thông tin liên hệ
            </p>
            <h3 className="mb-6 text-2xl font-extrabold text-slate-900">Liên hệ BTC khi cần hỗ trợ thêm</h3>

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
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-secondary">
            Đăng ký tham gia
          </p>
          <h2 className="mb-5 text-3xl font-extrabold leading-tight text-slate-900 md:text-5xl">
            Sẵn sàng khoác lên mình màu áo xanh và lan tỏa tình yêu tiếng Anh?
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-lg leading-8 text-slate-600">
            Đồng hành cùng {program.shortTeamName} để tạo nên một mùa hè tích cực, chỉn chu và ý nghĩa
            cho các em học sinh tiểu học.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center justify-center rounded-full bg-brand-primary px-10 py-4 text-lg font-bold text-white shadow-cta transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-primaryDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-4"
            >
              Đăng ký TNV
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#vi-tri-tnv"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-brand-soft bg-white px-10 py-4 text-lg font-bold text-brand-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-4"
            >
              Xem vị trí phù hợp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

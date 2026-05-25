import { Globe2, HeartHandshake, PhoneCall } from 'lucide-react';

import { fanpageLink, site, zaloLink } from '../data/programData';

const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-16 sm:py-24">
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/2 h-64 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-brand-electric opacity-30 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-md sm:rounded-[36px] sm:p-8 md:p-12">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl md:text-4xl">
                Dự án “Lượm - Giáo dục vì cộng đồng” hướng tới xây dựng một môi trường nơi mỗi người
                trẻ đều có cơ hội học tập, phát triển và đóng góp giá trị tích cực cho xã hội.
              </h2>
              <p className="mt-5 text-justify text-base leading-7 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
                Chiến dịch tình nguyện hè 2026 kỳ vọng sẽ trở thành cầu nối giữa tri thức, công
                nghệ và tinh thần trách nhiệm cộng đồng của thế hệ trẻ hôm nay.
              </p>

              <div className="mt-8 grid gap-4">
                <a
                  href={fanpageLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-start gap-3 rounded-[20px] border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10 sm:gap-4 sm:rounded-[24px] sm:p-5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-electric/20 text-brand-electric">
                    <Globe2 className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-400">Fanpage</p>
                    <p className="text-base font-bold text-white">Lượm - Giáo dục vì Cộng đồng</p>
                  </div>
                </a>

                <a
                  href={zaloLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-start gap-3 rounded-[20px] border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10 sm:gap-4 sm:rounded-[24px] sm:p-5"
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

            <div className="rounded-[24px] bg-brand-deep/40 p-5 text-white shadow-2xl backdrop-blur-md sm:rounded-[32px] sm:p-8 md:p-10">
              <div className="relative flex justify-start">
                <HeartHandshake className="absolute -inset-2 h-20 w-20 text-brand-yellow opacity-20 blur-md" />
                <HeartHandshake className="relative h-16 w-16 text-brand-yellow" />
              </div>

              <h3 className="mt-6 text-2xl font-extrabold leading-tight sm:mt-8 sm:text-3xl md:text-4xl">
                Chọn hoạt động, chọn bộ phận, rồi để BTC đồng hành cùng bạn
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-200 sm:mt-5 sm:text-lg sm:leading-8">
                Nếu bạn chưa chắc mình phù hợp với Tin học + Kỹ thuật, Truyền thông hay Hỗ trợ,
                hãy ghi rõ mong muốn trong form để BTC tư vấn và phân công phù hợp.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="#dang-ky-truc-tiep"
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand-yellow px-6 py-3.5 text-base font-bold text-brand-navy shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all hover:-translate-y-0.5 hover:bg-brand-yellow-hover sm:px-8 sm:py-4"
                >
                  Đăng ký TNV
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

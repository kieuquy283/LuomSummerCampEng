import { fanpageLink, site, zaloLink } from '../data/programData';

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 pb-8 pt-12 text-slate-300 sm:pb-10 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="flex items-start gap-3 sm:items-center">
              <div className="flex flex-shrink-0 items-center gap-2">
                <img
                  src="/images/logo_doan.jpg"
                  alt="Logo Đoàn phường Vĩnh Phúc"
                  className="h-12 w-12 rounded-full bg-white p-0.5 object-contain ring-2 ring-brand-cyan/20 sm:h-14 sm:w-14"
                />
                <img
                  src="/images/logo_round.png"
                  alt="Logo Lượm"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-brand-cyan/20 sm:h-12 sm:w-12"
                />
              </div>
              <div className="min-w-0">
                <p className="text-lg font-extrabold uppercase leading-tight text-white sm:text-xl">
                  CHIẾN DỊCH TÌNH NGUYỆN HÈ 2026
                </p>
                <p className="mt-1 text-sm font-semibold text-brand-cyan">Lượm - Giáo dục vì Cộng đồng</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <a
              href={fanpageLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[20px] border border-white/10 bg-white/5 px-5 py-4 transition-colors hover:bg-white/10"
            >
              <p className="text-sm font-semibold text-slate-400">Fanpage</p>
              <p className="mt-1 text-base font-bold text-white">Lượm - Giáo dục vì Cộng đồng</p>
            </a>
            <a
              href={zaloLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[20px] border border-white/10 bg-white/5 px-5 py-4 transition-colors hover:bg-white/10"
            >
              <p className="text-sm font-semibold text-slate-400">Hotline/Zalo</p>
              <p className="mt-1 text-base font-bold text-white">{site.hotline}</p>
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 text-sm text-slate-500 sm:mt-10 sm:pt-6">
          <p>{site.organization}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

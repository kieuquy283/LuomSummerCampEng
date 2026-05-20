import { Globe2, Phone } from 'lucide-react';

import { fanpageLink, site } from '../data/programData';

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 pb-10 pt-16 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <img
                  src="/images/logo_doan.jpg"
                  alt="Logo Đoàn"
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-brand-cyan/20"
                />
                <img
                  src="/images/logo_round.png"
                  alt="Logo Lượm - Giáo dục vì cộng đồng"
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-brand-cyan/20"
                />
              </div>
              <div>
                <p className="text-xl font-extrabold uppercase text-white">ĐỘI DẠY HỌC TÌNH TUYỆN</p>
                <p className="text-sm font-semibold text-brand-cyan">Clb Trí tuệ trẻ nhân tạo</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href={fanpageLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[24px] border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
            >
              <Globe2 className="mb-3 h-5 w-5 text-brand-cyan" />
              <p className="text-sm font-semibold text-slate-400">Fanpage</p>
              <p className="mt-1 text-base font-bold text-white">Lượm - Giáo dục vì cộng đồng</p>
            </a>

            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <Phone className="mb-3 h-5 w-5 text-brand-yellow" />
              <p className="text-sm font-semibold text-slate-400">Hotline/Zalo</p>
              <p className="mt-1 text-base font-bold text-white">{site.hotline}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-slate-500">
          <p>{site.organization}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

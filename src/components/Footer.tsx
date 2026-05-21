import { site } from '../data/programData';

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
                  className="h-14 w-14 rounded-full bg-white p-0.5 object-contain ring-2 ring-brand-cyan/20"
                />
                <img
                  src="/images/logo_round.png"
                  alt="Logo Lượm - Giáo dục vì cộng đồng"
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-brand-cyan/20"
                />
              </div>
              <div>
                <p className="text-xl font-extrabold uppercase text-white">ĐỘI DẠY HỌC TÌNH NGUYỆN</p>
                <p className="text-sm font-semibold text-brand-cyan">CLB Trí tuệ trẻ Nhân tạo</p>
              </div>
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

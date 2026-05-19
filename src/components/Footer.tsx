import { CalendarDays, Globe2, MapPin, Phone } from 'lucide-react';

import { fanpageLink, program, registrationLink } from '../data/programData';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 pb-8 pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="mb-6 flex items-center">
              <img
                src="/images/logo_round.png"
                alt="Logo Lượm - Giáo dục vì Cộng đồng"
                className="mr-3 h-10 w-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight tracking-wide text-white">
                  {program.organization}
                </span>
                <span className="text-sm font-medium leading-tight text-brand-accent">
                  {program.shortTeamName}
                </span>
              </div>
            </div>
            <p className="text-sm leading-7 text-slate-400">{program.teamName}</p>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Dự án {program.projectName} dành cho học sinh tiểu học trên địa bàn phường.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">Chương trình</h4>
            <ul className="space-y-3">
              <li><a href="#gioi-thieu" className="text-sm text-slate-400 transition-colors hover:text-brand-accent">Giới thiệu</a></li>
              <li><a href="#loi-ich" className="text-sm text-slate-400 transition-colors hover:text-brand-accent">Lợi ích</a></li>
              <li><a href="#vi-tri-tnv" className="text-sm text-slate-400 transition-colors hover:text-brand-accent">Vị trí TNV</a></li>
              <li><a href="#faq" className="text-sm text-slate-400 transition-colors hover:text-brand-accent">FAQ</a></li>
              <li><a href={registrationLink} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 transition-colors hover:text-brand-accent">Đăng ký TNV</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">Thông tin liên hệ</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-brand-accent" />
                <div>
                  <p className="text-sm font-medium text-slate-300">Địa điểm</p>
                  <p className="text-sm text-slate-400">{program.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 h-5 w-5 text-brand-accent" />
                <div>
                  <p className="text-sm font-medium text-slate-300">Thời gian</p>
                  <p className="text-sm text-slate-400">Dự kiến {program.kickoff}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe2 className="mt-0.5 h-5 w-5 text-brand-accent" />
                <div>
                  <p className="text-sm font-medium text-slate-300">Fanpage</p>
                  <a href={fanpageLink} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 transition-colors hover:text-brand-accent">{program.organization}</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-brand-accent" />
                <div>
                  <p className="text-sm font-medium text-slate-300">Hotline/Zalo</p>
                  <p className="text-sm text-slate-400">{program.hotline}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center md:flex md:justify-between md:text-left">
          <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} {program.organization}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

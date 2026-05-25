import { useState } from 'react';
import { Menu, X } from 'lucide-react';

import { navLinks as defaultNavLinks } from '../data/programData';

type HeaderLink = {
  label: string;
  href: string;
};

type HeaderProps = {
  homeHref?: string;
  navLinks?: HeaderLink[];
};

const Header = ({ homeHref = '#gioi-thieu', navLinks = defaultNavLinks }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-brand-navy/85 backdrop-blur-xl">
      <div className="w-full px-0">
        <div className="flex h-20 w-full items-center justify-between gap-4 pl-4 pr-4 sm:pl-5 sm:pr-5 lg:pl-6 lg:pr-6">
          <a
            href={homeHref}
            className="ml-0 flex min-w-0 shrink-0 items-start gap-3 sm:items-center"
          >
            <div className="flex flex-shrink-0 items-center gap-2">
              <img
                src="/images/logo_doan.jpg"
                alt="Logo Đoàn phường Vĩnh Phúc"
                className="h-12 w-12 rounded-full bg-white p-0.5 object-contain ring-2 ring-brand-cyan/20"
              />
              <img
                src="/images/logo_round.png"
                alt="Logo Lượm"
                className="h-11 w-11 rounded-full object-cover ring-2 ring-brand-cyan/20"
              />
            </div>
            <div className="min-w-0 pt-0.5 sm:pt-0">
              <p className="text-base font-extrabold leading-tight text-white sm:truncate sm:text-lg">
                CHIẾN DỊCH TÌNH NGUYỆN HÈ 2026
              </p>
              <p className="mt-1 text-xs font-semibold leading-tight text-brand-cyan sm:truncate sm:text-sm">
                Lượm - Giáo dục vì Cộng đồng
              </p>
            </div>
          </a>

          <nav
            className="hidden flex-1 items-center justify-center gap-7 md:ml-10 md:flex"
            aria-label="Điều hướng chính"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-slate-300 transition-colors hover:text-brand-cyan"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#dang-ky-truc-tiep"
            className="ml-auto hidden min-h-11 items-center justify-center rounded-full bg-brand-yellow px-6 py-3 text-sm font-bold text-brand-navy shadow-cta transition-all hover:-translate-y-0.5 hover:bg-brand-yellow-hover md:inline-flex"
          >
            Đăng ký TNV
          </a>

          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Đóng menu' : 'Mở menu'}
            className="rounded-xl p-2 text-slate-200 transition-colors hover:bg-white/10 hover:text-brand-cyan md:hidden"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className="border-t border-white/10 bg-brand-navy/95 md:hidden">
          <div className="space-y-1 px-4 pb-5 pt-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-xl px-3 py-3 text-base font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-brand-cyan"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#dang-ky-truc-tiep"
              className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand-yellow px-6 py-3 text-base font-bold text-brand-navy transition-all hover:bg-brand-yellow-hover"
            >
              Đăng ký TNV
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

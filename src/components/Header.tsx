import { useState } from 'react';
import { Menu, X } from 'lucide-react';

import { navLinks as defaultNavLinks, registrationLink } from '../data/programData';

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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-navy/85 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <a href={homeHref} className="flex min-w-0 items-center gap-3">
            <div className="flex items-center gap-2">
              <img
                src="/images/logo_doan.jpg"
                alt="Logo Đoàn"
                className="h-11 w-11 rounded-full object-cover ring-2 ring-brand-cyan/20"
              />
              <img
                src="/images/logo_round.png"
                alt="Logo Lượm - Giáo dục vì cộng đồng"
                className="h-11 w-11 rounded-full object-cover ring-2 ring-brand-cyan/20"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-extrabold text-white">ĐỘI DẠY HỌC TÌNH TUYỆN</p>
              <p className="truncate text-sm font-semibold text-brand-cyan">Clb Trí tuệ trẻ nhân tạo</p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Điều hướng chính">
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
            href={registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center justify-center rounded-full bg-brand-yellow px-6 py-3 text-sm font-bold text-brand-navy shadow-cta transition-all hover:-translate-y-0.5 hover:bg-brand-yellow-hover md:inline-flex"
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
              href={registrationLink}
              target="_blank"
              rel="noopener noreferrer"
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

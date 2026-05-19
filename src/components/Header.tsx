import { useState } from 'react';
import { Menu, X } from 'lucide-react';

import { navLinks, program, registrationLink } from '../data/programData';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <a href="#gioi-thieu" className="flex min-w-0 items-center">
            <img
              src="/images/logo_round.png"
              alt="Logo Lượm - Giáo dục vì Cộng đồng"
              className="mr-3 h-11 w-11 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="text-base font-extrabold leading-tight text-slate-900 sm:text-lg">
                {program.organization}
              </span>
              <span className="text-sm font-semibold leading-tight text-brand-secondary">
                {program.shortTeamName}
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Điều hướng chính">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-slate-600 transition-colors duration-200 hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-4"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center md:flex">
            <a
              href={registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-primary px-6 py-3 text-sm font-bold text-white shadow-cta transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-primaryDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-4"
            >
              Đăng ký TNV
            </a>
          </div>

          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Đóng menu' : 'Mở menu'}
              className="rounded-xl p-2 text-slate-700 transition-colors hover:bg-brand-sky hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className="border-t border-brand-border bg-white md:hidden">
          <div className="space-y-1 px-4 pb-5 pt-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-xl px-3 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-brand-sky hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 px-1">
              <a
                href={registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand-primary px-6 py-3 text-center text-base font-bold text-white shadow-cta transition-all hover:bg-brand-primaryDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
              >
                Đăng ký TNV
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

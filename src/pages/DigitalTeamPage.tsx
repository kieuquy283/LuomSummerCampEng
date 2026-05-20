import { ArrowRight, BookOpenText, CalendarDays, Laptop, MapPin, Users } from 'lucide-react';

import Benefits from '../components/Benefits';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import Header from '../components/Header';
import InstructorRecruitment from '../components/InstructorRecruitment';
import { navLinks, registrationLink, recruitmentGroups, teamCards } from '../data/programData';

const digitalTeam = teamCards.find((team) => team.key === 'digital');
const digitalRecruitment = recruitmentGroups.filter((group) => group.theme === 'digital');

const sharedNavLinks = navLinks.map((link) => {
  if (link.label === 'Giới thiệu') {
    return { ...link, href: '#gioi-thieu' };
  }

  if (link.label === 'Quyền lợi' || link.label === 'FAQ') {
    return { ...link, href: `./index.html${link.href}` };
  }

  return link;
});

const digitalIntroPoints = [
  'Bạn có mong muốn mang kiến thức công nghệ và tư duy số đến gần hơn với các em học sinh?',
  'Bạn muốn trực tiếp đóng góp sức trẻ vào hoạt động tình nguyện hè ý nghĩa ngay tại địa phương?',
  'Hãy đồng hành cùng Đội Bình dân học vụ số phường Vĩnh Phúc trong chiến dịch tình nguyện hè năm nay!',
];

const DigitalTeamPage = () => {
  if (!digitalTeam) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header homeHref="./index.html#gioi-thieu" navLinks={sharedNavLinks} />
      <main>
        <section
          id="gioi-thieu"
          className="relative overflow-hidden bg-brand-navy pb-24 pt-16 text-white"
        >
          <div className="absolute inset-0 opacity-70">
            <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-brand-deep blur-[120px] opacity-60" />
            <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-brand-cyan blur-[150px] opacity-20" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="max-w-3xl">
                <h1 className="text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
                  {digitalTeam.title}
                </h1>

                <ul className="mt-6 space-y-4 text-lg leading-8 text-slate-200 md:text-xl">
                  {digitalIntroPoints.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-3 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-brand-cyan" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#vi-tri-phu-hop"
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-yellow px-8 py-4 text-base font-bold text-brand-navy shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all hover:-translate-y-0.5 hover:bg-brand-yellow-hover"
                  >
                    Tìm vị trí phù hợp
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                  <a
                    href={registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-500 bg-transparent px-8 py-4 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:border-white hover:bg-white/5"
                  >
                    Đăng ký TNV
                  </a>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <article className="rounded-[28px] border border-brand-electric/20 bg-white/10 p-6 backdrop-blur-md sm:col-span-2">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-electric/20 text-brand-electric">
                    <Laptop className="h-7 w-7" />
                  </div>
                  <h2 className="text-2xl font-bold">{digitalTeam.subtitle}</h2>
                </article>

                <article className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <MapPin className="h-6 w-6 text-brand-cyan" />
                  <p className="mt-4 text-sm font-semibold text-slate-300">Địa điểm</p>
                  <p className="mt-1 text-lg font-bold">{digitalTeam.location}</p>
                </article>

                <article className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <Users className="h-6 w-6 text-brand-yellow" />
                  <p className="mt-4 text-sm font-semibold text-slate-300">Đối tượng học sinh</p>
                  <p className="mt-1 text-lg font-bold">{digitalTeam.students}</p>
                </article>

                <article className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <CalendarDays className="h-6 w-6 text-brand-cyan" />
                  <p className="mt-4 text-sm font-semibold text-slate-300">Thời lượng</p>
                  <p className="mt-1 text-lg font-bold">{digitalTeam.schedule}</p>
                  <p className="mt-1 text-sm text-slate-300">{digitalTeam.kickoff}</p>
                </article>

                <article className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <BookOpenText className="h-6 w-6 text-brand-yellow" />
                  <p className="mt-4 text-sm font-semibold text-slate-300">Quy mô lớp</p>
                  <p className="mt-1 text-lg font-bold">{digitalTeam.scale}</p>
                </article>
              </div>
            </div>
          </div>
        </section>
        <InstructorRecruitment groups={digitalRecruitment} />
        <Benefits />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default DigitalTeamPage;

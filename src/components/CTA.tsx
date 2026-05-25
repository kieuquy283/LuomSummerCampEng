import { HeartHandshake } from 'lucide-react';

const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-16 sm:py-24">
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/2 h-64 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-brand-electric opacity-30 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md sm:rounded-[36px] sm:p-8 md:p-10">
          <div className="relative mx-auto flex w-fit justify-center">
            <HeartHandshake className="absolute -inset-2 h-20 w-20 text-brand-yellow opacity-20 blur-md" />
            <HeartHandshake className="relative h-16 w-16 text-brand-yellow" />
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="#dang-ky-truc-tiep"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-yellow px-8 py-4 text-base font-bold text-brand-navy shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all hover:-translate-y-0.5 hover:bg-brand-yellow-hover"
            >
              Đăng ký TNV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

import { GraduationCap, LaptopMinimal, MessageCircle } from 'lucide-react';

import { learningTracks } from '../data/programData';

const Curriculum = () => {
  return (
    <section className="bg-slate-950 py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-brand-cyan">
            Học sinh sẽ được học gì?
          </p>
          <h2 className="text-3xl font-extrabold md:text-4xl">
            Nội dung được thiết kế khác nhau cho từng độ tuổi và mục tiêu học tập
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {learningTracks.map((track, index) => {
            const isDigital = track.theme === 'digital';
            const Icon = index === 0 ? LaptopMinimal : MessageCircle;

            return (
              <article
                key={track.title}
                className={`rounded-[32px] border p-8 lg:p-10 ${
                  isDigital
                    ? 'border-brand-electric/30 bg-brand-deep/40 backdrop-blur-md'
                    : 'border-brand-cyan/30 bg-brand-deep/40 backdrop-blur-md'
                }`}
              >
                <div className="mb-8 flex items-center gap-4">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-3xl ${
                      isDigital ? 'bg-brand-electric/20 text-brand-electric' : 'bg-brand-yellow/20 text-brand-yellow'
                    }`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{track.title}</h3>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                      Lộ trình học sinh
                    </p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {track.topics.map((topic) => (
                    <li key={topic} className="flex gap-4 rounded-[22px] bg-white/5 p-4">
                      <div
                        className={`mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl ${
                          isDigital ? 'bg-brand-electric/20 text-brand-electric' : 'bg-brand-cyan/20 text-brand-cyan'
                        }`}
                      >
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      <p className="leading-7 text-slate-200">{topic}</p>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Curriculum;

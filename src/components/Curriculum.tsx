import { GraduationCap, LaptopMinimal, MessageCircle } from 'lucide-react';

import { learningTracks as defaultLearningTracks } from '../data/programData';

type LearningTrack = {
  title: string;
  theme: string;
  topics: string[];
};

type CurriculumProps = {
  tracks?: LearningTrack[];
  eyebrow?: string;
  title?: string;
};

const Curriculum = ({
  tracks = defaultLearningTracks,
  eyebrow = 'Học sinh sẽ được học gì?',
  title = 'Nội dung được thiết kế khác nhau cho từng độ tuổi và mục tiêu học tập',
}: CurriculumProps) => {
  return (
    <section className="bg-slate-950 py-16 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-brand-cyan">
            {eyebrow}
          </p>
          <h2 className="text-2xl font-extrabold sm:text-3xl md:text-4xl">{title}</h2>
        </div>

        <div className={`grid gap-8 ${tracks.length > 1 ? 'lg:grid-cols-2' : ''}`}>
          {tracks.map((track, index) => {
            const isDigital = track.theme === 'digital';
            const Icon = index === 0 ? LaptopMinimal : MessageCircle;

            return (
              <article
                key={track.title}
                className={`rounded-[24px] border p-5 backdrop-blur-md sm:rounded-[32px] sm:p-8 lg:p-10 ${
                  isDigital
                    ? 'border-brand-electric/30 bg-brand-deep/40'
                    : 'border-brand-cyan/30 bg-brand-deep/40'
                }`}
              >
                <div className="mb-6 flex items-center gap-4 sm:mb-8">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-3xl sm:h-16 sm:w-16 ${
                      isDigital ? 'bg-brand-electric/20 text-brand-electric' : 'bg-brand-yellow/20 text-brand-yellow'
                    }`}
                  >
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold sm:text-2xl">{track.title}</h3>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                      Lộ trình học sinh
                    </p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {track.topics.map((topic) => (
                    <li key={topic} className="flex gap-3 rounded-[18px] bg-white/5 p-4 sm:gap-4 sm:rounded-[22px]">
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

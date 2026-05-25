import { ArrowRight } from 'lucide-react';

import { activities, departments } from '../data/programData';

const departmentNameMap = Object.fromEntries(
  departments.map((department) => [department.id, department.title]),
);

const overviewDescriptions: Record<string, string> = {
  'trai-he-xanh':
    'Trại hè xanh là chương trình trải nghiệm kỹ năng sống và phát triển cá nhân dành cho học sinh thông qua các hoạt động tập thể, thể thao, sáng tạo và giáo dục giá trị sống. Chương trình giúp các em rèn luyện kỹ năng mềm, tinh thần trách nhiệm, khả năng làm việc nhóm và ý thức cộng đồng.',
  'trai-he-cong-nghe':
    'Trại hè Công nghệ - Kỹ thuật là không gian học tập và trải nghiệm dành cho học sinh yêu thích công nghệ, sáng tạo và kỹ thuật. Chương trình giúp các em tiếp cận tin học, kỹ năng số, AI, ứng dụng công nghệ hiện đại, đồng thời tham gia các hoạt động thiết kế, lắp ráp và sáng chế thực tiễn.',
  'binh-dan-hoc-vu-so':
    'Lớp “Bình dân học vụ số” là hoạt động giáo dục cộng đồng miễn phí nhằm phổ cập kiến thức công nghệ và kỹ năng số cho học sinh. Chương trình giúp các em tiếp cận công nghệ dễ dàng hơn, nâng cao năng lực số cơ bản và làm quen với môi trường học tập hiện đại, thực tiễn.',
};

const Activities = () => {
  return (
    <section id="hoat-dong" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <h2 className="mb-3 text-2xl font-extrabold uppercase tracking-[0.18em] text-brand-cyan sm:text-3xl md:text-4xl">
            Hoạt động chính
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {activities.map((activity, index) => (
            <article
              key={activity.id}
              id={activity.id}
              className={`rounded-[28px] border bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8 ${
                index === 0
                  ? 'border-emerald-200'
                  : index === 1
                    ? 'border-cyan-200'
                    : 'border-sky-200'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-extrabold text-slate-900">{activity.title}</h3>
                <span className="inline-flex flex-shrink-0 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
                  {activity.time}
                </span>
              </div>

              <p className="mt-4 leading-7 text-slate-600">{overviewDescriptions[activity.id] ?? activity.description}</p>

              <div className="mt-6">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Bộ phận liên quan
                </p>
                <div
                  className={`mt-3 ${
                    activity.id === 'trai-he-xanh'
                      ? 'flex flex-col items-start gap-2'
                      : 'flex flex-wrap gap-2'
                  }`}
                >
                  {activity.relatedDepartments.map((departmentId) => (
                    <span
                      key={departmentId}
                      className="inline-flex rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700"
                    >
                      {departmentNameMap[departmentId]}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href="#dang-ky-truc-tiep"
                className="mt-8 inline-flex min-h-11 items-center rounded-full bg-brand-yellow px-5 py-3 text-sm font-bold text-brand-navy transition-all hover:-translate-y-0.5 hover:bg-brand-yellow-hover"
              >
                Đăng ký TNV
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Activities;

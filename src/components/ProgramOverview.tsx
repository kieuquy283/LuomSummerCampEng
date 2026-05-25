const overviewItems = [
  {
    title: 'Trại hè xanh',
    description:
      'Trại hè xanh là chương trình trải nghiệm kỹ năng sống và phát triển cá nhân dành cho học sinh thông qua các hoạt động tập thể, thể thao, sáng tạo và giáo dục giá trị sống. Chương trình giúp các em rèn luyện kỹ năng mềm, tinh thần trách nhiệm, khả năng làm việc nhóm và ý thức cộng đồng.',
    accentClass: 'border-emerald-200',
  },
  {
    title: 'Trại hè Công nghệ - Kỹ thuật',
    description:
      'Trại hè Công nghệ - Kỹ thuật là không gian học tập và trải nghiệm dành cho học sinh yêu thích công nghệ, sáng tạo và kỹ thuật. Chương trình giúp các em tiếp cận tin học, kỹ năng số, AI, ứng dụng công nghệ hiện đại, đồng thời tham gia các hoạt động thiết kế, lắp ráp và sáng chế thực tiễn.',
    accentClass: 'border-cyan-200',
  },
  {
    title: 'Lớp “Bình dân học vụ số”',
    description:
      'Lớp “Bình dân học vụ số” là hoạt động giáo dục cộng đồng miễn phí nhằm phổ cập kiến thức công nghệ và kỹ năng số cho học sinh. Chương trình giúp các em tiếp cận công nghệ dễ dàng hơn, nâng cao năng lực số cơ bản và làm quen với môi trường học tập hiện đại, thực tiễn.',
    accentClass: 'border-sky-200',
  },
];

const ProgramOverview = () => {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-4xl text-center sm:mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-brand-cyan">
            TỔNG QUAN CHƯƠNG TRÌNH
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {overviewItems.map((item) => (
            <article
              key={item.title}
              className={`rounded-[28px] border bg-white p-6 shadow-lg sm:p-8 ${item.accentClass}`}
            >
              <h3 className="text-2xl font-extrabold text-slate-900">{item.title}</h3>
              <p className="mt-4 leading-7 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramOverview;

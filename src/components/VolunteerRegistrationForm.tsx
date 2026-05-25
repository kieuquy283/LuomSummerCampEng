import { type FormEvent, useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, Download, LoaderCircle, Send } from 'lucide-react';

import { registrationLink } from '../data/programData';
import { type FormOption, volunteerFormSchema } from '../data/volunteerFormSchema';
import { exportToCsv } from '../utils/exportToCsv';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';
type TransportMode = 'json' | 'google-apps-script';

type VolunteerRegistrationState = {
  readinessConfirmed: boolean;
  participationCommitmentConfirmed: boolean;
  email: string;
  fullName: string;
  dateOfBirth: string;
  schoolInfo: string;
  phone: string;
  facebookOrZalo: string;
  aboutLuom: string;
  motivation: string;
  generalStrengths: string[];
  generalStrengthsOther: string;
  previousVolunteerExperience: string;
  selectedActivities: string[];
  selectedDepartments: string[];
  techRole: string;
  techFields: string[];
  techAiSkills: string;
  techTeachingTools: string;
  mediaPositions: string[];
  portfolioUrl: string;
  mediaWritingChallenge: string;
  mediaDesignPortfolioNote: string;
  mediaVideoPortfolioNote: string;
  mediaHasCamera: string;
  supportTasks: string[];
  availableForGreenCamp: string;
  priority1: string;
  priority2: string;
  priority3: string;
};

type ValidationErrors = Partial<Record<keyof VolunteerRegistrationState, string>>;

type SubmissionPayload = VolunteerRegistrationState & {
  createdAt: string;
  source: 'landing_page_direct_form';
};

const initialState: VolunteerRegistrationState = {
  readinessConfirmed: false,
  participationCommitmentConfirmed: false,
  email: '',
  fullName: '',
  dateOfBirth: '',
  schoolInfo: '',
  phone: '',
  facebookOrZalo: '',
  aboutLuom: '',
  motivation: '',
  generalStrengths: [],
  generalStrengthsOther: '',
  previousVolunteerExperience: '',
  selectedActivities: [],
  selectedDepartments: [],
  techRole: '',
  techFields: [],
  techAiSkills: '',
  techTeachingTools: '',
  mediaPositions: [],
  portfolioUrl: '',
  mediaWritingChallenge: '',
  mediaDesignPortfolioNote: '',
  mediaVideoPortfolioNote: '',
  mediaHasCamera: '',
  supportTasks: [],
  availableForGreenCamp: '',
  priority1: '',
  priority2: '',
  priority3: '',
};

const sectionClasses =
  'rounded-[28px] border border-white/10 bg-brand-deep/40 p-5 shadow-[0_22px_60px_rgba(2,6,23,0.45)] backdrop-blur-md sm:p-8';
const inputClasses =
  'mt-2 min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20';
const labelClasses = 'text-sm font-semibold uppercase tracking-[0.12em] text-slate-300';

const toggleValue = (items: string[], value: string) =>
  items.includes(value) ? items.filter((item) => item !== value) : [...items, value];

const CheckboxCardGroup = ({
  options,
  selectedValues,
  onToggle,
  columns = 'sm:grid-cols-2 xl:grid-cols-3',
}: {
  options: readonly FormOption[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  columns?: string;
}) => (
  <div className={`grid gap-3 ${columns}`}>
    {options.map((option) => {
      const checked = selectedValues.includes(option.value);

      return (
        <label
          key={option.value}
          className={`cursor-pointer rounded-[22px] border p-4 transition-all ${
            checked
              ? 'border-brand-cyan bg-brand-cyan/10 shadow-[0_0_20px_rgba(34,211,238,0.12)]'
              : 'border-white/10 bg-slate-950/60 hover:border-white/20'
          }`}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={() => onToggle(option.value)}
            className="sr-only"
          />
          <div className="flex items-start gap-3">
            <span
              className={`mt-0.5 h-5 w-5 rounded-md border ${
                checked ? 'border-brand-cyan bg-brand-cyan' : 'border-slate-500 bg-transparent'
              }`}
            />
            <span className="min-w-0">
              <span className="block font-semibold text-white">{option.label}</span>
              {option.description ? (
                <span className="mt-1 block text-sm text-slate-400">{option.description}</span>
              ) : null}
            </span>
          </div>
        </label>
      );
    })}
  </div>
);

const SingleChoiceCard = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) => (
  <label
    className={`flex cursor-pointer items-start gap-3 rounded-[22px] border p-4 transition-all ${
      checked
        ? 'border-brand-cyan bg-brand-cyan/10 shadow-[0_0_20px_rgba(34,211,238,0.12)]'
        : 'border-white/10 bg-slate-950/60 hover:border-white/20'
    }`}
  >
    <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
    <span
      className={`mt-0.5 h-5 w-5 rounded-full border ${
        checked ? 'border-brand-cyan bg-brand-cyan' : 'border-slate-500 bg-transparent'
      }`}
    />
    <span className="font-semibold text-white">{label}</span>
  </label>
);

const VolunteerRegistrationForm = () => {
  const [form, setForm] = useState<VolunteerRegistrationState>(initialState);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [lastSubmittedPayload, setLastSubmittedPayload] = useState<SubmissionPayload | null>(null);

  const endpoint = import.meta.env.VITE_REGISTRATION_ENDPOINT?.trim();
  const configuredTransport = import.meta.env.VITE_REGISTRATION_TRANSPORT?.trim();
  const isDevWithoutEndpoint = import.meta.env.DEV && !endpoint;
  const transportMode: TransportMode =
    configuredTransport === 'google-apps-script' || endpoint?.includes('script.google.com')
      ? 'google-apps-script'
      : 'json';

  const hasTechDepartment = form.selectedDepartments.includes('tin-hoc-ky-thuat');
  const hasMediaDepartment = form.selectedDepartments.includes('truyen-thong');
  const hasSupportDepartment = form.selectedDepartments.includes('ho-tro');
  const hasGreenCampActivity = form.selectedActivities.includes('trai-he-xanh');
  const hasTechActivity = form.selectedActivities.includes('cong-nghe-va-bdhvs');

  const supportDepartmentWarning = hasSupportDepartment && !hasGreenCampActivity;
  const techDepartmentWarning = hasTechDepartment && !hasTechActivity;
  const hasOtherStrength = form.generalStrengths.includes('khac');
  const hasMediaWritingPosition = form.mediaPositions.includes('viet-bai');
  const hasMediaDesignPosition = form.mediaPositions.includes('thiet-ke-an-pham');
  const hasMediaVideoPosition = form.mediaPositions.includes('dung-video');
  const hasMediaPhotoPosition = form.mediaPositions.includes('quay-chup');

  const visibleSections = useMemo(() => {
    const sections = [
      '1. Lưu ý và cam kết',
      '2. Thông tin cá nhân',
      '3. Câu hỏi chung',
      '4. Hoạt động muốn tham gia',
      '5. Bộ phận ứng tuyển',
    ];

    if (hasTechDepartment) sections.push('6. Tin học & Kỹ thuật');
    if (hasMediaDepartment) sections.push('7. Truyền thông');
    if (hasSupportDepartment) sections.push('8. Hỗ trợ');
    sections.push('9. Nguyện vọng ưu tiên');

    return sections;
  }, [hasMediaDepartment, hasSupportDepartment, hasTechDepartment]);

  const setField = <K extends keyof VolunteerRegistrationState>(
    field: K,
    value: VolunteerRegistrationState[K],
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setSubmitMessage('');
    }
  };

  const validateForm = () => {
    const nextErrors: ValidationErrors = {};

    if (!form.readinessConfirmed) nextErrors.readinessConfirmed = 'Bạn cần xác nhận sự sẵn sàng.';
    if (!form.participationCommitmentConfirmed) {
      nextErrors.participationCommitmentConfirmed =
        'Bạn cần xác nhận cam kết tham gia ít nhất 80% số buổi.';
    }
    if (!form.email.trim()) nextErrors.email = 'Vui lòng nhập email.';
    if (!form.fullName.trim()) nextErrors.fullName = 'Vui lòng nhập họ và tên.';
    if (!form.dateOfBirth.trim()) nextErrors.dateOfBirth = 'Vui lòng nhập ngày sinh.';
    if (!form.schoolInfo.trim()) nextErrors.schoolInfo = 'Vui lòng nhập trường/lớp/ngành.';
    if (!form.phone.trim()) nextErrors.phone = 'Vui lòng nhập số điện thoại.';
    if (!form.facebookOrZalo.trim()) nextErrors.facebookOrZalo = 'Vui lòng nhập Facebook/Zalo.';
    if (form.selectedActivities.length === 0) {
      nextErrors.selectedActivities = 'Vui lòng chọn ít nhất một nhóm hoạt động.';
    }
    if (form.selectedDepartments.length === 0) {
      nextErrors.selectedDepartments = 'Vui lòng chọn ít nhất một bộ phận.';
    }
    if (hasOtherStrength && !form.generalStrengthsOther.trim()) {
      nextErrors.generalStrengthsOther = 'Vui lòng mô tả thêm phần kinh nghiệm khác.';
    }
    if (hasTechDepartment && !form.techRole) {
      nextErrors.techRole = 'Vui lòng chọn vai trò trong bộ phận Tin học & Kỹ thuật.';
    }
    if (hasSupportDepartment && !form.availableForGreenCamp) {
      nextErrors.availableForGreenCamp = 'Vui lòng cho biết khả năng tham gia Trại hè Xanh.';
    }
    if (hasMediaPhotoPosition && !form.mediaHasCamera) {
      nextErrors.mediaHasCamera = 'Vui lòng cho biết bạn có máy ảnh hay không.';
    }

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitStatus('error');
      setSubmitMessage('Vui lòng kiểm tra lại các trường bắt buộc trước khi gửi.');
      return;
    }

    const payload: SubmissionPayload = {
      ...form,
      createdAt: new Date().toISOString(),
      source: 'landing_page_direct_form',
    };

    setSubmitStatus('submitting');
    setSubmitMessage('');

    try {
      if (endpoint) {
        if (transportMode === 'google-apps-script') {
          await fetch(endpoint, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(payload),
          });
        } else {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Không thể gửi đăng ký lúc này.');
          }
        }
      } else if (import.meta.env.DEV) {
        console.log('Volunteer registration payload', payload);
      } else {
        throw new Error('Chưa cấu hình VITE_REGISTRATION_ENDPOINT.');
      }

      setLastSubmittedPayload(payload);
      setForm(initialState);
      setSubmitStatus('success');
      setSubmitMessage(
        'BTC đã nhận được đăng ký của bạn. Chúng mình sẽ liên hệ lại trong thời gian sớm nhất.',
      );
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(
        error instanceof Error ? error.message : 'Có lỗi xảy ra khi gửi đăng ký. Vui lòng thử lại.',
      );
    }
  };

  return (
    <section id="dang-ky-truc-tiep" className="bg-brand-navy py-16 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-4xl text-center sm:mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-brand-cyan">
            {volunteerFormSchema.formTitle}
          </p>
          <h2 className="text-2xl font-extrabold sm:text-3xl md:text-4xl">
            Điền thông tin trực tiếp tại website theo cùng cấu trúc với Google Form
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Bạn vẫn có thể dùng Google Form nếu muốn một cách điền quen thuộc hơn.
            <a
              href={registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 font-semibold text-brand-yellow underline decoration-transparent underline-offset-4 transition hover:decoration-current"
            >
              Mở Google Form
            </a>
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {visibleSections.map((section) => (
            <span
              key={section}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200"
            >
              {section}
            </span>
          ))}
        </div>

        {isDevWithoutEndpoint ? (
          <div className="mb-6 rounded-[22px] border border-amber-400/30 bg-amber-400/10 p-4 text-sm leading-7 text-amber-100">
            Chế độ dev chưa cấu hình `VITE_REGISTRATION_ENDPOINT`. Form vẫn submit được để demo,
            dữ liệu sẽ được `console.log` tại trình duyệt.
          </div>
        ) : null}

        {!isDevWithoutEndpoint && endpoint && transportMode === 'google-apps-script' ? (
          <div className="mb-6 rounded-[22px] border border-cyan-400/30 bg-cyan-400/10 p-4 text-sm leading-7 text-cyan-100">
            Form đang gửi trực tiếp tới Google Apps Script Web App. Ở chế độ này, trình duyệt sẽ
            không đọc chi tiết response do cơ chế `no-cors`, nên sau khi request gửi đi thành công
            ở mức network, giao diện sẽ xem như đã nhận đăng ký.
          </div>
        ) : null}

        {supportDepartmentWarning ? (
          <div className="mb-4 rounded-[22px] border border-brand-yellow/30 bg-brand-yellow/10 p-4 text-sm leading-7 text-brand-yellow">
            Bộ phận Hỗ trợ chỉ phục vụ Trại hè Xanh. Bạn vẫn có thể gửi form, BTC sẽ liên hệ tư
            vấn lại.
          </div>
        ) : null}

        {techDepartmentWarning ? (
          <div className="mb-6 rounded-[22px] border border-brand-yellow/30 bg-brand-yellow/10 p-4 text-sm leading-7 text-brand-yellow">
            Bộ phận Chuyên môn Tin học & Kỹ thuật chỉ phục vụ Trại hè Công nghệ + Lớp Bình dân học
            vụ số. Bạn vẫn có thể gửi form, BTC sẽ liên hệ tư vấn lại.
          </div>
        ) : null}

        {submitStatus === 'success' ? (
          <div className="mb-6 rounded-[24px] border border-emerald-400/30 bg-emerald-400/10 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-6 w-6 text-emerald-300" />
              <div>
                <p className="font-bold text-white">Đăng ký đã được gửi</p>
                <p className="mt-1 leading-7 text-emerald-100">{submitMessage}</p>
                {isDevWithoutEndpoint && lastSubmittedPayload ? (
                  <button
                    type="button"
                    onClick={() =>
                      exportToCsv(
                        [lastSubmittedPayload],
                        `volunteer-registration-${Date.now()}.csv`,
                      )
                    }
                    className="mt-4 inline-flex min-h-11 items-center rounded-full border border-emerald-300/40 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-white/10"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Tải CSV demo
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        {submitStatus === 'error' && submitMessage ? (
          <div className="mb-6 rounded-[24px] border border-rose-400/30 bg-rose-400/10 p-4 text-sm leading-7 text-rose-100">
            {submitMessage}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset className={sectionClasses}>
            <legend className="mb-5 text-xl font-extrabold text-white">1. Lưu ý và cam kết</legend>
            <div className="space-y-5">
              <div className="rounded-[22px] border border-white/10 bg-slate-950/60 p-4 text-sm leading-7 text-slate-200">
                <p className="font-semibold text-brand-cyan">{volunteerFormSchema.introNote}</p>
                <ul className="mt-3 space-y-2">
                  {volunteerFormSchema.importantNotes.map((note) => (
                    <li key={note} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-brand-yellow" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className={labelClasses}>{volunteerFormSchema.readinessLabel}</p>
                <div className="mt-2">
                  <SingleChoiceCard
                    checked={form.readinessConfirmed}
                    onChange={() => setField('readinessConfirmed', !form.readinessConfirmed)}
                    label={volunteerFormSchema.readinessOption}
                  />
                </div>
                {errors.readinessConfirmed ? (
                  <p className="mt-2 text-sm text-rose-300">{errors.readinessConfirmed}</p>
                ) : null}
              </div>

              <div>
                <p className={labelClasses}>{volunteerFormSchema.commitmentLabel}</p>
                <div className="mt-2">
                  <SingleChoiceCard
                    checked={form.participationCommitmentConfirmed}
                    onChange={() =>
                      setField(
                        'participationCommitmentConfirmed',
                        !form.participationCommitmentConfirmed,
                      )
                    }
                    label={volunteerFormSchema.commitmentOption}
                  />
                </div>
                {errors.participationCommitmentConfirmed ? (
                  <p className="mt-2 text-sm text-rose-300">
                    {errors.participationCommitmentConfirmed}
                  </p>
                ) : null}
              </div>
            </div>
          </fieldset>

          <fieldset className={sectionClasses}>
            <legend className="mb-5 text-xl font-extrabold text-white">2. Thông tin cá nhân</legend>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="email" className={labelClasses}>
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => setField('email', event.target.value)}
                  className={inputClasses}
                  placeholder="ban@email.com"
                />
                {errors.email ? <p className="mt-2 text-sm text-rose-300">{errors.email}</p> : null}
              </div>

              <div>
                <label htmlFor="fullName" className={labelClasses}>
                  Họ và tên *
                </label>
                <input
                  id="fullName"
                  value={form.fullName}
                  onChange={(event) => setField('fullName', event.target.value)}
                  className={inputClasses}
                  placeholder="Nguyễn Văn A"
                />
                {errors.fullName ? <p className="mt-2 text-sm text-rose-300">{errors.fullName}</p> : null}
              </div>

              <div>
                <label htmlFor="dateOfBirth" className={labelClasses}>
                  Ngày/tháng/năm sinh *
                </label>
                <input
                  id="dateOfBirth"
                  type="date"
                  value={form.dateOfBirth}
                  onChange={(event) => setField('dateOfBirth', event.target.value)}
                  className={inputClasses}
                />
                {errors.dateOfBirth ? (
                  <p className="mt-2 text-sm text-rose-300">{errors.dateOfBirth}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="schoolInfo" className={labelClasses}>
                  Tên trường - Lớp/ngành bạn đang theo học *
                </label>
                <input
                  id="schoolInfo"
                  value={form.schoolInfo}
                  onChange={(event) => setField('schoolInfo', event.target.value)}
                  className={inputClasses}
                  placeholder="Ví dụ: THPT A - 11A1 / Đại học B - CNTT"
                />
                {errors.schoolInfo ? (
                  <p className="mt-2 text-sm text-rose-300">{errors.schoolInfo}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="phone" className={labelClasses}>
                  Số điện thoại *
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(event) => setField('phone', event.target.value)}
                  className={inputClasses}
                  placeholder="09xxxxxxxx"
                />
                {errors.phone ? <p className="mt-2 text-sm text-rose-300">{errors.phone}</p> : null}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="facebookOrZalo" className={labelClasses}>
                  Link Facebook/Zalo *
                </label>
                <input
                  id="facebookOrZalo"
                  value={form.facebookOrZalo}
                  onChange={(event) => setField('facebookOrZalo', event.target.value)}
                  className={inputClasses}
                  placeholder="https://facebook.com/... hoặc Zalo"
                />
                {errors.facebookOrZalo ? (
                  <p className="mt-2 text-sm text-rose-300">{errors.facebookOrZalo}</p>
                ) : null}
              </div>
            </div>
          </fieldset>

          <fieldset className={sectionClasses}>
            <legend className="mb-5 text-xl font-extrabold text-white">3. Câu hỏi chung</legend>
            <div className="space-y-5">
              <div>
                <label htmlFor="aboutLuom" className={labelClasses}>
                  Bạn biết gì về dự án Lượm - Giáo dục vì Cộng đồng?
                </label>
                <textarea
                  id="aboutLuom"
                  value={form.aboutLuom}
                  onChange={(event) => setField('aboutLuom', event.target.value)}
                  className={`${inputClasses} min-h-28`}
                />
              </div>

              <div>
                <label htmlFor="motivation" className={labelClasses}>
                  Vì sao bạn muốn tham gia các hoạt động tình nguyện này?
                </label>
                <textarea
                  id="motivation"
                  value={form.motivation}
                  onChange={(event) => setField('motivation', event.target.value)}
                  className={`${inputClasses} min-h-28`}
                />
              </div>

              <div>
                <p className={labelClasses}>
                  Bạn có thế mạnh hoặc kinh nghiệm nào trong các việc sau không?
                </p>
                <div className="mt-2">
                  <CheckboxCardGroup
                    options={volunteerFormSchema.generalStrengthOptions}
                    selectedValues={form.generalStrengths}
                    onToggle={(value) =>
                      setField('generalStrengths', toggleValue(form.generalStrengths, value))
                    }
                  />
                </div>
              </div>

              {hasOtherStrength ? (
                <div>
                  <label htmlFor="generalStrengthsOther" className={labelClasses}>
                    Mô tả thêm mục "Khác"
                  </label>
                  <input
                    id="generalStrengthsOther"
                    value={form.generalStrengthsOther}
                    onChange={(event) => setField('generalStrengthsOther', event.target.value)}
                    className={inputClasses}
                  />
                  {errors.generalStrengthsOther ? (
                    <p className="mt-2 text-sm text-rose-300">{errors.generalStrengthsOther}</p>
                  ) : null}
                </div>
              ) : null}

              <div>
                <label htmlFor="previousVolunteerExperience" className={labelClasses}>
                  Bạn đã tham gia tình nguyện sự kiện nào trước đây chưa?
                </label>
                <textarea
                  id="previousVolunteerExperience"
                  value={form.previousVolunteerExperience}
                  onChange={(event) => setField('previousVolunteerExperience', event.target.value)}
                  className={`${inputClasses} min-h-28`}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className={sectionClasses}>
            <legend className="mb-5 text-xl font-extrabold text-white">4. Hoạt động muốn tham gia</legend>
            <CheckboxCardGroup
              options={volunteerFormSchema.activityOptions}
              selectedValues={form.selectedActivities}
              onToggle={(value) =>
                setField('selectedActivities', toggleValue(form.selectedActivities, value))
              }
              columns="sm:grid-cols-2"
            />
            {errors.selectedActivities ? (
              <p className="mt-3 text-sm text-rose-300">{errors.selectedActivities}</p>
            ) : null}
          </fieldset>

          <fieldset className={sectionClasses}>
            <legend className="mb-5 text-xl font-extrabold text-white">5. Bộ phận ứng tuyển</legend>
            <CheckboxCardGroup
              options={volunteerFormSchema.departmentOptions}
              selectedValues={form.selectedDepartments}
              onToggle={(value) =>
                setField('selectedDepartments', toggleValue(form.selectedDepartments, value))
              }
              columns="sm:grid-cols-2 xl:grid-cols-3"
            />
            <div className="mt-5 rounded-[22px] border border-white/10 bg-slate-950/60 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-cyan">
                Ghi chú logic
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
                {volunteerFormSchema.departmentLogicNotes.map((note) => (
                  <li key={note} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-brand-yellow" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
            {errors.selectedDepartments ? (
              <p className="mt-3 text-sm text-rose-300">{errors.selectedDepartments}</p>
            ) : null}
          </fieldset>

          {hasTechDepartment ? (
            <fieldset className={sectionClasses}>
              <legend className="mb-5 text-xl font-extrabold text-white">
                6. Câu hỏi riêng cho Tin học & Kỹ thuật
              </legend>
              <div className="space-y-5">
                <div>
                  <label htmlFor="techRole" className={labelClasses}>
                    Chọn vai trò
                  </label>
                  <select
                    id="techRole"
                    value={form.techRole}
                    onChange={(event) => setField('techRole', event.target.value)}
                    className={inputClasses}
                  >
                    <option value="">Chọn vai trò</option>
                    {volunteerFormSchema.techRoleOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.techRole ? <p className="mt-2 text-sm text-rose-300">{errors.techRole}</p> : null}
                </div>

                <div>
                  <p className={labelClasses}>Chọn lĩnh vực</p>
                  <div className="mt-2">
                    <CheckboxCardGroup
                      options={volunteerFormSchema.techFieldOptions}
                      selectedValues={form.techFields}
                      onToggle={(value) => setField('techFields', toggleValue(form.techFields, value))}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="techAiSkills" className={labelClasses}>
                    Hãy liệt kê các công cụ AI hoặc kỹ năng sử dụng máy tính/mạng máy tính mà bạn
                    thường xuyên sử dụng và tự tin có thể hướng dẫn lại cho học sinh.
                  </label>
                  <textarea
                    id="techAiSkills"
                    value={form.techAiSkills}
                    onChange={(event) => setField('techAiSkills', event.target.value)}
                    className={`${inputClasses} min-h-28`}
                  />
                </div>

                <div>
                  <label htmlFor="techTeachingTools" className={labelClasses}>
                    Bạn hãy mô tả khả năng sử dụng các công cụ số cơ bản như Canva, PowerPoint, các
                    ứng dụng công nghệ/AI hỗ trợ học tập... để thiết kế bài giảng.
                  </label>
                  <textarea
                    id="techTeachingTools"
                    value={form.techTeachingTools}
                    onChange={(event) => setField('techTeachingTools', event.target.value)}
                    className={`${inputClasses} min-h-28`}
                  />
                </div>
              </div>
            </fieldset>
          ) : null}

          {hasMediaDepartment ? (
            <fieldset className={sectionClasses}>
              <legend className="mb-5 text-xl font-extrabold text-white">
                7. Câu hỏi riêng cho Truyền thông
              </legend>
              <div className="space-y-5">
                <div>
                  <p className={labelClasses}>Chọn vị trí</p>
                  <div className="mt-2">
                    <CheckboxCardGroup
                      options={volunteerFormSchema.mediaPositionOptions}
                      selectedValues={form.mediaPositions}
                      onToggle={(value) =>
                        setField('mediaPositions', toggleValue(form.mediaPositions, value))
                      }
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="portfolioUrl" className={labelClasses}>
                    Link portfolio/sản phẩm nếu có
                  </label>
                  <input
                    id="portfolioUrl"
                    type="url"
                    value={form.portfolioUrl}
                    onChange={(event) => setField('portfolioUrl', event.target.value)}
                    className={inputClasses}
                    placeholder="https://..."
                  />
                </div>

                {hasMediaWritingPosition ? (
                  <div>
                    <label htmlFor="mediaWritingChallenge" className={labelClasses}>
                      Nếu ứng tuyển viết bài: hãy trả lời câu hỏi thử thách viết bài/caption
                    </label>
                    <textarea
                      id="mediaWritingChallenge"
                      value={form.mediaWritingChallenge}
                      onChange={(event) => setField('mediaWritingChallenge', event.target.value)}
                      className={`${inputClasses} min-h-28`}
                    />
                  </div>
                ) : null}

                {hasMediaDesignPosition ? (
                  <div>
                    <label htmlFor="mediaDesignPortfolioNote" className={labelClasses}>
                      Nếu ứng tuyển designer: hãy chia sẻ ít nhất 05 ấn phẩm truyền thông
                    </label>
                    <textarea
                      id="mediaDesignPortfolioNote"
                      value={form.mediaDesignPortfolioNote}
                      onChange={(event) =>
                        setField('mediaDesignPortfolioNote', event.target.value)
                      }
                      className={`${inputClasses} min-h-24`}
                    />
                  </div>
                ) : null}

                {hasMediaVideoPosition ? (
                  <div>
                    <label htmlFor="mediaVideoPortfolioNote" className={labelClasses}>
                      Nếu ứng tuyển video editor: hãy chia sẻ ít nhất 01 video truyền thông
                    </label>
                    <textarea
                      id="mediaVideoPortfolioNote"
                      value={form.mediaVideoPortfolioNote}
                      onChange={(event) => setField('mediaVideoPortfolioNote', event.target.value)}
                      className={`${inputClasses} min-h-24`}
                    />
                  </div>
                ) : null}

                {hasMediaPhotoPosition ? (
                  <div>
                    <label htmlFor="mediaHasCamera" className={labelClasses}>
                      Nếu ứng tuyển quay/chụp: bạn có máy ảnh cơ hay không?
                    </label>
                    <select
                      id="mediaHasCamera"
                      value={form.mediaHasCamera}
                      onChange={(event) => setField('mediaHasCamera', event.target.value)}
                      className={inputClasses}
                    >
                      <option value="">Chọn một phương án</option>
                      {volunteerFormSchema.cameraOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.mediaHasCamera ? (
                      <p className="mt-2 text-sm text-rose-300">{errors.mediaHasCamera}</p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </fieldset>
          ) : null}

          {hasSupportDepartment ? (
            <fieldset className={sectionClasses}>
              <legend className="mb-5 text-xl font-extrabold text-white">
                8. Câu hỏi riêng cho Hỗ trợ
              </legend>
              <div className="space-y-5">
                <div>
                  <p className={labelClasses}>Bạn có thể hỗ trợ những việc nào?</p>
                  <div className="mt-2">
                    <CheckboxCardGroup
                      options={volunteerFormSchema.supportTaskOptions}
                      selectedValues={form.supportTasks}
                      onToggle={(value) =>
                        setField('supportTasks', toggleValue(form.supportTasks, value))
                      }
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="availableForGreenCamp" className={labelClasses}>
                    Bạn có thể tham gia Trại hè Xanh trong tháng 6 không?
                  </label>
                  <select
                    id="availableForGreenCamp"
                    value={form.availableForGreenCamp}
                    onChange={(event) => setField('availableForGreenCamp', event.target.value)}
                    className={inputClasses}
                  >
                    <option value="">Chọn một phương án</option>
                    {volunteerFormSchema.greenCampAvailabilityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.availableForGreenCamp ? (
                    <p className="mt-2 text-sm text-rose-300">{errors.availableForGreenCamp}</p>
                  ) : null}
                </div>
              </div>
            </fieldset>
          ) : null}

          <fieldset className={sectionClasses}>
            <legend className="mb-5 text-xl font-extrabold text-white">9. Nguyện vọng ưu tiên</legend>
            <div className="grid gap-5 md:grid-cols-3">
              {(['priority1', 'priority2', 'priority3'] as const).map((fieldKey, index) => (
                <div key={fieldKey}>
                  <label htmlFor={fieldKey} className={labelClasses}>
                    Nguyện vọng {index + 1}
                  </label>
                  <select
                    id={fieldKey}
                    value={form[fieldKey]}
                    onChange={(event) => setField(fieldKey, event.target.value)}
                    className={inputClasses}
                  >
                    <option value="">Chọn nguyện vọng</option>
                    {volunteerFormSchema.priorityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={submitStatus === 'submitting'}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-yellow px-7 py-3 text-base font-bold text-brand-navy transition-all hover:-translate-y-0.5 hover:bg-brand-yellow-hover disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitStatus === 'submitting' ? (
                <>
                  <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                  Đang gửi đăng ký
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Gửi đăng ký
                </>
              )}
            </button>

            {(supportDepartmentWarning || techDepartmentWarning) ? (
              <div className="inline-flex items-start gap-2 text-sm leading-6 text-brand-yellow">
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                BTC sẽ kiểm tra lại lựa chọn hoạt động và bộ phận khi liên hệ.
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
};

export default VolunteerRegistrationForm;

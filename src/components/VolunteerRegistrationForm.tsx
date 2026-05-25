import { type FormEvent, useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, Download, LoaderCircle, Send } from 'lucide-react';

import {
  activityRegistrationOptions,
  applicantTypeOptions,
  availabilityPeriodOptions,
  departmentRegistrationOptions,
  greenCampAvailabilityOptions,
  mediaEquipmentOptions,
  mediaSkillOptions,
  priorityOptions,
  registrationLogicNotes,
  registrationLink,
  supportTaskOptions,
  techFieldOptions,
  techRoleOptions,
  timeSlotOptions,
} from '../data/programData';
import { exportToCsv } from '../utils/exportToCsv';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';
type TransportMode = 'json' | 'google-apps-script';

type VolunteerRegistrationState = {
  fullName: string;
  dateOfBirth: string;
  schoolOrOrganization: string;
  phone: string;
  email: string;
  facebookOrZalo: string;
  applicantType: string;
  selectedActivities: string[];
  selectedDepartments: string[];
  techRole: string;
  techFields: string[];
  techExperience: string;
  mediaSkills: string[];
  mediaEquipment: string[];
  portfolioUrl: string;
  supportTasks: string[];
  availableForGreenCamp: string;
  availabilityPeriods: string[];
  timeSlots: string[];
  busyNote: string;
  priority1: string;
  priority2: string;
  priority3: string;
  commitmentConfirmed: boolean;
};

type ValidationErrors = Partial<Record<keyof VolunteerRegistrationState, string>>;

type SubmissionPayload = VolunteerRegistrationState & {
  createdAt: string;
  source: 'landing_page_direct_form';
};

const initialState: VolunteerRegistrationState = {
  fullName: '',
  dateOfBirth: '',
  schoolOrOrganization: '',
  phone: '',
  email: '',
  facebookOrZalo: '',
  applicantType: '',
  selectedActivities: [],
  selectedDepartments: [],
  techRole: '',
  techFields: [],
  techExperience: '',
  mediaSkills: [],
  mediaEquipment: [],
  portfolioUrl: '',
  supportTasks: [],
  availableForGreenCamp: '',
  availabilityPeriods: [],
  timeSlots: [],
  busyNote: '',
  priority1: '',
  priority2: '',
  priority3: '',
  commitmentConfirmed: false,
};

const sectionClasses =
  'rounded-[28px] border border-white/10 bg-brand-deep/40 p-5 shadow-[0_22px_60px_rgba(2,6,23,0.45)] backdrop-blur-md sm:p-8';
const inputClasses =
  'mt-2 min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20';
const labelClasses = 'text-sm font-semibold uppercase tracking-[0.12em] text-slate-300';

const sectionHeadings = [
  'A. Thông tin cá nhân',
  'B. Hoạt động muốn tham gia',
  'C. Bộ phận muốn ứng tuyển',
  'G. Lịch rảnh',
  'H. Nguyện vọng ưu tiên',
  'I. Cam kết',
];

const toggleValue = (items: string[], value: string) =>
  items.includes(value) ? items.filter((item) => item !== value) : [...items, value];

const CheckboxCardGroup = ({
  options,
  selectedValues,
  onToggle,
}: {
  options: { value: string; label: string; description?: string }[];
  selectedValues: string[];
  onToggle: (value: string) => void;
}) => (
  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
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
  const supportDepartmentWarning =
    hasSupportDepartment && !form.selectedActivities.includes('trai-he-xanh');

  const visibleSections = useMemo(() => {
    const sections = [...sectionHeadings];

    if (hasTechDepartment) {
      sections.splice(3, 0, 'D. Tin học + Kỹ thuật');
    }
    if (hasMediaDepartment) {
      sections.splice(hasTechDepartment ? 4 : 3, 0, 'E. Truyền thông');
    }
    if (hasSupportDepartment) {
      sections.splice(
        hasTechDepartment && hasMediaDepartment ? 5 : hasTechDepartment || hasMediaDepartment ? 4 : 3,
        0,
        'F. Hỗ trợ',
      );
    }

    return sections;
  }, [hasMediaDepartment, hasSupportDepartment, hasTechDepartment]);

  const setField = <K extends keyof VolunteerRegistrationState>(field: K, value: VolunteerRegistrationState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setSubmitMessage('');
    }
  };

  const validateForm = () => {
    const nextErrors: ValidationErrors = {};

    if (!form.fullName.trim()) nextErrors.fullName = 'Vui lòng nhập họ và tên.';
    if (!form.phone.trim()) nextErrors.phone = 'Vui lòng nhập số điện thoại.';
    if (!form.facebookOrZalo.trim()) nextErrors.facebookOrZalo = 'Vui lòng nhập Facebook/Zalo.';
    if (form.selectedActivities.length === 0)
      nextErrors.selectedActivities = 'Vui lòng chọn ít nhất một hoạt động.';
    if (form.selectedDepartments.length === 0)
      nextErrors.selectedDepartments = 'Vui lòng chọn ít nhất một bộ phận.';
    if (!form.commitmentConfirmed)
      nextErrors.commitmentConfirmed = 'Bạn cần xác nhận cam kết trước khi gửi.';

    if (hasTechDepartment && !form.techRole) {
      nextErrors.techRole = 'Vui lòng chọn vai trò trong bộ phận Tin học + Kỹ thuật.';
    }

    if (hasSupportDepartment && !form.availableForGreenCamp) {
      nextErrors.availableForGreenCamp = 'Vui lòng cho biết khả năng tham gia Trại hè xanh.';
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
            Đăng ký trực tiếp tại website
          </p>
          <h2 className="text-2xl font-extrabold sm:text-3xl md:text-4xl">
            Điền thông tin một lần để BTC tư vấn và phân công phù hợp
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
          <div className="mb-6 rounded-[22px] border border-brand-yellow/30 bg-brand-yellow/10 p-4 text-sm leading-7 text-brand-yellow">
            Bộ phận Hỗ trợ chỉ phục vụ Trại hè xanh. Bạn vẫn có thể gửi form, BTC sẽ liên hệ tư
            vấn lại.
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
            <legend className="mb-5 text-xl font-extrabold text-white">A. Thông tin cá nhân</legend>
            <div className="grid gap-5 md:grid-cols-2">
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
                  Ngày sinh
                </label>
                <input
                  id="dateOfBirth"
                  type="date"
                  value={form.dateOfBirth}
                  onChange={(event) => setField('dateOfBirth', event.target.value)}
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="schoolOrOrganization" className={labelClasses}>
                  Trường / đơn vị
                </label>
                <input
                  id="schoolOrOrganization"
                  value={form.schoolOrOrganization}
                  onChange={(event) => setField('schoolOrOrganization', event.target.value)}
                  className={inputClasses}
                  placeholder="Tên trường hoặc đơn vị"
                />
              </div>

              <div>
                <label htmlFor="applicantType" className={labelClasses}>
                  Bạn là ai?
                </label>
                <select
                  id="applicantType"
                  value={form.applicantType}
                  onChange={(event) => setField('applicantType', event.target.value)}
                  className={inputClasses}
                >
                  <option value="">Chọn nhóm phù hợp</option>
                  {applicantTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
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

              <div>
                <label htmlFor="email" className={labelClasses}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => setField('email', event.target.value)}
                  className={inputClasses}
                  placeholder="ban@email.com"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="facebookOrZalo" className={labelClasses}>
                  Facebook/Zalo *
                </label>
                <input
                  id="facebookOrZalo"
                  value={form.facebookOrZalo}
                  onChange={(event) => setField('facebookOrZalo', event.target.value)}
                  className={inputClasses}
                  placeholder="Link Facebook hoặc tên Zalo"
                />
                {errors.facebookOrZalo ? (
                  <p className="mt-2 text-sm text-rose-300">{errors.facebookOrZalo}</p>
                ) : null}
              </div>
            </div>
          </fieldset>

          <fieldset className={sectionClasses}>
            <legend className="mb-5 text-xl font-extrabold text-white">B. Hoạt động muốn tham gia</legend>
            <CheckboxCardGroup
              options={activityRegistrationOptions}
              selectedValues={form.selectedActivities}
              onToggle={(value) => setField('selectedActivities', toggleValue(form.selectedActivities, value))}
            />
            {errors.selectedActivities ? (
              <p className="mt-3 text-sm text-rose-300">{errors.selectedActivities}</p>
            ) : null}
          </fieldset>

          <fieldset className={sectionClasses}>
            <legend className="mb-5 text-xl font-extrabold text-white">C. Bộ phận muốn ứng tuyển</legend>
            <CheckboxCardGroup
              options={departmentRegistrationOptions}
              selectedValues={form.selectedDepartments}
              onToggle={(value) =>
                setField('selectedDepartments', toggleValue(form.selectedDepartments, value))
              }
            />
            <div className="mt-5 rounded-[22px] border border-white/10 bg-slate-950/60 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-cyan">
                Ghi chú logic
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
                {registrationLogicNotes.map((note) => (
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
              <legend className="mb-5 text-xl font-extrabold text-white">D. Tin học + Kỹ thuật</legend>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label htmlFor="techRole" className={labelClasses}>
                    Vai trò mong muốn
                  </label>
                  <select
                    id="techRole"
                    value={form.techRole}
                    onChange={(event) => setField('techRole', event.target.value)}
                    className={inputClasses}
                  >
                    <option value="">Chọn vai trò</option>
                    {techRoleOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.techRole ? <p className="mt-2 text-sm text-rose-300">{errors.techRole}</p> : null}
                </div>

                <div className="md:col-span-2">
                  <p className={labelClasses}>Lĩnh vực quan tâm</p>
                  <div className="mt-2">
                    <CheckboxCardGroup
                      options={techFieldOptions}
                      selectedValues={form.techFields}
                      onToggle={(value) => setField('techFields', toggleValue(form.techFields, value))}
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="techExperience" className={labelClasses}>
                    Mô tả ngắn kinh nghiệm, sản phẩm, dự án hoặc kỹ năng liên quan
                  </label>
                  <textarea
                    id="techExperience"
                    value={form.techExperience}
                    onChange={(event) => setField('techExperience', event.target.value)}
                    className={`${inputClasses} min-h-32`}
                    placeholder="Ví dụ: từng dạy học, làm dự án STEM, học AI cơ bản, thi an toàn thông tin..."
                  />
                </div>
              </div>
            </fieldset>
          ) : null}

          {hasMediaDepartment ? (
            <fieldset className={sectionClasses}>
              <legend className="mb-5 text-xl font-extrabold text-white">E. Truyền thông</legend>
              <div className="space-y-5">
                <div>
                  <p className={labelClasses}>Kỹ năng</p>
                  <div className="mt-2">
                    <CheckboxCardGroup
                      options={mediaSkillOptions}
                      selectedValues={form.mediaSkills}
                      onToggle={(value) => setField('mediaSkills', toggleValue(form.mediaSkills, value))}
                    />
                  </div>
                </div>

                <div>
                  <p className={labelClasses}>Thiết bị có thể sử dụng</p>
                  <div className="mt-2">
                    <CheckboxCardGroup
                      options={mediaEquipmentOptions}
                      selectedValues={form.mediaEquipment}
                      onToggle={(value) =>
                        setField('mediaEquipment', toggleValue(form.mediaEquipment, value))
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
              </div>
            </fieldset>
          ) : null}

          {hasSupportDepartment ? (
            <fieldset className={sectionClasses}>
              <legend className="mb-5 text-xl font-extrabold text-white">F. Hỗ trợ</legend>
              <div className="space-y-5">
                <div>
                  <p className={labelClasses}>Đầu việc bạn có thể hỗ trợ</p>
                  <div className="mt-2">
                    <CheckboxCardGroup
                      options={supportTaskOptions}
                      selectedValues={form.supportTasks}
                      onToggle={(value) => setField('supportTasks', toggleValue(form.supportTasks, value))}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="availableForGreenCamp" className={labelClasses}>
                    Khả năng tham gia Trại hè xanh
                  </label>
                  <select
                    id="availableForGreenCamp"
                    value={form.availableForGreenCamp}
                    onChange={(event) => setField('availableForGreenCamp', event.target.value)}
                    className={inputClasses}
                  >
                    <option value="">Chọn một phương án</option>
                    {greenCampAvailabilityOptions.map((option) => (
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
            <legend className="mb-5 text-xl font-extrabold text-white">G. Lịch rảnh</legend>
            <div className="space-y-5">
              <div>
                <p className={labelClasses}>Các giai đoạn bạn có thể tham gia</p>
                <div className="mt-2">
                  <CheckboxCardGroup
                    options={availabilityPeriodOptions}
                    selectedValues={form.availabilityPeriods}
                    onToggle={(value) =>
                      setField('availabilityPeriods', toggleValue(form.availabilityPeriods, value))
                    }
                  />
                </div>
              </div>

              <div>
                <p className={labelClasses}>Khung thời gian phù hợp</p>
                <div className="mt-2">
                  <CheckboxCardGroup
                    options={timeSlotOptions}
                    selectedValues={form.timeSlots}
                    onToggle={(value) => setField('timeSlots', toggleValue(form.timeSlots, value))}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="busyNote" className={labelClasses}>
                  Bạn có lịch bận cố định hoặc lịch thi trong giai đoạn tháng 6 - tháng 7 không?
                </label>
                <textarea
                  id="busyNote"
                  value={form.busyNote}
                  onChange={(event) => setField('busyNote', event.target.value)}
                  className={`${inputClasses} min-h-28`}
                  placeholder="Ghi rõ nếu bạn có lịch thi, lịch học, lịch làm việc cố định..."
                />
              </div>
            </div>
          </fieldset>

          <fieldset className={sectionClasses}>
            <legend className="mb-5 text-xl font-extrabold text-white">H. Nguyện vọng ưu tiên</legend>
            <div className="grid gap-5 md:grid-cols-3">
              {(['priority1', 'priority2', 'priority3'] as const).map((fieldKey, index) => (
                <div key={fieldKey}>
                  <label htmlFor={fieldKey} className={labelClasses}>
                    Ưu tiên {index + 1}
                  </label>
                  <select
                    id={fieldKey}
                    value={form[fieldKey]}
                    onChange={(event) => setField(fieldKey, event.target.value)}
                    className={inputClasses}
                  >
                    <option value="">Chọn ưu tiên</option>
                    {priorityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className={sectionClasses}>
            <legend className="mb-5 text-xl font-extrabold text-white">I. Cam kết</legend>
            <label className="flex cursor-pointer items-start gap-3 rounded-[22px] border border-white/10 bg-slate-950/60 p-4">
              <input
                type="checkbox"
                checked={form.commitmentConfirmed}
                onChange={(event) => setField('commitmentConfirmed', event.target.checked)}
                className="mt-1 h-5 w-5 accent-cyan-400"
              />
              <span className="leading-7 text-slate-200">
                Tôi xác nhận thông tin đã điền là chính xác và đồng ý để BTC liên hệ qua số điện
                thoại/Facebook/Zalo đã cung cấp.
              </span>
            </label>
            {errors.commitmentConfirmed ? (
              <p className="mt-3 text-sm text-rose-300">{errors.commitmentConfirmed}</p>
            ) : null}
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

            {supportDepartmentWarning ? (
              <div className="inline-flex items-start gap-2 text-sm leading-6 text-brand-yellow">
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                BTC sẽ kiểm tra lại lựa chọn Hỗ trợ khi liên hệ.
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
};

export default VolunteerRegistrationForm;

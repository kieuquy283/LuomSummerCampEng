import { type FormEvent, useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, LoaderCircle, Send } from 'lucide-react';

import {
  type DepartmentValue,
  type FormOption,
  volunteerFormSchema,
} from '../data/volunteerFormSchema';
import { getSupabaseClient, getVolunteerRegistrationsTable } from '../lib/supabase';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';
type TransportMode = 'json' | 'google-apps-script';

type VolunteerRegistrationState = {
  readiness: string;
  commitment80Percent: string;
  fullName: string;
  dateOfBirth: string;
  schoolClassMajor: string;
  email: string;
  phone: string;
  emergencyContact: string;
  facebookUrl: string;
  currentAddress: string;
  certificates: string;
  knowledgeAboutLuom: string;
  motivation: string;
  talents: string;
  strengths: string[];
  strengthsOther: string;
  pastVolunteerExperience: string;
  activities: string[];
  primaryDepartment: DepartmentValue | '';
  additionalDepartments: DepartmentValue[];
  techFocusAreas: string[];
  techFocusOther: string;
  cyberInfoSourcesAndRisks: string;
  aiToolsAndComputerSkills: string;
  digitalToolsForLessonDesign: string;
  cyberSafetyGameIdea: string;
  offlineClassHandling: string;
  motorCircuitExperience: string;
  electricityKnowledgeRating: string;
  handmadeTechnicalSituation: string;
  mediaPositions: string[];
  mediaPositionOther: string;
  mediaPortfolioLink: string;
  hasCamera: string;
  supportTasks: string[];
  supportExperience: string;
  finalNote: string;
  dataConsent: boolean;
};

type ValidationErrors = Partial<Record<keyof VolunteerRegistrationState, string>>;

type SubmissionPayload = {
  formName: string;
  source: 'landing_page_direct_form';
  createdAt: string;
  personalInfo: {
    fullName: string;
    dateOfBirth: string;
    schoolClassMajor: string;
    email: string;
    phone: string;
    emergencyContact: string;
    facebookUrl: string;
    currentAddress: string;
    certificates: string;
  };
  commitments: {
    readiness: string;
    commitment80Percent: string;
  };
  generalAnswers: {
    knowledgeAboutLuom: string;
    motivation: string;
    talents: string;
    strengths: string[];
    strengthsOther: string;
    pastVolunteerExperience: string;
  };
  activities: string[];
  primaryDepartment: DepartmentValue | '';
  additionalDepartments: DepartmentValue[];
  techAnswers: {
    techFocusAreas: string[];
    techFocusOther: string;
    cyberInfoSourcesAndRisks: string;
    aiToolsAndComputerSkills: string;
    digitalToolsForLessonDesign: string;
    cyberSafetyGameIdea: string;
    offlineClassHandling: string;
    motorCircuitExperience: string;
    electricityKnowledgeRating: string;
    handmadeTechnicalSituation: string;
  };
  mediaAnswers: {
    mediaPositions: string[];
    mediaPositionOther: string;
    mediaPortfolioLink: string;
    hasCamera: string;
  };
  supportAnswers: {
    supportTasks: string[];
    supportExperience: string;
  };
  finalNote: string;
  dataConsent: boolean;
};

const initialState: VolunteerRegistrationState = {
  readiness: '',
  commitment80Percent: '',
  fullName: '',
  dateOfBirth: '',
  schoolClassMajor: '',
  email: '',
  phone: '',
  emergencyContact: '',
  facebookUrl: '',
  currentAddress: '',
  certificates: '',
  knowledgeAboutLuom: '',
  motivation: '',
  talents: '',
  strengths: [],
  strengthsOther: '',
  pastVolunteerExperience: '',
  activities: [],
  primaryDepartment: '',
  additionalDepartments: [],
  techFocusAreas: [],
  techFocusOther: '',
  cyberInfoSourcesAndRisks: '',
  aiToolsAndComputerSkills: '',
  digitalToolsForLessonDesign: '',
  cyberSafetyGameIdea: '',
  offlineClassHandling: '',
  motorCircuitExperience: '',
  electricityKnowledgeRating: '',
  handmadeTechnicalSituation: '',
  mediaPositions: [],
  mediaPositionOther: '',
  mediaPortfolioLink: '',
  hasCamera: '',
  supportTasks: [],
  supportExperience: '',
  finalNote: '',
  dataConsent: false,
};

const sectionClasses =
  'rounded-[28px] border border-white/10 bg-brand-deep/40 p-5 shadow-[0_22px_60px_rgba(2,6,23,0.45)] backdrop-blur-md sm:p-8';
const inputClasses =
  'mt-2 min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20';
const labelClasses = 'text-sm font-semibold uppercase tracking-[0.12em] text-slate-300';

const toggleValue = (items: string[], value: string) =>
  items.includes(value) ? items.filter((item) => item !== value) : [...items, value];

const departmentLabelMap: Record<DepartmentValue, string> = {
  tech: 'Chuyên môn Tin học và Kỹ thuật',
  media: 'Truyền thông',
  support: 'Hỗ trợ',
};

const getDepartmentList = (
  primaryDepartment: DepartmentValue | '',
  additionalDepartments: DepartmentValue[],
) => {
  const combined = primaryDepartment ? [primaryDepartment, ...additionalDepartments] : additionalDepartments;
  return Array.from(new Set(combined));
};

const getActivityLabels = (values: string[]) =>
  volunteerFormSchema.activityOptions
    .filter((option) => values.includes(option.value))
    .map((option) => option.label);

const getDepartmentLabels = (values: DepartmentValue[]) => values.map((value) => departmentLabelMap[value]);

const CheckboxCardGroup = ({
  options,
  selectedValues,
  onToggle,
  columns = 'sm:grid-cols-2',
  isDisabled,
}: {
  options: readonly FormOption[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  columns?: string;
  isDisabled?: (value: string) => boolean;
}) => (
  <div className={`grid gap-3 ${columns}`}>
    {options.map((option) => {
      const checked = selectedValues.includes(option.value);
      const disabled = isDisabled?.(option.value) ?? false;

      return (
        <label
          key={option.value}
          className={`rounded-[22px] border p-4 transition-all ${
            disabled
              ? 'cursor-not-allowed border-white/5 bg-slate-900/40 opacity-45'
              : checked
                ? 'cursor-pointer border-brand-cyan bg-brand-cyan/10 shadow-[0_0_20px_rgba(34,211,238,0.12)]'
                : 'cursor-pointer border-white/10 bg-slate-950/60 hover:border-white/20'
          }`}
        >
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
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

const RadioCardGroup = ({
  options,
  selectedValue,
  onSelect,
  columns = 'sm:grid-cols-1',
}: {
  options: readonly FormOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  columns?: string;
}) => (
  <div className={`grid gap-3 ${columns}`}>
    {options.map((option) => {
      const checked = selectedValue === option.value;

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
            type="radio"
            checked={checked}
            onChange={() => onSelect(option.value)}
            className="sr-only"
          />
          <div className="flex items-start gap-3">
            <span
              className={`mt-0.5 h-5 w-5 rounded-full border ${
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

const ErrorText = ({ message }: { message?: string }) =>
  message ? <p className="mt-2 text-sm text-rose-300">{message}</p> : null;

const DescriptionBlock = ({ text }: { text: string }) => (
  <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-300">{text}</p>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mb-5 text-xl font-extrabold text-white">{children}</h3>
);

const VolunteerRegistrationForm = () => {
  const [form, setForm] = useState<VolunteerRegistrationState>(initialState);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const supabase = getSupabaseClient();
  const supabaseTable = getVolunteerRegistrationsTable();
  const endpoint = import.meta.env.VITE_REGISTRATION_ENDPOINT?.trim();
  const configuredTransport = import.meta.env.VITE_REGISTRATION_TRANSPORT?.trim();
  const hasSupabase = Boolean(supabase);
  const hasEndpoint = Boolean(endpoint);
  const isDevFallback = import.meta.env.DEV && !hasEndpoint && !hasSupabase;
  const transportMode: TransportMode =
    configuredTransport === 'google-apps-script' || endpoint?.includes('script.google.com')
      ? 'google-apps-script'
      : 'json';

  const selectedDepartments = useMemo(
    () => getDepartmentList(form.primaryDepartment, form.additionalDepartments),
    [form.additionalDepartments, form.primaryDepartment],
  );

  const hasTechSection = selectedDepartments.includes('tech');
  const hasMediaSection = selectedDepartments.includes('media');
  const hasSupportSection = selectedDepartments.includes('support');
  const hasStrengthOther = form.strengths.includes('khac');
  const hasTechOther = form.techFocusAreas.includes('khac');
  const hasMediaOther = form.mediaPositions.includes('khac');
  const hasTechCamp = form.activities.includes('trai-he-cong-nghe');
  const hasDigitalClass = form.activities.includes('binh-dan-hoc-vu-so');
  const hasGreenCamp = form.activities.includes('trai-he-xanh');
  const activityPairWarning = hasTechCamp !== hasDigitalClass;
  const supportWarning = hasSupportSection && !hasGreenCamp;
  const facebookUrlWarning =
    form.facebookUrl.trim().length > 0 &&
    !/^https?:\/\//i.test(form.facebookUrl.trim());

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
    const digitCount = form.phone.replace(/\D/g, '').length;

    if (!form.readiness) nextErrors.readiness = 'Vui lòng xác nhận mức độ sẵn sàng.';
    if (!form.commitment80Percent) {
      nextErrors.commitment80Percent = 'Vui lòng xác nhận cam kết tham gia.';
    }
    if (!form.fullName.trim()) nextErrors.fullName = 'Vui lòng nhập họ và tên.';
    if (!form.dateOfBirth.trim()) nextErrors.dateOfBirth = 'Vui lòng nhập ngày sinh.';
    if (!form.schoolClassMajor.trim()) {
      nextErrors.schoolClassMajor = 'Vui lòng nhập trường và lớp/ngành.';
    }
    if (!form.email.trim()) {
      nextErrors.email = 'Vui lòng nhập email cá nhân.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Email chưa đúng định dạng.';
    }
    if (!form.phone.trim()) {
      nextErrors.phone = 'Vui lòng nhập số điện thoại.';
    } else if (digitCount < 9) {
      nextErrors.phone = 'Số điện thoại cần có ít nhất 9 chữ số.';
    }
    if (!form.emergencyContact.trim()) {
      nextErrors.emergencyContact = 'Vui lòng nhập liên hệ khẩn cấp.';
    }
    if (!form.facebookUrl.trim()) nextErrors.facebookUrl = 'Vui lòng nhập link Facebook cá nhân.';
    if (!form.currentAddress.trim()) nextErrors.currentAddress = 'Vui lòng nhập nơi ở hiện tại.';
    if (!form.knowledgeAboutLuom.trim()) {
      nextErrors.knowledgeAboutLuom = 'Vui lòng trả lời câu hỏi này.';
    }
    if (!form.motivation.trim()) nextErrors.motivation = 'Vui lòng trả lời câu hỏi này.';
    if (form.strengths.length === 0) nextErrors.strengths = 'Vui lòng chọn ít nhất một phương án.';
    if (hasStrengthOther && !form.strengthsOther.trim()) {
      nextErrors.strengthsOther = 'Vui lòng mô tả thêm mục khác.';
    }
    if (form.activities.length === 0) nextErrors.activities = 'Vui lòng chọn ít nhất một hoạt động.';
    if (!form.primaryDepartment) {
      nextErrors.primaryDepartment = 'Vui lòng chọn bộ phận ứng tuyển chính.';
    }
    if (hasTechSection && form.techFocusAreas.length === 0) {
      nextErrors.techFocusAreas = 'Vui lòng chọn ít nhất một nội dung bạn có thể hỗ trợ.';
    }
    if (hasTechOther && !form.techFocusOther.trim()) {
      nextErrors.techFocusOther = 'Vui lòng mô tả nội dung khác.';
    }
    if (hasMediaSection && form.mediaPositions.length === 0) {
      nextErrors.mediaPositions = 'Vui lòng chọn ít nhất một vị trí truyền thông.';
    }
    if (hasMediaOther && !form.mediaPositionOther.trim()) {
      nextErrors.mediaPositionOther = 'Vui lòng mô tả vị trí truyền thông khác.';
    }
    if (hasMediaSection && !form.mediaPortfolioLink.trim()) {
      nextErrors.mediaPortfolioLink = 'Vui lòng nhập link nộp sản phẩm.';
    }
    if (hasSupportSection && form.supportTasks.length === 0) {
      nextErrors.supportTasks = 'Vui lòng chọn ít nhất một đầu việc hỗ trợ.';
    }
    if (!form.dataConsent) {
      nextErrors.dataConsent = 'Bạn cần xác nhận trước khi gửi đăng ký.';
    }

    return nextErrors;
  };

  const buildPayload = (): SubmissionPayload => ({
    formName: volunteerFormSchema.formName,
    source: 'landing_page_direct_form',
    createdAt: new Date().toISOString(),
    personalInfo: {
      fullName: form.fullName.trim(),
      dateOfBirth: form.dateOfBirth.trim(),
      schoolClassMajor: form.schoolClassMajor.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      emergencyContact: form.emergencyContact.trim(),
      facebookUrl: form.facebookUrl.trim(),
      currentAddress: form.currentAddress.trim(),
      certificates: form.certificates.trim(),
    },
    commitments: {
      readiness: form.readiness,
      commitment80Percent: form.commitment80Percent,
    },
    generalAnswers: {
      knowledgeAboutLuom: form.knowledgeAboutLuom.trim(),
      motivation: form.motivation.trim(),
      talents: form.talents.trim(),
      strengths: form.strengths,
      strengthsOther: form.strengthsOther.trim(),
      pastVolunteerExperience: form.pastVolunteerExperience.trim(),
    },
    activities: getActivityLabels(form.activities),
    primaryDepartment: form.primaryDepartment,
    additionalDepartments: form.additionalDepartments,
    techAnswers: {
      techFocusAreas: form.techFocusAreas,
      techFocusOther: form.techFocusOther.trim(),
      cyberInfoSourcesAndRisks: form.cyberInfoSourcesAndRisks.trim(),
      aiToolsAndComputerSkills: form.aiToolsAndComputerSkills.trim(),
      digitalToolsForLessonDesign: form.digitalToolsForLessonDesign.trim(),
      cyberSafetyGameIdea: form.cyberSafetyGameIdea.trim(),
      offlineClassHandling: form.offlineClassHandling.trim(),
      motorCircuitExperience: form.motorCircuitExperience.trim(),
      electricityKnowledgeRating: form.electricityKnowledgeRating.trim(),
      handmadeTechnicalSituation: form.handmadeTechnicalSituation.trim(),
    },
    mediaAnswers: {
      mediaPositions: form.mediaPositions,
      mediaPositionOther: form.mediaPositionOther.trim(),
      mediaPortfolioLink: form.mediaPortfolioLink.trim(),
      hasCamera: form.hasCamera,
    },
    supportAnswers: {
      supportTasks: form.supportTasks,
      supportExperience: form.supportExperience.trim(),
    },
    finalNote: form.finalNote.trim(),
    dataConsent: form.dataConsent,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitStatus('error');
      setSubmitMessage('Vui lòng kiểm tra lại các trường bắt buộc trước khi gửi.');
      return;
    }

    const payload = buildPayload();
    setSubmitStatus('submitting');
    setSubmitMessage('');

    try {
      if (hasEndpoint && endpoint) {
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
      } else if (hasSupabase && supabase) {
        const selectedDepartmentLabels = getDepartmentLabels(selectedDepartments);
        const { error } = await supabase.from(supabaseTable).insert({
          source: payload.source,
          submitted_at: payload.createdAt,
          full_name: payload.personalInfo.fullName,
          email: payload.personalInfo.email,
          phone: payload.personalInfo.phone,
          facebook_or_zalo: payload.personalInfo.facebookUrl,
          selected_activities: payload.activities,
          selected_departments: selectedDepartmentLabels,
          payload,
        });

        if (error) {
          throw new Error(error.message || 'Không thể lưu đăng ký lúc này.');
        }
      } else if (import.meta.env.DEV) {
        console.log('Volunteer registration payload', payload);
      } else {
        throw new Error('Chưa cấu hình endpoint hoặc nơi lưu dữ liệu cho form đăng ký trực tiếp.');
      }

      setForm(initialState);
      setSubmitStatus('success');
      setSubmitMessage(
        isDevFallback
          ? 'BTC đã nhận được đăng ký của bạn. Chúng mình sẽ liên hệ lại trong thời gian sớm nhất. Bạn vui lòng chú ý email và tin nhắn Facebook/Zalo nhé.\n\nChưa cấu hình endpoint lưu dữ liệu. Dữ liệu đang được hiển thị trong console ở môi trường phát triển.'
          : 'BTC đã nhận được đăng ký của bạn. Chúng mình sẽ liên hệ lại trong thời gian sớm nhất. Bạn vui lòng chú ý email và tin nhắn Facebook/Zalo nhé.',
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
          <p className="text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            {volunteerFormSchema.formNote}
          </p>
        </div>

        {activityPairWarning ? (
          <div className="mb-4 rounded-[22px] border border-brand-yellow/30 bg-brand-yellow/10 p-4 text-sm leading-7 text-brand-yellow">
            Trại hè Công nghệ và Lớp Bình dân học vụ số có chung tệp nhân sự. Bạn sẽ cần tham gia
            đồng thời 2 hoạt động này.
          </div>
        ) : null}

        {supportWarning ? (
          <div className="mb-4 rounded-[22px] border border-brand-yellow/30 bg-brand-yellow/10 p-4 text-sm leading-7 text-brand-yellow">
            Bộ phận Hỗ trợ chủ yếu phục vụ Trại hè Xanh. BTC sẽ liên hệ để xác nhận lại lịch tham
            gia phù hợp.
          </div>
        ) : null}

        {submitStatus === 'success' ? (
          <div className="mb-6 rounded-[24px] border border-emerald-400/30 bg-emerald-400/10 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-6 w-6 text-emerald-300" />
              <p className="whitespace-pre-line leading-7 text-emerald-100">{submitMessage}</p>
            </div>
          </div>
        ) : null}

        {submitStatus === 'error' && submitMessage ? (
          <div className="mb-6 rounded-[24px] border border-rose-400/30 bg-rose-400/10 p-4 text-sm leading-7 text-rose-100">
            {submitMessage}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <fieldset className={sectionClasses}>
            <SectionTitle>1. Lưu ý và cam kết</SectionTitle>
            <div className="space-y-5">
              <div>
                <p className={labelClasses}>{volunteerFormSchema.readiness.label}</p>
                <div className="mt-2">
                  <RadioCardGroup
                    options={volunteerFormSchema.readiness.options}
                    selectedValue={form.readiness}
                    onSelect={(value) => setField('readiness', value)}
                  />
                </div>
                <ErrorText message={errors.readiness} />
              </div>

              <div>
                <p className={labelClasses}>{volunteerFormSchema.commitment80Percent.label}</p>
                <DescriptionBlock text={volunteerFormSchema.commitment80Percent.description} />
                <div className="mt-2">
                  <RadioCardGroup
                    options={volunteerFormSchema.commitment80Percent.options}
                    selectedValue={form.commitment80Percent}
                    onSelect={(value) => setField('commitment80Percent', value)}
                  />
                </div>
                <ErrorText message={errors.commitment80Percent} />
              </div>
            </div>
          </fieldset>

          <fieldset className={sectionClasses}>
            <SectionTitle>2. Thông tin cá nhân</SectionTitle>
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
                />
                <ErrorText message={errors.fullName} />
              </div>

              <div>
                <label htmlFor="dateOfBirth" className={labelClasses}>
                  Ngày/tháng/năm sinh *
                </label>
                <input
                  id="dateOfBirth"
                  value={form.dateOfBirth}
                  onChange={(event) => setField('dateOfBirth', event.target.value)}
                  className={inputClasses}
                  placeholder="VD: 01/01/2005"
                />
                <ErrorText message={errors.dateOfBirth} />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="schoolClassMajor" className={labelClasses}>
                  Tên trường - Lớp/ngành bạn đang theo học *
                </label>
                <input
                  id="schoolClassMajor"
                  value={form.schoolClassMajor}
                  onChange={(event) => setField('schoolClassMajor', event.target.value)}
                  className={inputClasses}
                />
                <DescriptionBlock text="Nếu bạn là học sinh Chuyên, vui lòng ghi chú rõ tên lớp chuyên. VD: THPT Chuyên Vĩnh Phúc - 11A1 (Chuyên Toán)" />
                <ErrorText message={errors.schoolClassMajor} />
              </div>

              <div>
                <label htmlFor="email" className={labelClasses}>
                  Email cá nhân *
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => setField('email', event.target.value)}
                  className={inputClasses}
                />
                <ErrorText message={errors.email} />
              </div>

              <div>
                <label htmlFor="phone" className={labelClasses}>
                  SĐT cá nhân *
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(event) => setField('phone', event.target.value)}
                  className={inputClasses}
                />
                <ErrorText message={errors.phone} />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="emergencyContact" className={labelClasses}>
                  Trong trường hợp khẩn cấp, ngoài số điện thoại bạn đã cung cấp ở trên, chúng mình
                  có thể liên hệ với ai khác nữa? *
                </label>
                <input
                  id="emergencyContact"
                  value={form.emergencyContact}
                  onChange={(event) => setField('emergencyContact', event.target.value)}
                  className={inputClasses}
                />
                <DescriptionBlock text="Bạn vui lòng điền theo cú pháp: SĐT - Họ tên chủ SĐT - Mối quan hệ của chủ SĐT với bạn. Ví dụ: 098xxxxxxx - Thu Trang - Mẹ" />
                <ErrorText message={errors.emergencyContact} />
              </div>

              <div>
                <label htmlFor="facebookUrl" className={labelClasses}>
                  Link Facebook cá nhân *
                </label>
                <input
                  id="facebookUrl"
                  type="url"
                  value={form.facebookUrl}
                  onChange={(event) => setField('facebookUrl', event.target.value)}
                  className={inputClasses}
                />
                {facebookUrlWarning ? (
                  <p className="mt-2 text-sm text-brand-yellow">
                    Link Facebook nên bắt đầu bằng `http` hoặc `https`. Bạn vẫn có thể gửi form.
                  </p>
                ) : null}
                <ErrorText message={errors.facebookUrl} />
              </div>

              <div>
                <label htmlFor="currentAddress" className={labelClasses}>
                  Nơi ở hiện tại của bạn *
                </label>
                <input
                  id="currentAddress"
                  value={form.currentAddress}
                  onChange={(event) => setField('currentAddress', event.target.value)}
                  className={inputClasses}
                />
                <DescriptionBlock text="Bạn vui lòng nhập theo tên các đơn vị hành chính cũ. Ví dụ: Phường Khai Quang - Vĩnh Yên" />
                <ErrorText message={errors.currentAddress} />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="certificates" className={labelClasses}>
                  Thành tích/Chứng chỉ với môn Tin học/Tiếng Anh/Kỹ thuật mà bạn đã có
                </label>
                <input
                  id="certificates"
                  value={form.certificates}
                  onChange={(event) => setField('certificates', event.target.value)}
                  className={inputClasses}
                />
                <DescriptionBlock text="Nếu chưa có, bạn vui lòng bỏ trống câu hỏi này." />
              </div>
            </div>
          </fieldset>

          <fieldset className={sectionClasses}>
            <SectionTitle>3. Câu hỏi chung</SectionTitle>
            <div className="space-y-5">
              <div>
                <label htmlFor="knowledgeAboutLuom" className={labelClasses}>
                  Bạn biết gì về dự án Lượm - Giáo dục vì Cộng đồng? *
                </label>
                <textarea
                  id="knowledgeAboutLuom"
                  value={form.knowledgeAboutLuom}
                  onChange={(event) => setField('knowledgeAboutLuom', event.target.value)}
                  className={`${inputClasses} min-h-32`}
                />
                <ErrorText message={errors.knowledgeAboutLuom} />
              </div>

              <div>
                <label htmlFor="motivation" className={labelClasses}>
                  Vì sao bạn muốn tham gia các hoạt động tình nguyện này? *
                </label>
                <textarea
                  id="motivation"
                  value={form.motivation}
                  onChange={(event) => setField('motivation', event.target.value)}
                  className={`${inputClasses} min-h-32`}
                />
                <ErrorText message={errors.motivation} />
              </div>

              <div>
                <label htmlFor="talents" className={labelClasses}>
                  Bạn có năng khiếu hay tài lẻ gì không? (hát, biên đạo, kể chuyện, hoạt náo, chơi
                  rubik...)
                </label>
                <input
                  id="talents"
                  value={form.talents}
                  onChange={(event) => setField('talents', event.target.value)}
                  className={inputClasses}
                />
                <DescriptionBlock text="Nếu không, bạn vui lòng bỏ trống câu hỏi này." />
              </div>

              <div>
                <p className={labelClasses}>
                  Bạn có thế mạnh hoặc kinh nghiệm nào trong các việc sau không? *
                </p>
                <DescriptionBlock text="Có thể lựa chọn nhiều phương án." />
                <div className="mt-2">
                  <CheckboxCardGroup
                    options={volunteerFormSchema.strengthsOptions}
                    selectedValues={form.strengths}
                    onToggle={(value) => setField('strengths', toggleValue(form.strengths, value))}
                    columns="sm:grid-cols-2 xl:grid-cols-2"
                  />
                </div>
                <ErrorText message={errors.strengths} />
              </div>

              {hasStrengthOther ? (
                <div>
                  <label htmlFor="strengthsOther" className={labelClasses}>
                    Vui lòng mô tả thế mạnh/kinh nghiệm khác của bạn
                  </label>
                  <input
                    id="strengthsOther"
                    value={form.strengthsOther}
                    onChange={(event) => setField('strengthsOther', event.target.value)}
                    className={inputClasses}
                  />
                  <ErrorText message={errors.strengthsOther} />
                </div>
              ) : null}

              <div>
                <label htmlFor="pastVolunteerExperience" className={labelClasses}>
                  Bạn đã tham gia Tình nguyện sự kiện nào trước đây chưa?
                </label>
                <textarea
                  id="pastVolunteerExperience"
                  value={form.pastVolunteerExperience}
                  onChange={(event) => setField('pastVolunteerExperience', event.target.value)}
                  className={`${inputClasses} min-h-40`}
                />
                <DescriptionBlock text="Nếu có, kể tên các sự kiện từng tham gia, vị trí tình nguyện và mô tả ngắn gọn những việc bạn đã từng làm theo cú pháp:\n1. Tên sự kiện - Tên vị trí\n- Công việc 1: mô tả\n- Công việc 2: mô tả\n...\nNếu chưa, bạn vui lòng bỏ trống câu hỏi này." />
              </div>
            </div>
          </fieldset>

          <fieldset className={sectionClasses}>
            <SectionTitle>4. Hoạt động có thể tham gia</SectionTitle>
            <p className={labelClasses}>Hãy chọn TẤT CẢ các hoạt động bạn có thể tham gia. *</p>
            <DescriptionBlock text={volunteerFormSchema.activityDescription} />
            <div className="mt-4">
              <CheckboxCardGroup
                options={volunteerFormSchema.activityOptions}
                selectedValues={form.activities}
                onToggle={(value) => setField('activities', toggleValue(form.activities, value))}
                columns="sm:grid-cols-2 xl:grid-cols-3"
              />
            </div>
            <ErrorText message={errors.activities} />
          </fieldset>

          <fieldset className={sectionClasses}>
            <SectionTitle>5. Bộ phận ứng tuyển</SectionTitle>
            <div className="space-y-5">
              <div>
                <p className={labelClasses}>Bạn muốn ứng tuyển vào bộ phận nào? *</p>
                <div className="mt-2">
                  <RadioCardGroup
                    options={volunteerFormSchema.primaryDepartmentOptions}
                    selectedValue={form.primaryDepartment}
                    onSelect={(value) => {
                      const nextPrimary = value as DepartmentValue;
                      setField('primaryDepartment', nextPrimary);
                      setField(
                        'additionalDepartments',
                        form.additionalDepartments.filter((item) => item !== nextPrimary),
                      );
                    }}
                    columns="sm:grid-cols-2 xl:grid-cols-3"
                  />
                </div>
                <ErrorText message={errors.primaryDepartment} />
              </div>

              <div>
                <p className={labelClasses}>Bạn có muốn ứng tuyển thêm bộ phận nào khác không?</p>
                <div className="mt-2">
                  <CheckboxCardGroup
                    options={volunteerFormSchema.additionalDepartmentOptions}
                    selectedValues={form.additionalDepartments}
                    onToggle={(value) =>
                      setField(
                        'additionalDepartments',
                        toggleValue(form.additionalDepartments, value) as DepartmentValue[],
                      )
                    }
                    columns="sm:grid-cols-2 xl:grid-cols-3"
                    isDisabled={(value) => value === form.primaryDepartment}
                  />
                </div>
              </div>
            </div>
          </fieldset>

          {(hasTechSection || hasMediaSection || hasSupportSection) ? (
            <section className="space-y-6">
              {hasTechSection ? (
                <fieldset className={sectionClasses}>
                  <SectionTitle>6A. {volunteerFormSchema.tech.title}</SectionTitle>
                  <DescriptionBlock text={volunteerFormSchema.tech.description} />
                  <div className="mt-5 space-y-5">
                    <div>
                      <p className={labelClasses}>
                        Bạn tự tin mình có thể hỗ trợ tốt nhất cho các em học sinh ở nội dung nào
                        sau đây? *
                      </p>
                      <DescriptionBlock text="Có thể chọn nhiều hơn 1 lựa chọn." />
                      <div className="mt-2">
                        <CheckboxCardGroup
                          options={volunteerFormSchema.tech.focusAreaOptions}
                          selectedValues={form.techFocusAreas}
                          onToggle={(value) =>
                            setField('techFocusAreas', toggleValue(form.techFocusAreas, value))
                          }
                          columns="sm:grid-cols-2 xl:grid-cols-2"
                        />
                      </div>
                      <ErrorText message={errors.techFocusAreas} />
                    </div>

                    {hasTechOther ? (
                      <div>
                        <label htmlFor="techFocusOther" className={labelClasses}>
                          Vui lòng mô tả nội dung khác bạn có thể hỗ trợ
                        </label>
                        <input
                          id="techFocusOther"
                          value={form.techFocusOther}
                          onChange={(event) => setField('techFocusOther', event.target.value)}
                          className={inputClasses}
                        />
                        <ErrorText message={errors.techFocusOther} />
                      </div>
                    ) : null}

                    <div className="rounded-[22px] border border-white/10 bg-slate-950/55 p-4">
                      <p className="text-base font-bold text-white">
                        {volunteerFormSchema.tech.digitalQuestionsTitle}
                      </p>
                      <DescriptionBlock text={volunteerFormSchema.tech.digitalQuestionsDescription} />
                    </div>

                    <div>
                      <label htmlFor="cyberInfoSourcesAndRisks" className={labelClasses}>
                        Bạn thường xuyên cập nhật thông tin về các chiêu trò lừa đảo mạng, bảo mật
                        tài khoản từ các nguồn nào? Theo bạn, rủi ro lớn nhất mà trẻ em hiện nay
                        hay gặp phải khi dùng mạng xã hội/internet là gì?
                      </label>
                      <textarea
                        id="cyberInfoSourcesAndRisks"
                        value={form.cyberInfoSourcesAndRisks}
                        onChange={(event) =>
                          setField('cyberInfoSourcesAndRisks', event.target.value)
                        }
                        className={`${inputClasses} min-h-32`}
                      />
                    </div>

                    <div>
                      <label htmlFor="aiToolsAndComputerSkills" className={labelClasses}>
                        Hãy liệt kê các công cụ AI (ví dụ: ChatGPT, Gemini, Canva AI...) hoặc các
                        kỹ năng sử dụng máy tính/mạng máy tính mà bạn thường xuyên sử dụng và tự tin
                        có thể hướng dẫn lại cho học sinh.
                      </label>
                      <textarea
                        id="aiToolsAndComputerSkills"
                        value={form.aiToolsAndComputerSkills}
                        onChange={(event) =>
                          setField('aiToolsAndComputerSkills', event.target.value)
                        }
                        className={`${inputClasses} min-h-32`}
                      />
                    </div>

                    <div>
                      <label htmlFor="digitalToolsForLessonDesign" className={labelClasses}>
                        Bạn hãy mô tả khả năng sử dụng các công cụ số cơ bản như Canva, PowerPoint,
                        các ứng dụng công nghệ/AI hỗ trợ học tập... của mình để thiết kế bài giảng?
                      </label>
                      <textarea
                        id="digitalToolsForLessonDesign"
                        value={form.digitalToolsForLessonDesign}
                        onChange={(event) =>
                          setField('digitalToolsForLessonDesign', event.target.value)
                        }
                        className={`${inputClasses} min-h-32`}
                      />
                    </div>

                    <div>
                      <label htmlFor="cyberSafetyGameIdea" className={labelClasses}>
                        Chủ đề ‘Bảo mật dữ liệu và Chống lừa đảo mạng’ nếu chỉ nói lý thuyết thì các
                        em nhỏ sẽ rất nhanh chán. Nếu được giao chuẩn bị một trò chơi ngắn khoảng
                        10–15 phút hoặc một cách tiếp cận sinh động để các em dễ nhớ bài học này,
                        bạn sẽ làm như thế nào?
                      </label>
                      <textarea
                        id="cyberSafetyGameIdea"
                        value={form.cyberSafetyGameIdea}
                        onChange={(event) => setField('cyberSafetyGameIdea', event.target.value)}
                        className={`${inputClasses} min-h-32`}
                      />
                    </div>

                    <div>
                      <label htmlFor="offlineClassHandling" className={labelClasses}>
                        Lớp học hôm đó yêu cầu học sinh phải thực hành trên máy tính/mạng Internet,
                        nhưng đột ngột trường bị mất mạng Wi-Fi hoặc mất điện, slide bài giảng
                        không hiển thị được. Bạn và đồng đội sẽ phối hợp xử lý buổi học đó ra sao?
                      </label>
                      <textarea
                        id="offlineClassHandling"
                        value={form.offlineClassHandling}
                        onChange={(event) => setField('offlineClassHandling', event.target.value)}
                        className={`${inputClasses} min-h-32`}
                      />
                    </div>

                    <div className="rounded-[22px] border border-white/10 bg-slate-950/55 p-4">
                      <p className="text-base font-bold text-white">
                        {volunteerFormSchema.tech.handmadeQuestionsTitle}
                      </p>
                      <DescriptionBlock text={volunteerFormSchema.tech.handmadeQuestionsDescription} />
                    </div>

                    <div>
                      <label htmlFor="motorCircuitExperience" className={labelClasses}>
                        Bạn đã từng có kinh nghiệm làm việc, lắp ráp hoặc chế tạo các mô hình sử
                        dụng motor DC (mô tơ một chiều), nguồn pin và các mạch điện cơ bản chưa?
                        Nếu có, hãy chia sẻ ngắn gọn về dự án/sản phẩm đó.
                      </label>
                      <textarea
                        id="motorCircuitExperience"
                        value={form.motorCircuitExperience}
                        onChange={(event) =>
                          setField('motorCircuitExperience', event.target.value)
                        }
                        className={`${inputClasses} min-h-32`}
                      />
                    </div>

                    <div>
                      <label htmlFor="electricityKnowledgeRating" className={labelClasses}>
                        Hãy tự đánh giá mức độ hiểu biết của bạn về các nguyên lý điện mặt
                        đất/cơ bản như mạch nối tiếp, mạch song song, cực âm/dương, cách đảo chiều
                        quay của motor... trên thang điểm 10
                      </label>
                      <input
                        id="electricityKnowledgeRating"
                        type="number"
                        min="1"
                        max="10"
                        value={form.electricityKnowledgeRating}
                        onChange={(event) =>
                          setField('electricityKnowledgeRating', event.target.value)
                        }
                        className={inputClasses}
                      />
                      <DescriptionBlock text="Hướng dẫn đánh giá:\n• 1 - 4: Chỉ biết lý thuyết cơ bản thời đi học, chưa thực hành bao giờ.\n• 5 - 7: Hiểu rõ nguyên lý, có thể tự đấu nối mạch điện, motor và xử lý được các lỗi cơ bản.\n• 8 - 10: Rất thành thạo, có thể tự thiết kế các mô hình chuyển động phức tạp hơn và hướng dẫn người khác." />
                    </div>

                    <div>
                      <label htmlFor="handmadeTechnicalSituation" className={labelClasses}>
                        Trong lúc hướng dẫn lắp mô tơ vào mô hình giấy, một bạn nhỏ sơ ý làm rách
                        mất khung giấy chính, hoặc đấu dây điện mãi mà mô tơ vẫn không chạy, dẫn
                        đến việc em ấy nản chí và không muốn tham gia hoạt động nữa. Bạn sẽ xử lý
                        tình huống này ra sao?
                      </label>
                      <textarea
                        id="handmadeTechnicalSituation"
                        value={form.handmadeTechnicalSituation}
                        onChange={(event) =>
                          setField('handmadeTechnicalSituation', event.target.value)
                        }
                        className={`${inputClasses} min-h-32`}
                      />
                    </div>
                  </div>
                </fieldset>
              ) : null}

              {hasMediaSection ? (
                <fieldset className={sectionClasses}>
                  <SectionTitle>6B. {volunteerFormSchema.media.title}</SectionTitle>
                  <DescriptionBlock text={volunteerFormSchema.media.description} />
                  <div className="mt-5 space-y-5">
                    <div>
                      <p className={labelClasses}>Bạn muốn ứng tuyển vào vị trí nào? *</p>
                      <DescriptionBlock text="Bạn có thể ứng tuyển cho nhiều vị trí." />
                      <div className="mt-2">
                        <CheckboxCardGroup
                          options={volunteerFormSchema.media.positionOptions}
                          selectedValues={form.mediaPositions}
                          onToggle={(value) =>
                            setField('mediaPositions', toggleValue(form.mediaPositions, value))
                          }
                          columns="sm:grid-cols-2 xl:grid-cols-2"
                        />
                      </div>
                      <ErrorText message={errors.mediaPositions} />
                    </div>

                    {hasMediaOther ? (
                      <div>
                        <label htmlFor="mediaPositionOther" className={labelClasses}>
                          Vui lòng mô tả vị trí truyền thông khác
                        </label>
                        <input
                          id="mediaPositionOther"
                          value={form.mediaPositionOther}
                          onChange={(event) => setField('mediaPositionOther', event.target.value)}
                          className={inputClasses}
                        />
                        <ErrorText message={errors.mediaPositionOther} />
                      </div>
                    ) : null}

                    <div className="rounded-[22px] border border-white/10 bg-slate-950/55 p-4">
                      <p className="text-base font-bold text-white">Thử thách cho vị trí Viết bài</p>
                      <DescriptionBlock text={volunteerFormSchema.media.writingChallenge} />
                    </div>

                    <div className="rounded-[22px] border border-white/10 bg-slate-950/55 p-4">
                      <p className="text-base font-bold text-white">Thử thách cho vị trí Designer</p>
                      <DescriptionBlock text={volunteerFormSchema.media.designerChallenge} />
                    </div>

                    <div className="rounded-[22px] border border-white/10 bg-slate-950/55 p-4">
                      <p className="text-base font-bold text-white">
                        Thử thách cho vị trí Video Editor
                      </p>
                      <DescriptionBlock text={volunteerFormSchema.media.editorChallenge} />
                    </div>

                    <div>
                      <label htmlFor="mediaPortfolioLink" className={labelClasses}>
                        Link nộp sản phẩm *
                      </label>
                      <input
                        id="mediaPortfolioLink"
                        type="url"
                        value={form.mediaPortfolioLink}
                        onChange={(event) => setField('mediaPortfolioLink', event.target.value)}
                        className={inputClasses}
                      />
                      <DescriptionBlock text="Bạn vui lòng upload tất cả file lên 01 folder Drive và gắn link phía dưới.\nCác lưu ý:\n- Đặt tên folder theo cú pháp: Họ và tên - Ban TT\n- Mở quyền truy cập folder trước khi gắn link." />
                      <ErrorText message={errors.mediaPortfolioLink} />
                    </div>

                    <div>
                      <p className={labelClasses}>
                        Bạn có máy ảnh cơ và có thể sử dụng xuyên suốt trại hè hay không?
                      </p>
                      <DescriptionBlock text="Vui lòng bỏ trống câu hỏi này nếu bạn không ứng tuyển cho vị trí Chụp ảnh." />
                      <div className="mt-2">
                        <RadioCardGroup
                          options={volunteerFormSchema.media.cameraOptions}
                          selectedValue={form.hasCamera}
                          onSelect={(value) => setField('hasCamera', value)}
                          columns="sm:grid-cols-2"
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
              ) : null}

              {hasSupportSection ? (
                <fieldset className={sectionClasses}>
                  <SectionTitle>6C. {volunteerFormSchema.support.title}</SectionTitle>
                  <DescriptionBlock text={volunteerFormSchema.support.description} />
                  <div className="mt-5 space-y-5">
                    <div>
                      <p className={labelClasses}>Bạn có thể hỗ trợ những công việc nào? *</p>
                      <div className="mt-2">
                        <CheckboxCardGroup
                          options={volunteerFormSchema.support.taskOptions}
                          selectedValues={form.supportTasks}
                          onToggle={(value) =>
                            setField('supportTasks', toggleValue(form.supportTasks, value))
                          }
                          columns="sm:grid-cols-2 xl:grid-cols-2"
                        />
                      </div>
                      <ErrorText message={errors.supportTasks} />
                    </div>

                    <div>
                      <label htmlFor="supportExperience" className={labelClasses}>
                        Nếu có kinh nghiệm điều phối, quản trò, hoạt náo hoặc hậu cần, hãy mô tả
                        ngắn gọn.
                      </label>
                      <textarea
                        id="supportExperience"
                        value={form.supportExperience}
                        onChange={(event) => setField('supportExperience', event.target.value)}
                        className={`${inputClasses} min-h-28`}
                      />
                    </div>
                  </div>
                </fieldset>
              ) : null}
            </section>
          ) : null}

          <fieldset className={sectionClasses}>
            <SectionTitle>7. Xác nhận và gửi đăng ký</SectionTitle>
            <div className="space-y-5">
              <div>
                <label htmlFor="finalNote" className={labelClasses}>
                  Bạn có điều gì muốn chia sẻ thêm với BTC không?
                </label>
                <textarea
                  id="finalNote"
                  value={form.finalNote}
                  onChange={(event) => setField('finalNote', event.target.value)}
                  className={`${inputClasses} min-h-28`}
                />
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-[22px] border border-white/10 bg-slate-950/60 p-4">
                <input
                  type="checkbox"
                  checked={form.dataConsent}
                  onChange={(event) => setField('dataConsent', event.target.checked)}
                  className="sr-only"
                />
                <span
                  className={`mt-0.5 h-5 w-5 rounded-md border ${
                    form.dataConsent
                      ? 'border-brand-cyan bg-brand-cyan'
                      : 'border-slate-500 bg-transparent'
                  }`}
                />
                <span className="text-sm font-semibold leading-7 text-white">
                  Tôi xác nhận các thông tin đã cung cấp là chính xác và đồng ý để BTC liên hệ qua
                  email, số điện thoại hoặc Facebook/Zalo đã cung cấp.
                </span>
              </label>
              <ErrorText message={errors.dataConsent} />

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

                {(activityPairWarning || supportWarning || facebookUrlWarning) ? (
                  <div className="inline-flex items-start gap-2 text-sm leading-6 text-brand-yellow">
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    BTC sẽ rà soát lại các lưu ý này khi liên hệ xác nhận đăng ký.
                  </div>
                ) : null}
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
};

export default VolunteerRegistrationForm;

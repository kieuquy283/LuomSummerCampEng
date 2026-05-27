import { Fragment, useEffect, useMemo, useState } from 'react';

import { getSupabaseClient, getVolunteerRegistrationsTable } from '../lib/supabase';

type RegistrationRow = {
  id: string;
  submitted_at?: string;
  created_at?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  selected_activities?: string[] | string;
  selected_departments?: string[] | string;
  payload?: Record<string, unknown>;
};

const departmentLabelMap: Record<string, string> = {
  tech: 'Chuyên môn Tin học và Kỹ thuật',
  media: 'Truyền thông',
  support: 'Hỗ trợ',
};

const activityLabelMap: Record<string, string> = {
  'trai-he-xanh': 'Trại hè Xanh',
  'trai-he-cong-nghe': 'Trại hè Công nghệ',
  'binh-dan-hoc-vu-so': 'Lớp Bình dân học vụ số',
};

const questionLabelMap: Record<string, string> = {
  fullName: 'Họ và tên',
  dateOfBirth: 'Ngày sinh',
  schoolClassMajor: 'Trường/Lớp/Ngành',
  email: 'Email',
  phone: 'Số điện thoại',
  emergencyContact: 'Liên hệ khẩn cấp',
  facebookUrl: 'Facebook/Zalo',
  currentAddress: 'Nơi ở hiện tại',
  certificates: 'Chứng chỉ liên quan',
  readiness: 'Bạn đã sẵn sàng tham gia chưa?',
  commitment80Percent: 'Bạn có cam kết tham gia ít nhất 80% không?',
  knowledgeAboutLuom: 'Bạn biết đến Lượm như thế nào?',
  motivation: 'Động lực tham gia của bạn là gì?',
  talents: 'Tài năng/Kỹ năng nổi bật',
  strengths: 'Điểm mạnh của bạn',
  strengthsOther: 'Điểm mạnh khác',
  pastVolunteerExperience: 'Kinh nghiệm tình nguyện trước đây',
  activities: 'Hoạt động đăng ký',
  primaryDepartment: 'Bộ phận ứng tuyển chính',
  additionalDepartments: 'Bộ phận ứng tuyển thêm',
  techFocusAreas: 'Mảng kỹ thuật có thể hỗ trợ',
  techFocusOther: 'Mảng kỹ thuật khác',
  cyberInfoSourcesAndRisks: 'Nguồn thông tin mạng và rủi ro',
  aiToolsAndComputerSkills: 'Công cụ AI/Kỹ năng máy tính',
  digitalToolsForLessonDesign: 'Công cụ số để thiết kế bài giảng',
  cyberSafetyGameIdea: 'Ý tưởng trò chơi an toàn mạng',
  offlineClassHandling: 'Xử lý khi lớp học mất mạng/mất điện',
  motorCircuitExperience: 'Kinh nghiệm motor và mạch điện',
  electricityKnowledgeRating: 'Mức tự đánh giá kiến thức điện (1-10)',
  handmadeTechnicalSituation: 'Xử lý tình huống kỹ thuật thủ công',
  mediaPositions: 'Vị trí truyền thông ứng tuyển',
  mediaPositionOther: 'Vị trí truyền thông khác',
  mediaPortfolioLink: 'Link bài nộp/portfolio',
  hasCamera: 'Bạn có máy ảnh cơ không?',
  supportTasks: 'Đầu việc hỗ trợ có thể tham gia',
  supportAvailability: 'Khả năng tham gia Trại hè Xanh',
  supportExperience: 'Kinh nghiệm hỗ trợ/hậu cần',
  finalNote: 'Chia sẻ thêm với BTC',
  dataConsent: 'Xác nhận đồng ý cung cấp thông tin',
  formName: 'Tên form',
  source: 'Nguồn gửi form',
  createdAt: 'Thời điểm tạo payload',
};

const keyGroups = [
  { key: 'personalInfo', label: 'Thông tin cá nhân' },
  { key: 'commitments', label: 'Cam kết tham gia' },
  { key: 'generalAnswers', label: 'Câu trả lời chung' },
  { key: 'techAnswers', label: 'Câu trả lời ban Kỹ thuật' },
  { key: 'mediaAnswers', label: 'Câu trả lời ban Truyền thông' },
  { key: 'supportAnswers', label: 'Câu trả lời ban Hỗ trợ' },
] as const;

const splitValues = (input: string[] | string | undefined) => {
  if (Array.isArray(input)) return input.filter(Boolean);
  if (!input) return [];
  return input
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean);
};

const safeObj = (value: unknown): Record<string, unknown> =>
  value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : {};

const fixMojibake = (text: string) => {
  const hasMojibake = /(?:\u00C3.|\u00C2.|\u00E2.)/.test(text);
  if (!hasMojibake) return text;
  try {
    const bytes = Uint8Array.from([...text].map((char) => char.charCodeAt(0) & 0xff));
    return new TextDecoder('utf-8').decode(bytes);
  } catch {
    return text;
  }
};

const normalizeVietnameseText = (value: string) => fixMojibake(value).normalize('NFC');

const asString = (value: unknown, fallback = '-') => {
  const text = String(value ?? '').trim();
  return text.length > 0 ? normalizeVietnameseText(text) : fallback;
};

const getName = (row: RegistrationRow) =>
  asString(row.full_name || safeObj(row.payload).personalInfo && safeObj(safeObj(row.payload).personalInfo).fullName);
const getEmail = (row: RegistrationRow) =>
  asString(row.email || safeObj(row.payload).personalInfo && safeObj(safeObj(row.payload).personalInfo).email);
const getPhone = (row: RegistrationRow) =>
  asString(row.phone || safeObj(row.payload).personalInfo && safeObj(safeObj(row.payload).personalInfo).phone);
const getSubmittedAt = (row: RegistrationRow) => asString(row.submitted_at || row.created_at, '');

const getActivities = (row: RegistrationRow) => {
  const direct = splitValues(row.selected_activities);
  if (direct.length > 0) return direct.map((item) => activityLabelMap[item] || asString(item));
  const payload = safeObj(row.payload);
  const payloadActivities = payload.activities;
  return Array.isArray(payloadActivities)
    ? payloadActivities.map((item) => {
        const raw = String(item);
        return activityLabelMap[raw] || asString(raw);
      })
    : [];
};

const getDepartments = (row: RegistrationRow) => {
  const direct = splitValues(row.selected_departments);
  if (direct.length > 0) return direct;

  const payload = safeObj(row.payload);
  const primary = payload.primaryDepartment ? [String(payload.primaryDepartment)] : [];
  const additional = Array.isArray(payload.additionalDepartments)
    ? payload.additionalDepartments.map((item) => String(item))
    : [];
  return Array.from(new Set([...primary, ...additional])).map(
    (item) => departmentLabelMap[item] || asString(item),
  );
};

const formatDateTime = (value: string) => {
  if (!value) return '-';
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value));
};

const getYmd = (iso: string) =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(iso));

const getTodayYmd = () => getYmd(new Date().toISOString());

const prettifyLabel = (key: string) => {
  const mapped = questionLabelMap[key];
  if (mapped) return mapped;
  return normalizeVietnameseText(
    key
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/_/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  );
};

const renderValue = (value: unknown): string => {
  if (value == null) return '-';
  if (typeof value === 'boolean') return value ? 'Có' : 'Không';
  if (Array.isArray(value)) return value.length ? value.map((item) => renderValue(item)).join(', ') : '-';
  if (typeof value === 'object') return JSON.stringify(value, null, 2);
  return asString(value);
};

const DetailSection = ({ title, data }: { title: string; data: Record<string, unknown> }) => {
  const entries = Object.entries(data);
  if (entries.length === 0) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h4 className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">{title}</h4>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {entries.map(([key, value]) => (
          <article key={key} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">
              Câu hỏi
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-800">{prettifyLabel(key)}</p>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">
              Câu trả lời
            </p>
            <p className="mt-1 whitespace-pre-wrap break-words text-sm text-slate-800">{renderValue(value)}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

const RegistrationDashboardPage = () => {
  const supabase = getSupabaseClient();
  const table = getVolunteerRegistrationsTable();

  const [rows, setRows] = useState<RegistrationRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dataSourceNote, setDataSourceNote] = useState('');
  const [query, setQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const loadFallbackData = async () => {
    const response = await fetch('/data/volunteer_registrations_fallback.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Không thể tải dữ liệu fallback (HTTP ${response.status}).`);
    }
    const fallbackData = (await response.json()) as RegistrationRow[];
    setRows(fallbackData);
    setDataSourceNote('Đang hiển thị dữ liệu từ file fallback trong public/data.');
  };

  const loadData = async () => {
    setLoading(true);
    setError('');

    if (!supabase) {
      try {
        await loadFallbackData();
      } catch (fallbackError) {
        setRows([]);
        setError(
          fallbackError instanceof Error
            ? fallbackError.message
            : 'Chưa cấu hình Supabase và không tải được dữ liệu fallback.',
        );
      } finally {
        setLoading(false);
      }
      return;
    }

    const { data, error: queryError } = await supabase
      .from(table)
      .select('*')
      .order('submitted_at', { ascending: false })
      .limit(2000);

    if (queryError) {
      try {
        await loadFallbackData();
        setError(`Không tải được Supabase: ${queryError.message}`);
      } catch (fallbackError) {
        setRows([]);
        setError(
          fallbackError instanceof Error
            ? `Không tải được Supabase (${queryError.message}) và fallback (${fallbackError.message}).`
            : `Không tải được Supabase: ${queryError.message}`,
        );
      }
      setLoading(false);
      return;
    }

    setRows((data || []) as RegistrationRow[]);
    setDataSourceNote(`Nguồn dữ liệu: Supabase (${table}).`);
    setLoading(false);
  };

  useEffect(() => {
    void loadData();
  }, []);

  const stats = useMemo(() => {
    const today = getTodayYmd();
    let todayCount = 0;
    const depMap = new Map<string, number>();
    const actMap = new Map<string, number>();
    const dayMap = new Map<string, number>();

    for (const row of rows) {
      const submitted = getSubmittedAt(row);
      if (submitted) {
        const ymd = getYmd(submitted);
        if (ymd === today) todayCount += 1;
        dayMap.set(ymd, (dayMap.get(ymd) || 0) + 1);
      }

      for (const dep of getDepartments(row)) depMap.set(dep, (depMap.get(dep) || 0) + 1);
      for (const act of getActivities(row)) actMap.set(act, (actMap.get(act) || 0) + 1);
    }

    const timeline = [...dayMap.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-14)
      .map(([day, count]) => ({ day, count }));

    return {
      total: rows.length,
      today: todayCount,
      departments: [...depMap.entries()].sort((a, b) => b[1] - a[1]),
      activities: [...actMap.entries()].sort((a, b) => b[1] - a[1]),
      timeline,
    };
  }, [rows]);

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return rows.filter((row) => {
      const deps = getDepartments(row);
      if (departmentFilter !== 'all' && !deps.includes(departmentFilter)) return false;
      if (!normalized) return true;
      const searchText = `${getName(row)} ${getEmail(row)} ${getPhone(row)}`.toLowerCase();
      return searchText.includes(normalized);
    });
  }, [departmentFilter, query, rows]);

  const maxDepartmentCount = Math.max(...stats.departments.map((entry) => entry[1]), 1);
  const maxActivityCount = Math.max(...stats.activities.map((entry) => entry[1]), 1);
  const maxTimelineCount = Math.max(...stats.timeline.map((entry) => entry.count), 1);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dbeafe_0%,#f8fafc_35%,#eef2ff_100%)] text-slate-900">
      <div className="mx-auto max-w-[1320px] px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <header className="mb-5 rounded-[28px] border border-slate-200 bg-white/85 p-5 shadow-card backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-electric">Lượm 2026</p>
              <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
                Dashboard Theo Dõi Đăng Ký Tình Nguyện Viên
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Theo dõi toàn bộ đơn đăng ký và câu trả lời chi tiết từ Supabase.
              </p>
            </div>
            <button
              type="button"
              onClick={() => void loadData()}
              disabled={loading}
              className="rounded-full bg-brand-navy px-5 py-2 text-sm font-bold text-white transition hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Đang tải...' : 'Làm mới dữ liệu'}
            </button>
          </div>
          {dataSourceNote ? <p className="mt-3 text-sm font-semibold text-sky-700">{dataSourceNote}</p> : null}
          {error ? <p className="mt-2 text-sm font-semibold text-rose-600">{error}</p> : null}
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Tổng đơn</p>
            <p className="mt-2 text-4xl font-extrabold text-brand-navy">{stats.total}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Hôm nay</p>
            <p className="mt-2 text-4xl font-extrabold text-emerald-600">{stats.today}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Sau bộ lọc</p>
            <p className="mt-2 text-4xl font-extrabold text-brand-deep">{filteredRows.length}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Bộ phận nổi bật</p>
            <p className="mt-2 text-lg font-extrabold text-brand-navy">
              {stats.departments[0] ? `${stats.departments[0][0]} (${stats.departments[0][1]})` : '-'}
            </p>
          </article>
        </section>

        <section className="mt-5 grid gap-4 xl:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
            <h2 className="text-base font-extrabold text-brand-navy">Xu hướng đăng ký 14 ngày gần nhất</h2>
            <div className="mt-4 grid h-[190px] grid-cols-7 gap-2 sm:grid-cols-14">
              {stats.timeline.length === 0 ? (
                <p className="col-span-full self-center text-sm text-slate-500">Chưa có dữ liệu theo ngày.</p>
              ) : (
                stats.timeline.map((item) => (
                  <div key={item.day} className="flex flex-col items-center justify-end gap-2">
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-brand-electric to-brand-cyan"
                      style={{ height: `${Math.max((item.count / maxTimelineCount) * 140, 8)}px` }}
                      title={`${item.day}: ${item.count}`}
                    />
                    <span className="text-[10px] font-semibold text-slate-500">{item.day.slice(5)}</span>
                  </div>
                ))
              )}
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-extrabold text-brand-navy">Phân bố bộ phận</h2>
            <div className="mt-4 space-y-3">
              {stats.departments.map(([name, count]) => (
                <div key={name}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-700">{name}</span>
                    <span className="text-slate-500">{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200">
                    <div
                      className="h-2 rounded-full bg-brand-cyan"
                      style={{ width: `${(count / maxDepartmentCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              {stats.departments.length === 0 ? <p className="text-sm text-slate-500">Chưa có dữ liệu.</p> : null}
            </div>
          </article>
        </section>

        <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-extrabold text-brand-navy">Phân bố hoạt động</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {stats.activities.map(([name, count]) => (
              <div key={name} className="rounded-xl border border-slate-200 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-700">{name}</p>
                  <p className="text-sm text-slate-500">{count}</p>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-brand-electric"
                    style={{ width: `${(count / maxActivityCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            {stats.activities.length === 0 ? <p className="text-sm text-slate-500">Chưa có dữ liệu.</p> : null}
          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 grid gap-3 md:grid-cols-3">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-11 rounded-xl border border-slate-300 px-3 text-sm font-medium focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 md:col-span-2"
              placeholder="Tìm theo họ tên, email, số điện thoại..."
            />
            <select
              value={departmentFilter}
              onChange={(event) => setDepartmentFilter(event.target.value)}
              className="h-11 rounded-xl border border-slate-300 px-3 text-sm font-semibold focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20"
            >
              <option value="all">Tất cả bộ phận</option>
              <option value="tech">Chuyên môn Tin học và Kỹ thuật</option>
              <option value="media">Truyền thông</option>
              <option value="support">Hỗ trợ</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="sticky top-0 bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-3 py-3 font-extrabold">Thời gian</th>
                  <th className="px-3 py-3 font-extrabold">Họ tên</th>
                  <th className="px-3 py-3 font-extrabold">Liên hệ</th>
                  <th className="px-3 py-3 font-extrabold">Hoạt động</th>
                  <th className="px-3 py-3 font-extrabold">Bộ phận</th>
                  <th className="px-3 py-3 font-extrabold">Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, index) => {
                  const isExpanded = expandedRowId === row.id;
                  const payload = safeObj(row.payload);
                  const groupedKeys = new Set(keyGroups.map((item) => item.key));
                  const otherFields = Object.fromEntries(
                    Object.entries(payload).filter(([key]) => !groupedKeys.has(key as (typeof keyGroups)[number]['key'])),
                  );

                  return (
                    <Fragment key={row.id}>
                      <tr className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="px-3 py-3 text-slate-600">{formatDateTime(getSubmittedAt(row))}</td>
                        <td className="px-3 py-3 font-bold text-brand-navy">{getName(row)}</td>
                        <td className="px-3 py-3 text-slate-700">
                          <div>{getEmail(row)}</div>
                          <div>{getPhone(row)}</div>
                        </td>
                        <td className="px-3 py-3 text-slate-700">{getActivities(row).join(', ') || '-'}</td>
                        <td className="px-3 py-3 text-slate-700">{getDepartments(row).join(', ') || '-'}</td>
                        <td className="px-3 py-3">
                          <button
                            type="button"
                            onClick={() => setExpandedRowId(isExpanded ? null : row.id)}
                            className="rounded-full border border-slate-300 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-slate-700 transition hover:border-brand-cyan hover:text-brand-cyan"
                          >
                            {isExpanded ? 'Thu gọn' : 'Xem đầy đủ'}
                          </button>
                        </td>
                      </tr>
                      {isExpanded ? (
                        <tr>
                          <td colSpan={6} className="bg-slate-100 px-3 py-4">
                            <div className="space-y-3">
                              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                <h3 className="text-sm font-extrabold uppercase tracking-[0.12em] text-brand-navy">
                                  Tổng quan
                                </h3>
                                <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">ID</p>
                                    <p className="mt-1 break-all text-xs text-slate-700">{row.id}</p>
                                  </div>
                                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">
                                      Thời điểm gửi
                                    </p>
                                    <p className="mt-1 text-sm text-slate-700">{formatDateTime(getSubmittedAt(row))}</p>
                                  </div>
                                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">
                                      Hoạt động
                                    </p>
                                    <p className="mt-1 text-sm text-slate-700">{getActivities(row).join(', ') || '-'}</p>
                                  </div>
                                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">
                                      Bộ phận
                                    </p>
                                    <p className="mt-1 text-sm text-slate-700">{getDepartments(row).join(', ') || '-'}</p>
                                  </div>
                                </div>
                              </section>

                              {keyGroups.map((group) => (
                                <DetailSection
                                  key={group.key}
                                  title={group.label}
                                  data={safeObj(payload[group.key])}
                                />
                              ))}
                              <DetailSection title="Thông tin khác" data={otherFields} />
                            </div>
                          </td>
                        </tr>
                      ) : null}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredRows.length === 0 ? (
            <p className="py-6 text-center text-sm font-semibold text-slate-500">Không có bản ghi phù hợp.</p>
          ) : null}
        </section>
      </div>
    </main>
  );
};

export default RegistrationDashboardPage;


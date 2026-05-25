export const registrationLink = 'https://forms.gle/SCjJAAr5x61PR1Zo9';
export const fanpageLink = 'https://www.facebook.com/luom.lvcd';
export const zaloLink = 'https://zalo.me/0968397725';

export type NavLink = {
  label: string;
  href: string;
};

export type SiteConfig = {
  organization: string;
  pageTitle: string;
  campaignName: string;
  headline: string;
  heroSubtitle: string;
  registrationNotice: string;
  hotline: string;
};

export type DepartmentId = 'tin-hoc-ky-thuat' | 'truyen-thong' | 'ho-tro';

export type Activity = {
  id: string;
  title: string;
  time: string;
  orderNote?: string;
  description: string;
  relatedDepartments: DepartmentId[];
  heroTag: string;
  audience?: string;
};

export type Department = {
  id: DepartmentId;
  title: string;
  scope: string;
  description: string;
  subRoles?: string[];
  fields?: string[];
  tasks?: string[];
  requirements: string[];
  relatedActivities: string[];
  ctaLabel: string;
};

export type DepartmentActivityMapItem = {
  departmentId: DepartmentId;
  activityIds: string[];
};

export type TimelineMonth = {
  month: string;
  items: string[];
  note?: string;
};

export type FitGuideItem = {
  title: string;
  description: string;
  departmentId?: DepartmentId;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type FAQItem = {
  q: string;
  a: string;
};

export type BenefitItem = {
  title: string;
  description: string;
};

export const site: SiteConfig = {
  organization: 'Lượm - Giáo dục vì Cộng đồng',
  pageTitle: 'Tuyển tình nguyện viên',
  campaignName: 'Chiến dịch tình nguyện hè 2026',
  headline: 'Trở thành tình nguyện viên Chiến dịch tình nguyện hè 2026',
  heroSubtitle:
    'Chiến dịch tình nguyện hè 2026 do dự án “Lượm - Giáo dục vì cộng đồng” tổ chức là chương trình giáo dục cộng đồng hướng tới việc lan tỏa tri thức, kỹ năng và giá trị phát triển bền vững đến thanh thiếu niên và học sinh.',
  registrationNotice:
    "Trong form, bạn có thể chọn 1 hoặc nhiều hoạt động, 1 hoặc nhiều bộ phận. Nếu chưa chắc vị trí phù hợp, bạn có thể chọn mục 'Cần BTC tư vấn'.",
  hotline: '0968.397.725 (Ms. Trà My - 2005)',
};

export const navLinks: NavLink[] = [
  { label: 'Giới thiệu', href: '#gioi-thieu' },
  { label: 'Hoạt động', href: '#hoat-dong' },
  { label: 'Vị trí tìm kiếm', href: '#bo-phan-tuyen' },
  { label: 'Đăng ký', href: '#dang-ky-truc-tiep' },
];

export const activities: Activity[] = [
  {
    id: 'trai-he-xanh',
    title: 'Trại hè xanh',
    time: 'Tháng 6',
    description:
      'Hoạt động trải nghiệm hè, sinh hoạt tập thể, kỹ năng sống và đồng hành cùng học sinh.',
    relatedDepartments: ['ho-tro', 'truyen-thong'],
    heroTag: 'Trại hè xanh',
    audience: 'Học sinh tham gia trải nghiệm hè và hoạt động tập thể.',
  },
  {
    id: 'trai-he-cong-nghe',
    title: 'Trại hè công nghệ',
    time: 'Tháng 7',
    orderNote: 'Diễn ra trước',
    description:
      'Hoạt động công nghệ, AI, an toàn thông tin, sáng chế và kỹ thuật thủ công dành cho học sinh.',
    relatedDepartments: ['tin-hoc-ky-thuat', 'truyen-thong'],
    heroTag: 'Trại hè công nghệ',
    audience: 'Học sinh yêu thích công nghệ, thực hành và khám phá STEM.',
  },
  {
    id: 'binh-dan-hoc-vu-so',
    title: 'Lớp Bình dân học vụ số',
    time: 'Tháng 7',
    orderNote: 'Diễn ra sau Trại hè công nghệ',
    description:
      'Lớp học nâng cao năng lực số, sử dụng Internet an toàn và ứng dụng công nghệ/AI vào học tập.',
    relatedDepartments: ['tin-hoc-ky-thuat', 'truyen-thong'],
    heroTag: 'Bình dân học vụ số',
    audience: 'Học sinh cần củng cố kỹ năng số và ứng dụng công nghệ vào học tập.',
  },
];

export const departments: Department[] = [
  {
    id: 'tin-hoc-ky-thuat',
    title: 'Bộ phận Tin học + Kỹ thuật',
    scope: 'Phục vụ Trại hè công nghệ và Lớp Bình dân học vụ số',
    description:
      'Dành cho các bạn yêu thích công nghệ, AI, an toàn thông tin, sáng chế và kỹ thuật thực hành.',
    subRoles: ['Core nội dung/chuyên môn', 'TNV hỗ trợ lớp học/thực hành'],
    fields: [
      'An toàn thông tin',
      'Ứng dụng công nghệ & AI',
      'Sáng chế',
      'Kỹ thuật thủ công',
    ],
    requirements: [
      'Có kiến thức hoặc hứng thú với công nghệ, AI, an toàn thông tin, STEM hoặc kỹ thuật.',
      'Có khả năng truyền đạt, hướng dẫn học sinh.',
      'Có trách nhiệm, đúng giờ, kiên nhẫn.',
      'Với vai trò Core: cần có khả năng chuẩn bị nội dung, giáo án hoặc hoạt động thực hành.',
    ],
    relatedActivities: ['trai-he-cong-nghe', 'binh-dan-hoc-vu-so'],
    ctaLabel: 'Đăng ký Tin học + Kỹ thuật',
  },
  {
    id: 'truyen-thong',
    title: 'Bộ phận Truyền thông',
    scope: 'Hoạt động xuyên suốt cả 3 hoạt động',
    description:
      'Phụ trách ghi lại, lan tỏa và truyền thông các hoạt động của chiến dịch.',
    tasks: [
      'Viết bài, caption, recap.',
      'Chụp ảnh, quay video.',
      'Thiết kế ấn phẩm.',
      'Dựng video ngắn.',
      'Quản lý tư liệu truyền thông.',
    ],
    requirements: [
      'Biết Canva, CapCut, chụp ảnh, viết content hoặc thiết kế là lợi thế.',
      'Chủ động, đúng deadline.',
      'Có khả năng bắt khoảnh khắc và phối hợp với các bộ phận khác.',
    ],
    relatedActivities: ['trai-he-xanh', 'trai-he-cong-nghe', 'binh-dan-hoc-vu-so'],
    ctaLabel: 'Đăng ký Truyền thông',
  },
  {
    id: 'ho-tro',
    title: 'Bộ phận Hỗ trợ',
    scope: 'Chỉ phục vụ Trại hè xanh',
    description:
      'Phụ trách hỗ trợ vận hành, điều phối học sinh, chuẩn bị vật dụng và hỗ trợ BTC trong hoạt động Trại hè xanh.',
    tasks: [
      'Điều phối học sinh.',
      'Điểm danh.',
      'Chuẩn bị vật dụng.',
      'Hỗ trợ trò chơi/hoạt động.',
      'Hậu cần lớp học và khu vực sinh hoạt.',
    ],
    requirements: [
      'Nhiệt tình, có trách nhiệm.',
      'Linh hoạt, chủ động.',
      'Có khả năng phối hợp nhóm.',
      'Có thể tham gia hoạt động trong tháng 6.',
    ],
    relatedActivities: ['trai-he-xanh'],
    ctaLabel: 'Đăng ký Hỗ trợ',
  },
];

export const departmentActivityMap: DepartmentActivityMapItem[] = [
  {
    departmentId: 'tin-hoc-ky-thuat',
    activityIds: ['trai-he-cong-nghe', 'binh-dan-hoc-vu-so'],
  },
  {
    departmentId: 'truyen-thong',
    activityIds: ['trai-he-xanh', 'trai-he-cong-nghe', 'binh-dan-hoc-vu-so'],
  },
  {
    departmentId: 'ho-tro',
    activityIds: ['trai-he-xanh'],
  },
];

export const timeline: TimelineMonth[] = [
  {
    month: 'Tháng 6',
    items: ['Trại hè xanh'],
  },
  {
    month: 'Tháng 7',
    items: ['Trại hè công nghệ', 'Lớp Bình dân học vụ số'],
    note: 'Trại hè công nghệ sẽ diễn ra trước Lớp Bình dân học vụ số.',
  },
];

export const fitGuide: FitGuideItem[] = [
  {
    title: 'Nếu bạn thích AI, công nghệ, an toàn thông tin, STEM',
    description: 'Bạn phù hợp với Bộ phận Tin học + Kỹ thuật.',
    departmentId: 'tin-hoc-ky-thuat',
  },
  {
    title: 'Nếu bạn thích quay chụp, thiết kế, viết bài, fanpage',
    description: 'Bạn phù hợp với Bộ phận Truyền thông.',
    departmentId: 'truyen-thong',
  },
  {
    title: 'Nếu bạn thích hỗ trợ tổ chức, điều phối, hậu cần',
    description: 'Bạn phù hợp với Bộ phận Hỗ trợ.',
    departmentId: 'ho-tro',
  },
  {
    title: 'Nếu bạn muốn tham gia nhiều hoạt động',
    description: 'Bạn có thể chọn nhiều hoạt động và nhiều bộ phận trong form.',
  },
];

export const benefits: BenefitItem[] = [
  {
    title: 'Trực tiếp tạo giá trị cho mùa hè của học sinh',
    description:
      'Bạn đồng hành trong các hoạt động trại hè, lớp công nghệ, lớp kỹ năng số và các đầu việc truyền thông thực tế.',
  },
  {
    title: 'Rèn kỹ năng chuyên môn và phối hợp',
    description:
      'Bạn có cơ hội luyện truyền đạt, tổ chức hoạt động, làm việc nhóm, sáng tạo nội dung và xử lý tình huống.',
  },
  {
    title: 'Mở rộng kết nối với cộng đồng tích cực',
    description:
      'Bạn làm việc cùng các tình nguyện viên, phụ trách chuyên môn và BTC trong một chiến dịch chung có cấu trúc rõ ràng.',
  },
  {
    title: 'Được tập huấn và ghi nhận đóng góp',
    description:
      'TNV được hướng dẫn trước khi tham gia và nhận ghi nhận cho những đóng góp tích cực trong chiến dịch hè 2026.',
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: 'Chọn hoạt động muốn tham gia',
    description: 'Bạn có thể đăng ký một hoặc nhiều hoạt động tùy lịch rảnh và khả năng đồng hành.',
  },
  {
    title: 'Chọn bộ phận phù hợp',
    description: 'Chọn một hoặc nhiều bộ phận và lưu ý yêu cầu riêng của từng bộ phận đã chọn.',
  },
  {
    title: 'Điền kinh nghiệm, lịch rảnh và nguyện vọng ưu tiên',
    description:
      'Hãy mô tả rõ kinh nghiệm, thế mạnh và khung thời gian có thể tham gia để BTC dễ sắp xếp.',
  },
  {
    title: 'BTC liên hệ xác nhận và phân công',
    description:
      'BTC sẽ đối chiếu nhu cầu từng hoạt động, trao đổi thêm nếu cần và xác nhận vị trí phù hợp.',
  },
];

export const faqs: FAQItem[] = [
  {
    q: 'Mình có thể đăng ký nhiều hoạt động không?',
    a: 'Có. Bạn có thể đăng ký một hoặc nhiều hoạt động tùy theo lịch rảnh và năng lực phù hợp.',
  },
  {
    q: 'Mình có thể đăng ký nhiều bộ phận không?',
    a: 'Có. Bạn có thể chọn nhiều bộ phận, nhưng cần đáp ứng yêu cầu của từng bộ phận đã chọn.',
  },
  {
    q: 'Bộ phận Hỗ trợ có tham gia Trại hè công nghệ hoặc Bình dân học vụ số không?',
    a: 'Không. Bộ phận Hỗ trợ chỉ tuyển để phục vụ Trại hè xanh.',
  },
  {
    q: 'Bộ phận Truyền thông tham gia hoạt động nào?',
    a: 'Bộ phận Truyền thông hoạt động xuyên suốt cả 3 hoạt động: Trại hè xanh, Trại hè công nghệ và Lớp Bình dân học vụ số.',
  },
  {
    q: 'Bộ phận Tin học + Kỹ thuật cần những mảng nào?',
    a: 'Bộ phận này cần Core và TNV trong các mảng An toàn thông tin, Ứng dụng công nghệ & AI, Sáng chế và Kỹ thuật thủ công.',
  },
  {
    q: 'Nếu mình chưa biết chọn vị trí nào thì sao?',
    a: 'Bạn có thể chọn mục cần BTC tư vấn trong form. BTC sẽ dựa trên kinh nghiệm, lịch rảnh và nguyện vọng để gợi ý vị trí phù hợp.',
  },
];

export const heroVisualCards = [
  { title: 'TNV Tin học', tone: 'cyan' },
  { title: 'TNV Kỹ thuật', tone: 'blue' },
  { title: 'TNV Truyền thông', tone: 'pink' },
  { title: 'Hỗ trợ', tone: 'amber' },
] as const;

export const formHighlights = [
  'TNV có thể chọn nhiều hoạt động.',
  'TNV có thể chọn nhiều bộ phận.',
  'Bộ phận Hỗ trợ chỉ phục vụ Trại hè xanh.',
  'Bộ phận Truyền thông hoạt động cả 3 hoạt động.',
  'Tin học + Kỹ thuật phục vụ Trại hè công nghệ và Bình dân học vụ số.',
];

export type FormOption = {
  value: string;
  label: string;
  description?: string;
};

export const registrationMethods = [
  {
    title: 'Đăng ký qua Google Form',
    description: 'Phù hợp nếu bạn muốn điền form quen thuộc, đơn giản và nhanh chóng.',
    buttonLabel: 'Điền Google Form',
    href: registrationLink,
    external: true,
  },
  {
    title: 'Đăng ký trực tiếp tại website',
    description:
      'Điền thông tin, chọn hoạt động, bộ phận và trả lời câu hỏi ứng tuyển ngay trên landing page.',
    buttonLabel: 'Điền tại website',
    href: '#dang-ky-truc-tiep',
    external: false,
  },
] as const;

export const applicantTypeOptions: FormOption[] = [
  { value: 'hoc-sinh', label: 'Học sinh' },
  { value: 'sinh-vien', label: 'Sinh viên' },
  { value: 'nguoi-di-lam', label: 'Người đi làm' },
  { value: 'khac', label: 'Khác' },
];

export const activityRegistrationOptions: FormOption[] = [
  { value: 'trai-he-xanh', label: 'Trại hè xanh', description: 'Tháng 6' },
  {
    value: 'trai-he-cong-nghe',
    label: 'Trại hè công nghệ',
    description: 'Tháng 7, diễn ra trước',
  },
  {
    value: 'binh-dan-hoc-vu-so',
    label: 'Lớp Bình dân học vụ số',
    description: 'Tháng 7, diễn ra sau',
  },
  {
    value: 'need-consulting-activity',
    label: 'Chưa chắc, cần BTC tư vấn',
  },
];

export const departmentRegistrationOptions: FormOption[] = [
  { value: 'tin-hoc-ky-thuat', label: 'Tin học + Kỹ thuật' },
  { value: 'truyen-thong', label: 'Truyền thông' },
  { value: 'ho-tro', label: 'Hỗ trợ' },
  { value: 'need-consulting-department', label: 'Chưa chắc, cần BTC tư vấn' },
];

export const registrationLogicNotes = [
  'Bộ phận Hỗ trợ chỉ phục vụ Trại hè xanh.',
  'Bộ phận Truyền thông hoạt động trong cả 3 hoạt động.',
  'Bộ phận Tin học + Kỹ thuật phục vụ Trại hè công nghệ và Lớp Bình dân học vụ số.',
];

export const techRoleOptions: FormOption[] = [
  { value: 'core', label: 'Core nội dung/chuyên môn' },
  { value: 'support', label: 'TNV hỗ trợ lớp học/thực hành' },
  { value: 'both', label: 'Cả hai' },
];

export const techFieldOptions: FormOption[] = [
  { value: 'an-toan-thong-tin', label: 'An toàn thông tin' },
  { value: 'ung-dung-cong-nghe-ai', label: 'Ứng dụng công nghệ & AI' },
  { value: 'sang-che', label: 'Sáng chế' },
  { value: 'ky-thuat-thu-cong', label: 'Kỹ thuật thủ công' },
];

export const mediaSkillOptions: FormOption[] = [
  { value: 'viet-content', label: 'Viết content' },
  { value: 'thiet-ke-canva-poster', label: 'Thiết kế Canva/poster' },
  { value: 'chup-anh', label: 'Chụp ảnh' },
  { value: 'quay-video', label: 'Quay video' },
  { value: 'dung-video-capcut', label: 'Dựng video/CapCut' },
  { value: 'quan-ly-fanpage', label: 'Quản lý fanpage' },
];

export const mediaEquipmentOptions: FormOption[] = [
  { value: 'dien-thoai-tot', label: 'Điện thoại chụp/quay tốt' },
  { value: 'may-anh', label: 'Máy ảnh' },
  { value: 'laptop', label: 'Laptop' },
  {
    value: 'khong-co-thiet-bi-rieng',
    label: 'Không có thiết bị riêng nhưng vẫn có thể hỗ trợ',
  },
];

export const supportTaskOptions: FormOption[] = [
  { value: 'dieu-phoi-hoc-sinh', label: 'Điều phối học sinh' },
  { value: 'diem-danh', label: 'Điểm danh' },
  { value: 'chuan-bi-vat-dung', label: 'Chuẩn bị vật dụng' },
  { value: 'ho-tro-tro-choi-hoat-dong', label: 'Hỗ trợ trò chơi/hoạt động' },
  { value: 'hau-can-chung', label: 'Hậu cần chung' },
];

export const greenCampAvailabilityOptions: FormOption[] = [
  { value: 'co', label: 'Có' },
  { value: 'chua-chac', label: 'Chưa chắc' },
  { value: 'khong', label: 'Không' },
];

export const availabilityPeriodOptions: FormOption[] = [
  { value: 'thang-6', label: 'Tháng 6' },
  { value: 'dau-thang-7', label: 'Đầu tháng 7' },
  { value: 'giua-thang-7', label: 'Giữa tháng 7' },
  { value: 'cuoi-thang-7', label: 'Cuối tháng 7' },
  { value: 'linh-hoat-theo-btc', label: 'Linh hoạt theo lịch BTC' },
];

export const timeSlotOptions: FormOption[] = [
  { value: 'sang', label: 'Sáng' },
  { value: 'chieu', label: 'Chiều' },
  { value: 'toi', label: 'Tối' },
  { value: 'cuoi-tuan', label: 'Cuối tuần' },
  { value: 'ngay-trong-tuan', label: 'Ngày trong tuần' },
];

export const priorityOptions: FormOption[] = [
  { value: 'tin-hoc-ky-thuat-trai-he-cong-nghe', label: 'Tin học + Kỹ thuật — Trại hè công nghệ' },
  { value: 'tin-hoc-ky-thuat-binh-dan-hoc-vu-so', label: 'Tin học + Kỹ thuật — Bình dân học vụ số' },
  { value: 'truyen-thong-trai-he-xanh', label: 'Truyền thông — Trại hè xanh' },
  { value: 'truyen-thong-trai-he-cong-nghe', label: 'Truyền thông — Trại hè công nghệ' },
  { value: 'truyen-thong-binh-dan-hoc-vu-so', label: 'Truyền thông — Bình dân học vụ số' },
  { value: 'ho-tro-trai-he-xanh', label: 'Hỗ trợ — Trại hè xanh' },
  { value: 'need-consulting-priority', label: 'Cần BTC tư vấn' },
];

type LegacyTeamCard = {
  key: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  students: string;
  schedule: string;
  kickoff: string;
  scale: string;
  roles: string[];
  buttonLabel: string;
  buttonHref: string;
};

type LegacyRecruitmentGroup = {
  teamKey?: string;
  id: string;
  title: string;
  subtitle: string;
  theme: 'digital' | 'green' | 'support';
  positions: Array<{
    title: string;
    quantity: string;
    tasks: string[];
    requirements: string[];
  }>;
};

type LegacyLearningTrack = {
  title: string;
  theme: 'digital' | 'green';
  topics: string[];
};

export const teamCards: LegacyTeamCard[] = [
  {
    key: 'green',
    title: 'Trại hè xanh',
    subtitle: 'Hoạt động trải nghiệm hè và sinh hoạt tập thể',
    description: activities[0].description,
    location: 'Phường Vĩnh Phúc',
    students: 'Học sinh tiểu học và THCS',
    schedule: 'Tháng 6/2026',
    kickoff: 'Khởi động trong tháng 6',
    scale: 'Theo phân công từng đợt hoạt động',
    roles: ['Bộ phận Hỗ trợ', 'Bộ phận Truyền thông'],
    buttonLabel: 'Xem Trại hè xanh',
    buttonHref: '#trai-he-xanh',
  },
  {
    key: 'tech',
    title: 'Trại hè công nghệ',
    subtitle: 'Công nghệ, AI, an toàn thông tin và thực hành kỹ thuật',
    description: activities[1].description,
    location: 'Phường Vĩnh Phúc',
    students: 'Học sinh yêu thích công nghệ và STEM',
    schedule: 'Tháng 7/2026',
    kickoff: 'Diễn ra trước Lớp Bình dân học vụ số',
    scale: 'Theo lớp/chuyên đề',
    roles: ['Bộ phận Tin học + Kỹ thuật', 'Bộ phận Truyền thông'],
    buttonLabel: 'Xem Trại hè công nghệ',
    buttonHref: '#trai-he-cong-nghe',
  },
  {
    key: 'digital',
    title: 'Lớp Bình dân học vụ số',
    subtitle: 'Nâng cao năng lực số và ứng dụng công nghệ vào học tập',
    description: activities[2].description,
    location: 'Phường Vĩnh Phúc',
    students: 'Học sinh cần củng cố năng lực số',
    schedule: 'Tháng 7/2026',
    kickoff: 'Diễn ra sau Trại hè công nghệ',
    scale: 'Theo lớp/chuyên đề',
    roles: ['Bộ phận Tin học + Kỹ thuật', 'Bộ phận Truyền thông'],
    buttonLabel: 'Xem Bình dân học vụ số',
    buttonHref: '#binh-dan-hoc-vu-so',
  },
];

export const recruitmentGroups: LegacyRecruitmentGroup[] = [
  {
    teamKey: 'digital',
    id: 'doi-binh-dan-hoc-vu-so',
    title: 'Lớp Bình dân học vụ số',
    subtitle: 'Tập trung vào năng lực số, Internet an toàn và ứng dụng công nghệ/AI',
    theme: 'digital',
    positions: [
      {
        title: 'Core nội dung/chuyên môn',
        quantity: '04',
        tasks: [
          'Chuẩn bị nội dung, giáo án hoặc hoạt động thực hành theo chuyên đề.',
          'Hướng dẫn học sinh tiếp cận kiến thức số, Internet an toàn và công cụ học tập.',
          'Phối hợp với TNV hỗ trợ để triển khai lớp học hiệu quả.',
        ],
        requirements: departments[0].requirements,
      },
      {
        title: 'TNV hỗ trợ lớp học/thực hành',
        quantity: '06',
        tasks: [
          'Hỗ trợ điều phối lớp và học sinh trong quá trình thực hành.',
          'Chuẩn bị thiết bị, tài liệu và không gian học tập.',
          'Phối hợp với Core để theo sát tiến độ lớp học.',
        ],
        requirements: departments[0].requirements.slice(0, 3),
      },
    ],
  },
  {
    teamKey: 'green',
    id: 'trai-he-xanh',
    title: 'Trại hè xanh',
    subtitle: 'Hoạt động trải nghiệm hè, sinh hoạt tập thể và đồng hành cùng học sinh',
    theme: 'green',
    positions: [
      {
        title: 'TNV Hỗ trợ điều phối và vận hành',
        quantity: '08',
        tasks: departments[2].tasks ?? [],
        requirements: departments[2].requirements,
      },
      {
        title: 'TNV Truyền thông hiện trường',
        quantity: '04',
        tasks: [
          'Ghi lại hình ảnh, video và câu chuyện trong các hoạt động của Trại hè xanh.',
          'Phối hợp với bộ phận Hỗ trợ và BTC để bám sát lịch hoạt động.',
          'Bàn giao tư liệu đúng hạn cho đầu mối truyền thông.',
        ],
        requirements: departments[1].requirements,
      },
    ],
  },
  {
    teamKey: 'tech',
    id: 'trai-he-cong-nghe',
    title: 'Trại hè công nghệ',
    subtitle: 'Hoạt động công nghệ, AI, sáng chế và kỹ thuật thực hành cho học sinh',
    theme: 'digital',
    positions: [
      {
        title: 'Core nội dung/chuyên môn',
        quantity: '06',
        tasks: [
          'Chuẩn bị nội dung theo các mảng An toàn thông tin, Ứng dụng công nghệ & AI, Sáng chế, Kỹ thuật thủ công.',
          'Thiết kế hoạt động thực hành phù hợp với học sinh.',
          'Phối hợp với TNV hỗ trợ để triển khai lớp/chuyên đề.',
        ],
        requirements: departments[0].requirements,
      },
      {
        title: 'TNV hỗ trợ lớp học/thực hành',
        quantity: '08',
        tasks: [
          'Hỗ trợ lớp học, dụng cụ thực hành và hướng dẫn nhóm nhỏ.',
          'Theo sát tiến độ và hỗ trợ học sinh trong hoạt động thực hành.',
          'Phối hợp với bộ phận Truyền thông để cung cấp tư liệu khi cần.',
        ],
        requirements: departments[0].requirements.slice(0, 3),
      },
    ],
  },
  {
    id: 'bo-phan-truyen-thong',
    title: 'Bộ phận Truyền thông',
    subtitle: departments[1].scope,
    theme: 'support',
    positions: [
      {
        title: 'TNV Truyền thông',
        quantity: '08',
        tasks: departments[1].tasks ?? [],
        requirements: departments[1].requirements,
      },
    ],
  },
  {
    id: 'bo-phan-ho-tro',
    title: 'Bộ phận Hỗ trợ',
    subtitle: departments[2].scope,
    theme: 'support',
    positions: [
      {
        title: 'TNV Hỗ trợ',
        quantity: '08',
        tasks: departments[2].tasks ?? [],
        requirements: departments[2].requirements,
      },
    ],
  },
];

export const learningTracks: LegacyLearningTrack[] = [
  {
    title: 'Lớp Bình dân học vụ số',
    theme: 'digital',
    topics: [
      'Sử dụng Internet an toàn.',
      'Bảo mật thông tin cá nhân.',
      'Ứng dụng công nghệ/AI vào học tập.',
      'Kỹ năng số cơ bản phục vụ học tập và giao tiếp.',
    ],
  },
  {
    title: 'Trại hè xanh',
    theme: 'green',
    topics: [
      'Sinh hoạt tập thể và kỹ năng sống.',
      'Trò chơi nhóm, hoạt động gắn kết.',
      'Kỹ năng tự phục vụ và phối hợp.',
      'Workshop sáng tạo và trải nghiệm hè.',
    ],
  },
  {
    title: 'Trại hè công nghệ',
    theme: 'digital',
    topics: [
      'Làm quen công nghệ, AI và tư duy số.',
      'An toàn thông tin ở mức cơ bản.',
      'Hoạt động sáng chế và kỹ thuật thủ công.',
      'Thực hành theo nhóm với các chủ đề STEM.',
    ],
  },
];

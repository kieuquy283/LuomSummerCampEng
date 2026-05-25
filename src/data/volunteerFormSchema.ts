export type FormOption = {
  value: string;
  label: string;
  description?: string;
};

export const volunteerFormSchema = {
  formTitle: 'Đăng ký Tình nguyện viên Lượm - Chiến dịch mùa hè 2026',
  introNote:
    'Form đăng ký có câu hỏi chuyên môn và xử lý tình huống, cần 15–20 phút để hoàn thiện.',
  importantNotes: [
    'Có 3 chương trình: Trại hè Xanh, Trại hè Công nghệ, Lớp Bình dân học vụ số.',
    'Trại hè Công nghệ và Lớp Bình dân học vụ số có chung tệp nhân sự. Người đăng ký cần tham gia đồng thời 2 hoạt động này.',
  ],
  readinessLabel:
    'TNV của Lượm sẽ tham gia hỗ trợ các hoạt động của chương trình đã đăng ký theo phân công bất kể bạn thuộc bộ phận nào. Bạn có sẵn sàng không?',
  readinessOption: 'Mình sẵn sàng',
  commitmentLabel:
    'Bạn có cam kết tham gia ít nhất 80% số buổi hoạt động, bao gồm training nội bộ và các ngày diễn ra chương trình không?',
  commitmentOption: 'Mình cam kết!',
  activityOptions: [
    { value: 'trai-he-xanh', label: 'Trại hè Xanh', description: 'Tháng 6' },
    {
      value: 'cong-nghe-va-bdhvs',
      label: 'Trại hè Công nghệ + Lớp Bình dân học vụ số',
      description: 'Tháng 7',
    },
  ] satisfies FormOption[],
  departmentOptions: [
    { value: 'tin-hoc-ky-thuat', label: 'Bộ phận Chuyên môn Tin học & Kỹ thuật' },
    { value: 'truyen-thong', label: 'Bộ phận Truyền thông' },
    { value: 'ho-tro', label: 'Bộ phận Hỗ trợ' },
  ] satisfies FormOption[],
  generalStrengthOptions: [
    {
      value: 'ho-tro-ky-thuat',
      label: 'Hỗ trợ kỹ thuật, máy móc, máy chiếu, kết nối mạng',
    },
    { value: 'thiet-ke-hinh-anh-slide', label: 'Thiết kế hình ảnh, slide' },
    { value: 'chup-anh-quay-video', label: 'Chụp ảnh, quay video ngắn làm truyền thông' },
    { value: 'quan-tro-hoat-nao', label: 'Quản trò, hoạt náo, tổ chức trò chơi giao lưu' },
    { value: 'san-sang-hoc-hoi', label: 'Chưa có kinh nghiệm nhưng sẵn sàng học hỏi' },
    { value: 'khac', label: 'Khác' },
  ] satisfies FormOption[],
  techRoleOptions: [
    { value: 'dung-lop-ho-tro-chuyen-mon', label: 'TNV Đứng lớp & Hỗ trợ chuyên môn' },
    { value: 'tro-giang-dieu-phoi-lop-hoc', label: 'TNV Trợ giảng & Điều phối lớp học' },
  ] satisfies FormOption[],
  techFieldOptions: [
    { value: 'an-toan-thong-tin', label: 'An toàn thông tin' },
    { value: 'ung-dung-cong-nghe-ai', label: 'Ứng dụng công nghệ & AI' },
    { value: 'sang-che', label: 'Sáng chế' },
    { value: 'ky-thuat-thu-cong', label: 'Kỹ thuật thủ công' },
  ] satisfies FormOption[],
  mediaPositionOptions: [
    { value: 'viet-bai', label: 'TNV viết bài' },
    { value: 'thiet-ke-an-pham', label: 'TNV thiết kế ấn phẩm' },
    { value: 'quay-chup', label: 'TNV quay chụp' },
    { value: 'dung-video', label: 'Dựng video' },
  ] satisfies FormOption[],
  cameraOptions: [
    { value: 'co-may-anh', label: 'Mình có' },
    {
      value: 'dien-thoai-chat-luong',
      label: 'Mình không, nhưng mình có thể đảm bảo chất lượng ảnh chụp bằng điện thoại',
    },
  ] satisfies FormOption[],
  supportTaskOptions: [
    { value: 'dieu-phoi-hoc-sinh', label: 'Điều phối học sinh' },
    { value: 'diem-danh', label: 'Điểm danh' },
    { value: 'chuan-bi-vat-dung', label: 'Chuẩn bị vật dụng' },
    { value: 'ho-tro-tro-choi-hoat-dong', label: 'Hỗ trợ trò chơi/hoạt động' },
    { value: 'hau-can-chung', label: 'Hỗ trợ hậu cần chung' },
  ] satisfies FormOption[],
  greenCampAvailabilityOptions: [
    { value: 'co', label: 'Có' },
    { value: 'chua-chac', label: 'Chưa chắc' },
    { value: 'khong', label: 'Không' },
  ] satisfies FormOption[],
} as const;

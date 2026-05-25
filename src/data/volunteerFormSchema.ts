export type FormOption = {
  value: string;
  label: string;
  description?: string;
};

export type DepartmentValue = 'tech' | 'media' | 'support';

export const volunteerFormSchema = {
  formName: 'Đăng ký Tình nguyện viên Lượm - Chiến dịch mùa hè 2026',
  formTitle: 'Đăng ký trực tiếp trên website',
  formNote:
    'Form đăng ký sẽ có một số câu hỏi về chuyên môn và xử lý tình huống thực tế nhằm giúp Ban tổ chức hiểu rõ hơn về bạn. Bạn hãy dành khoảng 15–20 phút để hoàn thiện câu trả lời thật trọn vẹn nhé.',
  sections: [
    '1. Lưu ý và cam kết',
    '2. Thông tin cá nhân',
    '3. Câu hỏi chung',
    '4. Hoạt động có thể tham gia',
    '5. Bộ phận ứng tuyển',
    '6. Câu hỏi theo bộ phận',
    '7. Xác nhận và gửi đăng ký',
  ],
  readiness: {
    label:
      'TNV của Lượm sẽ tham gia hỗ trợ các hoạt động của chương trình đã đăng kí theo phân công bất kể bạn thuộc bộ phận nào. Bạn có sẵn sàng không?',
    options: [{ value: 'minh-san-sang', label: 'Mình sẵn sàng' }] as FormOption[],
  },
  commitment80Percent: {
    label:
      'Bạn có cam kết tham gia ít nhất 80% số buổi hoạt động, bao gồm các buổi training nội bộ và các ngày diễn ra chương trình không?',
    description:
      'Nếu còn có băn khoăn gì, bạn có thể nhắn tin cho Fanpage để được hỗ trợ trao đổi thêm nhé.',
    options: [{ value: 'minh-cam-ket', label: 'Mình cam kết!' }] as FormOption[],
  },
  strengthsOptions: [
    {
      value: 'ho-tro-ky-thuat',
      label: 'Hỗ trợ kỹ thuật, máy móc, máy chiếu, kết nối mạng',
    },
    { value: 'thiet-ke-hinh-anh-slide', label: 'Thiết kế hình ảnh, slide' },
    {
      value: 'chup-anh-quay-video-media',
      label: 'Chụp ảnh, quay video ngắn làm truyền thông (Media)',
    },
    { value: 'quan-tro-hoat-nao', label: 'Quản trò, hoạt náo, tổ chức trò chơi giao lưu' },
    { value: 'san-sang-hoc-hoi', label: 'Chưa có kinh nghiệm nhưng sẵn sàng học hỏi' },
    { value: 'khac', label: 'Khác' },
  ] satisfies FormOption[],
  activityOptions: [
    { value: 'trai-he-xanh', label: 'Trại hè Xanh' },
    { value: 'trai-he-cong-nghe', label: 'Trại hè Công nghệ' },
    { value: 'binh-dan-hoc-vu-so', label: 'Lớp Bình dân học vụ số' },
  ] satisfies FormOption[],
  activityDescription:
    '1. Trại hè Xanh\n- Độ tuổi trại viên: từ 8–11 tuổi, là học sinh Tiểu học hoặc THCS\n- Thời gian tổ chức: tuần thứ 3 & 4 của tháng 6/2026, tổng thời lượng dự kiến là 03 ngày\n\n2. Trại hè Công nghệ\n- Độ tuổi trại viên: từ 9–12 tuổi, là học sinh Tiểu học hoặc THCS\n- Thời gian tổ chức: tháng 7/2026, tổng thời lượng dự kiến là 04 ngày\n\n3. Lớp Bình dân học vụ số\n- Đối tượng học sinh: Học sinh khối lớp 6 – lớp 8\n- Thời gian tổ chức dự kiến: tháng 7/2026, tổng thời lượng dự kiến là 06 ngày\n\nLưu ý:\n- Ngày diễn ra các hoạt động sẽ được thống nhất sau dựa trên lịch rảnh của tình nguyện viên.\n- Trại hè Công nghệ và Lớp Bình dân học vụ số có chung tệp nhân sự. Bạn sẽ cần tham gia đồng thời 2 hoạt động này.',
  primaryDepartmentOptions: [
    { value: 'tech', label: 'Chuyên môn Tin học và Kỹ thuật' },
    { value: 'media', label: 'Truyền thông' },
    { value: 'support', label: 'Hỗ trợ' },
  ] satisfies FormOption[],
  additionalDepartmentOptions: [
    { value: 'tech', label: 'Chuyên môn Tin học và Kỹ thuật' },
    { value: 'media', label: 'Truyền thông' },
    { value: 'support', label: 'Hỗ trợ' },
  ] satisfies FormOption[],
  tech: {
    title: 'Bộ phận Chuyên môn Tin học và Kỹ thuật',
    description:
      'Các nội dung:\n• An toàn & An ninh mạng: Hướng dẫn thực hành bảo mật tài khoản, nhận biết mã độc/phần mềm độc hại, ứng xử văn minh trên mạng.\n• Ứng dụng Công nghệ & AI: Hướng dẫn các em sử dụng các công cụ AI hiệu quả như đặt câu lệnh/prompt, hỗ trợ học tập, sáng tạo nội dung văn bản/hình ảnh.\n• Sáng chế & Kỹ thuật thủ công: Hướng dẫn các em cắt dán mô hình giấy, lắp ráp motor, đấu mạch điện cơ bản.',
    focusAreaOptions: [
      { value: 'an-toan-an-ninh-mang', label: 'An toàn & An ninh mạng' },
      { value: 'ung-dung-cong-nghe-ai', label: 'Ứng dụng Công nghệ & AI' },
      { value: 'sang-che-va-ky-thuat-thu-cong', label: 'Sáng chế & Kỹ thuật thủ công' },
      { value: 'khac', label: 'Khác' },
    ] satisfies FormOption[],
    digitalQuestionsTitle: 'Bộ câu hỏi Kỹ năng số & An toàn mạng',
    digitalQuestionsDescription:
      'Nếu bạn không chọn An toàn & An ninh mạng hoặc/và Ứng dụng Công nghệ & AI ở câu hỏi trước, bạn có thể bỏ trống phần này.',
    handmadeQuestionsTitle: 'Bộ câu hỏi Sáng chế & Kỹ thuật thủ công',
    handmadeQuestionsDescription:
      'Nếu bạn không chọn Sáng chế & Kỹ thuật thủ công ở câu hỏi trước, bạn có thể bỏ trống phần này.',
  },
  media: {
    title: 'Bộ phận Truyền thông',
    description:
      'Bạn vui lòng upload tất cả file lên 01 folder Drive và gắn link phía dưới.\nCác lưu ý:\n- Đặt tên folder theo cú pháp: Họ và tên - Ban TT\n- Mở quyền truy cập folder trước khi gắn link.',
    positionOptions: [
      { value: 'viet-bai', label: 'Viết bài' },
      { value: 'designer-video-editor', label: 'Làm ấn phẩm truyền thông (Designer + Video Editor)' },
      { value: 'chup-anh', label: 'Chụp ảnh' },
      { value: 'khac', label: 'Khác' },
    ] satisfies FormOption[],
    writingChallenge:
      'Hãy chia sẻ ít nhất 03 caption truyền thông bạn đã từng thực hiện trước đây.\nYêu cầu:\n- Toàn bộ caption lưu trong 1 file duy nhất.\n- Định dạng file: DOC/DOCX\n- Độ dài tối thiểu với mỗi caption: 200 từ\n- Tên file đặt theo cú pháp: Họ và tên - Caption\nVD: Nguyễn Văn A - Caption truyền thông',
    designerChallenge:
      'Hãy chia sẻ ít nhất 05 ấn phẩm truyền thông bạn đã từng thực hiện trước đây.\nYêu cầu:\n- Định dạng các file: PNG/JPG',
    editorChallenge: 'Hãy chia sẻ ít nhất 01 video truyền thông bạn đã từng thực hiện trước đây.',
    cameraOptions: [
      { value: 'minh-co', label: 'Mình có' },
      {
        value: 'dien-thoai-chat-luong',
        label: 'Mình không, nhưng mình có thể đảm bảo chất lượng ảnh chụp bằng điện thoại',
      },
    ] satisfies FormOption[],
  },
  support: {
    title: 'Bộ phận Hỗ trợ',
    description: 'TNV hỗ trợ Điều phối & Hậu cần.',
    taskOptions: [
      { value: 'dieu-phoi-hoc-sinh', label: 'Điều phối học sinh' },
      { value: 'diem-danh', label: 'Điểm danh' },
      { value: 'chuan-bi-vat-dung', label: 'Chuẩn bị vật dụng' },
      { value: 'ho-tro-tro-choi-hoat-dong', label: 'Hỗ trợ trò chơi/hoạt động' },
      { value: 'ho-tro-hau-can-chung', label: 'Hỗ trợ hậu cần chung' },
      { value: 'ho-tro-btc-theo-phan-cong', label: 'Hỗ trợ BTC theo phân công' },
    ] satisfies FormOption[],
  },
} as const;

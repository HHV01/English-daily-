import { WeekSchedule } from '../types';

export const WEEKS_SCHEDULE: WeekSchedule[] = [
  {
    weekNumber: 1,
    themeTitle: "BUG & DEFECT",
    themeDescription: "Giao tiếp về lỗi phần mềm, báo cáo bug và làm việc với Dev",
    days: [
      { dayCode: "T2", dayLabel: "Thứ Hai", topic: "Report bug mới (mô tả, steps to reproduce, expected vs actual)" },
      { dayCode: "T3", dayLabel: "Thứ Ba", topic: "Trả lời khi dev hỏi thêm thông tin / chưa reproduce được" },
      { dayCode: "T4", dayLabel: "Thứ Tư", topic: "Tranh luận về severity/priority với dev, PM" },
      { dayCode: "T5", dayLabel: "Thứ Năm", topic: "Phản hồi khi dev nói 'not a bug' / 'cannot reproduce' / 'won't fix'" },
      { dayCode: "T6", dayLabel: "Thứ Sáu", topic: "Follow-up bug chưa fix đúng hạn" },
      { dayCode: "T7", dayLabel: "Thứ Bảy / CN", topic: "Ôn tập tuần 1: Tổng hợp thuật ngữ & hội thoại về Defect", isReview: true },
    ]
  },
  {
    weekNumber: 2,
    themeTitle: "MEETING & AGILE CEREMONY",
    themeDescription: "Tham gia các cuộc họp Scrum, Standup, Planning và Retrospective",
    days: [
      { dayCode: "T2", dayLabel: "Thứ Hai", topic: "Daily standup (hôm qua làm gì, hôm nay làm gì, blocker gì)" },
      { dayCode: "T3", dayLabel: "Thứ Ba", topic: "Sprint planning (estimate effort test, hỏi rõ requirement)" },
      { dayCode: "T4", dayLabel: "Thứ Tư", topic: "Bug triage meeting (thảo luận ưu tiên xử lý bug)" },
      { dayCode: "T5", dayLabel: "Thứ Năm", topic: "Sprint review/demo (báo cáo kết quả test)" },
      { dayCode: "T6", dayLabel: "Thứ Sáu", topic: "Retrospective (góp ý cải thiện quy trình)" },
      { dayCode: "T7", dayLabel: "Thứ Bảy / CN", topic: "Ôn tập tuần 2: Tổng hợp thuật ngữ Agile & Meeting", isReview: true },
    ]
  },
  {
    weekNumber: 3,
    themeTitle: "REQUIREMENT & TEST CASE",
    themeDescription: "Làm rõ yêu cầu, review test case và thảo luận edge case",
    days: [
      { dayCode: "T2", dayLabel: "Thứ Hai", topic: "Hỏi rõ yêu cầu (clarify requirement / acceptance criteria)" },
      { dayCode: "T3", dayLabel: "Thứ Ba", topic: "Trao đổi test case với dev/BA" },
      { dayCode: "T4", dayLabel: "Thứ Tư", topic: "Đề xuất thêm edge case cần test" },
      { dayCode: "T5", dayLabel: "Thứ Năm", topic: "Báo cáo test coverage" },
      { dayCode: "T6", dayLabel: "Thứ Sáu", topic: "Thảo luận thay đổi requirement giữa sprint (scope change)" },
      { dayCode: "T7", dayLabel: "Thứ Bảy / CN", topic: "Ôn tập tuần 3: Tổng hợp requirement & test design", isReview: true },
    ]
  },
  {
    weekNumber: 4,
    themeTitle: "TIẾN ĐỘ & TRẠNG THÁI CÔNG VIỆC",
    themeDescription: "Cập nhật tiến độ testing, xử lý deadline và quyết định release",
    days: [
      { dayCode: "T2", dayLabel: "Thứ Hai", topic: "Báo cáo tiến độ testing (đang test đến đâu, còn bao nhiêu)" },
      { dayCode: "T3", dayLabel: "Thứ Ba", topic: "Xin gia hạn deadline testing" },
      { dayCode: "T4", dayLabel: "Thứ Tư", topic: "Báo blocker / xin hỗ trợ giải phóng tiến độ" },
      { dayCode: "T5", dayLabel: "Thứ Năm", topic: "Escalate vấn đề lên lead/PM khi bị chặn tiến độ" },
      { dayCode: "T6", dayLabel: "Thứ Sáu", topic: "Trao đổi về việc release/go-live (go/no-go decision)" },
      { dayCode: "T7", dayLabel: "Thứ Bảy / CN", topic: "Ôn tập tuần 4: Quản lý tiến độ & sign-off release", isReview: true },
    ]
  },
  {
    weekNumber: 5,
    themeTitle: "GIAO TIẾP QUA VĂN BẢN (ASYNC)",
    themeDescription: "Kỹ năng viết ticket Jira, nhắn Slack/Teams, email và PR comment",
    days: [
      { dayCode: "T2", dayLabel: "Thứ Hai", topic: "Viết bug report chuẩn trên Jira/tool" },
      { dayCode: "T3", dayLabel: "Thứ Ba", topic: "Nhắn tin Slack/Teams hỏi nhanh dev (ngắn gọn, lịch sự)" },
      { dayCode: "T4", dayLabel: "Thứ Tư", topic: "Viết email báo cáo test summary" },
      { dayCode: "T5", dayLabel: "Thứ Năm", topic: "Comment trong code review/PR (nếu có review test script)" },
      { dayCode: "T6", dayLabel: "Thứ Sáu", topic: "Viết test report cuối sprint" },
      { dayCode: "T7", dayLabel: "Thứ Bảy / CN", topic: "Ôn tập tuần 5: Tổng hợp kỹ năng viết Async chuyên nghiệp", isReview: true },
    ]
  },
  {
    weekNumber: 6,
    themeTitle: "TÌNH HUỐNG KHÓ NÓI & NÂNG CAO",
    themeDescription: "Xử lý bất đồng quan điểm, từ chối khéo léo và small talk văn phòng",
    days: [
      { dayCode: "T2", dayLabel: "Thứ Hai", topic: "Từ chối/không đồng ý lịch sự ('tôi nghĩ chưa nên release')" },
      { dayCode: "T3", dayLabel: "Thứ Ba", topic: "Nhắc lại việc đã hỏi nhiều lần chưa có phản hồi" },
      { dayCode: "T4", dayLabel: "Thứ Tư", topic: "Giải thích lỗi phức tạp cho người không rành kỹ thuật (PM, khách hàng)" },
      { dayCode: "T5", dayLabel: "Thứ Năm", topic: "Xử lý bất đồng quan điểm với dev trong cuộc họp" },
      { dayCode: "T6", dayLabel: "Thứ Sáu", topic: "Small talk văn phòng (làm quen, phá băng trước họp)" },
      { dayCode: "T7", dayLabel: "Thứ Bảy / CN", topic: "Ôn tập tuần 6 & Tổng ôn toàn bộ chu kỳ 6 tuần", isReview: true },
    ]
  },
  {
    weekNumber: 7,
    themeTitle: "HỆ THỐNG & LOGIC NGHIỆP VỤ",
    themeDescription: "Hiểu luồng xử lý (System Flow), kiến trúc Microservices, Data Flow và quy tắc nghiệp vụ",
    days: [
      { dayCode: "T2", dayLabel: "Thứ Hai", topic: "Hỏi dev để hiểu luồng xử lý (system flow) của 1 chức năng trước khi test" },
      { dayCode: "T3", dayLabel: "Thứ Ba", topic: "Trao đổi về logic nghiệp vụ (business rule) — điều kiện hiển thị, công thức tính toán, quy tắc validate dữ liệu" },
      { dayCode: "T4", dayLabel: "Thứ Tư", topic: "Thảo luận về luồng dữ liệu giữa các module/service (data flow) — frontend → API → database" },
      { dayCode: "T5", dayLabel: "Thứ Năm", topic: "Hỏi/giải thích hành vi API (request/response, status code, error case)" },
      { dayCode: "T6", dayLabel: "Thứ Sáu", topic: "Trao đổi về kiến trúc hệ thống ở mức QC cần biết (service dependency, điểm dễ lỗi tích hợp)" },
      { dayCode: "T7", dayLabel: "Thứ Bảy / CN", topic: "Ôn tập tuần 7: Tổng hợp thuật ngữ Hệ thống, Logic & Tổng ôn toàn diện", isReview: true },
    ]
  },
  {
    weekNumber: 8,
    themeTitle: "CHỦ ĐỀ ĐẶC THÙ & NÂNG CAO",
    themeDescription: "Automation testing, Performance/Load test, Security và làm việc trực tiếp với Khách hàng Quốc tế",
    days: [
      { dayCode: "T2", dayLabel: "Thứ Hai", topic: "Automation test: báo cáo kết quả test tự động, giải thích script fail" },
      { dayCode: "T3", dayLabel: "Thứ Ba", topic: "Performance/Load test: báo cáo benchmark, thảo luận ngưỡng chịu tải" },
      { dayCode: "T4", dayLabel: "Thứ Tư", topic: "Security test: báo cáo lỗ hổng bảo mật, mức độ nghiêm trọng" },
      { dayCode: "T5", dayLabel: "Thứ Năm", topic: "Làm việc khách hàng nước ngoài: họp UAT, giải thích lỗi cho khách hàng" },
      { dayCode: "T6", dayLabel: "Thứ Sáu", topic: "Cross-browser & Mobile testing: tương thích thiết bị & OS" },
      { dayCode: "T7", dayLabel: "Thứ Bảy / CN", topic: "Ôn tập tuần 8: Tổng kết chuyên đề đặc thù & Phỏng vấn QC tiếng Anh", isReview: true },
    ]
  },
  {
    weekNumber: 9,
    themeTitle: "GIAO TIẾP HÀNG NGÀY & SMALL TALK",
    themeDescription: "Chào hỏi, hỏi thăm, trò chuyện giờ ăn trưa, cà phê và kết nối tự nhiên giữa người với người",
    days: [
      { dayCode: "T2", dayLabel: "Thứ Hai", topic: "Chào hỏi đầu tuần & Phá băng ('How was your weekend?', 'How's it going?')" },
      { dayCode: "T3", dayLabel: "Thứ Ba", topic: "Coffee chat & Rủ ăn trưa ('Wanna grab lunch?', 'Let's get some coffee')" },
      { dayCode: "T4", dayLabel: "Thứ Tư", topic: "Hỏi thăm sở thích, phim ảnh, âm nhạc & thói quen hàng ngày" },
      { dayCode: "T5", dayLabel: "Thứ Năm", topic: "Khen ngợi, động viên & chúc mừng bạn bè/đồng nghiệp ('Good job!', 'Cheer up!')" },
      { dayCode: "T6", dayLabel: "Thứ Sáu", topic: "Kế hoạch cuối tuần & Tạm biệt ('Any plans for the weekend?', 'Have a great weekend!')" },
      { dayCode: "T7", dayLabel: "Thứ Bảy / CN", topic: "Ôn tập tuần 9: Tổng hợp mẫu câu Small Talk & Giao lưu tự nhiên", isReview: true },
    ]
  },
  {
    weekNumber: 10,
    themeTitle: "NGHỆ THUẬT KỂ CHUYỆN (STORYTELLING)",
    themeDescription: "Kể lại một sự việc, chia sẻ trải nghiệm cá nhân, bày tỏ cảm xúc và chia sẻ tin tức",
    days: [
      { dayCode: "T2", dayLabel: "Thứ Hai", topic: "Mở đầu câu chuyện thu hút ('Guess what happened?', 'You won't believe this...')" },
      { dayCode: "T3", dayLabel: "Thứ Ba", topic: "Kể lại một sự cố hài hước hoặc rắc rối nhỏ (kẹt xe, quên đồ, thời tiết bất ngờ)" },
      { dayCode: "T4", dayLabel: "Thứ Tư", topic: "Kể về một chuyến du lịch, một món ăn ngon hoặc địa điểm thú vị" },
      { dayCode: "T5", dayLabel: "Thứ Năm", topic: "Thể hiện sự lắng nghe & Phản hồi cảm xúc ('No way!', 'Really?', 'That sounds awesome!')" },
      { dayCode: "T6", dayLabel: "Thứ Sáu", topic: "Đúc kết & Chuyển chủ đề trong cuộc trò chuyện ('Long story short...', 'Anyway...')" },
      { dayCode: "T7", dayLabel: "Thứ Bảy / CN", topic: "Ôn tập tuần 10: Luyện phản xạ kể chuyện mạch lạc & cuốn hút", isReview: true },
    ]
  },
  {
    weekNumber: 11,
    themeTitle: "ĐỜI SỐNG XÃ HỘI & GIAO LƯU QUỐC TẾ",
    themeDescription: "Tụ tập sau giờ làm, kết bạn mới, văn hóa ứng xử và giao tiếp khi ra nước ngoài",
    days: [
      { dayCode: "T2", dayLabel: "Thứ Hai", topic: "Làm quen với người mới & Giới thiệu bản thân trong sự kiện/gặp mặt" },
      { dayCode: "T3", dayLabel: "Thứ Ba", topic: "Rủ rê tụ tập sau giờ làm (Happy hour, đi ăn tối, đi dạo)" },
      { dayCode: "T4", dayLabel: "Thứ Tư", topic: "Từ chối lời mời khéo léo, không gây ngại ngùng ('I wish I could, but...')" },
      { dayCode: "T5", dayLabel: "Thứ Năm", topic: "Trao đổi về khác biệt văn hóa, phong tục & lối sống" },
      { dayCode: "T6", dayLabel: "Thứ Sáu", topic: "Giao tiếp đời thường khi đi du lịch (hỏi đường, gọi món, nhờ vả lịch sự)" },
      { dayCode: "T7", dayLabel: "Thứ Bảy / CN", topic: "Ôn tập tuần 11: Tự tin giao tiếp đời sống như người bản xứ", isReview: true },
    ]
  }
];

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
    themeTitle: "CHỦ ĐỀ CHUYÊN SÂU & ĐẶC THÙ",
    themeDescription: "Automation, Performance, Security và Giao tiếp Khách hàng Quốc tế",
    days: [
      { dayCode: "T2", dayLabel: "Chuyên đề 1", topic: "Automation test: báo cáo test tự động, giải thích script fail" },
      { dayCode: "T3", dayLabel: "Chuyên đề 2", topic: "Performance/Load test: báo cáo benchmark, thảo luận ngưỡng tải" },
      { dayCode: "T4", dayLabel: "Chuyên đề 3", topic: "Security test: báo cáo lỗ hổng bảo mật, mức độ nghiêm trọng" },
      { dayCode: "T5", dayLabel: "Chuyên đề 4", topic: "Làm việc khách hàng nước ngoài: họp UAT, giải thích lỗi" },
      { dayCode: "T6", dayLabel: "Chuyên đề 5", topic: "Cross-browser & Mobile testing: trao đổi tương thích thiết bị" },
      { dayCode: "T7", dayLabel: "Tổng kết", topic: "Ôn tập chuyên đề nâng cao & Sẵn sàng phỏng vấn QC tiếng Anh", isReview: true },
    ]
  }
];

import { LessonData } from '../types';

export const STARTER_LESSONS: Record<string, LessonData> = {
  "w1_T2": {
    weekNumber: 1,
    dayCode: "T2",
    dayName: "Thứ Hai",
    themeTitle: "TUẦN 1: BUG & DEFECT",
    lessonTitle: "Report bug mới (mô tả, steps to reproduce, expected vs actual)",
    vocabulary: [
      {
        word: "reproduce",
        ipa: "/ˌriː.prəˈdjuːs/",
        partOfSpeech: "verb",
        meaningVi: "Tái hiện lại lỗi",
        exampleEn: "I can reproduce this issue consistently on Chrome version 124.",
        exampleVi: "Tôi có thể tái hiện lỗi này liên tục trên trình duyệt Chrome bản 124.",
        tip: "Luôn nói 'reproduce consistently' (luôn bị) hoặc 'reproduce intermittently' (thỉnh thoảng mới bị) để dev dễ debug."
      },
      {
        word: "expected behavior",
        ipa: "/ɪkˈspek.tɪd bɪˈheɪ.vjər/",
        partOfSpeech: "noun phrase",
        meaningVi: "Hành vi kỳ vọng (đúng theo requirement)",
        exampleEn: "The expected behavior is that the user should be redirected to the dashboard after login.",
        exampleVi: "Hành vi kỳ vọng là người dùng được chuyển hướng đến dashboard sau khi đăng nhập.",
        tip: "Dùng để đối chiếu với 'actual behavior' (hành vi thực tế đang bị lỗi)."
      },
      {
        word: "actual result",
        ipa: "/ˈæk.tʃu.əl rɪˈzʌlt/",
        partOfSpeech: "noun phrase",
        meaningVi: "Kết quả thực tế xảy ra (khi có bug)",
        exampleEn: "Actual result: The screen freezes and shows a 500 internal server error.",
        exampleVi: "Kết quả thực tế: Màn hình bị đơ và hiển thị lỗi máy chủ 500.",
        tip: "Nêu rõ thông báo lỗi cụ thể hoặc mã HTTP code thay vì chỉ nói 'it fails'."
      },
      {
        word: "steps to reproduce (STR)",
        ipa: "/steps tuː ˌriː.prəˈdjuːs/",
        partOfSpeech: "noun phrase",
        meaningVi: "Các bước tái hiện lỗi",
        exampleEn: "Please follow the steps to reproduce attached in ticket PROJ-102.",
        exampleVi: "Vui lòng làm theo các bước tái hiện đính kèm trong ticket PROJ-102.",
        tip: "Viết ngắn gọn dạng mệnh lệnh thức: 1. Navigate to... 2. Click on... 3. Enter..."
      },
      {
        word: "intermittent",
        ipa: "/ˌɪn.təˈmɪt.ənt/",
        partOfSpeech: "adjective",
        meaningVi: "Chập chờn, lúc bị lúc không",
        exampleEn: "This is an intermittent bug that occurs roughly 3 out of 10 times.",
        exampleVi: "Đây là lỗi chập chờn xuất hiện khoảng 3 trên 10 lần thử.",
        tip: "Cung cấp tỷ lệ xuất hiện (frequency) giúp dev đánh giá race condition."
      },
      {
        word: "crash log",
        ipa: "/kræʃ lɒɡ/",
        partOfSpeech: "noun phrase",
        meaningVi: "Nhật ký ghi nhận sự cố ứng dụng",
        exampleEn: "I have attached the console crash log and network HAR file to Jira.",
        exampleVi: "Tôi đã đính kèm log crash ở console và file HAR của network vào Jira.",
        tip: "Đính kèm bằng chứng (evidence) giúp ticket được xử lý nhanh hơn 50%."
      }
    ],
    communicationPatterns: [
      {
        patternName: "Báo bug mới vừa tìm thấy",
        contextVi: "Khi vừa phát hiện một lỗi nghiêm trọng cần thông báo ngay",
        formal: "I have logged a defect regarding the payment gateway timeout. Ticket reference is PAY-405.",
        casual: "Hey, just raised PAY-405 for the payment timeout bug. Could you take a quick look when free?",
        usageNoteVi: "Dùng formal trong email / Jira; dùng casual kèm ticket ID khi ping trực tiếp trên Slack/Teams."
      },
      {
        patternName: "Mô tả sự sai lệch giữa kết quả thực tế và mong đợi",
        contextVi: "Giải thích điểm bất thường trong tính năng",
        formal: "Contrary to the acceptance criteria, the submit button remains disabled even after all required fields are populated.",
        casual: "The submit button is still disabled even though I filled in all fields. It should be clickable.",
        usageNoteVi: "Cụm 'Contrary to acceptance criteria' thể hiện sự chắc chắn về mặt requirement."
      },
      {
        patternName: "Cung cấp môi trường và điều kiện xảy ra lỗi",
        contextVi: "Chỉ rõ version, thiết bị hoặc dữ liệu test",
        formal: "This defect was observed in the Staging environment (build v2.4.1) using an admin test account.",
        casual: "Tested this on Staging build v2.4.1 with admin credentials and it happened again.",
        usageNoteVi: "Môi trường (Staging/UAT/Production) là thông tin bắt buộc mọi dev đều cần."
      }
    ],
    dialogue: [
      {
        speaker: "Alex (QC)",
        role: "QC Engineer",
        avatarColor: "bg-emerald-500",
        en: "Hi David, I just opened a critical bug ticket for the checkout flow, PROJ-842.",
        vi: "Chào David, tôi vừa tạo một ticket bug nghiêm trọng cho luồng thanh toán, PROJ-842."
      },
      {
        speaker: "David (Dev)",
        role: "Backend Developer",
        avatarColor: "bg-blue-600",
        en: "Hey Alex! Thanks for the heads up. Does it happen on all payment methods or just credit cards?",
        vi: "Chào Alex! Cảm ơn đã báo. Lỗi xảy ra trên tất cả phương thức thanh toán hay chỉ với thẻ tín dụng?"
      },
      {
        speaker: "Alex (QC)",
        role: "QC Engineer",
        avatarColor: "bg-emerald-500",
        en: "It occurs specifically when selecting Visa credit cards on Staging build v2.4.1. The API returns a 504 gateway timeout.",
        vi: "Nó xảy ra cụ thể khi chọn thẻ tín dụng Visa trên bản Staging v2.4.1. API trả về lỗi 504 gateway timeout."
      },
      {
        speaker: "David (Dev)",
        role: "Backend Developer",
        avatarColor: "bg-blue-600",
        en: "Understood. Did you include the request payload and steps to reproduce in the ticket?",
        vi: "Đã hiểu. Bạn đã đưa request payload và các bước tái hiện vào ticket chưa?"
      },
      {
        speaker: "Alex (QC)",
        role: "QC Engineer",
        avatarColor: "bg-emerald-500",
        en: "Yes, I listed clear steps, payload data, and a screen recording in the ticket. It happens 100% of the time on Staging.",
        vi: "Có, tôi đã liệt kê các bước rõ ràng, dữ liệu payload và video quay màn hình trong ticket. Lỗi xảy ra 100% trên Staging."
      },
      {
        speaker: "David (Dev)",
        role: "Backend Developer",
        avatarColor: "bg-blue-600",
        en: "Great, thanks for the detailed report! I will pull the branch and investigate right away.",
        vi: "Tuyệt, cảm ơn bạn vì báo cáo chi tiết! Tôi sẽ pull branch về và điều tra ngay."
      }
    ],
    exercises: [
      {
        id: "ex1_mc",
        type: "multiple_choice",
        typeLabelVi: "Trắc nghiệm ngữ cảnh",
        instructionVi: "Chọn từ/cụm từ đúng nhất để hoàn thành câu",
        question: "Khi một lỗi xuất hiện chập chờn, chỉ khoảng 2/10 lần thử, thuật ngữ tiếng Anh chính xác nhất là gì?",
        options: ["Consistent bug", "Intermittent bug", "Blocked bug", "Regression bug"],
        correctAnswer: 1,
        explanationVi: "'Intermittent bug' nghĩa là lỗi chập chờn, lúc bị lúc không. Ngược lại với 'consistent' (luôn xảy ra 100%)."
      },
      {
        id: "ex2_fill",
        type: "fill_blank",
        typeLabelVi: "Điền từ vào chỗ trống",
        instructionVi: "Chọn cụm từ chuẩn để phân biệt kết quả mong đợi và kết quả thực tế",
        question: "The ______ is that the user is redirected to the home page, but the actual result is a 500 internal server error.",
        options: ["crash log", "root cause", "expected behavior", "workaround"],
        correctAnswer: 2,
        explanationVi: "'Expected behavior' là hành vi kỳ vọng đúng theo tài liệu đặc tả (requirement) của sản phẩm."
      },
      {
        id: "ex3_order",
        type: "word_order",
        typeLabelVi: "Sắp xếp từ thành câu đúng",
        instructionVi: "Nhấp vào các từ để sắp xếp thành câu báo bug chuẩn tiếng Anh",
        question: "Sắp xếp câu: 'Tôi có thể tái hiện lỗi này liên tục trên môi trường Staging.'",
        scrambledWords: ["I", "reproduce", "this", "can", "consistently", "bug", "Staging", "on."],
        correctAnswer: "I can reproduce this bug consistently on Staging.",
        explanationVi: "Cấu trúc chuẩn: S + modal verb (can) + V (reproduce) + Object (this bug) + Adverb (consistently) + Prepositional phrase (on Staging)."
      },
      {
        id: "ex4_err",
        type: "error_correction",
        typeLabelVi: "Sửa lỗi sai thường gặp",
        instructionVi: "Nhận diện lỗi ngữ pháp mà người Việt hay mắc khi nói tiếng Anh công sở",
        question: "Sửa câu sai: 'This bug cannot be reproduce on my local.'",
        incorrectSentence: "This bug cannot be reproduce on my local.",
        correctedSentence: "This bug cannot be reproduced on my local machine.",
        correctAnswer: "This bug cannot be reproduced on my local machine.",
        explanationVi: "Sau thể bị động 'cannot be', động từ phải ở dạng quá khứ phân từ P2 ('reproduced'). Ngoài ra nên dùng 'local machine' hoặc 'local environment'."
      }
    ],
    roleplayScenario: {
      scenarioVi: "Bạn vừa tìm thấy lỗi khi thanh toán đơn hàng bằng thẻ Visa: nút 'Pay Now' bị quay vòng vô tận (infinite loading) và tiền bị trừ nhưng không có email xác nhận.",
      partnerRole: "Frontend Developer",
      partnerMessageEn: "Hey, can you give me a quick summary of that checkout bug? What exactly happened?",
      partnerMessageVi: "Này bạn, tóm tắt nhanh giúp mình lỗi thanh toán được không? Chính xác thì bị gì thế?",
      promptTaskVi: "Hãy trả lời bằng tiếng Anh, nêu rõ hành vi thực tế (actual result), hành vi kỳ vọng (expected behavior) và đề cập rằng bạn đã đính kèm video/log.",
      sampleAnswerFormal: "When clicking 'Pay Now' with a Visa card, the spinner loads indefinitely. Money was deducted but no confirmation email was dispatched. Expected behavior is displaying the success screen and sending the invoice. I have attached the network payload and screen recording to ticket CHECKOUT-109.",
      sampleAnswerCasual: "Hey, clicking 'Pay Now' triggers an infinite spinner. The card was charged but no confirmation email showed up. It should redirect to the thank-you page. I put the screen recording and network log in Jira CHECKOUT-109!"
    },
    shortWritingTask: {
      titleVi: "Viết mô tả bug report hoàn chỉnh trên Jira",
      promptVi: "Hãy viết một đoạn mô tả bug hoàn chỉnh (Title, Steps to Reproduce, Expected vs Actual result) cho lỗi: Người dùng nhấn nút 'Save' trong trang Profile nhưng dữ liệu không được lưu và xuất hiện thông báo lỗi đỏ.",
      contextScenarioVi: "Bạn đang log ticket trên Jira cho sprint hiện tại. Dev sẽ đọc phần mô tả này để tái hiện và sửa lỗi.",
      targetLength: "3-5 câu (~50-80 từ)",
      recommendedKeywords: ["Steps to reproduce", "Expected behavior", "Actual result", "fails to persist", "Staging environment"],
      sentenceStarterEn: "I observed a defect on the User Profile page where changes fail to save.",
      guidelinesVi: [
        "Nêu rõ môi trường test (Staging / Production)",
        "Liệt kê 2-3 bước ngắn gọn dạng mệnh lệnh thức (Navigate to, Enter, Click)",
        "Chỉ rõ Expected Result và Actual Result"
      ]
    },
    dailyTip: {
      titleVi: "Mẹo giao tiếp với Dev khi báo bug",
      adviceVi: "Tránh nói những câu chung chung như 'The button does not work' hay 'The app is broken'. Dev cần 3 dữ liệu cốt lõi: 1. Môi trường + account test, 2. Bước tái hiện cụ thể (Steps to reproduce), 3. Mã phản hồi network hoặc screenshot. Khi bạn cung cấp sẵn sàng 3 điều này, dev sẽ rất tôn trọng và ưu tiên fix ngay.",
      keyTakeawayEn: "Facts over feelings: Give environment, steps to reproduce, and visual evidence."
    }
  },

  "w1_T3": {
    weekNumber: 1,
    dayCode: "T3",
    dayName: "Thứ Ba",
    themeTitle: "TUẦN 1: BUG & DEFECT",
    lessonTitle: "Trả lời khi dev hỏi thêm thông tin / chưa reproduce được",
    vocabulary: [
      {
        word: "cannot reproduce (CNR)",
        ipa: "/ˈkæn.ɒt ˌriː.prəˈdjuːs/",
        partOfSpeech: "phrase",
        meaningVi: "Không thể tái hiện lỗi",
        exampleEn: "The developer commented CNR because they tested with clean cache.",
        exampleVi: "Lập trình viên comment CNR vì họ đã test khi xoá sạch bộ nhớ đệm cache.",
        tip: "Đừng vội nản khi thấy CNR; hãy hỏi về môi trường (OS, browser, DB seed data) của họ."
      },
      {
        word: "prerequisite / precondition",
        ipa: "/ˌpriːˈrek.wɪ.zɪt/",
        partOfSpeech: "noun",
        meaningVi: "Điều kiện tiên quyết",
        exampleEn: "A key prerequisite is that the user must have zero items in their cart beforehand.",
        exampleVi: "Điều kiện tiên quyết quan trọng là người dùng phải có 0 món hàng trong giỏ trước đó.",
        tip: "Rất nhiều bug chỉ xảy ra khi thỏa mãn prerequisite đặc thù."
      },
      {
        word: "workaround",
        ipa: "/ˈwɜːk.ə.raʊnd/",
        partOfSpeech: "noun",
        meaningVi: "Cách giải quyết tạm thời",
        exampleEn: "As a temporary workaround, users can refresh the page to see updated credits.",
        exampleVi: "Như một giải pháp tạm thời, người dùng có thể tải lại trang để thấy số dư cập nhật.",
        tip: "Tìm ra workaround giúp giảm bớt tính khẩn cấp của bug trong lúc dev tìm root cause."
      },
      {
        word: "screen recording",
        ipa: "/skriːn rɪˈkɔː.dɪŋ/",
        partOfSpeech: "noun phrase",
        meaningVi: "Video quay màn hình thao tác",
        exampleEn: "I provided a full screen recording showing timestamp and devtools console.",
        exampleVi: "Tôi đã cung cấp video quay màn hình trọn vẹn kèm dấu thời gian và bảng console.",
        tip: "Bằng chứng trực quan không thể chối cãi khi dev bảo 'it works on my machine'."
      },
      {
        word: "walk someone through",
        ipa: "/wɔːk ˈsʌm.wʌn θruː/",
        partOfSpeech: "idiom / phrasal verb",
        meaningVi: "Hướng dẫn, giải thích từng bước cho ai đó",
        exampleEn: "Let's jump on a quick call so I can walk you through the reproduction steps.",
        exampleVi: "Hãy vào cuộc gọi nhanh để tôi hướng dẫn bạn từng bước tái hiện.",
        tip: "Cụm từ rất lịch sự và chuyên nghiệp khi đề xuất demo bug."
      }
    ],
    communicationPatterns: [
      {
        patternName: "Đề xuất cùng debug / screen share",
        contextVi: "Khi dev không tái hiện được dù bạn đã đưa đủ thông tin",
        formal: "Would you have 5 minutes for a quick huddle so I can walk you through the reproduction steps?",
        casual: "Let's do a quick 3-minute screen share! I can show you the bug right on my screen.",
        usageNoteVi: "'Walk someone through' là cụm từ rất tự nhiên nghĩa là hướng dẫn từng bước."
      },
      {
        patternName: "Xác nhận lại môi trường kiểm thử",
        contextVi: "Kiểm tra xem dev đang chạy đúng branch/database chưa",
        formal: "Could you please confirm if your local database includes the latest migration script?",
        casual: "Are you on the latest commit on the develop branch? The fix might conflict with older migrations.",
        usageNoteVi: "Hỏi về commit/migration một cách khách quan, tránh đổ lỗi."
      }
    ],
    dialogue: [
      {
        speaker: "Tom (Dev)",
        role: "Frontend Dev",
        avatarColor: "bg-indigo-600",
        en: "Alex, I tried reproducing BUG-105 on my local machine but it works completely fine.",
        vi: "Alex ơi, mình đã thử tái hiện BUG-105 trên máy local nhưng nó chạy hoàn toàn bình thường."
      },
      {
        speaker: "Alex (QC)",
        role: "QC Engineer",
        avatarColor: "bg-emerald-500",
        en: "Thanks for checking, Tom. Did you test with an expired session token or a fresh login?",
        vi: "Cảm ơn Tom đã kiểm tra. Bạn có test với token phiên đã hết hạn hay đăng nhập mới tinh?"
      },
      {
        speaker: "Tom (Dev)",
        role: "Frontend Dev",
        avatarColor: "bg-indigo-600",
        en: "Ah, I just logged in with a brand new admin user. Does the session state matter?",
        vi: "À, mình vừa đăng nhập bằng user admin mới toanh. Trạng thái phiên đăng nhập có ảnh hưởng à?"
      },
      {
        speaker: "Alex (QC)",
        role: "QC Engineer",
        avatarColor: "bg-emerald-500",
        en: "Yes! The crash only triggers when an access token expires while editing an existing form. Let me jump on a quick call to demonstrate.",
        vi: "Đúng rồi! Sự cố crash chỉ xảy ra khi access token hết hạn trong lúc đang sửa form có sẵn. Để mình vào call nhanh để demo cho bạn xem."
      }
    ],
    exercises: [
      {
        id: "ex_w1t3_1",
        type: "multiple_choice",
        typeLabelVi: "Trắc nghiệm ngữ cảnh",
        instructionVi: "Chọn câu trả lời chuyên nghiệp nhất khi dev nói 'It works on my machine'",
        question: "Khi lập trình viên nói 'It works on my machine', phản hồi nào sau đây hợp tác và chuyên nghiệp nhất?",
        options: [
          "You must have tested carelessly, test again!",
          "Let's hop on a quick call so I can walk you through the exact precondition.",
          "I will close the ticket then.",
          "It is not my fault if your local machine is broken."
        ],
        correctAnswer: 1,
        explanationVi: "Đề nghị 'hop on a quick call to walk through the precondition' thể hiện tinh thần cùng nhau tìm giải pháp mà không đổ lỗi."
      },
      {
        id: "ex_w1t3_2",
        type: "error_correction",
        typeLabelVi: "Sửa lỗi sai thường gặp",
        instructionVi: "Sửa lỗi giới từ phổ biến của người học",
        question: "Sửa câu sai: 'The feature works fine in my machine, so I close it.'",
        incorrectSentence: "The feature works fine in my machine, so I close it.",
        correctedSentence: "The feature works fine on my machine, so I will close it.",
        correctAnswer: "The feature works fine on my machine, so I will close it.",
        explanationVi: "Trong tiếng Anh công nghệ, luôn dùng giới từ 'ON my machine' (hoặc 'on my local environment'), không dùng 'in my machine'."
      },
      {
        id: "ex_w1t3_3",
        type: "quick_translation",
        typeLabelVi: "Dịch nhanh Việt - Anh",
        instructionVi: "Dịch câu tình huống thực tế của QC sang tiếng Anh",
        question: "Dịch sang tiếng Anh: 'Bạn có 5 phút để gọi nhanh để mình chia sẻ màn hình không?'",
        vietnamesePrompt: "Bạn có 5 phút để gọi nhanh để mình chia sẻ màn hình không?",
        correctAnswer: "Do you have 5 minutes for a quick huddle so I can share my screen?",
        acceptableAnswersEn: [
          "Do you have 5 minutes for a quick call so I can share my screen?",
          "Would you have 5 minutes for a quick screen share?"
        ],
        explanationVi: "Dùng 'huddle' hoặc 'quick call' và 'share my screen' là cách nói chuẩn văn phòng tech."
      }
    ],
    roleplayScenario: {
      scenarioVi: "Dev gửi tin nhắn bảo rằng họ không reproduce được lỗi crash trang giỏ hàng và định đóng ticket.",
      partnerRole: "Dev Lead",
      partnerMessageEn: "I tested this three times and couldn't reproduce it. I'm thinking of marking this as Cannot Reproduce.",
      partnerMessageVi: "Tôi đã test 3 lần rồi mà không reproduce được. Tôi tính đổi trạng thái thành Cannot Reproduce nhé.",
      promptTaskVi: "Hãy đề nghị dev hoãn đóng ticket, hỏi xem họ đã test trên Safari/iOS chưa và gửi link video demo của bạn.",
      sampleAnswerFormal: "Please hold off on closing the ticket. This issue specifically occurs on WebKit browsers like Safari. I have recorded a video demonstration and would be glad to do a quick 2-minute huddle to reproduce it together.",
      sampleAnswerCasual: "Hold on before closing it, please! It only happens on Safari / iOS devices. I recorded a quick demo video in the ticket, or we can hop on a 2-min call and I'll show you!"
    },
    shortWritingTask: {
      titleVi: "Viết tin nhắn Slack gửi Dev làm rõ điều kiện tái hiện bug",
      promptVi: "Viết một tin nhắn ngắn gửi dev trên Slack giải thích lý do tại sao dev không reproduce được lỗi (do dev chưa xóa cache trình duyệt hoặc chưa kích hoạt quyền admin).",
      contextScenarioVi: "Dev vừa comment CNR vào ticket của bạn trên Jira và bạn cần ping Slack ngay để cứu ticket khỏi bị đóng oan.",
      targetLength: "3-5 câu (~50-80 từ)",
      recommendedKeywords: ["precondition", "browser cache", "screen share", "walk you through", "Jira ticket"],
      sentenceStarterEn: "Hey Tom, regarding your CNR comment on ticket BUG-105,",
      guidelinesVi: [
        "Bắt đầu bằng lời chào thân thiện và nhắc mã ticket",
        "Nêu điều kiện đặc thù (clear cache / incognito)",
        "Đề nghị gọi nhanh 2 phút nếu dev vẫn chưa thấy lỗi"
      ]
    },
    dailyTip: {
      titleVi: "Tâm lý Dev và cách hóa giải câu 'Works on my machine'",
      adviceVi: "Khi dev nói 'Works on my machine', họ không có ý phủ nhận công việc của bạn, mà là họ thực sự không thấy lỗi trên môi trường của họ. Đừng coi đó là cuộc chiến thắng thua. Hãy coi đó là cơ hội cùng truy tìm biến số ẩn: khác biệt về browser, quyền hạn user (role/permission), dữ liệu cache, hay mock API.",
      keyTakeawayEn: "Collaborate, don't confront. Find the hidden variable together."
    }
  },

  "w1_T4": {
    weekNumber: 1,
    dayCode: "T4",
    dayName: "Thứ Tư",
    themeTitle: "TUẦN 1: BUG & DEFECT",
    lessonTitle: "Tranh luận về severity/priority với dev, PM",
    vocabulary: [
      {
        word: "severity",
        ipa: "/sɪˈver.ə.ti/",
        partOfSpeech: "noun",
        meaningVi: "Mức độ nghiêm trọng kỹ thuật của lỗi",
        exampleEn: "The severity is Critical because it causes data loss in the production database.",
        exampleVi: "Mức độ nghiêm trọng là Critical vì nó gây mất dữ liệu trong database thật.",
        tip: "Severity do QC xác định dựa trên mức độ ảnh hưởng hệ thống (Crash, Data loss, UI glitch)."
      },
      {
        word: "priority",
        ipa: "/praɪˈɒr.ə.ti/",
        partOfSpeech: "noun",
        meaningVi: "Mức độ ưu tiên khắc phục (theo góc độ kinh doanh)",
        exampleEn: "The PM raised the priority to High because our top enterprise client is affected.",
        exampleVi: "PM đã nâng mức độ ưu tiên lên High vì khách hàng doanh nghiệp hàng đầu bị ảnh hưởng.",
        tip: "Priority do PM/PO quyết định dựa trên roadmap kinh doanh và deadline release."
      },
      {
        word: "blocker",
        ipa: "/ˈblɒk.ər/",
        partOfSpeech: "noun",
        meaningVi: "Lỗi chặn luồng kiểm thử / không thể tiếp tục",
        exampleEn: "This authentication failure is a release blocker for Sprint 32.",
        exampleVi: "Lỗi xác thực này là một blocker chặn việc phát hành của Sprint 32.",
        tip: "Chỉ gán tag 'Blocker' khi toàn bộ team hoặc module chính hoàn toàn không test tiếp được."
      },
      {
        word: "compromise",
        ipa: "/ˈkɒm.prə.maɪz/",
        partOfSpeech: "verb / noun",
        meaningVi: "Thỏa hiệp, giải pháp dung hòa",
        exampleEn: "Can we compromise by releasing a hotfix patch early next week?",
        exampleVi: "Chúng ta có thể thỏa hiệp bằng cách phát hành bản vá hotfix đầu tuần sau không?",
        tip: "Dùng từ này khi thảo luận giải pháp win-win giữa tiến độ release và chất lượng sản phẩm."
      }
    ],
    communicationPatterns: [
      {
        patternName: "Bảo vệ quan điểm về mức độ nghiêm trọng",
        contextVi: "Khi dev muốn hạ severity từ Critical xuống Minor để kịp release",
        formal: "I understand the tight deadline, but downgrading this defect to Minor poses a significant risk of revenue leakage.",
        casual: "I get that we're rushed, but if we mark this Minor and release, users won't be able to checkout.",
        usageNoteVi: "Dùng cấu trúc: 'I understand [dev's concern], but [business/user impact]' để thuyết phục khách quan."
      }
    ],
    dialogue: [
      {
        speaker: "Sarah (PM)",
        role: "Product Manager",
        avatarColor: "bg-purple-600",
        en: "Alex, David wants to lower the severity of BUG-201 from Blocker to Medium so we can deploy tonight. What's your take?",
        vi: "Alex ơi, David muốn hạ severity của BUG-201 từ Blocker xuống Medium để tối nay deploy. Ý kiến của bạn thế nào?"
      },
      {
        speaker: "Alex (QC)",
        role: "QC Engineer",
        avatarColor: "bg-emerald-500",
        en: "From a QA standpoint, I strongly recommend keeping it as High. If a user enters special characters in the billing address, the order fails silently without an alert.",
        vi: "Dưới góc độ QA, tôi đặc biệt khuyên nên giữ ở mức High. Nếu người dùng nhập ký tự đặc biệt ở địa chỉ nhận bill, đơn hàng sẽ âm thầm thất bại mà không báo lỗi gì."
      },
      {
        speaker: "David (Dev)",
        role: "Backend Dev",
        avatarColor: "bg-blue-600",
        en: "How many users actually have special characters in their address though? It seems like an edge case.",
        vi: "Nhưng có bao nhiêu người thực sự nhập ký tự đặc biệt trong địa chỉ chứ? Có vẻ là edge case hiếm gặp."
      },
      {
        speaker: "Alex (QC)",
        role: "QC Engineer",
        avatarColor: "bg-emerald-500",
        en: "Our target market includes French and German customers with accented names like 'Müller' or 'René'. They will definitely encounter this.",
        vi: "Thị trường mục tiêu của chúng ta có khách hàng Pháp và Đức với tên có dấu như 'Müller' hay 'René'. Chắc chắn họ sẽ gặp lỗi này."
      },
      {
        speaker: "Sarah (PM)",
        role: "Product Manager",
        avatarColor: "bg-purple-600",
        en: "Good point, Alex. David, let's patch this today before we push the build to production.",
        vi: "Điểm lưu ý rất hay, Alex. David, chúng ta hãy vá lỗi này ngay hôm nay trước khi đẩy bản build lên production."
      }
    ],
    exercises: [
      {
        id: "ex_w1t4_1",
        type: "multiple_choice",
        typeLabelVi: "Trắc nghiệm ngữ cảnh",
        instructionVi: "Chọn định nghĩa chính xác nhất về Severity và Priority",
        question: "Sự khác biệt cốt lõi giữa 'Severity' và 'Priority' trong kiểm thử phần mềm là gì?",
        options: [
          "Severity do PM quyết định, Priority do Dev quyết định",
          "Severity đo tác động kỹ thuật/hệ thống, Priority đo thứ tự cần fix theo góc độ kinh doanh",
          "Cả hai từ hoàn toàn đồng nghĩa",
          "Priority chỉ dùng trong mô hình Waterfall, Severity dùng trong Agile"
        ],
        correctAnswer: 1,
        explanationVi: "Severity đo lường mức độ phá hủy/nghiêm trọng kỹ thuật (Technical impact), còn Priority đo lường thứ tự ưu tiên kinh doanh và tiến độ release."
      },
      {
        id: "ex_w1t4_2",
        type: "word_order",
        typeLabelVi: "Sắp xếp từ thành câu đúng",
        instructionVi: "Sắp xếp các từ để tạo thành câu phản biện khách quan",
        question: "Sắp xếp câu: 'Tôi hiểu áp lực deadline, nhưng hạ mức lỗi này tiềm ẩn rủi ro lớn.'",
        scrambledWords: ["the", "deadline,", "I", "understand", "poses", "this", "downgrading", "but", "high", "risk."],
        correctAnswer: "I understand the deadline, but downgrading this poses high risk.",
        explanationVi: "Cấu trúc: 'I understand [X], but [Y] poses high risk' là mẫu câu vàng khi đàm phán trong các cuộc họp Agile."
      },
      {
        id: "ex_w1t4_3",
        type: "error_correction",
        typeLabelVi: "Sửa lỗi sai thường gặp",
        instructionVi: "Sửa lỗi dùng 'I am agree' mà người Việt rất hay mắc",
        question: "Sửa câu sai: 'I am agree with David that this is an edge case.'",
        incorrectSentence: "I am agree with David that this is an edge case.",
        correctedSentence: "I agree with David that this is an edge case.",
        correctAnswer: "I agree with David that this is an edge case.",
        explanationVi: "'Agree' là một động từ (verb), không phải tính từ. Do đó chỉ nói 'I agree with...', KHÔNG BAO GIỜ nói 'I am agree'."
      }
    ],
    roleplayScenario: {
      scenarioVi: "Dev đề nghị bạn hạ mức độ của bug đăng xuất tài khoản tự động từ Critical xuống Low vì dev bận làm tính năng khác.",
      partnerRole: "Senior Developer",
      partnerMessageEn: "Can we downgrade this session timeout bug to Low? I really need to focus on my sprint tasks.",
      partnerMessageVi: "Hạ bug timeout phiên đăng nhập này xuống Low được không? Tôi thật sự cần tập trung làm task sprint của tôi.",
      promptTaskVi: "Giải thích rằng nếu user bị logout liên tục khi đang điền form thì trải nghiệm người dùng rất tệ, đề xuất giữ mức Medium và thương lượng thời gian fix.",
      sampleAnswerFormal: "I understand you have tight sprint deliverables, but keeping this at Low might risk high user churn because users lose their entered data upon logout. Could we agree on Medium and schedule the fix for the next code freeze?",
      sampleAnswerCasual: "I know you're super busy with sprint tasks, but this kicks users out mid-form and they lose their work! How about we set it to Medium and tackle it right after your main PR merges?"
    },
    shortWritingTask: {
      titleVi: "Viết email / comment bảo vệ mức Severity của Bug",
      promptVi: "Viết một đoạn phản hồi trong ticket Jira gửi PM và Dev giải thích tại sao không nên hạ mức bug thanh toán từ Blocker xuống Low trước ngày release.",
      contextScenarioVi: "Team đang chịu áp lực phải release kịp ngày mai và dev muốn lờ đi bug thanh toán để kịp tiến độ.",
      targetLength: "3-5 câu (~50-80 từ)",
      recommendedKeywords: ["from a QA perspective", "downgrading", "business impact", "release blocker", "compromise"],
      sentenceStarterEn: "From a QA perspective, I strongly advise against downgrading BUG-302.",
      guidelinesVi: [
        "Mở đầu bằng 'From a QA perspective'",
        "Dẫn chứng rủi ro người dùng không thể checkout",
        "Đề xuất thỏa hiệp hoặc giải pháp tạm thời (workaround)"
      ]
    },
    dailyTip: {
      titleVi: "Nghệ thuật bảo vệ Bug Severity không gây thù hằn",
      adviceVi: "Đừng bao giờ nói 'You made a bad bug'. Hãy luôn nói về 'Customer Experience' và 'Business Risk'. Khi bạn dẫn chứng bằng số liệu người dùng hoặc ví dụ thực tế (ví dụ: tên có dấu, đơn hàng bị hủy), PM và Dev sẽ lập tức đồng tình mà không cảm thấy bị chỉ trích cá nhân.",
      keyTakeawayEn: "Anchor your arguments on user impact and business risks, never personal fault."
    }
  },

  "w1_T7": {
    weekNumber: 1,
    dayCode: "T7",
    dayName: "Chủ Nhật",
    themeTitle: "TUẦN 1: BUG & DEFECT",
    lessonTitle: "Ôn tập tuần 1: Tổng hợp thuật ngữ & hội thoại về Defect",
    vocabulary: [
      {
        word: "regression",
        ipa: "/rɪˈɡreʃ.ən/",
        partOfSpeech: "noun",
        meaningVi: "Lỗi hồi quy (tính năng cũ bị hỏng sau khi sửa code mới)",
        exampleEn: "We found a regression bug in the login module after the latest release.",
        exampleVi: "Chúng tôi phát hiện một lỗi hồi quy ở module đăng nhập sau đợt phát hành mới nhất.",
        tip: "Regression là một trong những loại bug nguy hiểm nhất cần test kỹ."
      },
      {
        word: "acceptance criteria (AC)",
        ipa: "/əkˈsep.təns kraɪˈtɪə.ri.ə/",
        partOfSpeech: "noun phrase",
        meaningVi: "Tiêu chí nghiệm thu tính năng",
        exampleEn: "The feature does not meet Acceptance Criteria number 3.",
        exampleVi: "Tính năng chưa đáp ứng tiêu chí nghiệm thu số 3.",
        tip: "Dẫn chứng số thứ tự AC trong ticket để thuyết phục dev nhanh nhất."
      },
      {
        word: "root cause analysis (RCA)",
        ipa: "/ruːt kɔːz əˈnæl.ə.sɪs/",
        partOfSpeech: "noun phrase",
        meaningVi: "Phân tích nguyên nhân gốc rễ của lỗi",
        exampleEn: "The tech lead conducted an RCA to prevent similar incidents.",
        exampleVi: "Tech lead đã tiến hành phân tích nguyên nhân gốc rễ để phòng ngừa sự cố tương tự.",
        tip: "Hiểu root cause giúp QC viết test case chặn các lỗi tương tự trong tương lai."
      }
    ],
    communicationPatterns: [
      {
        patternName: "Tổng kết trạng thái bug tuần",
        contextVi: "Báo cáo trong cuộc họp tổng kết tuần hoặc gửi email tóm tắt",
        formal: "To summarize our week, QA logged 14 defects, of which 11 have been verified on Staging and 3 remain in progress.",
        casual: "Quick weekly recap: we found 14 bugs, verified 11 on Staging, and 3 are still being looked into.",
        usageNoteVi: "Cung cấp con số rõ ràng tạo cảm giác chuyên nghiệp và đáng tin cậy."
      }
    ],
    dialogue: [
      {
        speaker: "Alex (QC)",
        role: "QC Engineer",
        avatarColor: "bg-emerald-500",
        en: "Hi team, here is the weekly defect summary for Sprint 31. We resolved all Critical blockers.",
        vi: "Chào cả team, đây là bản tóm tắt bug tuần này cho Sprint 31. Chúng ta đã giải quyết xong toàn bộ lỗi Blocker nghiêm trọng."
      },
      {
        speaker: "Sarah (PM)",
        role: "Product Manager",
        avatarColor: "bg-purple-600",
        en: "Excellent work Alex and developers! Are there any remaining regression risks before Monday's release?",
        vi: "Làm việc rất xuất sắc Alex và các dev! Có còn nguy cơ lỗi hồi quy nào trước đợt release Thứ Hai không?"
      },
      {
        speaker: "Alex (QC)",
        role: "QC Engineer",
        avatarColor: "bg-emerald-500",
        en: "We ran full regression testing on Staging build v2.4.5. All acceptance criteria are met, and we are good to go.",
        vi: "Chúng tôi đã chạy kiểm thử hồi quy toàn diện trên Staging build v2.4.5. Mọi tiêu chí nghiệm thu đều đạt, và chúng ta sẵn sàng release."
      }
    ],
    exercises: [
      {
        id: "ex_w1t7_1",
        type: "multiple_choice",
        typeLabelVi: "Trắc nghiệm tổng hợp",
        instructionVi: "Chọn định nghĩa đúng của lỗi hồi quy (Regression bug)",
        question: "Lỗi hồi quy (Regression bug) là gì?",
        options: [
          "Lỗi phát sinh do người dùng nhập sai mật khẩu",
          "Lỗi xảy ra khi một tính năng cũ vốn đang chạy tốt bỗng nhiên bị hỏng sau khi deploy code mới",
          "Lỗi liên quan đến giao diện trên trình duyệt Internet Explorer",
          "Lỗi do server quá tải trong đợt flash sale"
        ],
        correctAnswer: 1,
        explanationVi: "Regression bug là lỗi xuất hiện ở những tính năng cũ đã từng hoạt động ổn định, do tác động phụ ngoài ý muốn của những dòng code mới."
      },
      {
        id: "ex_w1t7_2",
        type: "fill_blank",
        typeLabelVi: "Điền từ vào chỗ trống",
        instructionVi: "Điền cụm từ viết tắt tiêu chí nghiệm thu",
        question: "Does this implementation satisfy all ______ defined in the user story?",
        options: ["crash logs", "acceptance criteria", "workarounds", "pull requests"],
        correctAnswer: 1,
        explanationVi: "'Acceptance criteria' (AC) là các tiêu chí nghiệm thu bắt buộc phải thỏa mãn để user story được coi là Done."
      },
      {
        id: "ex_w1t7_3",
        type: "quick_translation",
        typeLabelVi: "Dịch nhanh tổng hợp",
        instructionVi: "Dịch câu thông báo sẵn sàng release sang tiếng Anh",
        question: "Dịch sang tiếng Anh: 'Toàn bộ bài test hồi quy đã pass, chúng ta sẵn sàng release.'",
        vietnamesePrompt: "Toàn bộ bài test hồi quy đã pass, chúng ta sẵn sàng release.",
        correctAnswer: "All regression tests passed, and we are good to release.",
        acceptableAnswersEn: [
          "All regression tests have passed, we are ready for release.",
          "All regression tests passed, we are good to go."
        ],
        explanationVi: "'Good to release' hoặc 'good to go' là thành ngữ công sở phổ biến nhất khi chốt việc deploy."
      }
    ],
    roleplayScenario: {
      scenarioVi: "Tại buổi họp chốt release cuối tuần, PM hỏi bạn xem liệu có rủi ro nào nếu bấm nút release ngay bây giờ không.",
      partnerRole: "Engineering Manager",
      partnerMessageEn: "Alex, as QA lead, do we have your sign-off for the production deployment tonight?",
      partnerMessageVi: "Alex ơi, với vai trò QA lead, bạn đã duyệt (sign-off) cho đợt deploy lên production tối nay chưa?",
      promptTaskVi: "Trả lời xác nhận đã sign-off, nêu rõ toàn bộ regression test suite đã pass và không còn blocker nào.",
      sampleAnswerFormal: "Yes, you have my QA sign-off. We executed the full regression test suite on Staging, and all 45 critical test cases passed with zero blockers remaining. We are confident in this build.",
      sampleAnswerCasual: "Yes, all green on QA side! Full regression passed with zero blockers on Staging. We're totally good to go for tonight's deployment!"
    },
    shortWritingTask: {
      titleVi: "Viết báo cáo tổng kết tuần (Defect Summary & Release Sign-off)",
      promptVi: "Viết một email báo cáo tổng kết chất lượng tuần 1 gửi cho toàn bộ project team: tóm tắt số lượng bug đã tìm thấy, số bug đã verify, và xác nhận tình trạng sign-off cho đợt release.",
      contextScenarioVi: "Cuối ngày Thứ Sáu/Chủ Nhật, QA cần gửi email cập nhật trạng thái chất lượng sản phẩm cho PM và Stakeholders.",
      targetLength: "3-5 câu (~50-80 từ)",
      recommendedKeywords: ["weekly summary", "regression testing", "sign-off", "zero blockers", "acceptance criteria"],
      sentenceStarterEn: "Hi team, here is the weekly QA testing summary for Sprint 31.",
      guidelinesVi: [
        "Nêu con số cụ thể (số bug đã fix / verify)",
        "Khẳng định tình trạng regression testing",
        "Chốt lại trạng thái Sign-off (sẵn sàng release hay hoãn lại)"
      ]
    },
    dailyTip: {
      titleVi: "Tầm quan trọng của QA Sign-off",
      adviceVi: "QA Sign-off không phải là lời cam kết sản phẩm 100% không có bug (điều đó là bất khả thi), mà là văn bản xác nhận: 'Chúng tôi đã kiểm thử đúng phạm vi, và các rủi ro đã được kiểm soát trong mức chấp nhận được'. Hãy luôn kèm theo số liệu test case đã chạy để bảo vệ bản thân.",
      keyTakeawayEn: "QA sign-off certifies tested scope and managed risk, not perfection."
    },
    weekendReview: {
      keyWords: [
        "reproduce consistently",
        "expected vs actual behavior",
        "intermittent bug",
        "cannot reproduce (CNR)",
        "regression test sign-off"
      ],
      summaryAdviceVi: "Tuần 1 đã trang bị trọn vẹn vốn từ vựng và tâm lý đàm phán khi đối mặt với lỗi phần mềm. Hãy nhớ rằng mục tiêu của việc báo bug không phải là đổ lỗi cho Dev, mà là bảo vệ trải nghiệm của người dùng cuối và uy tín của sản phẩm.",
      combinedDialogue: [
        {
          speaker: "Alex (QC)",
          role: "QC Engineer",
          avatarColor: "bg-emerald-500",
          en: "David, after testing the hotfix for PAY-405, I verified that the payment timeout is resolved. However, we noticed a minor regression on the invoice PDF.",
          vi: "David ơi, sau khi test bản vá cho PAY-405, mình đã xác nhận lỗi timeout thanh toán đã hết. Tuy nhiên, tụi mình nhận thấy một lỗi hồi quy nhỏ ở file PDF hóa đơn."
        },
        {
          speaker: "David (Dev)",
          role: "Backend Dev",
          avatarColor: "bg-blue-600",
          en: "Thanks for catching that! Is it a blocker or can we log it as a post-release ticket?",
          vi: "Cảm ơn đã phát hiện ra! Nó có phải blocker không hay mình có thể tạo ticket xử lý sau release?"
        },
        {
          speaker: "Alex (QC)",
          role: "QC Engineer",
          avatarColor: "bg-emerald-500",
          en: "The PDF is readable, only the logo is slightly misaligned. We can compromise and mark it as Low priority for next sprint.",
          vi: "Bản PDF vẫn đọc bình thường, chỉ có logo bị lệch nhẹ. Chúng ta có thể dung hòa và đánh dấu priority Low cho sprint sau."
        }
      ],
      comprehensiveWritingTask: {
        titleVi: "Viết báo cáo Defect & Email thông báo cho PM hoàn chỉnh",
        promptVi: "Viết một bài tổng hợp (~100-120 từ) gồm 2 phần: 1) Mô tả ngắn 1 bug nghiêm trọng bạn tìm thấy kèm steps to reproduce, 2) Đoạn email gửi PM giải thích tại sao đây là Blocker và đề xuất hướng xử lý trước giờ release.",
        contextScenarioVi: "Tình huống tổng hợp cuối tuần: Đơn hàng bị trừ tiền 2 lần khi bấm đúp vào nút Checkout.",
        targetLength: "6-8 câu (~100-120 từ)",
        recommendedKeywords: ["reproduce consistently", "expected behavior", "actual result", "release blocker", "compromise"],
        sentenceStarterEn: "Subject: [CRITICAL BUG] Double charge on Checkout flow - Action Required",
        guidelinesVi: [
          "Dùng lại ít nhất 3 từ vựng đã học trong tuần",
          "Có tiêu đề email chuyên nghiệp",
          "Liệt kê các bước ngắn gọn và nêu đề xuất giải pháp"
        ]
      }
    }
  },

  "w2_T2": {
    weekNumber: 2,
    dayCode: "T2",
    dayName: "Thứ Hai",
    themeTitle: "TUẦN 2: MEETING & AGILE CEREMONY",
    lessonTitle: "Daily standup (hôm qua làm gì, hôm nay làm gì, blocker gì)",
    vocabulary: [
      {
        word: "standup update",
        ipa: "/ˈstænd.ʌp ˈʌp.deɪt/",
        partOfSpeech: "noun phrase",
        meaningVi: "Phần báo cáo cập nhật trong họp standup",
        exampleEn: "Keep your standup update under two minutes to respect everyone's time.",
        exampleVi: "Giữ phần cập nhật standup dưới hai phút để tôn trọng thời gian của mọi người.",
        tip: "Cấu trúc kinh điển: Yesterday I..., Today I will..., I have [no] blockers."
      },
      {
        word: "blocker / impediment",
        ipa: "/ˈblɒk.ər / ɪmˈped.ɪ.mənt/",
        partOfSpeech: "noun",
        meaningVi: "Chướng ngại vật / điều gây tắc nghẽn công việc",
        exampleEn: "My only blocker is waiting for the test API credentials from the 3rd-party vendor.",
        exampleVi: "Blocker duy nhất của tôi là đang chờ thông tin tài khoản test API từ bên thứ ba.",
        tip: "Nêu rõ ai có thể giúp bạn gỡ blocker thay vì chỉ than thở."
      },
      {
        word: "on track",
        ipa: "/ɒn træk/",
        partOfSpeech: "idiom / phrase",
        meaningVi: "Đang đúng tiến độ dự kiến",
        exampleEn: "Regression testing is currently on track for sign-off by Thursday afternoon.",
        exampleVi: "Kiểm thử hồi quy hiện đang đúng tiến độ để duyệt hoàn tất vào chiều Thứ Năm.",
        tip: "Dùng 'on track' để báo tin vui và 'at risk' khi thấy có nguy cơ trễ."
      },
      {
        word: "take it offline",
        ipa: "/teɪk ɪt ˈɒf.laɪn/",
        partOfSpeech: "phrase",
        meaningVi: "Thảo luận riêng sau cuộc họp",
        exampleEn: "Since this technical detail is specific to payment, let's take it offline after standup.",
        exampleVi: "Vì chi tiết kỹ thuật này liên quan riêng phần thanh toán, hãy để sau standup nói riêng.",
        tip: "Cụm từ vàng giúp cứu vãn cuộc họp standup khi hai người bắt đầu tranh luận sâu."
      }
    ],
    communicationPatterns: [
      {
        patternName: "Cấu trúc 3 câu báo cáo Standup chuẩn chỉ",
        contextVi: "Nói ngắn gọn, súc tích trong 60-90 giây",
        formal: "Yesterday, I completed the regression test suite for the user profile module. Today, I am executing test cases for Stripe payment integration. Currently, I have no blockers.",
        casual: "Yesterday I wrapped up profile regression. Today I'm diving into Stripe payment test cases. All good on my end, no blockers!",
        usageNoteVi: "Luôn chốt bằng trạng thái Blocker để Scrum Master/PM nắm được."
      }
    ],
    dialogue: [
      {
        speaker: "Scrum Master (Lisa)",
        role: "Scrum Master",
        avatarColor: "bg-amber-600",
        en: "Good morning team. Let's start our daily standup. Alex, how are things on the QA side?",
        vi: "Chào buổi sáng cả team. Bắt đầu daily standup nhé. Alex, tình hình bên QA thế nào rồi?"
      },
      {
        speaker: "Alex (QC)",
        role: "QC Engineer",
        avatarColor: "bg-emerald-500",
        en: "Morning everyone. Yesterday, I verified 5 bug fixes on Staging and created automation test scripts for the login flow.",
        vi: "Chào mọi người. Hôm qua tôi đã verify 5 bug fix trên Staging và viết kịch bản test tự động cho luồng login."
      },
      {
        speaker: "Alex (QC)",
        role: "QC Engineer",
        avatarColor: "bg-emerald-500",
        en: "Today, I will focus on exploratory testing for the new shopping cart feature.",
        vi: "Hôm nay, tôi sẽ tập trung vào exploratory testing (kiểm thử khám phá) cho tính năng giỏ hàng mới."
      },
      {
        speaker: "Alex (QC)",
        role: "QC Engineer",
        avatarColor: "bg-emerald-500",
        en: "As for blockers, I'm blocked on testing notification emails because the SMTP test server is down. David, could you assist with that?",
        vi: "Về blocker, tôi đang bị kẹt ở phần test email thông báo vì server test SMTP đang bị sập. David có thể hỗ trợ tôi việc này không?"
      },
      {
        speaker: "David (Dev)",
        role: "Backend Dev",
        avatarColor: "bg-blue-600",
        en: "Sure thing Alex, let's take it offline right after standup and I'll restart the container for you.",
        vi: "Chắc chắn rồi Alex, xong standup mình trao đổi riêng luôn nhé, tôi sẽ restart container cho bạn."
      }
    ],
    exercises: [
      {
        id: "ex_w2t2_1",
        type: "multiple_choice",
        typeLabelVi: "Trắc nghiệm Agile",
        instructionVi: "Chọn câu nói chuẩn khi cuộc tranh luận kỹ thuật kéo dài",
        question: "Khi hai thành viên tranh luận chi tiết kỹ thuật quá 3 phút trong standup, câu nào thích hợp nhất để Scrum Master/QC can thiệp lịch sự?",
        options: [
          "Please stop talking, you are wasting our sprint time!",
          "Let's take this discussion offline after standup so the rest of the team can drop off.",
          "I will leave the meeting now.",
          "Nobody cares about that detail."
        ],
        correctAnswer: 1,
        explanationVi: "'Let's take this offline' là thành ngữ Agile tiêu chuẩn giúp giữ cuộc họp ngắn gọn dưới 15 phút."
      },
      {
        id: "ex_w2t2_2",
        type: "word_order",
        typeLabelVi: "Sắp xếp từ thành câu đúng",
        instructionVi: "Sắp xếp câu báo cáo tình trạng tiến độ",
        question: "Sắp xếp câu: 'Kiểm thử hồi quy hiện đang đúng tiến độ để release vào Thứ Năm.'",
        scrambledWords: ["on", "Regression", "release.", "for", "track", "Thursday", "is", "testing"],
        correctAnswer: "Regression testing is on track for Thursday release.",
        explanationVi: "Thành ngữ 'on track for [time/event]' nghĩa là đang đúng tiến độ dự kiến."
      },
      {
        id: "ex_w2t2_3",
        type: "error_correction",
        typeLabelVi: "Sửa lỗi sai thường gặp",
        instructionVi: "Sửa lỗi ngữ pháp thường gặp khi báo cáo hôm qua làm gì",
        question: "Sửa câu sai: 'Yesterday I verify 4 bugs and write test cases.'",
        incorrectSentence: "Yesterday I verify 4 bugs and write test cases.",
        correctedSentence: "Yesterday I verified 4 bugs and wrote test cases.",
        correctAnswer: "Yesterday I verified 4 bugs and wrote test cases.",
        explanationVi: "Khi nói về việc 'Yesterday' trong standup, bắt buộc phải dùng thì quá khứ đơn (Past Simple): verified, wrote, tested, executed."
      }
    ],
    roleplayScenario: {
      scenarioVi: "Đến lượt bạn báo cáo Daily Standup. Hôm qua bạn test xong module hóa đơn, hôm nay test module thanh toán, nhưng bạn đang bị kẹt vì chưa có tài khoản test sandbox của Paypal.",
      partnerRole: "Scrum Master",
      partnerMessageEn: "Alex, you're up next. What's your update for today?",
      partnerMessageVi: "Alex ơi, tới lượt bạn rồi. Cập nhật hôm nay của bạn là gì?",
      promptTaskVi: "Báo cáo theo 3 ý: Hôm qua làm gì, hôm nay làm gì, và nêu rõ blocker cần tài khoản sandbox PayPal từ Tech Lead.",
      sampleAnswerFormal: "Yesterday, I finalized testing for the invoicing module. Today, my goal is to start the payment integration tests. However, I have a blocker: I am still missing the PayPal sandbox credentials. Could the Tech Lead please grant me access?",
      sampleAnswerCasual: "Morning all! Yesterday I finished up the invoicing module. Today I'm jumping into PayPal payments. One quick blocker though: I still need PayPal sandbox credentials. Could anyone help me get set up?"
    },
    shortWritingTask: {
      titleVi: "Viết phần cập nhật Daily Standup dạng tin nhắn Slack",
      promptVi: "Viết một tin nhắn ngắn (3-4 dòng) post lên channel #standup của team cập nhật: Hôm qua hoàn thành việc gì, hôm nay dự định làm gì, và có blocker gì không.",
      contextScenarioVi: "Team của bạn làm việc remote và yêu cầu post tin nhắn cập nhật standup trước 9:30 AM mỗi sáng.",
      targetLength: "3-5 câu (~50-80 từ)",
      recommendedKeywords: ["Yesterday I verified", "Today I will focus on", "No blockers", "on track", "test execution"],
      sentenceStarterEn: "Morning team! Here is my QA update for today:",
      guidelinesVi: [
        "Sử dụng bullet points hoặc chia 3 phần rõ ràng (Yesterday, Today, Blockers)",
        "Động từ thì quá khứ ở phần Yesterday, tương lai ở phần Today",
        "Nêu rõ tên feature hoặc ticket ID"
      ]
    },
    dailyTip: {
      titleVi: "Bí quyết báo cáo Standup ấn tượng",
      adviceVi: "Đừng đọc lại toàn bộ tên ticket Jira từng con số một. Đồng đội muốn nghe 'Giá trị công việc' (Value delivered): bạn đã test xong phần nào, rủi ro lớn nhất hôm nay là gì, và có ai đang chặn đường bạn không.",
      keyTakeawayEn: "Focus on progress, risk, and impediments, not just ticket numbers."
    }
  },
  "w8_T2": {
    weekNumber: 8,
    dayCode: "T2",
    dayName: "Thứ Hai",
    themeTitle: "TUẦN 8: GIAO TIẾP HÀNG NGÀY & SMALL TALK",
    lessonTitle: "Chào hỏi đầu tuần & Phá băng ('How was your weekend?', 'How's it going?')",
    vocabulary: [
      {
        word: "catch up",
        ipa: "/kætʃ ʌp/",
        partOfSpeech: "phrasal verb",
        meaningVi: "Hàn huyên, cập nhật tình hình dạo này với nhau",
        exampleEn: "Let's grab a coffee during break to catch up!",
        exampleVi: "Lúc nghỉ giải lao đi làm cốc cà phê rồi hàn huyên nhé!",
        tip: "Dùng rất tự nhiên khi gặp lại đồng nghiệp sau kỳ nghỉ hoặc lâu ngày không nói chuyện."
      },
      {
        word: "low-key",
        ipa: "/ˌləʊˈkiː/",
        partOfSpeech: "adjective",
        meaningVi: "Bình yên, nhẹ nhàng, không ồn ào",
        exampleEn: "My weekend was pretty low-key. I just stayed home and watched movies.",
        exampleVi: "Cuối tuần của tôi khá nhẹ nhàng bình yên. Tôi chỉ ở nhà xem phim thôi.",
        tip: "Cụm từ người bản xứ dùng cực kỳ nhiều khi được hỏi 'How was your weekend?'."
      },
      {
        word: "hit the spot",
        ipa: "/hɪt ðə spɒt/",
        partOfSpeech: "idiom",
        meaningVi: "Rất đúng ý / ngon tuyệt (thức ăn, đồ uống)",
        exampleEn: "This iced coffee really hits the spot on a hot Monday morning.",
        exampleVi: "Cốc cà phê đá này thực sự quá đã vào buổi sáng thứ Hai nóng bức.",
        tip: "Dùng để khen đồ ăn, thức uống hoặc một khoảng nghỉ giải lao đúng lúc."
      },
      {
        word: "how's everything going?",
        ipa: "/haʊz ˈev.ri.θɪŋ ˈɡəʊ.ɪŋ/",
        partOfSpeech: "phrase",
        meaningVi: "Dạo này mọi thứ thế nào rồi?",
        exampleEn: "Hey Tom! How's everything going with you this week?",
        exampleVi: "Chào Tom! Tuần này mọi việc bên bạn thế nào rồi?",
        tip: "Mẫu câu chào hỏi thân thiện, mở hơn nhiều so với 'How are you?' đơn thuần."
      },
      {
        word: "get back into the swing of things",
        ipa: "/ɡet bæk ˈɪn.tuː ðə swɪŋ əv θɪŋz/",
        partOfSpeech: "idiom",
        meaningVi: "Bắt nhịp lại với guồng quay công việc",
        exampleEn: "It always takes me a little while to get back into the swing of things on Monday morning.",
        exampleVi: "Sáng thứ Hai nào tôi cũng mất một chút thời gian để bắt nhịp lại với guồng công việc.",
        tip: "Cách nói cực kỳ dí dỏm và đồng cảm khi trò chuyện đầu tuần."
      },
      {
        word: "hang in there",
        ipa: "/hæŋ ɪn ðeər/",
        partOfSpeech: "phrase",
        meaningVi: "Cố gắng lên nhé! Ráng lên!",
        exampleEn: "It looks like a busy sprint ahead, but hang in there!",
        exampleVi: "Sprint này có vẻ bận rộn đấy, nhưng ráng lên nhé!",
        tip: "Câu động viên chân thành giữa đồng nghiệp và bạn bè."
      }
    ],
    patterns: [
      {
        context: "Hỏi thăm kỳ nghỉ cuối tuần của đồng nghiệp / bạn bè",
        formalEn: "Good morning. I hope you had a pleasant and restful weekend.",
        casualEn: "Morning! How was your weekend? Do anything fun or just relax?",
        vietnameseMeaning: "Chào buổi sáng! Cuối tuần của bạn thế nào? Có đi đâu chơi hay chỉ nghỉ ngơi ở nhà?",
        breakdownVi: "Trong văn phòng hiện đại, bản Casual thân thiện và tạo cảm giác gần gũi hơn rất nhiều."
      },
      {
        context: "Trả lời khi người khác hỏi thăm cuối tuần của mình",
        formalEn: "It was great, thank you. I spent some quality time with my family.",
        casualEn: "It was really nice! Pretty chill, mostly slept in and went to a cafe. How about yours?",
        vietnameseMeaning: "Cuối tuần thích lắm! Khá thong thả, chủ yếu là ngủ nướng và đi cà phê. Còn bạn thì sao?",
        breakdownVi: "Luôn kèm câu hỏi ngược lại 'How about yours?' hoặc 'How was yours?' để duy trì cuộc hội thoại."
      },
      {
        context: "Mở lời rủ đi uống cà phê hoặc ăn trưa",
        formalEn: "Would you be interested in joining us for lunch today?",
        casualEn: "Hey, a few of us are grabbing coffee downstairs. Wanna come along?",
        vietnameseMeaning: "Ê, mấy anh em đang xuống lầu mua cà phê này. Có muốn đi cùng không?",
        breakdownVi: "'Wanna come along?' hoặc 'Wanna join?' là cách rủ rê cực kỳ tự nhiên trong công ty."
      }
    ],
    dialogue: {
      titleVi: "Trò chuyện đầu tuần tại góc pha cà phê (Coffee Corner)",
      descriptionVi: "Cuộc trò chuyện giữa bạn (QC) và Alex (đồng nghiệp) vào sáng thứ Hai.",
      lines: [
        {
          speaker: "Alex (Colleague)",
          roleTag: "Colleague",
          textEn: "Morning! You look ready for the week. How was your weekend?",
          textVi: "Chào buổi sáng! Trông bạn có vẻ sẵn sàng cho tuần mới rồi đấy. Cuối tuần vừa rồi thế nào?"
        },
        {
          speaker: "You (QC)",
          roleTag: "You",
          textEn: "Morning Alex! It was pretty chill, actually. I caught up on some sleep and tried a new coffee shop nearby. How about yours?",
          textVi: "Chào Alex! Cũng khá thư thả. Mình tranh thủ ngủ bù và đi thử một quán cà phê mới gần nhà. Còn bạn thì sao?"
        },
        {
          speaker: "Alex (Colleague)",
          roleTag: "Colleague",
          textEn: "Oh, mine was super hectic! My family and I drove out to the countryside. Fun, but exhausting!",
          textVi: "Ôi, của mình thì bận rộn dã man! Cả nhà mình lái xe về quê chơi. Vui thật nhưng mà mệt nhoài!"
        },
        {
          speaker: "You (QC)",
          roleTag: "You",
          textEn: "Haha, I know that feeling. A trip with family is always memorable though! Are you guys grabbing lunch together today?",
          textVi: "Haha, mình hiểu cảm giác đó. Nhưng đi chơi với gia đình lúc nào cũng đáng nhớ! Trưa nay mọi người có đi ăn cùng nhau không?"
        },
        {
          speaker: "Alex (Colleague)",
          roleTag: "Colleague",
          textEn: "Definitely! We're thinking of that noodle place across the street at 12:00. Wanna join us?",
          textVi: "Chắc chắn rồi! Bọn mình định tầm 12h qua quán bún đối diện đường. Đi cùng luôn nhé?"
        },
        {
          speaker: "You (QC)",
          roleTag: "You",
          textEn: "Sounds awesome, count me in! See you at 12 then.",
          textVi: "Tuyệt quá, tính mình một suất nhé! Hẹn gặp bạn lúc 12h."
        }
      ]
    },
    exercises: [
      {
        id: "ex_w8_1",
        type: "multiple_choice",
        promptVi: "Đồng nghiệp hỏi: 'How was your weekend?' Bạn muốn nói cuối tuần của mình rất bình yên, nhẹ nhàng và ở nhà nghỉ ngơi. Câu nào tự nhiên nhất?",
        options: [
          "It was very quiet because I was lonely.",
          "It was pretty low-key, just stayed home and recharged.",
          "My weekend is not very active.",
          "I have no weekend."
        ],
        correctAnswer: "It was pretty low-key, just stayed home and recharged.",
        explanationVi: "'Pretty low-key' là cách nói tự nhiên của người bản xứ để chỉ một kỳ nghỉ nhẹ nhàng, không tiệc tùng ồn ào; 'recharged' nghĩa là nạp lại năng lượng."
      },
      {
        id: "ex_w8_2",
        type: "word_order",
        promptVi: "Sắp xếp các từ sau thành câu rủ đồng nghiệp đi ăn trưa tự nhiên:",
        scrambledWords: ["lunch", "Wanna", "together", "grab", "today?"],
        correctSentence: "Wanna grab lunch together today?",
        explanationVi: "'Wanna grab lunch...?' là cụm từ rủ ăn trưa phổ biến và thân mật nhất ở môi trường công sở quốc tế."
      },
      {
        id: "ex_w8_3",
        type: "error_correction",
        promptVi: "Tìm và sửa lỗi sai trong câu: 'I am agree with your suggestion, count in me!'",
        incorrectSentence: "I am agree with your suggestion, count in me!",
        correctedSentence: "I agree with your suggestion, count me in!",
        explanationVi: "Trong tiếng Anh: 'agree' là động từ (dùng 'I agree', không dùng 'I am agree'). Cụm từ rủ thêm mình vào nhóm là 'count me in' (không phải 'count in me')."
      }
    ],
    roleplayPrompt: {
      partnerName: "Alex (Friendly Colleague)",
      partnerRole: "Colleague",
      situationVi: "Đồng nghiệp Alex vừa đi ngang qua bàn bạn và rủ bạn đi uống cà phê giải lao 10 phút.",
      starterLineEn: "Hey! You've been staring at that screen for hours. Wanna take a 5-minute coffee break downstairs with me?",
      starterLineVi: "Ê! Bạn ngồi dán mắt vào màn hình mấy tiếng rồi đấy. Xuống lầu làm ly cà phê giải lao 5 phút với mình không?",
      sampleAnswerFormal: "Thank you for the invitation. I would appreciate a quick break to refresh.",
      sampleAnswerCasual: "That would be awesome! My eyes really need a break. Let's go!"
    },
    shortWritingTask: {
      titleVi: "Viết tin nhắn Small Talk rủ bạn bè/đồng nghiệp đi ăn trưa",
      promptVi: "Viết 1 tin nhắn ngắn (3-4 câu) gửi vào nhóm chat rủ mọi người đi ăn trưa: gợi ý một quán ăn ngon hoặc hỏi xem trưa nay mọi người muốn ăn gì.",
      contextScenarioVi: "Bây giờ là 11:45 AM, bạn muốn rủ các bạn cùng team hoặc đồng nghiệp thân thiết đi ăn trưa cùng.",
      targetLength: "3-5 câu (~40-70 từ)",
      recommendedKeywords: ["grab lunch", "craving for", "across the street", "wanna join", "count me in"],
      sentenceStarterEn: "Hey everyone! It's almost lunch time.",
      guidelinesVi: [
        "Dùng giọng văn thân thiện, vui vẻ (casual tone)",
        "Gợi ý thời gian và địa điểm cụ thể",
        "Có câu hỏi chốt để mọi người trả lời ('Who's in?', 'Let me know!')"
      ]
    },
    dailyTip: {
      titleVi: "Nghệ thuật Small Talk: Công thức 'Answer + Add Info + Ask Back'",
      adviceVi: "Khi ai đó hỏi thăm bạn một câu xã giao (như 'How are you?' hoặc 'How was your weekend?'), đừng chỉ trả lời 'Good' rồi im lặng. Hãy áp dụng công thức 3 bước: 1. Trả lời ngắn ('Pretty good!') $\rightarrow$ 2. Thêm 1 chi tiết nhỏ ('Tried a new coffee place') $\rightarrow$ 3. Hỏi ngược lại ('How about you?'). Đây là bí quyết giúp bạn luôn giao tiếp duyên dáng và kết nối mọi người dễ dàng!",
      keyTakeawayEn: "Keep conversations alive with: Answer + Add a detail + Ask back."
    }
  },
  "w9_T2": {
    weekNumber: 9,
    dayCode: "T2",
    dayName: "Thứ Hai",
    themeTitle: "TUẦN 9: NGHỆ THUẬT KỂ CHUYỆN (STORYTELLING)",
    lessonTitle: "Mở đầu câu chuyện thu hút ('Guess what happened?', 'You won't believe this...')",
    vocabulary: [
      {
        word: "out of the blue",
        ipa: "/aʊt əv ðə bluː/",
        partOfSpeech: "idiom",
        meaningVi: "Bất ngờ, từ trên trời rơi xuống, không báo trước",
        exampleEn: "Out of the blue, my old college friend called me yesterday!",
        exampleVi: "Tự nhiên bất thình lình, hôm qua đứa bạn đại học cũ gọi cho tôi!",
        tip: "Dùng để tạo sự kịch tính và bất ngờ khi mở đầu một câu chuyện."
      },
      {
        word: "you won't believe this",
        ipa: "/juː wəʊnt bɪˈliːv ðɪs/",
        partOfSpeech: "phrase",
        meaningVi: "Bạn sẽ không tin nổi chuyện này đâu",
        exampleEn: "You won't believe what happened on my way to work today.",
        exampleVi: "Bạn sẽ không tin nổi chuyện gì đã xảy ra trên đường tôi đi làm hôm nay đâu.",
        tip: "Mẫu câu 'câu view' cực kỳ hiệu quả khi muốn mọi người chú ý lắng nghe."
      },
      {
        word: "long story short",
        ipa: "/lɒŋ ˈstɔː.ri ʃɔːt/",
        partOfSpeech: "idiom",
        meaningVi: "Tóm lại là / Nói ngắn gọn là",
        exampleEn: "Long story short, we ended up finding the cutest cafe in the alley.",
        exampleVi: "Tóm lại là cuối cùng bọn mình lại tìm ra một quán cà phê siêu xinh trong ngõ.",
        tip: "Dùng khi bạn muốn bỏ qua các chi tiết rườm rà và đi thẳng vào kết quả của câu chuyện."
      },
      {
        word: "turn out",
        ipa: "/tɜːn aʊt/",
        partOfSpeech: "phrasal verb",
        meaningVi: "Hóa ra là / Kết cục là",
        exampleEn: "It turned out that the person sitting next to me was also a software tester!",
        exampleVi: "Hóa ra là người ngồi cạnh tôi cũng là một tester phần mềm!",
        tip: "Dùng để diễn tả một sự thật bất ngờ được hé lộ."
      },
      {
        word: "no way!",
        ipa: "/nəʊ weɪ/",
        partOfSpeech: "exclamation",
        meaningVi: "Thật á?! Không thể nào!",
        exampleEn: "No way! Did they really give you a free upgrade?",
        exampleVi: "Thật á?! Họ nâng hạng phòng miễn phí cho bạn luôn á?",
        tip: "Câu phản hồi thể hiện sự ngạc nhiên và hứng thú khi nghe người khác kể chuyện."
      }
    ],
    patterns: [
      {
        context: "Mở đầu một câu chuyện vui hoặc bất ngờ",
        formalEn: "I would like to share an interesting experience that occurred recently.",
        casualEn: "Guess what happened yesterday? You're not gonna believe this!",
        vietnameseMeaning: "Đoán xem hôm qua có chuyện gì? Bạn sẽ không tin nổi đâu!",
        breakdownVi: "Dùng khi bắt đầu kể một câu chuyện cá nhân vui vẻ trong giờ giải lao."
      },
      {
        context: "Lắng nghe và khuyến khích người khác kể tiếp",
        formalEn: "Please proceed, I am very interested to hear the rest.",
        casualEn: "Really? What happened next? Don't leave me hanging!",
        vietnameseMeaning: "Thật á? Rồi sao nữa? Kể tiếp đi đừng làm người ta tò mò chứ!",
        breakdownVi: "'Don't leave me hanging!' nghĩa là 'đừng bỏ lửng câu chuyện làm tôi tò mò'."
      }
    ],
    dialogue: {
      titleVi: "Kể chuyện một sự cố thú vị trên đường đi làm",
      descriptionVi: "Bạn đang chia sẻ một câu chuyện nhỏ hài hước với đồng nghiệp.",
      lines: [
        {
          speaker: "You",
          roleTag: "You",
          textEn: "Hey guys, you won't believe what happened on my way here this morning!",
          textVi: "Mọi người ơi, không thể tin nổi sáng nay trên đường đến đây mình gặp chuyện gì đâu!"
        },
        {
          speaker: "Jessica (Colleague)",
          roleTag: "Colleague",
          textEn: "Haha, what happened? Traffic again?",
          textVi: "Haha chuyện gì thế? Lại bị kẹt xe à?"
        },
        {
          speaker: "You",
          roleTag: "You",
          textEn: "Worse! I thought I left my wallet at home, but when I reached the bakery, a cute golden retriever was holding my lost keychain in its mouth!",
          textVi: "Còn hơn thế! Mình tưởng làm rơi ví ở nhà, nhưng lúc đến tiệm bánh thì có một chú chó Golden dễ thương đang ngậm chùm chìa khóa bị rơi của mình trong miệng!"
        },
        {
          speaker: "Jessica (Colleague)",
          roleTag: "Colleague",
          textEn: "No way! That is so adorable! Did you take a picture?",
          textVi: "Thật á?! Đáng yêu quá vậy! Bạn có chụp ảnh lại không?"
        },
        {
          speaker: "You",
          roleTag: "You",
          textEn: "I did! Here, look at this. The owner was super nice too. Totally made my day!",
          textVi: "Có chứ! Đây, xem này. Chủ chú chó cũng siêu dễ thương. Đúng là làm cả ngày của mình vui lên hẳn!"
        }
      ]
    },
    exercises: [
      {
        id: "ex_w9_1",
        type: "multiple_choice",
        promptVi: "Khi bạn muốn kết thúc một câu chuyện dài và đi vào điểm mấu chốt, cụm từ nào tự nhiên nhất?",
        options: [
          "To tell you the end",
          "Long story short",
          "Short narrative",
          "Cut the talking"
        ],
        correctAnswer: "Long story short",
        explanationVi: "'Long story short' là thành ngữ kinh điển của người bản xứ có nghĩa 'nói ngắn gọn là / tóm lại là'."
      }
    ],
    roleplayPrompt: {
      partnerName: "Jessica (Friendly Colleague)",
      partnerRole: "Colleague",
      situationVi: "Jessica đang tò mò về chuyến đi nghỉ mát cuối tuần vừa rồi của bạn.",
      starterLineEn: "I heard you went camping by the lake last weekend! How was the trip?",
      starterLineVi: "Nghe nói cuối tuần rồi bạn đi cắm trại bên hồ à! Chuyến đi thế nào thế?",
      sampleAnswerFormal: "The trip was very scenic and refreshing. We enjoyed the natural surroundings.",
      sampleAnswerCasual: "Oh, it was fantastic! The weather was perfect and we made a campfire under the stars. You should definitely check it out sometime!"
    },
    shortWritingTask: {
      titleVi: "Kể lại một trải nghiệm vui hoặc đáng nhớ trong 3-5 câu",
      promptVi: "Viết một đoạn văn ngắn (3-5 câu) kể lại một kỷ niệm vui, một sự cố hài hước hoặc một điều bất ngờ vừa xảy ra gần đây với bạn.",
      contextScenarioVi: "Bạn chia sẻ một mẩu chuyện nhỏ trên group chat của team hoặc trò chuyện với bạn bè.",
      targetLength: "3-5 câu (~50-80 từ)",
      recommendedKeywords: ["Out of the blue", "You won't believe", "Turned out", "Made my day", "Hilarious"],
      sentenceStarterEn: "You won't believe what happened recently...",
      guidelinesVi: [
        "Có câu mở đầu gợi tò mò (Hook)",
        "Sử dụng từ nối diễn tả trình tự thời gian (Suddenly, Then, Finally, Long story short)",
        "Kết lại bằng cảm xúc của bạn (It made my day, We couldn't stop laughing)"
      ]
    },
    dailyTip: {
      titleVi: "Bí quyết kể chuyện cuốn hút: Dùng cảm thán từ (Reaction Words)",
      adviceVi: "Để người nghe hào hứng, hãy dùng các từ thể hiện cảm xúc sống động như: 'Suddenly', 'Out of nowhere', 'To my surprise'. Và khi là người nghe, hãy luôn đệm các từ như 'Really?', 'No way!', 'That's insane!', 'I love that!'. Đó chính là chìa khóa kết nối con người với con người!",
      keyTakeawayEn: "Active listening and vibrant reactions turn simple chats into meaningful connections."
    }
  }
};

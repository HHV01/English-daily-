import "dotenv/config";
import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Helper to get GoogleGenAI client from request header, body, or server env
function getAiClient(req: express.Request): GoogleGenAI {
  const customKey = (req.headers['x-gemini-api-key'] as string) || req.body?.customApiKey || req.body?.learnerProfile?.customApiKey;
  const apiKey = (customKey && customKey.trim()) || process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    throw new Error("MISSING_API_KEY");
  }
  return new GoogleGenAI({
    apiKey: apiKey.trim(),
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Helper to format Gemini API errors into actionable, easy-to-understand Vietnamese explanations
function formatGeminiError(error: any, req?: express.Request): string {
  const customKey = req ? (req.headers['x-gemini-api-key'] as string) || req.body?.customApiKey || req.body?.learnerProfile?.customApiKey : null;
  const hasKey = Boolean((customKey && customKey.trim()) || process.env.GEMINI_API_KEY);
  if (!hasKey || error?.message === "MISSING_API_KEY") {
    return "Chưa cấu hình GEMINI_API_KEY. Vui lòng bấm vào nút 🔑 'Cài đặt API Key' ở góc trên cùng trang web để dán mã key của bạn!";
  }
  const msg = error?.message || String(error);
  if (msg.includes("API_KEY_INVALID") || msg.includes("API key not valid") || msg.includes("forbidden") || msg.includes("403") || msg.includes("leaked")) {
    return "Mã GEMINI_API_KEY không hợp lệ hoặc đã bị vô hiệu hóa. Vui lòng bấm vào nút 🔑 'Cài đặt API Key' để dán mã Key mới từ Google AI Studio (https://aistudio.google.com/app/apikey).";
  }
  if (msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED") || msg.includes("Quota exceeded") || msg.includes("rate limit")) {
    return "Đã đạt giới hạn số lượt gọi Gemini API (Rate Limit / Quota). Vui lòng đợi khoảng 1 phút rồi nhấn Thử lại.";
  }
  if (msg.includes("fetch failed") || msg.includes("ECONNREFUSED") || msg.includes("ETIMEDOUT") || msg.includes("network")) {
    return "Lỗi kết nối mạng giữa máy chủ và dịch vụ Google Gemini AI. Vui lòng kiểm tra kết nối mạng và thử lại sau ít giây.";
  }
  return `Lỗi từ hệ thống AI: ${msg}`;
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", hasApiKey: Boolean(process.env.GEMINI_API_KEY) });
});

// Generate dynamic lesson according to prompt specifications
app.post("/api/gemini/generate-lesson", async (req, res) => {
  try {
    const { learnerProfile, weekNumber, dayName, dayTopic, customContext } = req.body;

    const profileText = `
- Vai trò: ${learnerProfile?.role || "QC/Tester phần mềm"}
- Trình độ tiếng Anh: ${learnerProfile?.level || "Intermediate"}
- Giao tiếp thường xuyên với: ${learnerProfile?.communicatesWith?.join(", ") || "Dev, Team Lead, PM, BA"}
- Công cụ dùng: ${learnerProfile?.tools?.join(", ") || "Jira, Slack, Teams, Email"}
- Loại test hay làm: ${learnerProfile?.testTypes?.join(", ") || "Manual, Automation, API"}
- Làm việc với khách hàng nước ngoài: ${learnerProfile?.worksWithForeignClients ? "Có" : "Không"}
${customContext ? `- Tình huống đặc thù bổ sung: ${customContext}` : ""}
    `.trim();

    const systemPrompt = `
Bạn là một gia sư tiếng Anh giao tiếp chuyên nghiệp, hỗ trợ người học luyện tiếng Anh giao tiếp hằng ngày toàn diện:
- Vừa vững giao tiếp chuyên môn công sở/công nghệ phần mềm (QC/Dev/PM/BA).
- Vừa tự tin giao tiếp đời sống thường nhật, kết nối con người với con người (Small talk, chào hỏi, chuyện trò giờ nghỉ trưa/cà phê, kể chuyện vui, chia sẻ sở thích, bày tỏ cảm xúc, tâm sự đời thường).

BỐI CẢNH NGƯỜI HỌC:
${profileText}

NHIỆM VỤ MỖI NGÀY:
Tạo một bài học ngắn (10-15 phút đọc & thực hành) theo CHỦ ĐỀ CỦA NGÀY được xác định:
- Tuần ${weekNumber || 1}: ${dayName || "Hôm nay"} - ${dayTopic || "Giao tiếp hàng ngày"}

CẤU TRÚC BÀI HỌC:
1. TỪ VỰNG TRONG NGÀY (5-8 từ/cụm từ)
   - Nếu chủ đề kỹ thuật: từ vựng/thuật ngữ QC/Dev thực tế.
   - Nếu chủ đề đời sống/giao tiếp: thành ngữ (idioms), phrasal verbs, từ lóng văn hóa nhẹ nhàng, từ nối kể chuyện (storytelling connectors), mẫu câu đệm phản hồi cảm xúc sống động.
   - Mỗi từ kèm: phát âm (IPA), nghĩa tiếng Việt, 1 câu ví dụ thực tế

2. MẪU CÂU GIAO TIẾP (3-5 mẫu)
   - Câu dùng thực tế đúng chủ đề của ngày
   - Có 2 phiên bản: formal (lịch sự/trang trọng) và casual (thân thiện/tự nhiên/thân mật)

3. HỘI THOẠI MẪU (1 đoạn 6-10 câu)
   - Tình huống đúng chủ đề của ngày (gặp gỡ, tán gẫu, rủ đi ăn trưa, kể chuyện vui, hoặc trao đổi công việc), có bản dịch tiếng Việt bên dưới mỗi câu

4. BÀI TẬP (chọn 3-4 bài thuộc các dạng đa dạng, xoay vòng để không nhàm chán):
   - multiple_choice: Trắc nghiệm chọn từ/câu đúng ngữ cảnh
   - fill_blank: Điền từ vào chỗ trống dùng từ vựng vừa học
   - word_order: Sắp xếp từ xáo trộn thành câu đúng (cung cấp danh sách scrambledWords)
   - error_correction: Sửa lỗi sai trong câu cho sẵn (lỗi người Việt hay mắc khi nói tiếng Anh)
   - quick_translation: Dịch nhanh 1 câu Việt → Anh tình huống thực tế
   KÈM 1 tình huống Roleplay (đối tác/bạn bè/đồng nghiệp nói 1 câu, người học cần phản hồi).
   → Luôn đưa đáp án + giải thích ngắn gọn ngay sau mỗi bài tập.

5. VIẾT NGẮN THEO CHỦ ĐỀ (Short Writing Task):
   - Đưa 1 đề bài viết ngắn (3-5 câu, ~50-80 từ) bám sát chủ đề của ngày:
     + Nếu chủ đề kỹ thuật: Viết bug report, standup update, email báo cáo tiến độ, câu hỏi requirement...
     + Nếu chủ đề đời sống/giao tiếp: Viết tin nhắn rủ ăn trưa/cà phê, kể lại 1 trải nghiệm/sự cố hài hước gần đây, viết lời cảm ơn/động viên bạn bè, chia sẻ kế hoạch cuối tuần...
   - Cung cấp:
     + titleVi, promptVi, contextScenarioVi, targetLength (3-5 câu ~50-80 từ; hoặc 100-120 từ cho bài tổng hợp cuối tuần)
     + sentenceStarterEn: Khung câu gợi ý bắt đầu nếu người học chưa biết bắt đầu từ đâu
     + guidelinesVi: Các lưu ý khi viết
     + recommendedKeywords: Các từ khóa gợi ý nên dùng

6. TIP NGÀY: 1 mẹo về văn hóa giao tiếp công sở hoặc mẹo kết nối con người tự nhiên (công thức small talk, nghệ thuật lắng nghe, cách kể chuyện cuốn hút).

7. ÔN TẬP NGẮN (nếu là cuối tuần/ôn tập):
   - Tổng hợp 5 từ khó nhớ nhất, tóm tắt lời khuyên, đề viết tổng hợp dài hơn.
    `.trim();

    const ai = getAiClient(req);
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Hãy tạo bài học chi tiết cho Tuần ${weekNumber}, ngày ${dayName} với chủ đề: "${dayTopic}". Trả về dữ liệu chuẩn JSON.`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            themeTitle: { type: Type.STRING, description: "Tên chủ đề tuần" },
            lessonTitle: { type: Type.STRING, description: "Tiêu đề bài học hôm nay" },
            dayCode: { type: Type.STRING, description: "T2, T3, T4, T5, T6, T7 hoặc CN" },
            vocabulary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  word: { type: Type.STRING },
                  ipa: { type: Type.STRING },
                  partOfSpeech: { type: Type.STRING },
                  meaningVi: { type: Type.STRING },
                  exampleEn: { type: Type.STRING },
                  exampleVi: { type: Type.STRING },
                  tip: { type: Type.STRING },
                },
                required: ["word", "ipa", "meaningVi", "exampleEn", "exampleVi"],
              },
            },
            communicationPatterns: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  patternName: { type: Type.STRING },
                  contextVi: { type: Type.STRING },
                  formal: { type: Type.STRING },
                  casual: { type: Type.STRING },
                  usageNoteVi: { type: Type.STRING },
                },
                required: ["patternName", "formal", "casual", "usageNoteVi"],
              },
            },
            dialogue: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  speaker: { type: Type.STRING },
                  role: { type: Type.STRING },
                  avatarColor: { type: Type.STRING },
                  en: { type: Type.STRING },
                  vi: { type: Type.STRING },
                },
                required: ["speaker", "role", "en", "vi"],
              },
            },
            exercises: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  type: { type: Type.STRING, description: "multiple_choice | fill_blank | word_order | error_correction | quick_translation" },
                  typeLabelVi: { type: Type.STRING },
                  instructionVi: { type: Type.STRING },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  correctAnswer: { type: Type.STRING },
                  scrambledWords: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  incorrectSentence: { type: Type.STRING },
                  highlightError: { type: Type.STRING },
                  correctedSentence: { type: Type.STRING },
                  vietnamesePrompt: { type: Type.STRING },
                  acceptableAnswersEn: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  explanationVi: { type: Type.STRING },
                },
                required: ["id", "type", "typeLabelVi", "instructionVi", "question", "explanationVi"],
              },
            },
            roleplayScenario: {
              type: Type.OBJECT,
              properties: {
                scenarioVi: { type: Type.STRING },
                partnerRole: { type: Type.STRING },
                partnerMessageEn: { type: Type.STRING },
                partnerMessageVi: { type: Type.STRING },
                promptTaskVi: { type: Type.STRING },
                sampleAnswerFormal: { type: Type.STRING },
                sampleAnswerCasual: { type: Type.STRING },
              },
              required: ["scenarioVi", "partnerRole", "partnerMessageEn", "partnerMessageVi", "promptTaskVi", "sampleAnswerFormal", "sampleAnswerCasual"],
            },
            shortWritingTask: {
              type: Type.OBJECT,
              properties: {
                titleVi: { type: Type.STRING },
                promptVi: { type: Type.STRING },
                contextScenarioVi: { type: Type.STRING },
                targetLength: { type: Type.STRING },
                recommendedKeywords: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                sentenceStarterEn: { type: Type.STRING },
                guidelinesVi: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: ["titleVi", "promptVi", "contextScenarioVi", "targetLength", "sentenceStarterEn", "guidelinesVi"],
            },
            dailyTip: {
              type: Type.OBJECT,
              properties: {
                titleVi: { type: Type.STRING },
                adviceVi: { type: Type.STRING },
                keyTakeawayEn: { type: Type.STRING },
              },
              required: ["titleVi", "adviceVi", "keyTakeawayEn"],
            },
            weekendReview: {
              type: Type.OBJECT,
              properties: {
                keyWords: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                summaryAdviceVi: { type: Type.STRING },
              },
            },
          },
          required: [
            "themeTitle",
            "lessonTitle",
            "vocabulary",
            "communicationPatterns",
            "dialogue",
            "exercises",
            "roleplayScenario",
            "shortWritingTask",
            "dailyTip",
          ],
        },
      },
    });

    const lessonData = JSON.parse(response.text || "{}");
    res.json(lessonData);
  } catch (error: any) {
    console.error("Error generating lesson:", error);
    res.status(500).json({ error: formatGeminiError(error, req) });
  }
});

// Evaluate user's roleplay submission
app.post("/api/gemini/evaluate-roleplay", async (req, res) => {
  try {
    const { learnerProfile, scenario, partnerMessage, userResponse } = req.body;

    const prompt = `
Bạn là gia sư tiếng Anh cao cấp cho Kỹ sư Kiểm thử Phần mềm (QC/QA Engineer).
Người học vừa thực hành trả lời một tình huống thực tế trong công việc tech.

THÔNG TIN NGƯỜI HỌC:
- Trình độ: ${learnerProfile?.level || "Intermediate"}
- Vai trò: QC/QA Engineer

TÌNH HUỐNG:
${scenario || "Giao tiếp với Dev về bug"}

CÂU/YÊU CẦU TỪ PHÍA DEV HOẶC ĐỐI TÁC:
"${partnerMessage || ""}"

CÂU TRẢ LỜI CỦA NGƯỜI HỌC (QC):
"${userResponse || ""}"

NHIỆM VỤ (Đánh giá súc tích, nhanh gọn):
1. Đánh giá 1-100 điểm: Ngữ pháp, Độ tự nhiên, Thái độ.
2. Điểm sáng (1-2 ý ngắn).
3. Sửa lỗi ngữ pháp/từ vựng (nếu có, giải thích ngắn gọn 1 câu).
4. Bản Formal (Jira/Email) & Bản Casual (Slack).
5. Góp ý tone ngắn gọn & Lời khuyên 1 câu.
    `.trim();

    const ai = getAiClient(req);
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
        maxOutputTokens: 1024,
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            verdictVi: { type: Type.STRING },
            strengthsVi: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            grammarFixes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  userPart: { type: Type.STRING },
                  improvedPart: { type: Type.STRING },
                  reasonVi: { type: Type.STRING },
                },
                required: ["userPart", "improvedPart", "reasonVi"],
              },
            },
            formalVersion: { type: Type.STRING },
            casualVersion: { type: Type.STRING },
            toneFeedbackVi: { type: Type.STRING },
            encouragementVi: { type: Type.STRING },
          },
          required: [
            "score",
            "verdictVi",
            "strengthsVi",
            "grammarFixes",
            "formalVersion",
            "casualVersion",
            "toneFeedbackVi",
            "encouragementVi",
          ],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Error evaluating roleplay:", error);
    res.status(500).json({ error: formatGeminiError(error, req) });
  }
});

// Evaluate user's short writing submission
app.post("/api/gemini/evaluate-writing", async (req, res) => {
  try {
    const { learnerProfile, writingTask, userText } = req.body;

    const words = (userText || "").trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    const prompt = `
Bạn là gia sư tiếng Anh giao tiếp chuyên sâu cho Kỹ sư Kiểm thử Phần mềm (QA/QC Engineer).
Người học vừa hoàn thành bài "VIẾT NGẮN THEO CHỦ ĐỀ" (Short Writing Task) trong công việc thực tế.

THÔNG TIN NGƯỜI HỌC:
- Trình độ: ${learnerProfile?.level || "Intermediate"}
- Vai trò: ${learnerProfile?.role || "QC/Tester phần mềm"}

ĐỀ BÀI:
- Tiêu đề: ${writingTask?.titleVi || "Viết ngắn công việc"}
- Yêu cầu: ${writingTask?.promptVi || ""}
- Ngữ cảnh: ${writingTask?.contextScenarioVi || ""}
- Độ dài mục tiêu: ${writingTask?.targetLength || "3-5 câu (~50-80 từ)"}

BÀI VIẾT CỦA NGƯỜI HỌC (QC):
"${userText || ""}"
(Số từ thực tế: ${wordCount} từ)

NHIỆM VỤ CỦA BẠN (theo đúng quy tắc sư phạm):
1. Sửa lỗi ngữ pháp/từ vựng/chính tả:
   - Chỉ rõ từng lỗi cụ thể (original) -> cách sửa chính xác (corrected) -> giải thích ngắn gọn bằng tiếng Việt (explanationVi).
2. Nhận xét về độ tự nhiên (naturalness): Câu văn có trôi chảy, đúng cách người bản xứ/dân Tech hay viết không?
3. Nhận xét về tính phù hợp văn phong công sở (tone & formality): Đã đúng mức độ formal/casual theo bối cảnh (Jira/Email/Slack) chưa?
4. Đưa ra 1 BẢN VIẾT MẪU THAM KHẢO (native-like sample) chuẩn Tech, súc tích, chuyên nghiệp để người học đối chiếu.
5. Chấm điểm:
   - score: Thang điểm 0 - 100
   - rating1to5: Thang điểm 1 - 5 (1: Rất kém, 2: Cần cải thiện nhiều, 3: Tạm ổn, 4: Tốt, 5: Xuất sắc/gần như bản xứ)
6. Đưa ra lời khích lệ ngắn gọn, truyền cảm hứng.
    `.trim();

    const ai = getAiClient(req);
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
        maxOutputTokens: 1024,
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            rating1to5: { type: Type.INTEGER },
            verdictVi: { type: Type.STRING },
            grammarFixes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  original: { type: Type.STRING },
                  corrected: { type: Type.STRING },
                  explanationVi: { type: Type.STRING },
                },
                required: ["original", "corrected", "explanationVi"],
              },
            },
            naturalnessFeedbackVi: { type: Type.STRING },
            toneAndFormalityVi: { type: Type.STRING },
            nativeSampleAnswer: { type: Type.STRING },
            encouragementVi: { type: Type.STRING },
          },
          required: [
            "score",
            "rating1to5",
            "verdictVi",
            "grammarFixes",
            "naturalnessFeedbackVi",
            "toneAndFormalityVi",
            "nativeSampleAnswer",
            "encouragementVi",
          ],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    result.wordCount = wordCount;
    res.json(result);
  } catch (error: any) {
    console.error("Error evaluating short writing:", error);
    res.status(500).json({ error: formatGeminiError(error, req) });
  }
});

// Interactive multi-turn chat roleplay with Dev / PM / BA
app.post("/api/gemini/roleplay-chat", async (req, res) => {
  try {
    const { partnerRole, topic, history, message } = req.body;

    const isCasualRole = partnerRole?.includes("Colleague") || partnerRole?.includes("Teammate") || partnerRole?.includes("Friendly");
    const systemInstruction = `
You are roleplaying as: ${partnerRole || "Senior Backend Developer"}.
Current Topic/Context: ${topic || "Workplace & Daily Conversation"}.

Your demeanor:
${
  isCasualRole
    ? "- Warm, friendly, approachable and supportive friend/colleague.\n- Natural conversational tone with lively reactions ('Really?', 'No way!', 'That sounds awesome!'), asking follow-up questions, sharing relatable thoughts, small talk about life, weekend plans, hobbies, coffee, and food."
    : "- Professional IT workplace persona: Busy, practical, collaborative and appreciative when QC/team gives clear information, logs, or payload details."
}
- Keep responses concise and engaging (2 to 3 sentences maximum), authentic to real-life speaking or Slack/Teams chat.
- Speak in English first.
- At the end of your response, provide a short friendly Vietnamese translation/hint in square brackets [Dịch: ...] to help the learner understand without leaving the roleplay.
    `.trim();

    const formattedContents: any[] = [];
    if (Array.isArray(history)) {
      for (const h of history) {
        formattedContents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }],
        });
      }
    }
    formattedContents.push({
      role: "user",
      parts: [{ text: message || "Hello" }],
    });

    const ai = getAiClient(req);
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.6,
        maxOutputTokens: 350,
      },
    });

    res.json({ reply: response.text || "Got it, let me check the logs." });
  } catch (error: any) {
    console.error("Error in roleplay chat:", error);
    res.status(500).json({ error: formatGeminiError(error, req) });
  }
});

// Setup Vite or Static dist serving
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`QC English Daily server running on port ${PORT}`);
  });
}

start();

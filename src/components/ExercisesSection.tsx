import { useState } from 'react';
import { ExerciseItem, RoleplayScenario, RoleplayEvaluation, LearnerProfile } from '../types';
import {
  CheckCircle,
  XCircle,
  Sparkles,
  Send,
  HelpCircle,
  MessageSquare,
  Award,
  RefreshCw,
  Shuffle,
  AlertTriangle,
  AlertCircle,
  Languages,
  PenTool,
  Volume2
} from 'lucide-react';
import { playAudio } from '../utils/speech';

interface Props {
  exercises: ExerciseItem[];
  roleplayScenario: RoleplayScenario;
  learnerProfile: LearnerProfile;
  lessonTopic: string;
  onOpenLiveChat: () => void;
  onUpdateQuizScore?: (score10: number) => void;
}

export default function ExercisesSection({
  exercises,
  roleplayScenario,
  learnerProfile,
  lessonTopic,
  onOpenLiveChat,
  onUpdateQuizScore,
}: Props) {
  // Exercise interactions state
  // For multiple_choice & fill_blank
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string | number>>({});
  // For word_order: record of current ordered words array
  const [wordOrderState, setWordOrderState] = useState<Record<string, string[]>>({});
  // For quick_translation: user typed text
  const [translationInputs, setTranslationInputs] = useState<Record<string, string>>({});
  // Track submitted/checked exercises
  const [checkedExercises, setCheckedExercises] = useState<Record<string, boolean>>({});

  // Roleplay state
  const [userResponse, setUserResponse] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<RoleplayEvaluation | null>(null);
  const [showSampleAnswers, setShowSampleAnswers] = useState<boolean>(false);
  const [evalError, setEvalError] = useState<string | null>(null);

  // Helper for Multiple choice selection
  const handleSelectChoice = (exId: string, value: string | number) => {
    if (checkedExercises[exId]) return; // already submitted
    setSelectedAnswers((prev) => ({ ...prev, [exId]: value }));
    setCheckedExercises((prev) => ({ ...prev, [exId]: true }));
    calculateAndUpdateScore({ ...selectedAnswers, [exId]: value }, checkedExercises);
  };

  // Word order builder handlers
  const handleToggleWordInOrder = (exId: string, word: string) => {
    if (checkedExercises[exId]) return;
    const current = wordOrderState[exId] || [];
    if (current.includes(word)) {
      setWordOrderState((prev) => ({
        ...prev,
        [exId]: current.filter((w) => w !== word),
      }));
    } else {
      setWordOrderState((prev) => ({
        ...prev,
        [exId]: [...current, word],
      }));
    }
  };

  const handleCheckWordOrder = (ex: ExerciseItem) => {
    setCheckedExercises((prev) => ({ ...prev, [ex.id]: true }));
    calculateAndUpdateScore(selectedAnswers, { ...checkedExercises, [ex.id]: true });
  };

  const handleResetWordOrder = (exId: string) => {
    setWordOrderState((prev) => ({ ...prev, [exId]: [] }));
    setCheckedExercises((prev) => ({ ...prev, [exId]: false }));
  };

  const calculateAndUpdateScore = (
    answers: Record<string, string | number>,
    checked: Record<string, boolean>
  ) => {
    if (!exercises || exercises.length === 0) return;
    let correctCount = 0;
    exercises.forEach((ex) => {
      if (ex.type === 'multiple_choice' || ex.type === 'fill_blank') {
        if (String(answers[ex.id]) === String(ex.correctAnswer)) {
          correctCount += 1;
        }
      } else if (ex.type === 'word_order') {
        const assembled = (wordOrderState[ex.id] || []).join(' ').trim().toLowerCase();
        const expected = String(ex.correctAnswer).trim().toLowerCase();
        if (assembled === expected) {
          correctCount += 1;
        }
      } else if (ex.type === 'error_correction' || ex.type === 'quick_translation') {
        if (checked[ex.id]) {
          correctCount += 1;
        }
      }
    });

    const score10 = Math.round((correctCount / exercises.length) * 10);
    if (onUpdateQuizScore) {
      onUpdateQuizScore(score10);
    }
  };

  // Roleplay evaluation API call
  const handleEvaluateRoleplay = async () => {
    if (!userResponse.trim()) return;

    setIsEvaluating(true);
    setEvalError(null);

    try {
      const res = await fetch('/api/gemini/evaluate-roleplay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(learnerProfile?.customApiKey ? { 'x-gemini-api-key': learnerProfile.customApiKey } : {}),
        },
        body: JSON.stringify({
          learnerProfile,
          scenario: roleplayScenario.scenarioVi,
          partnerMessage: roleplayScenario.partnerMessageEn,
          userResponse: userResponse.trim(),
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || errData.message || `Lỗi máy chủ (Mã lỗi HTTP ${res.status})`);
      }

      const data: RoleplayEvaluation = await res.json();
      setEvaluation(data);
    } catch (err: any) {
      console.error(err);
      setEvalError(err.message || 'Lỗi khi kết nối với hệ thống chấm bài AI');
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
            4
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Bài Tập Đa Dạng & Roleplay Thực Tế</h2>
            <p className="text-xs text-slate-500">
              3-4 dạng bài tập xoay vòng (trắc nghiệm, điền từ, word order, sửa lỗi, dịch) + phản hồi dev/PM
            </p>
          </div>
        </div>
      </div>

      {/* Exercises List */}
      <div className="space-y-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          Phần A: Luyện tập các dạng bài ({exercises?.length || 0} bài tập)
        </h3>

        <div className="space-y-5">
          {exercises?.map((ex, idx) => {
            const isChecked = checkedExercises[ex.id];

            return (
              <div
                key={ex.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3.5 transition-all"
              >
                {/* Header of Exercise */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-white border border-slate-200 text-slate-700">
                      {ex.typeLabelVi}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 italic">{ex.instructionVi}</span>
                </div>

                {/* Prompt Question */}
                <div className="text-sm font-medium text-slate-800 leading-relaxed">
                  {ex.question}
                </div>

                {/* Render by Type: MULTIPLE CHOICE or FILL BLANK */}
                {(ex.type === 'multiple_choice' || ex.type === 'fill_blank') && ex.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {ex.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[ex.id] === optIdx;
                      const isCorrect = Number(ex.correctAnswer) === optIdx;

                      let btnStyle = 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700';
                      if (isChecked) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-800 font-semibold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-rose-50 border-rose-300 text-rose-800 line-through';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-blue-50 border-blue-400 text-blue-800 font-semibold';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isChecked}
                          onClick={() => handleSelectChoice(ex.id, optIdx)}
                          className={`p-3 rounded-xl border text-left text-xs sm:text-sm flex items-start gap-2 transition-all ${btnStyle}`}
                        >
                          <span className="w-5 h-5 rounded-full bg-white/80 border border-slate-300 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="flex-1 leading-snug">{opt}</span>
                          {isChecked && isCorrect && (
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          )}
                          {isChecked && isSelected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Render by Type: WORD ORDER (Sắp xếp từ thành câu đúng) */}
                {ex.type === 'word_order' && ex.scrambledWords && (
                  <div className="space-y-3 pt-1">
                    {/* Selected words drop area */}
                    <div className="min-h-[44px] p-2.5 bg-white rounded-xl border border-dashed border-slate-300 flex flex-wrap gap-1.5 items-center">
                      {(wordOrderState[ex.id] || []).length === 0 ? (
                        <span className="text-xs text-slate-400 italic">
                          Nhấp vào các từ bên dưới để xếp thành câu hoàn chỉnh...
                        </span>
                      ) : (
                        (wordOrderState[ex.id] || []).map((w, wIdx) => (
                          <button
                            key={wIdx}
                            onClick={() => handleToggleWordInOrder(ex.id, w)}
                            disabled={isChecked}
                            className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                            title="Bấm để gỡ từ này"
                          >
                            {w} ×
                          </button>
                        ))
                      )}
                    </div>

                    {/* Word Bank */}
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className="text-xs font-semibold text-slate-500 mr-1">Kho từ:</span>
                      {ex.scrambledWords.map((word, wIdx) => {
                        const isUsed = (wordOrderState[ex.id] || []).includes(word);
                        return (
                          <button
                            key={wIdx}
                            disabled={isUsed || isChecked}
                            onClick={() => handleToggleWordInOrder(ex.id, word)}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                              isUsed
                                ? 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed'
                                : 'bg-white border-slate-200 hover:border-blue-300 text-slate-700 hover:bg-blue-50 cursor-pointer shadow-2xs'
                            }`}
                          >
                            {word}
                          </button>
                        );
                      })}
                    </div>

                    {/* Actions for Word Order */}
                    {!isChecked ? (
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => handleCheckWordOrder(ex)}
                          disabled={(wordOrderState[ex.id] || []).length === 0}
                          className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold transition-colors"
                        >
                          Kiểm tra kết quả
                        </button>
                        <button
                          onClick={() => handleResetWordOrder(ex.id)}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-xs font-medium"
                        >
                          Làm lại
                        </button>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
                        Đáp án đúng: <strong>{String(ex.correctAnswer)}</strong>
                      </div>
                    )}
                  </div>
                )}

                {/* Render by Type: ERROR CORRECTION (Sửa lỗi sai thường gặp) */}
                {ex.type === 'error_correction' && (
                  <div className="space-y-2.5 pt-1">
                    <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs sm:text-sm text-slate-800 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-amber-800">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Câu có lỗi sai thường gặp:
                      </div>
                      <div className="font-mono text-rose-700 font-semibold bg-rose-50 px-2.5 py-1.5 rounded-lg border border-rose-200 inline-block">
                        {ex.incorrectSentence || ex.question}
                      </div>
                    </div>

                    {!isChecked ? (
                      <button
                        onClick={() => {
                          setCheckedExercises((prev) => ({ ...prev, [ex.id]: true }));
                          calculateAndUpdateScore(selectedAnswers, { ...checkedExercises, [ex.id]: true });
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors"
                      >
                        Xem lỗi sai & cách sửa chuẩn
                      </button>
                    ) : (
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5 animate-in fade-in">
                        <div className="text-xs font-bold text-emerald-800">
                          ✓ Câu chuẩn tiếng Anh công sở:
                        </div>
                        <div className="font-mono text-emerald-900 font-semibold bg-white px-2.5 py-1.5 rounded-lg border border-emerald-300">
                          {ex.correctedSentence || String(ex.correctAnswer)}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Render by Type: QUICK TRANSLATION (Dịch nhanh Việt - Anh) */}
                {ex.type === 'quick_translation' && (
                  <div className="space-y-2.5 pt-1">
                    <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-200 text-xs sm:text-sm text-indigo-950 font-medium flex items-start gap-2">
                      <Languages className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{ex.vietnamesePrompt || ex.question}</span>
                    </div>

                    <input
                      type="text"
                      disabled={isChecked}
                      value={translationInputs[ex.id] || ''}
                      onChange={(e) =>
                        setTranslationInputs((prev) => ({ ...prev, [ex.id]: e.target.value }))
                      }
                      placeholder="Gõ câu dịch tiếng Anh của bạn tại đây..."
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 text-slate-800"
                    />

                    {!isChecked ? (
                      <button
                        onClick={() => {
                          setCheckedExercises((prev) => ({ ...prev, [ex.id]: true }));
                          calculateAndUpdateScore(selectedAnswers, { ...checkedExercises, [ex.id]: true });
                        }}
                        disabled={!translationInputs[ex.id]?.trim()}
                        className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold transition-colors"
                      >
                        Xem đối chiếu đáp án
                      </button>
                    ) : (
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5 animate-in fade-in">
                        <div className="text-xs font-bold text-emerald-800">
                          Bản dịch chuẩn gợi ý:
                        </div>
                        <div className="text-xs text-emerald-950 font-semibold bg-white p-2 rounded-lg border border-emerald-200">
                          {String(ex.correctAnswer)}
                        </div>
                        {ex.acceptableAnswersEn && ex.acceptableAnswersEn.length > 0 && (
                          <div className="text-[11px] text-slate-600">
                            Các cách diễn đạt khác:{' '}
                            {ex.acceptableAnswersEn.map((ans, aIdx) => (
                              <span key={aIdx} className="italic text-slate-700 block">
                                • "{ans}"
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Explanation Box (Always show after check) */}
                {isChecked && (
                  <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 space-y-1 animate-in fade-in">
                    <span className="font-bold text-slate-900">Giải thích chi tiết: </span>
                    <span>{ex.explanationVi}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Part B: Roleplay Situation */}
      <div className="pt-4 border-t border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            Phần B: Tình huống Roleplay phản hồi thực chiến
          </h3>
          <button
            onClick={onOpenLiveChat}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>Mở mô phỏng chat trực tiếp với Dev</span>
            <span>→</span>
          </button>
        </div>

        {/* Scenario card */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
          <div className="text-xs text-slate-700 leading-relaxed font-medium">
            <span className="font-bold text-slate-900">Tình huống: </span>
            {roleplayScenario.scenarioVi}
          </div>

          {/* Partner statement */}
          <div className="p-3.5 bg-blue-50/80 rounded-xl border border-blue-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-900">
                {roleplayScenario.partnerRole} nói:
              </span>
              <button
                onClick={() => playAudio(roleplayScenario.partnerMessageEn)}
                className="text-blue-600 hover:text-blue-800 p-1 rounded-md"
                title="Nghe phát âm"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-sm font-semibold text-slate-900 italic">
              "{roleplayScenario.partnerMessageEn}"
            </p>
            <p className="text-xs text-slate-600">
              (Dịch: {roleplayScenario.partnerMessageVi})
            </p>
          </div>

          {/* Task prompt */}
          <div className="text-xs text-indigo-900 bg-indigo-50/70 p-2.5 rounded-lg border border-indigo-200">
            <strong>Yêu cầu của bạn:</strong> {roleplayScenario.promptTaskVi}
          </div>

          {/* User input */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Câu trả lời của bạn bằng tiếng Anh:
            </label>
            <textarea
              rows={3}
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder="VD: I understand your point, but this bug affects payment directly so we should keep it at High..."
              className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-800"
            />
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <button
              onClick={() => setShowSampleAnswers(!showSampleAnswers)}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 underline underline-offset-4"
            >
              {showSampleAnswers ? 'Ẩn câu mẫu' : 'Xem câu mẫu tham khảo'}
            </button>

            <button
              onClick={handleEvaluateRoleplay}
              disabled={isEvaluating || !userResponse.trim()}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
            >
              {isEvaluating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>AI đang chấm điểm...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Gửi AI chấm & sửa câu</span>
                </>
              )}
            </button>
          </div>

          {/* Sample answers toggle */}
          {showSampleAnswers && (
            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3 animate-in fade-in">
              <div className="text-xs font-bold text-slate-800">
                Câu trả lời mẫu tham khảo:
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-blue-50/50 rounded-lg border border-blue-100">
                  <span className="font-semibold text-blue-900 block mb-1">
                    Formal (Họp / Email / Ticket Jira):
                  </span>
                  <p className="text-slate-800">{roleplayScenario.sampleAnswerFormal}</p>
                </div>
                <div className="p-2.5 bg-amber-50/50 rounded-lg border border-amber-100">
                  <span className="font-semibold text-amber-900 block mb-1">
                    Casual (Chat nhanh Slack / Teams):
                  </span>
                  <p className="text-slate-800">{roleplayScenario.sampleAnswerCasual}</p>
                </div>
              </div>
            </div>
          )}

          {/* AI Evaluation result */}
          {evaluation && (
            <div className="p-4 bg-white rounded-xl border-2 border-emerald-300 shadow-xs space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-slate-900 text-sm">
                    Đánh giá từ AI Tutor
                  </span>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  {evaluation.score}/100 Điểm
                </div>
              </div>

              <p className="text-xs text-slate-700 italic font-medium">
                "{evaluation.verdictVi}"
              </p>

              {/* Strengths */}
              {Array.isArray(evaluation.strengthsVi) && evaluation.strengthsVi.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">
                    Điểm sáng:
                  </span>
                  <ul className="text-xs text-slate-700 space-y-0.5 list-disc list-inside">
                    {evaluation.strengthsVi.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Grammar & vocab fixes */}
              {Array.isArray(evaluation.grammarFixes) && evaluation.grammarFixes.length > 0 && (
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold text-rose-700 uppercase">
                    Gợi ý sửa câu chi tiết:
                  </span>
                  <div className="space-y-1.5">
                    {evaluation.grammarFixes.map((f, fIdx) => (
                      <div
                        key={fIdx}
                        className="p-2 bg-rose-50/70 rounded-lg border border-rose-200 text-xs space-y-1"
                      >
                        <div className="text-rose-900 line-through">
                          {f.userPart}
                        </div>
                        <div className="text-emerald-800 font-semibold flex items-center gap-1">
                          <span>→</span> {f.improvedPart}
                        </div>
                        <div className="text-[11px] text-slate-600 italic">
                          Lý do: {f.reasonVi}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Native versions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <span className="font-bold text-slate-800 block text-[11px] text-blue-700">
                    Bản Formal chuẩn:
                  </span>
                  <p className="text-slate-800 mt-1">{evaluation.formalVersion}</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <span className="font-bold text-slate-800 block text-[11px] text-amber-700">
                    Bản Casual Slack:
                  </span>
                  <p className="text-slate-800 mt-1">{evaluation.casualVersion}</p>
                </div>
              </div>

              {/* Tone feedback & encouragement */}
              <div className="p-2.5 bg-blue-50/70 rounded-lg text-xs text-blue-950 space-y-1">
                <span className="font-bold block">Góp ý phong thái (Tone of voice):</span>
                <p>{evaluation.toneFeedbackVi}</p>
              </div>

              <div className="text-xs text-emerald-800 font-medium italic text-right">
                ✨ {evaluation.encouragementVi}
              </div>
            </div>
          )}

          {evalError && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs space-y-2 animate-in fade-in">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1 flex-1">
                  <div className="font-bold text-rose-900">Chưa thể hoàn thành đánh giá câu trả lời:</div>
                  <div className="text-rose-800 leading-relaxed">{evalError}</div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-1 border-t border-rose-200/60">
                <button
                  type="button"
                  onClick={() => setEvalError(null)}
                  className="px-2.5 py-1 text-slate-500 hover:text-slate-800 text-[11px] font-medium"
                >
                  Đóng
                </button>
                <button
                  type="button"
                  onClick={handleEvaluateRoleplay}
                  disabled={isEvaluating}
                  className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-all"
                >
                  <RefreshCw className={`w-3 h-3 ${isEvaluating ? 'animate-spin' : ''}`} />
                  <span>Thử lại ngay</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

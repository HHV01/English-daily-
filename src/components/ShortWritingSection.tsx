import { useState } from 'react';
import { ShortWritingTask, ShortWritingEvaluation, LearnerProfile } from '../types';
import {
  PenLine,
  Sparkles,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  Award,
  RefreshCw,
  Copy,
  Check,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface Props {
  task: ShortWritingTask;
  learnerProfile: LearnerProfile;
  onWritingSubmitted?: (text: string, score: number, rating1to5: number) => void;
}

export default function ShortWritingSection({ task, learnerProfile, onWritingSubmitted }: Props) {
  const [userText, setUserText] = useState<string>('');
  const [showStarter, setShowStarter] = useState<boolean>(false);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<ShortWritingEvaluation | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedSample, setCopiedSample] = useState<boolean>(false);

  // Calculate word count
  const words = userText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Determine progress status relative to target (~50-80 words)
  const minWords = 40;
  const maxWords = 90;
  const isOptimalLength = wordCount >= 50 && wordCount <= 85;

  const handleSubmitWriting = async () => {
    if (wordCount < 10) {
      setErrorMsg('Vui lòng viết ít nhất 10 từ tiếng Anh để AI có thể chấm điểm và góp ý chi tiết.');
      return;
    }

    setIsEvaluating(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/gemini/evaluate-writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          learnerProfile,
          writingTask: task,
          userText: userText.trim(),
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || errData.message || `Lỗi máy chủ (Mã lỗi HTTP ${res.status})`);
      }

      const data: ShortWritingEvaluation = await res.json();
      setEvaluation(data);

      if (onWritingSubmitted) {
        onWritingSubmitted(userText.trim(), data.score, data.rating1to5);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Lỗi khi chấm bài viết');
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleCopySample = () => {
    if (!evaluation?.nativeSampleAnswer) return;
    navigator.clipboard.writeText(evaluation.nativeSampleAnswer);
    setCopiedSample(true);
    setTimeout(() => setCopiedSample(false), 2000);
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-sm">
            5
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Viết Ngắn Theo Chủ Đề (Short Writing Task)</h2>
            <p className="text-xs text-slate-500">
              Mô phỏng tình huống viết thật trong công việc QC ({task.targetLength})
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
          Mục tiêu: {task.targetLength}
        </span>
      </div>

      {/* Task Description & Scenario */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Đề bài hôm nay:
        </div>
        <h3 className="text-sm sm:text-base font-bold text-slate-900">
          {task.titleVi}
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {task.promptVi}
        </p>

        {/* Real Context Scenario */}
        {task.contextScenarioVi && (
          <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1">
            <span className="font-semibold text-slate-900">Bối cảnh giả lập: </span>
            <span>{task.contextScenarioVi}</span>
          </div>
        )}

        {/* Keywords Suggestions */}
        {task.recommendedKeywords && task.recommendedKeywords.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-bold text-slate-500">Từ khóa gợi ý:</span>
            {task.recommendedKeywords.map((kw, kwIdx) => (
              <span
                key={kwIdx}
                className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200"
              >
                {kw}
              </span>
            ))}
          </div>
        )}

        {/* Guidelines */}
        {task.guidelinesVi && task.guidelinesVi.length > 0 && (
          <div className="pt-2 border-t border-slate-200/80 text-xs text-slate-600 space-y-1">
            <span className="font-semibold text-slate-800">Lưu ý khi viết:</span>
            <ul className="list-disc list-inside space-y-0.5 text-slate-600">
              {task.guidelinesVi.map((g, gIdx) => (
                <li key={gIdx}>{g}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Sentence Starter Accordion */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowStarter(!showStarter)}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 transition-colors"
          >
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>{showStarter ? 'Ẩn câu mồi gợi ý' : 'Chưa biết bắt đầu? Xem câu mồi gợi ý (Sentence Starter)'}</span>
          </button>
        </div>

        {showStarter && (
          <div className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs space-y-2 animate-in fade-in">
            <span className="font-bold text-indigo-950 block">
              Gợi ý mở đầu câu bằng tiếng Anh:
            </span>
            <div className="p-2.5 bg-white rounded-lg border border-indigo-200 font-mono text-xs text-indigo-900 font-medium">
              "{task.sentenceStarterEn}"
            </div>
            <button
              onClick={() => {
                if (!userText.trim()) {
                  setUserText(task.sentenceStarterEn + ' ');
                } else {
                  setUserText((prev) => prev + ' ' + task.sentenceStarterEn);
                }
              }}
              className="text-[11px] font-semibold text-indigo-700 hover:underline"
            >
              + Chèn câu mồi này vào khung viết của bạn
            </button>
          </div>
        )}
      </div>

      {/* Writing Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <PenLine className="w-3.5 h-3.5 text-indigo-600" />
            Bài viết của bạn (tiếng Anh):
          </label>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                isOptimalLength
                  ? 'bg-emerald-100 text-emerald-800'
                  : wordCount >= minWords
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {wordCount} từ {isOptimalLength ? '✓ Độ dài lý tưởng' : ''}
            </span>
          </div>
        </div>

        <textarea
          rows={5}
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          placeholder={`Nhập bài viết bằng tiếng Anh tại đây...\nVD: I would like to report an intermittent issue found during regression testing. The payment gateway returns HTTP 504...`}
          className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-slate-800 leading-relaxed font-normal"
        />

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <span className="text-[11px] text-slate-500 italic">
            * Hãy tự viết bài bằng vốn tiếng Anh của bạn trước để AI sửa lỗi đúng chỗ ngứa.
          </span>

          <button
            onClick={handleSubmitWriting}
            disabled={isEvaluating || wordCount < 5}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-xs"
          >
            {isEvaluating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI đang chấm bài & sửa lỗi...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Gửi bài chấm bằng AI</span>
              </>
            )}
          </button>
        </div>

        {errorMsg && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs space-y-2 animate-in fade-in">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1 flex-1">
                <div className="font-bold text-rose-900">Chưa thể hoàn thành chấm bài viết:</div>
                <div className="text-rose-800 leading-relaxed">{errorMsg}</div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-1 border-t border-rose-200/60">
              <button
                type="button"
                onClick={() => setErrorMsg(null)}
                className="px-2.5 py-1 text-slate-500 hover:text-slate-800 text-[11px] font-medium"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={handleSubmitWriting}
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

      {/* AI Detailed Feedback Modal / Card */}
      {evaluation && (
        <div className="p-5 bg-white rounded-2xl border-2 border-indigo-200 shadow-sm space-y-4 animate-in fade-in">
          {/* Header Score */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Kết quả chấm bài viết ngắn
                </h4>
                <p className="text-xs text-slate-500">
                  {evaluation.wordCount} từ • Đánh giá:{' '}
                  {'★'.repeat(evaluation.rating1to5)}
                  {'☆'.repeat(5 - evaluation.rating1to5)} ({evaluation.rating1to5}/5 sao)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-indigo-700">
                {evaluation.score}
              </span>
              <span className="text-xs text-slate-500">/ 100 điểm</span>
            </div>
          </div>

          {/* Verdict */}
          <div className="p-3 bg-indigo-50/50 rounded-xl text-xs text-slate-800 font-medium italic leading-relaxed">
            "{evaluation.verdictVi}"
          </div>

          {/* 1. Grammar & Vocab Fixes */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              1. Sửa lỗi ngữ pháp, từ vựng & chính tả ({evaluation.grammarFixes?.length || 0} điểm cần lưu ý):
            </div>

            {evaluation.grammarFixes && evaluation.grammarFixes.length > 0 ? (
              <div className="space-y-2">
                {evaluation.grammarFixes.map((fix, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-3 rounded-xl bg-rose-50/60 border border-rose-200 text-xs space-y-1.5"
                  >
                    <div className="text-rose-900 line-through font-mono">
                      {fix.original}
                    </div>
                    <div className="text-emerald-800 font-semibold font-mono flex items-center gap-1">
                      <span>✓ Cách viết đúng:</span>
                      <span className="bg-white px-2 py-0.5 rounded-md border border-emerald-300">
                        {fix.corrected}
                      </span>
                    </div>
                    <div className="text-slate-600 text-[11px] italic">
                      Giải thích: {fix.explanationVi}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Không phát hiện lỗi ngữ pháp hay chính tả nghiêm trọng nào. Làm rất tốt!</span>
              </div>
            )}
          </div>

          {/* 2. Naturalness & Tone Feedback */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">
                2. Độ tự nhiên (Naturalness in Tech):
              </span>
              <p className="text-slate-700 leading-relaxed">
                {evaluation.naturalnessFeedbackVi}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">
                3. Văn phong công sở (Tone & Formality):
              </span>
              <p className="text-slate-700 leading-relaxed">
                {evaluation.toneAndFormalityVi}
              </p>
            </div>
          </div>

          {/* 4. Native-like Sample Answer */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                4. Bản viết mẫu chuẩn Native tham khảo (đối chiếu):
              </span>
              <button
                onClick={handleCopySample}
                className="px-2.5 py-1 rounded-md bg-white hover:bg-emerald-100 text-emerald-800 text-[11px] font-semibold flex items-center gap-1 border border-emerald-300 transition-colors"
              >
                {copiedSample ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSample ? 'Đã sao chép' : 'Sao chép'}</span>
              </button>
            </div>

            <p className="p-3 bg-white rounded-lg border border-emerald-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans font-medium">
              {evaluation.nativeSampleAnswer}
            </p>
          </div>

          {/* Encouragement */}
          <div className="text-xs text-indigo-900 font-medium italic text-right pt-1">
            🌟 {evaluation.encouragementVi}
          </div>
        </div>
      )}
    </section>
  );
}

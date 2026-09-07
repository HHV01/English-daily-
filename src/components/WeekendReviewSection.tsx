import { useState } from 'react';
import { WeekendReview, DialogueMessage, LearnerProfile } from '../types';
import {
  Layers,
  Sparkles,
  BookOpen,
  Volume2,
  Award,
  PenLine,
  MessageSquare,
  CheckCircle,
  Clock
} from 'lucide-react';
import { playAudio } from '../utils/speech';

interface Props {
  weekendReview: WeekendReview;
  learnerProfile: LearnerProfile;
}

export default function WeekendReviewSection({ weekendReview, learnerProfile }: Props) {
  const [activeTab, setActiveTab] = useState<'words' | 'dialogue' | 'writing'>('words');

  return (
    <section className="bg-white rounded-2xl border border-amber-200/90 shadow-xs p-5 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
            7
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Ôn Tập Ngắn Cuối Tuần (Weekend Review & Synthesis)
            </h2>
            <p className="text-xs text-slate-500">
              Tổng hợp 5 từ khó nhớ nhất, hội thoại kết hợp và thử thách viết tổng hợp
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 self-start sm:self-auto">
          Chủ Nhật hàng tuần
        </span>
      </div>

      {/* Summary Advice */}
      <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-1">
        <span className="font-bold text-amber-900 block">Lời khuyên đúc kết tuần này:</span>
        <p className="leading-relaxed">{weekendReview.summaryAdviceVi}</p>
      </div>

      {/* Internal Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveTab('words')}
          className={`pb-2 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
            activeTab === 'words'
              ? 'border-amber-600 text-amber-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          5 Từ/Mẫu câu khó nhớ nhất ({weekendReview.keyWords?.length || 5})
        </button>

        {weekendReview.combinedDialogue && (
          <button
            onClick={() => setActiveTab('dialogue')}
            className={`pb-2 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'dialogue'
                ? 'border-amber-600 text-amber-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Hội thoại tổng hợp tuần
          </button>
        )}

        {weekendReview.comprehensiveWritingTask && (
          <button
            onClick={() => setActiveTab('writing')}
            className={`pb-2 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'writing'
                ? 'border-amber-600 text-amber-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <PenLine className="w-3.5 h-3.5" />
            Viết tổng hợp (100-120 từ)
          </button>
        )}
      </div>

      {/* Tab 1: Key Words Recap */}
      {activeTab === 'words' && (
        <div className="space-y-3 animate-in fade-in">
          <div className="text-xs text-slate-600">
            Hãy nhấp để nghe phát âm và tự đặt câu nhẩm trong đầu với 5 từ/cụm từ then chốt này:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {weekendReview.keyWords?.map((kw, idx) => (
              <div
                key={idx}
                className="p-3 bg-white rounded-xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50/40 transition-all flex items-center justify-between group shadow-2xs"
              >
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-amber-900 block">
                    {kw}
                  </span>
                  <span className="text-[11px] text-slate-500">Từ khóa trọng tâm #{idx + 1}</span>
                </div>
                <button
                  onClick={() => playAudio(kw)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-amber-200 text-slate-600 hover:text-amber-900 transition-colors"
                  title="Nghe phát âm"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Combined Dialogue */}
      {activeTab === 'dialogue' && weekendReview.combinedDialogue && (
        <div className="space-y-3 animate-in fade-in">
          <div className="text-xs text-slate-600">
            Đoạn hội thoại kết hợp nhiều tình huống đã học trong tuần:
          </div>
          <div className="space-y-3">
            {weekendReview.combinedDialogue.map((msg, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>{msg.speaker} ({msg.role})</span>
                  <button
                    onClick={() => playAudio(msg.en)}
                    className="text-blue-600 hover:text-blue-800 p-1"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-slate-900 font-medium">{msg.en}</p>
                <p className="text-slate-500 italic text-[11px]">{msg.vi}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Comprehensive Writing Task */}
      {activeTab === 'writing' && weekendReview.comprehensiveWritingTask && (
        <div className="space-y-3 animate-in fade-in p-4 bg-amber-50/40 rounded-xl border border-amber-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900 uppercase">
              Thử thách viết tổng hợp tuần (~100-120 từ):
            </span>
            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-white border border-amber-300 text-amber-900">
              Yêu cầu dùng lại ≥ 3 từ vựng trong tuần
            </span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            {weekendReview.comprehensiveWritingTask.titleVi}
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {weekendReview.comprehensiveWritingTask.promptVi}
          </p>

          <div className="p-3 bg-white rounded-lg border border-amber-200 text-xs text-slate-700 space-y-1">
            <span className="font-semibold text-slate-900">Khung câu mồi mở đầu: </span>
            <p className="font-mono text-amber-950 font-medium">"{weekendReview.comprehensiveWritingTask.sentenceStarterEn}"</p>
          </div>
        </div>
      )}
    </section>
  );
}

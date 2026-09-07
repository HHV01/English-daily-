import { LearnerProfile } from '../types';
import { Calendar, User, BookMarked, MessageSquare, Flame, Sparkles, CheckCircle2, Table } from 'lucide-react';

interface Props {
  learnerProfile: LearnerProfile;
  currentWeek: number;
  currentDayCode: string;
  completedDaysCount: number;
  savedWordsCount: number;
  streakCount: number;
  onOpenCurriculum: () => void;
  onOpenProfile: () => void;
  onOpenSavedWords: () => void;
  onOpenLiveChat: () => void;
  onOpenTracker: () => void;
}

export default function Header({
  learnerProfile,
  currentWeek,
  currentDayCode,
  completedDaysCount,
  savedWordsCount,
  streakCount,
  onOpenCurriculum,
  onOpenProfile,
  onOpenSavedWords,
  onOpenLiveChat,
  onOpenTracker,
}: Props) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-extrabold text-base shadow-xs tracking-tight">
            QC
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-slate-900 tracking-tight">QC English Daily</h1>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                Tuần {currentWeek} • {currentDayCode}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden md:block">
              Tiếng Anh giao tiếp hằng ngày cho QC/Tester phần mềm
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Streak badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold"
            title="Chuỗi ngày học liên tiếp"
          >
            <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>{streakCount} ngày</span>
          </div>

          {/* Curriculum drawer button */}
          <button
            onClick={onOpenCurriculum}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
            title="Xem lộ trình 6 tuần"
          >
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">Lịch 6 Tuần</span>
          </button>

          {/* Learning Tracker button */}
          <button
            onClick={onOpenTracker}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100/80 text-blue-700 text-xs font-semibold transition-colors"
            title="Bảng theo dõi tiến độ học & xuất Markdown"
          >
            <Table className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">Bảng tiến độ</span>
          </button>

          {/* Saved words button */}
          <button
            onClick={onOpenSavedWords}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
            title="Sổ tay từ vựng"
          >
            <BookMarked className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">Sổ tay</span>
            {savedWordsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] flex items-center justify-center font-bold">
                {savedWordsCount}
              </span>
            )}
          </button>

          {/* Live Roleplay button */}
          <button
            onClick={onOpenLiveChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold transition-colors"
            title="Chat thử tình huống thực tế với Dev"
          >
            <MessageSquare className="w-4 h-4 text-indigo-600" />
            <span className="hidden md:inline">Chat với Dev</span>
          </button>

          {/* Profile button */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-2xs"
            title="Hồ sơ người học"
          >
            <User className="w-4 h-4 text-blue-300" />
            <span className="hidden lg:inline">{learnerProfile.level}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

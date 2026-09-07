import { WeekSchedule, DayScheduleItem } from '../types';
import { WEEKS_SCHEDULE } from '../data/curriculum';
import { Calendar, ChevronRight, CheckCircle2, BookmarkCheck, Sparkles, X, Clock } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedWeek: number;
  selectedDayCode: string;
  completedDays: string[]; // e.g. ["w1_T2", "w1_T3"]
  onSelectDay: (week: number, dayCode: string, topic: string) => void;
}

export default function CurriculumDrawer({
  isOpen,
  onClose,
  selectedWeek,
  selectedDayCode,
  completedDays,
  onSelectDay,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl border-l border-slate-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">Lịch Xoay Vòng 6 Tuần</h3>
              <p className="text-xs text-slate-500">Chương trình chuẩn cho QC/Tester giao tiếp Dev</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-5 py-3 bg-blue-50/70 border-b border-blue-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-blue-900 font-medium">
            <BookmarkCheck className="w-4 h-4 text-blue-600" />
            <span>Tiến độ hoàn thành:</span>
          </div>
          <span className="font-bold text-blue-700 bg-white px-2.5 py-0.5 rounded-full border border-blue-200 shadow-2xs">
            {completedDays.length} / 36 bài học
          </span>
        </div>

        {/* Week List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {WEEKS_SCHEDULE.map((week: WeekSchedule) => {
            const isCurrentWeek = week.weekNumber === selectedWeek;
            const weekCompletedCount = week.days.filter((d: DayScheduleItem) =>
              completedDays.includes(`w${week.weekNumber}_${d.dayCode}`)
            ).length;

            return (
              <div
                key={week.weekNumber}
                className={`rounded-2xl border transition-all ${
                  isCurrentWeek
                    ? 'border-blue-400 bg-white ring-2 ring-blue-500/10 shadow-xs'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-white'
                }`}
              >
                {/* Week Header */}
                <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                      week.weekNumber === 7 ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {week.weekNumber === 7 ? 'Chuyên đề' : `Tuần ${week.weekNumber}`}
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm">{week.themeTitle}</h4>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {weekCompletedCount}/{week.days.length}
                  </span>
                </div>

                {/* Days */}
                <div className="p-2 space-y-1">
                  {week.days.map((day: DayScheduleItem) => {
                    const dayKey = `w${week.weekNumber}_${day.dayCode}`;
                    const isSelected = week.weekNumber === selectedWeek && day.dayCode === selectedDayCode;
                    const isDone = completedDays.includes(dayKey);

                    return (
                      <button
                        key={day.dayCode}
                        onClick={() => {
                          onSelectDay(week.weekNumber, day.dayCode, day.topic);
                          onClose();
                        }}
                        className={`w-full text-left p-2.5 rounded-xl text-xs flex items-start justify-between gap-3 transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white font-medium shadow-xs'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <div className="flex items-start gap-2.5 flex-1 min-w-0">
                          <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold shrink-0 mt-0.5 ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : day.isReview
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}>
                            {day.dayCode}
                          </span>
                          <div className="truncate">
                            <p className={`truncate font-semibold ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                              {day.topic}
                            </p>
                            <p className={`text-[11px] ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                              {day.dayLabel} {day.isReview && '• Ôn tập'}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-1 mt-1">
                          {isDone ? (
                            <CheckCircle2 className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-emerald-500'}`} />
                          ) : (
                            <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-300'}`} />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

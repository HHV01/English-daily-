import { useState, useEffect } from 'react';
import { ProgressLogEntry } from '../types';
import {
  X,
  Table,
  Copy,
  Check,
  Plus,
  Trash2,
  Calendar,
  Award,
  BookOpen,
  Sparkles,
  Edit3,
  TrendingUp,
  FileText
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentLessonInfo: {
    weekNumber: number;
    dayCode: string;
    topic: string;
    newWordsCount: number;
  };
  currentQuizScore?: number;
  currentWritingSubmitted?: boolean;
  currentWritingScore1to5?: number;
}

const DEFAULT_LOGS: ProgressLogEntry[] = [
  {
    id: 'log_1',
    dateStr: 'Thứ Hai',
    weekNumber: 1,
    dayCode: 'T2',
    topic: 'Report bug mới (steps to reproduce, expected vs actual)',
    newWordsCount: 6,
    quizScore10: 9,
    writingSubmitted: true,
    writingSelfScore: 4,
    speakingConfidence: 4,
    hardestWordOrPhrase: 'intermittent / contrary to',
    commonMistake: 'Quên chia động từ sau "does not"',
    submittedWritingText: 'I reported bug PAY-405 on Staging. The submit button is disabled...',
  },
  {
    id: 'log_2',
    dateStr: 'Thứ Ba',
    weekNumber: 1,
    dayCode: 'T3',
    topic: 'Trả lời khi dev hỏi thêm / chưa reproduce được',
    newWordsCount: 5,
    quizScore10: 8,
    writingSubmitted: true,
    writingSelfScore: 4,
    speakingConfidence: 3,
    hardestWordOrPhrase: 'cannot reproduce (CNR) / walk through',
    commonMistake: 'Dùng nhầm "works in my machine" thay vì "on my machine"',
    submittedWritingText: 'Let us hop on a quick 3-min screen share to reproduce the bug...',
  },
  {
    id: 'log_3',
    dateStr: 'Thứ Tư',
    weekNumber: 1,
    dayCode: 'T4',
    topic: 'Tranh luận về severity/priority với dev, PM',
    newWordsCount: 5,
    quizScore10: 10,
    writingSubmitted: false,
    writingSelfScore: 3,
    speakingConfidence: 4,
    hardestWordOrPhrase: 'compromise / edge case',
    commonMistake: 'Nói "I am agree" thay vì "I agree"',
  },
];

export default function LearningTrackerModal({
  isOpen,
  onClose,
  currentLessonInfo,
  currentQuizScore,
  currentWritingSubmitted,
  currentWritingScore1to5,
}: Props) {
  const [logs, setLogs] = useState<ProgressLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem('qc_english_progress_logs');
      return saved ? JSON.parse(saved) : DEFAULT_LOGS;
    } catch {
      return DEFAULT_LOGS;
    }
  });

  const [activeTab, setActiveTab] = useState<'daily' | 'weekly'>('daily');
  const [copiedDaily, setCopiedDaily] = useState<boolean>(false);
  const [copiedWeekly, setCopiedWeekly] = useState<boolean>(false);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('qc_english_progress_logs', JSON.stringify(logs));
  }, [logs]);

  if (!isOpen) return null;

  // Add or update current day entry
  const handleSyncCurrentDay = () => {
    const existingIdx = logs.findIndex(
      (l) => l.weekNumber === currentLessonInfo.weekNumber && l.dayCode === currentLessonInfo.dayCode
    );

    const newEntry: ProgressLogEntry = {
      id: existingIdx >= 0 ? logs[existingIdx].id : `log_${Date.now()}`,
      dateStr: currentLessonInfo.dayCode,
      weekNumber: currentLessonInfo.weekNumber,
      dayCode: currentLessonInfo.dayCode,
      topic: currentLessonInfo.topic,
      newWordsCount: currentLessonInfo.newWordsCount || 5,
      quizScore10: currentQuizScore !== undefined ? currentQuizScore : 9,
      writingSubmitted: currentWritingSubmitted !== undefined ? currentWritingSubmitted : true,
      writingSelfScore: currentWritingScore1to5 !== undefined ? currentWritingScore1to5 : 4,
      speakingConfidence: existingIdx >= 0 ? logs[existingIdx].speakingConfidence : 4,
      hardestWordOrPhrase: existingIdx >= 0 ? logs[existingIdx].hardestWordOrPhrase : '',
      commonMistake: existingIdx >= 0 ? logs[existingIdx].commonMistake : '',
    };

    if (existingIdx >= 0) {
      const updated = [...logs];
      updated[existingIdx] = { ...updated[existingIdx], ...newEntry };
      setLogs(updated);
    } else {
      setLogs([newEntry, ...logs]);
    }
  };

  const handleUpdateEntry = (id: string, field: keyof ProgressLogEntry, value: any) => {
    setLogs((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleDeleteEntry = (id: string) => {
    setLogs((prev) => prev.filter((item) => item.id !== id));
  };

  // Generate Markdown Daily Table
  const generateDailyMarkdown = () => {
    let md = `| Ngày | Tuần | Chủ đề | Số từ mới | Điểm bài tập (/10) | Viết ngắn - Nộp? (C/K) | Viết ngắn - Tự chấm (1-5) | Tự tin nói (1-5) | Từ/câu khó nhớ nhất | Lỗi hay mắc |\n`;
    md += `|---|---|---|---|---|---|---|---|---|---|\n`;

    logs.forEach((l) => {
      const submitted = l.writingSubmitted ? 'C' : 'K';
      md += `| ${l.dateStr} | Tuần ${l.weekNumber} | ${l.topic} | ${l.newWordsCount} | ${l.quizScore10}/10 | ${submitted} | ${l.writingSelfScore}/5 | ${l.speakingConfidence}/5 | ${l.hardestWordOrPhrase || '-'} | ${l.commonMistake || '-'} |\n`;
    });

    return md;
  };

  // Weekly Aggregations
  const weeksList = [1, 2, 3, 4, 5, 6];
  const weeklyData = weeksList.map((wNum) => {
    const weekLogs = logs.filter((l) => l.weekNumber === wNum);
    const count = weekLogs.length;
    const totalWords = weekLogs.reduce((acc, l) => acc + (l.newWordsCount || 0), 0);
    const avgQuiz =
      count > 0
        ? (weekLogs.reduce((acc, l) => acc + (l.quizScore10 || 0), 0) / count).toFixed(1)
        : '0';
    const submittedWritingCount = weekLogs.filter((l) => l.writingSubmitted).length;
    const avgWritingScore =
      submittedWritingCount > 0
        ? (
            weekLogs.reduce((acc, l) => acc + (l.writingSelfScore || 0), 0) / submittedWritingCount
          ).toFixed(1)
        : '-';

    let comment = '-';
    if (count >= 5) {
      comment = 'Hoàn thành xuất sắc toàn bộ tuần!';
    } else if (count > 0) {
      comment = `Đã hoàn thành ${count} ngày học tích cực.`;
    }

    return {
      weekNumber: wNum,
      daysStudied: count,
      totalWords,
      avgQuiz,
      submittedWritingCount,
      avgWritingScore,
      comment,
    };
  });

  // Generate Markdown Weekly Summary
  const generateWeeklyMarkdown = () => {
    let md = `| Tuần | Số ngày đã học | Tổng từ vựng mới | Điểm bài tập TB | Số bài viết đã nộp | Điểm viết TB | Nhận xét nhanh |\n`;
    md += `|---|---|---|---|---|---|---|\n`;

    weeklyData.forEach((w) => {
      md += `| Tuần ${w.weekNumber} | ${w.daysStudied}/6 ngày | ${w.totalWords} | ${w.avgQuiz}/10 | ${w.submittedWritingCount} | ${w.avgWritingScore}/5 | ${w.comment} |\n`;
    });

    return md;
  };

  const handleCopyDailyMarkdown = () => {
    navigator.clipboard.writeText(generateDailyMarkdown());
    setCopiedDaily(true);
    setTimeout(() => setCopiedDaily(false), 2000);
  };

  const handleCopyWeeklyMarkdown = () => {
    navigator.clipboard.writeText(generateWeeklyMarkdown());
    setCopiedWeekly(true);
    setTimeout(() => setCopiedWeekly(false), 2000);
  };

  // Overall statistics
  const totalDays = logs.length;
  const totalWords = logs.reduce((sum, l) => sum + (l.newWordsCount || 0), 0);
  const avgQuizAll =
    totalDays > 0
      ? (logs.reduce((sum, l) => sum + (l.quizScore10 || 0), 0) / totalDays).toFixed(1)
      : '0';
  const totalWritingSubmitted = logs.filter((l) => l.writingSubmitted).length;
  const avgConfidence =
    totalDays > 0
      ? (logs.reduce((sum, l) => sum + (l.speakingConfidence || 0), 0) / totalDays).toFixed(1)
      : '0';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Table className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Bảng Theo Dõi Tiến Độ Hằng Ngày (Learning Tracker)
              </h2>
              <p className="text-xs text-slate-500">
                Nhật ký học tập thực chiến, điểm số, bài viết và tổng kết xuất Markdown cho Notion / Notes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats summary bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 sm:px-6 bg-blue-50/40 border-b border-slate-200 text-center text-xs">
          <div className="p-2 bg-white rounded-xl border border-blue-100 shadow-2xs">
            <span className="text-slate-500 block text-[11px]">Số ngày đã học</span>
            <span className="text-base sm:text-lg font-black text-blue-700">{totalDays}</span>
            <span className="text-[10px] text-slate-400 block">bài học đã ghi nhận</span>
          </div>
          <div className="p-2 bg-white rounded-xl border border-blue-100 shadow-2xs">
            <span className="text-slate-500 block text-[11px]">Tổng từ mới đã nạp</span>
            <span className="text-base sm:text-lg font-black text-indigo-700">{totalWords}</span>
            <span className="text-[10px] text-slate-400 block">thuật ngữ thực tế</span>
          </div>
          <div className="p-2 bg-white rounded-xl border border-blue-100 shadow-2xs">
            <span className="text-slate-500 block text-[11px]">Điểm bài tập TB</span>
            <span className="text-base sm:text-lg font-black text-emerald-700">{avgQuizAll}</span>
            <span className="text-[10px] text-slate-400 block">thang điểm /10</span>
          </div>
          <div className="p-2 bg-white rounded-xl border border-blue-100 shadow-2xs">
            <span className="text-slate-500 block text-[11px]">Bài viết đã nộp</span>
            <span className="text-base sm:text-lg font-black text-amber-700">{totalWritingSubmitted}</span>
            <span className="text-[10px] text-slate-400 block">bài viết công việc</span>
          </div>
          <div className="col-span-2 sm:col-span-1 p-2 bg-white rounded-xl border border-blue-100 shadow-2xs">
            <span className="text-slate-500 block text-[11px]">Tự tin nói TB</span>
            <span className="text-base sm:text-lg font-black text-purple-700">{avgConfidence}</span>
            <span className="text-[10px] text-slate-400 block">thang điểm /5</span>
          </div>
        </div>

        {/* Tab selector & actions bar */}
        <div className="px-5 sm:px-6 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-white">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('daily')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'daily'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Nhật Ký Hằng Ngày ({logs.length} bản ghi)
            </button>
            <button
              onClick={() => setActiveTab('weekly')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'weekly'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tổng Kết Mỗi Chủ Nhật
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSyncCurrentDay}
              className="px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Đồng bộ kết quả bài học hôm nay vào bảng theo dõi"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ghi nhận bài hôm nay</span>
            </button>

            {activeTab === 'daily' ? (
              <button
                onClick={handleCopyDailyMarkdown}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                title="Sao chép bảng định dạng Markdown để dán vào Notion, Obsidian hoặc ghi chú"
              >
                {copiedDaily ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedDaily ? 'Đã sao chép MD!' : 'Sao chép bảng Markdown'}</span>
              </button>
            ) : (
              <button
                onClick={handleCopyWeeklyMarkdown}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
              >
                {copiedWeekly ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedWeekly ? 'Đã sao chép MD!' : 'Sao chép bảng Tổng kết MD'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {activeTab === 'daily' ? (
            <div className="space-y-3">
              <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-2xs">
                <table className="w-full text-left text-xs border-collapse min-w-[950px]">
                  <thead>
                    <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                      <th className="p-3">Ngày</th>
                      <th className="p-3">Tuần</th>
                      <th className="p-3 min-w-[180px]">Chủ đề</th>
                      <th className="p-3 text-center">Từ mới</th>
                      <th className="p-3 text-center">Điểm bài tập (/10)</th>
                      <th className="p-3 text-center">Viết ngắn - Nộp?</th>
                      <th className="p-3 text-center">Viết - Tự chấm</th>
                      <th className="p-3 text-center">Tự tin nói</th>
                      <th className="p-3 min-w-[160px]">Từ/câu khó nhớ nhất</th>
                      <th className="p-3 min-w-[160px]">Lỗi hay mắc</th>
                      <th className="p-3 text-center">Xóa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {logs.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3 font-semibold text-slate-800">{row.dateStr}</td>
                        <td className="p-3 text-slate-600">Tuần {row.weekNumber}</td>
                        <td className="p-3 text-slate-900 font-medium">{row.topic}</td>
                        <td className="p-3 text-center font-semibold text-blue-700">
                          {row.newWordsCount}
                        </td>
                        <td className="p-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-md font-bold ${
                              row.quizScore10 >= 8
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {row.quizScore10}/10
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() =>
                              handleUpdateEntry(row.id, 'writingSubmitted', !row.writingSubmitted)
                            }
                            className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-colors ${
                              row.writingSubmitted
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {row.writingSubmitted ? 'C (Có)' : 'K (Chưa)'}
                          </button>
                        </td>
                        <td className="p-3 text-center">
                          <select
                            value={row.writingSelfScore}
                            onChange={(e) =>
                              handleUpdateEntry(row.id, 'writingSelfScore', Number(e.target.value))
                            }
                            className="bg-slate-100 text-slate-800 rounded px-1.5 py-0.5 font-semibold text-xs border border-slate-200"
                          >
                            {[1, 2, 3, 4, 5].map((s) => (
                              <option key={s} value={s}>
                                {s}/5
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="p-3 text-center">
                          <select
                            value={row.speakingConfidence}
                            onChange={(e) =>
                              handleUpdateEntry(row.id, 'speakingConfidence', Number(e.target.value))
                            }
                            className="bg-slate-100 text-slate-800 rounded px-1.5 py-0.5 font-semibold text-xs border border-slate-200"
                          >
                            {[1, 2, 3, 4, 5].map((c) => (
                              <option key={c} value={c}>
                                {c}/5
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={row.hardestWordOrPhrase}
                            onChange={(e) =>
                              handleUpdateEntry(row.id, 'hardestWordOrPhrase', e.target.value)
                            }
                            placeholder="Ghi chú từ khó..."
                            className="w-full px-2 py-1 bg-slate-50 hover:bg-white focus:bg-white rounded border border-slate-200 text-xs text-slate-800"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={row.commonMistake}
                            onChange={(e) =>
                              handleUpdateEntry(row.id, 'commonMistake', e.target.value)
                            }
                            placeholder="Ghi chú lỗi ngữ pháp..."
                            className="w-full px-2 py-1 bg-slate-50 hover:bg-white focus:bg-white rounded border border-slate-200 text-xs text-slate-800"
                          />
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleDeleteEntry(row.id)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                            title="Xóa dòng này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-[11px] text-slate-500 italic">
                * Mẹo: Bạn có thể sửa trực tiếp điểm tự chấm, mức độ tự tin nói, từ khó nhớ và lỗi hay mắc ngay trên bảng. Dữ liệu sẽ tự động lưu vào trình duyệt của bạn.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-2xs">
                <table className="w-full text-left text-xs border-collapse min-w-[750px]">
                  <thead>
                    <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                      <th className="p-3">Tuần</th>
                      <th className="p-3 text-center">Số ngày đã học</th>
                      <th className="p-3 text-center">Tổng từ vựng mới</th>
                      <th className="p-3 text-center">Điểm bài tập TB</th>
                      <th className="p-3 text-center">Số bài viết đã nộp</th>
                      <th className="p-3 text-center">Điểm viết TB</th>
                      <th className="p-3 min-w-[200px]">Nhận xét nhanh</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {weeklyData.map((w) => (
                      <tr key={w.weekNumber} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3 font-bold text-slate-900">Tuần {w.weekNumber}</td>
                        <td className="p-3 text-center">
                          <span className="font-semibold text-slate-800">{w.daysStudied}</span> / 6 ngày
                        </td>
                        <td className="p-3 text-center font-bold text-blue-700">{w.totalWords}</td>
                        <td className="p-3 text-center font-semibold text-emerald-700">{w.avgQuiz}/10</td>
                        <td className="p-3 text-center font-semibold text-amber-700">
                          {w.submittedWritingCount} bài
                        </td>
                        <td className="p-3 text-center font-semibold text-purple-700">
                          {w.avgWritingScore}/5
                        </td>
                        <td className="p-3 text-slate-600 italic">{w.comment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">
                <span className="font-bold text-slate-900 block">Quy trình tổng kết Chủ Nhật:</span>
                <p>
                  Vào mỗi Chủ Nhật, hãy bấm <strong>"Sao chép bảng Tổng kết MD"</strong> và dán vào trang quản lý học tập cá nhân (Notion, Obsidian, Google Keep, v.v.) để đối chiếu sự tiến bộ sau mỗi tuần học.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Hỗ trợ đầy đủ định dạng bảng Markdown tiêu chuẩn
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { LearnerProfile, LessonData, VocabularyItem, ExerciseItem, RoleplayScenario, ShortWritingTask } from './types';
import { STARTER_LESSONS } from './data/starterLessons';
import { WEEKS_SCHEDULE } from './data/curriculum';
import Header from './components/Header';
import LearnerProfileModal from './components/LearnerProfileModal';
import CurriculumDrawer from './components/CurriculumDrawer';
import VocabularySection from './components/VocabularySection';
import CommunicationPatternsSection from './components/CommunicationPatternsSection';
import DialogueSection from './components/DialogueSection';
import ExercisesSection from './components/ExercisesSection';
import ShortWritingSection from './components/ShortWritingSection';
import WeekendReviewSection from './components/WeekendReviewSection';
import DailyTipCard from './components/DailyTipCard';
import LiveRoleplayModal from './components/LiveRoleplayModal';
import SavedWordsModal from './components/SavedWordsModal';
import LearningTrackerModal from './components/LearningTrackerModal';
import ApiKeyModal from './components/ApiKeyModal';
import { Sparkles, Calendar, CheckCircle2, ChevronLeft, ChevronRight, BookOpen, AlertCircle, RefreshCw, MessageSquare, Layers } from 'lucide-react';

const DEFAULT_PROFILE: LearnerProfile = {
  role: "QC/Tester phần mềm",
  level: "Intermediate",
  communicatesWith: ["Dev", "Team Lead", "PM", "BA"],
  tools: ["Jira", "Slack", "Microsoft Teams", "Email / Outlook"],
  testTypes: ["Manual Testing", "Automation Testing", "API Testing"],
  worksWithForeignClients: false,
};

export default function App() {
  // Persistence
  const [profile, setProfile] = useState<LearnerProfile>(() => {
    try {
      const saved = localStorage.getItem('qc_english_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [completedDays, setCompletedDays] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('qc_english_completed_days');
      return saved ? JSON.parse(saved) : ['w1_T2'];
    } catch {
      return ['w1_T2'];
    }
  });

  const [savedWordsList, setSavedWordsList] = useState<VocabularyItem[]>(() => {
    try {
      const saved = localStorage.getItem('qc_english_saved_words');
      return saved ? JSON.parse(saved) : (STARTER_LESSONS["w1_T2"]?.vocabulary.slice(0, 2) || []);
    } catch {
      return [];
    }
  });

  const [streakCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('qc_english_streak');
      return saved ? parseInt(saved, 10) : 3;
    } catch {
      return 3;
    }
  });

  // Current Lesson state
  const [currentWeek, setCurrentWeek] = useState<number>(1);
  const [currentDayCode, setCurrentDayCode] = useState<string>("T2");
  const [lesson, setLesson] = useState<LessonData>(() => STARTER_LESSONS["w1_T2"]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [customContextInput, setCustomContextInput] = useState<string>('');
  const [showCustomPromptBox, setShowCustomPromptBox] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isCurriculumOpen, setIsCurriculumOpen] = useState<boolean>(false);
  const [isSavedWordsOpen, setIsSavedWordsOpen] = useState<boolean>(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState<boolean>(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState<boolean>(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);

  // Daily learning assessment state (for Learning Tracker sync)
  const [currentQuizScore, setCurrentQuizScore] = useState<number>(9);
  const [currentWritingSubmitted, setCurrentWritingSubmitted] = useState<boolean>(false);
  const [currentWritingScore1to5, setCurrentWritingScore1to5] = useState<number>(4);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('qc_english_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('qc_english_completed_days', JSON.stringify(completedDays));
  }, [completedDays]);

  useEffect(() => {
    localStorage.setItem('qc_english_saved_words', JSON.stringify(savedWordsList));
  }, [savedWordsList]);

  // Load lesson when week/day changes
  const loadDayLesson = async (week: number, dayCode: string, defaultTopic?: string, customContext?: string) => {
    setCurrentWeek(week);
    setCurrentDayCode(dayCode);
    setErrorMessage(null);

    const lessonKey = `w${week}_${dayCode}`;

    // Check if starter lesson exists and no custom context requested
    if (STARTER_LESSONS[lessonKey] && !customContext) {
      setLesson(STARTER_LESSONS[lessonKey]);
      return;
    }

    // Otherwise, generate with Gemini API
    await generateLessonWithAi(week, dayCode, defaultTopic, customContext);
  };

  const generateLessonWithAi = async (week: number, dayCode: string, topicParam?: string, customContext?: string) => {
    setIsGenerating(true);
    setErrorMessage(null);

    const weekObj = WEEKS_SCHEDULE.find((w) => w.weekNumber === week);
    const dayObj = weekObj?.days.find((d) => d.dayCode === dayCode);
    const topic = topicParam || dayObj?.topic || "Giao tiếp kiểm thử phần mềm";

    try {
      const res = await fetch('/api/gemini/generate-lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(profile?.customApiKey ? { 'x-gemini-api-key': profile.customApiKey } : {}),
        },
        body: JSON.stringify({
          learnerProfile: profile,
          weekNumber: week,
          dayName: dayObj?.dayLabel || "Hôm nay",
          dayTopic: topic,
          customContext: customContext || customContextInput,
        }),
      });

      if (!res.ok) {
        throw new Error('Không thể tạo bài học tự động. Đang hiển thị bài học dự phòng.');
      }

      const generatedData = await res.json();
      const formattedLesson: LessonData = {
        weekNumber: week,
        dayCode,
        dayName: dayObj?.dayLabel || "Hôm nay",
        themeTitle: generatedData.themeTitle || weekObj?.themeTitle || `Tuần ${week}`,
        lessonTitle: generatedData.lessonTitle || topic,
        vocabulary: generatedData.vocabulary || [],
        communicationPatterns: generatedData.communicationPatterns || [],
        dialogue: generatedData.dialogue || [],
        exercises: generatedData.exercises || [],
        roleplayScenario: generatedData.roleplayScenario || {
          scenarioVi: "Thảo luận công việc với Dev",
          partnerRole: "Developer",
          partnerMessageEn: "Could you clarify the expected behavior?",
          partnerMessageVi: "Bạn có thể làm rõ hành vi kỳ vọng được không?",
          promptTaskVi: "Trả lời bằng tiếng Anh",
          sampleAnswerFormal: "I will provide the reproduction steps in the ticket.",
          sampleAnswerCasual: "Sure, let me send the logs right away!",
        },
        shortWritingTask: generatedData.shortWritingTask || {
          titleVi: `Viết ngắn: ${generatedData.lessonTitle || topic}`,
          promptVi: `Hãy viết một đoạn 3-5 câu (~50-80 từ) tiếng Anh xử lý tình huống liên quan đến ${topic}.`,
          contextScenarioVi: "Bạn đang viết báo cáo bug hoặc gửi tin nhắn cho team kỹ thuật.",
          targetLength: "3-5 câu (~50-80 từ)",
          recommendedKeywords: (generatedData.vocabulary || []).slice(0, 3).map((v: any) => v.word),
          sentenceStarterEn: "Regarding the recent test execution,",
          guidelinesVi: ["Viết ngắn gọn, rõ ràng", "Sử dụng từ vựng đã học hôm nay"]
        },
        dailyTip: generatedData.dailyTip || {
          titleVi: "Mẹo giao tiếp",
          adviceVi: "Luôn cung cấp bằng chứng rõ ràng.",
          keyTakeawayEn: "Be clear and objective.",
        },
        weekendReview: generatedData.weekendReview,
        isAiGenerated: true,
      };

      setLesson(formattedLesson);
      setShowCustomPromptBox(false);
      setCustomContextInput('');
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Lỗi khi tạo bài học');
      // Fallback to starter lesson if available
      const fallbackKey = `w${week}_${dayCode}`;
      if (STARTER_LESSONS[fallbackKey]) {
        setLesson(STARTER_LESSONS[fallbackKey]);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToggleSaveWord = (wordItem: VocabularyItem) => {
    const exists = savedWordsList.some((w) => w.word === wordItem.word);
    if (exists) {
      setSavedWordsList(savedWordsList.filter((w) => w.word !== wordItem.word));
    } else {
      setSavedWordsList([...savedWordsList, wordItem]);
    }
  };

  const handleMarkCompleted = () => {
    const key = `w${currentWeek}_${currentDayCode}`;
    if (!completedDays.includes(key)) {
      setCompletedDays([...completedDays, key]);
    }
  };

  const currentWeekObj = WEEKS_SCHEDULE.find((w) => w.weekNumber === currentWeek) || WEEKS_SCHEDULE[0];
  const isLessonCompleted = completedDays.includes(`w${currentWeek}_${currentDayCode}`);

  // Compute effective exercises, roleplay, and short writing task with fallbacks
  const effectiveExercises: ExerciseItem[] =
    lesson.exercises && lesson.exercises.length > 0
      ? lesson.exercises
      : (lesson.quickPractice?.quizzes || []).map((q: any, i: number) => ({
          id: `ex_${i}`,
          type: 'multiple_choice' as const,
          typeLabelVi: 'Trắc nghiệm chọn từ đúng',
          instructionVi: 'Chọn đáp án chính xác trong ngữ cảnh',
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanationVi: q.explanationVi,
        }));

  const effectiveRoleplay: RoleplayScenario =
    lesson.roleplayScenario ||
    lesson.quickPractice?.roleplayScenario || {
      scenarioVi: `Trao đổi công việc thực tế về ${lesson.lessonTitle}`,
      partnerRole: 'Developer',
      partnerMessageEn: 'Could you clarify the expected behavior?',
      partnerMessageVi: 'Bạn có thể làm rõ hành vi kỳ vọng được không?',
      promptTaskVi: 'Trả lời bằng tiếng Anh',
      sampleAnswerFormal: 'I will provide the reproduction steps in the ticket.',
      sampleAnswerCasual: 'Sure, let me send over the logs right away!',
    };

  const effectiveWritingTask: ShortWritingTask =
    lesson.shortWritingTask || {
      titleVi: `Viết ngắn theo chủ đề: ${lesson.lessonTitle}`,
      promptVi: `Viết 3-5 câu (~50-80 từ) tiếng Anh xử lý tình huống thực tế liên quan đến ${lesson.lessonTitle}. Sử dụng ít nhất 2 từ vựng đã học hôm nay.`,
      contextScenarioVi: 'Bạn đang viết mô tả bug hoặc trao đổi qua Slack/Teams với team công nghệ.',
      targetLength: '3-5 câu (~50-80 từ)',
      recommendedKeywords: lesson.vocabulary?.slice(0, 3).map((v) => v.word) || [],
      sentenceStarterEn: 'Regarding the recent testing updates,',
      guidelinesVi: [
        'Viết trực diện, súc tích',
        'Áp dụng từ vựng đã học hôm nay',
        'Giữ văn phong công sở lịch sự, hợp tác',
      ],
    };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-200">
      {/* Navigation Header */}
      <Header
        learnerProfile={profile}
        currentWeek={currentWeek}
        currentDayCode={currentDayCode}
        completedDaysCount={completedDays.length}
        savedWordsCount={savedWordsList.length}
        streakCount={streakCount}
        hasApiKey={Boolean(profile.customApiKey)}
        onOpenApiKey={() => setIsApiKeyModalOpen(true)}
        onOpenCurriculum={() => setIsCurriculumOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenSavedWords={() => setIsSavedWordsOpen(true)}
        onOpenLiveChat={() => setIsLiveChatOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Week & Day Quick Selector Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-blue-100 text-blue-800">
                  Tuần {currentWeek}
                </span>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  {currentWeekObj.themeTitle}
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{currentWeekObj.themeDescription}</p>
            </div>

            {/* AI Generator CTA */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCustomPromptBox(!showCustomPromptBox)}
                className="px-3 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Tạo bài học mới bằng AI hoặc nhập tình huống riêng"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isGenerating ? 'AI đang tạo...' : 'Tạo bài học mới (AI)'}</span>
              </button>

              <button
                onClick={handleMarkCompleted}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isLessonCompleted
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CheckCircle2 className={`w-3.5 h-3.5 ${isLessonCompleted ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{isLessonCompleted ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}</span>
              </button>
            </div>
          </div>

          {/* Custom Situation Box (Optional) */}
          {showCustomPromptBox && (
            <div className="pt-3 border-t border-slate-100 space-y-2 animate-in fade-in">
              <label className="block text-xs font-bold text-indigo-900">
                Nhập bối cảnh / tình huống công việc thực tế bạn muốn học hôm nay (tùy chọn):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customContextInput}
                  onChange={(e) => setCustomContextInput(e.target.value)}
                  placeholder="VD: Dự án e-commerce của tôi vừa bị bug Stripe webhook timeout, dev bảo do race condition..."
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 text-slate-800 bg-slate-50 focus:bg-white"
                />
                <button
                  onClick={() => generateLessonWithAi(currentWeek, currentDayCode, undefined, customContextInput)}
                  disabled={isGenerating}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shrink-0 flex items-center gap-1.5 shadow-xs"
                >
                  {isGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  Tạo bài học
                </button>
              </div>
            </div>
          )}

          {/* Days of week tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1">
            {currentWeekObj.days.map((day) => {
              const isSelected = day.dayCode === currentDayCode;
              const isDone = completedDays.includes(`w${currentWeek}_${day.dayCode}`);

              return (
                <button
                  key={day.dayCode}
                  onClick={() => loadDayLesson(currentWeek, day.dayCode, day.topic)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-all shrink-0 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-700'
                  }`}
                >
                  <span>{day.dayCode}</span>
                  <span className={`text-[11px] truncate max-w-[140px] sm:max-w-[200px] ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                    {day.topic}
                  </span>
                  {isDone && <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-emerald-500'}`} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Error notification if any */}
        {errorMessage && (
          <div className="p-3 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Active Lesson Header Banner */}
        <div className="bg-linear-to-r from-blue-700 via-indigo-700 to-slate-900 text-white p-6 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-xs">
                {lesson.dayName} • {lesson.dayCode}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/30 text-blue-200">
                10-15 phút đọc & thực hành
              </span>
              {lesson.isAiGenerated && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/40 text-indigo-100 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Cá nhân hóa bởi AI
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-snug">
              {lesson.lessonTitle}
            </h1>

            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed pt-1">
              Phù hợp trình độ <strong className="text-white">{profile.level}</strong> • Trao đổi với {profile.communicatesWith.slice(0, 3).join(", ")}
            </p>
          </div>
        </div>

        {/* Part 1: Vocabulary */}
        {lesson.vocabulary && lesson.vocabulary.length > 0 && (
          <VocabularySection
            vocabulary={lesson.vocabulary}
            savedWords={savedWordsList.map((w) => w.word)}
            onToggleSaveWord={handleToggleSaveWord}
          />
        )}

        {/* Part 2: Communication Patterns (Formal vs Casual) */}
        {lesson.communicationPatterns && lesson.communicationPatterns.length > 0 && (
          <CommunicationPatternsSection
            patterns={lesson.communicationPatterns}
          />
        )}

        {/* Part 3: Dialogue in Action */}
        {lesson.dialogue && lesson.dialogue.length > 0 && (
          <DialogueSection dialogue={lesson.dialogue} />
        )}

        {/* Part 4: Diverse Exercises & Roleplay */}
        <ExercisesSection
          exercises={effectiveExercises}
          roleplayScenario={effectiveRoleplay}
          learnerProfile={profile}
          lessonTopic={lesson.lessonTitle}
          onOpenLiveChat={() => setIsLiveChatOpen(true)}
          onUpdateQuizScore={(score) => setCurrentQuizScore(score)}
        />

        {/* Part 5: Short Writing Task */}
        <ShortWritingSection
          task={effectiveWritingTask}
          learnerProfile={profile}
          onWritingSubmitted={(_text, _score, rating) => {
            setCurrentWritingSubmitted(true);
            setCurrentWritingScore1to5(rating);
          }}
        />

        {/* Part 6: Daily Workplace Tip */}
        {lesson.dailyTip && (
          <DailyTipCard tip={lesson.dailyTip} />
        )}

        {/* Part 7: Weekend Review (if present) */}
        {lesson.weekendReview && (
          <WeekendReviewSection
            weekendReview={lesson.weekendReview}
            learnerProfile={profile}
          />
        )}

        {/* Lesson Footer Navigation */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              const currentIdx = currentWeekObj.days.findIndex((d) => d.dayCode === currentDayCode);
              if (currentIdx > 0) {
                const prevDay = currentWeekObj.days[currentIdx - 1];
                loadDayLesson(currentWeek, prevDay.dayCode, prevDay.topic);
              } else if (currentWeek > 1) {
                const prevWeek = WEEKS_SCHEDULE.find((w) => w.weekNumber === currentWeek - 1);
                if (prevWeek) {
                  const lastDay = prevWeek.days[prevWeek.days.length - 1];
                  loadDayLesson(prevWeek.weekNumber, lastDay.dayCode, lastDay.topic);
                }
              }
            }}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Bài trước
          </button>

          <button
            onClick={() => {
              const currentIdx = currentWeekObj.days.findIndex((d) => d.dayCode === currentDayCode);
              if (currentIdx < currentWeekObj.days.length - 1) {
                const nextDay = currentWeekObj.days[currentIdx + 1];
                loadDayLesson(currentWeek, nextDay.dayCode, nextDay.topic);
              } else if (currentWeek < WEEKS_SCHEDULE.length) {
                const nextWeek = WEEKS_SCHEDULE.find((w) => w.weekNumber === currentWeek + 1);
                if (nextWeek) {
                  const firstDay = nextWeek.days[0];
                  loadDayLesson(nextWeek.weekNumber, firstDay.dayCode, firstDay.topic);
                }
              }
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
          >
            Bài tiếp theo
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 bg-white border-t border-slate-200 text-center text-xs text-slate-400">
        <p>QC English Daily • Giáo trình 6 tuần giao tiếp tiếng Anh công nghệ cho Software QC/Tester</p>
      </footer>

      {/* Modals */}
      <LearnerProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        onSave={(newProfile) => {
          setProfile(newProfile);
          generateLessonWithAi(currentWeek, currentDayCode);
        }}
      />

      <CurriculumDrawer
        isOpen={isCurriculumOpen}
        onClose={() => setIsCurriculumOpen(false)}
        selectedWeek={currentWeek}
        selectedDayCode={currentDayCode}
        completedDays={completedDays}
        onSelectDay={(week, dayCode, topic) => loadDayLesson(week, dayCode, topic)}
      />

      <SavedWordsModal
        isOpen={isSavedWordsOpen}
        onClose={() => setIsSavedWordsOpen(false)}
        savedWordsList={savedWordsList}
        onRemoveWord={(word) => setSavedWordsList(savedWordsList.filter((w) => w.word !== word))}
      />

      <LiveRoleplayModal
        isOpen={isLiveChatOpen}
        onClose={() => setIsLiveChatOpen(false)}
        learnerProfile={profile}
        currentTopic={lesson.lessonTitle}
      />

      <LearningTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        currentLessonInfo={{
          weekNumber: currentWeek,
          dayCode: currentDayCode,
          topic: lesson.lessonTitle,
          newWordsCount: lesson.vocabulary?.length || 5,
        }}
        currentQuizScore={currentQuizScore}
        currentWritingSubmitted={currentWritingSubmitted}
        currentWritingScore1to5={currentWritingScore1to5}
      />

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={profile.customApiKey || ''}
        onSaveApiKey={(newKey) => {
          setProfile((prev) => ({ ...prev, customApiKey: newKey }));
        }}
      />
    </div>
  );
}

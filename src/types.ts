export type EnglishLevel = 'Beginner' | 'Intermediate' | 'Upper-Intermediate';

export interface LearnerProfile {
  role: string;
  level: EnglishLevel;
  communicatesWith: string[];
  tools: string[];
  testTypes: string[];
  worksWithForeignClients: boolean;
  customApiKey?: string;
}

export interface VocabularyItem {
  word: string;
  ipa: string;
  partOfSpeech?: string;
  meaningVi: string;
  exampleEn: string;
  exampleVi: string;
  tip?: string;
}

export interface CommunicationPattern {
  patternName: string;
  contextVi?: string;
  formal: string;
  casual: string;
  usageNoteVi: string;
}

export interface DialogueMessage {
  speaker: string;
  role: string;
  avatarColor?: string;
  en: string;
  vi: string;
}

export type ExerciseType =
  | 'multiple_choice'
  | 'fill_blank'
  | 'word_order'
  | 'error_correction'
  | 'quick_translation';

export interface ExerciseItem {
  id: string;
  type: ExerciseType;
  typeLabelVi: string; // e.g. "Trắc nghiệm ngữ cảnh", "Điền từ vào chỗ trống", "Sắp xếp từ thành câu", "Sửa lỗi sai thường gặp", "Dịch nhanh Việt - Anh"
  instructionVi: string;
  question: string;
  // Multiple choice & Fill blank
  options?: string[];
  correctAnswer: string | number; // index or string
  // Word order
  scrambledWords?: string[];
  // Error correction
  incorrectSentence?: string;
  highlightError?: string;
  correctedSentence?: string;
  // Translation
  vietnamesePrompt?: string;
  acceptableAnswersEn?: string[];
  explanationVi: string;
}

export interface RoleplayScenario {
  scenarioVi: string;
  partnerRole: string;
  partnerMessageEn: string;
  partnerMessageVi: string;
  promptTaskVi: string;
  sampleAnswerFormal: string;
  sampleAnswerCasual: string;
}

export interface ShortWritingTask {
  titleVi: string;
  promptVi: string;
  contextScenarioVi: string;
  targetLength: string; // e.g. "3-5 câu (~50-80 từ)"
  recommendedKeywords?: string[];
  sentenceStarterEn: string;
  guidelinesVi: string[];
}

export interface ShortWritingEvaluation {
  score: number; // 0-100
  rating1to5: number; // 1-5
  wordCount: number;
  verdictVi: string;
  grammarFixes: {
    original: string;
    corrected: string;
    explanationVi: string;
  }[];
  naturalnessFeedbackVi: string;
  toneAndFormalityVi: string;
  nativeSampleAnswer: string;
  encouragementVi: string;
}

export interface DailyTip {
  titleVi: string;
  adviceVi: string;
  keyTakeawayEn: string;
}

export interface WeekendReview {
  keyWords: string[];
  summaryAdviceVi: string;
  combinedDialogue?: DialogueMessage[];
  comprehensiveWritingTask?: ShortWritingTask;
}

export interface LessonData {
  id?: string;
  weekNumber: number;
  dayCode: string; // 'T2' | 'T3' | 'T4' | 'T5' | 'T6' | 'T7'
  dayName: string;
  themeTitle: string;
  lessonTitle: string;
  vocabulary: VocabularyItem[];
  communicationPatterns: CommunicationPattern[];
  dialogue: DialogueMessage[];
  exercises: ExerciseItem[];
  roleplayScenario: RoleplayScenario;
  shortWritingTask: ShortWritingTask;
  dailyTip: DailyTip;
  weekendReview?: WeekendReview;
  isAiGenerated?: boolean;
}

export interface RoleplayEvaluation {
  score: number;
  verdictVi: string;
  strengthsVi: string[];
  grammarFixes: {
    userPart: string;
    improvedPart: string;
    reasonVi: string;
  }[];
  formalVersion: string;
  casualVersion: string;
  toneFeedbackVi: string;
  encouragementVi: string;
}

export interface ProgressLogEntry {
  id: string;
  dateStr: string;
  weekNumber: number;
  dayCode: string;
  topic: string;
  newWordsCount: number;
  quizScore10: number; // Điểm bài tập /10
  writingSubmitted: boolean;
  writingSelfScore: number; // 1-5
  speakingConfidence: number; // 1-5
  hardestWordOrPhrase: string;
  commonMistake: string;
  submittedWritingText?: string;
}

export interface DayScheduleItem {
  dayCode: string;
  dayLabel: string;
  topic: string;
  isReview?: boolean;
}

export interface WeekSchedule {
  weekNumber: number;
  themeTitle: string;
  themeDescription: string;
  days: DayScheduleItem[];
}


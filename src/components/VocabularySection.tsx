import { useState } from 'react';
import { VocabularyItem } from '../types';
import { Volume2, Bookmark, BookmarkCheck, Sparkles, Copy, Check, Lightbulb } from 'lucide-react';
import { playAudio } from '../utils/speech';

interface Props {
  vocabulary: VocabularyItem[];
  savedWords: string[]; // array of word strings
  onToggleSaveWord: (word: VocabularyItem) => void;
}

export default function VocabularySection({
  vocabulary,
  savedWords,
  onToggleSaveWord,
}: Props) {
  const [playingWord, setPlayingWord] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleSpeak = async (text: string, id: string) => {
    setPlayingWord(id);
    await playAudio(text);
    setPlayingWord(null);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
            1
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Từ Vựng Chuyên Ngành Trong Ngày</h2>
            <p className="text-xs text-slate-500">Thuật ngữ QC/Dev thực tế kèm phát âm chuẩn IPA và câu ví dụ công việc</p>
          </div>
        </div>
        <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-medium">
          {vocabulary.length} từ vựng
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vocabulary.map((item, idx) => {
          const isSaved = savedWords.includes(item.word);
          const isPlaying = playingWord === `word_${idx}`;

          return (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-white hover:border-blue-200 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header of card */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base font-bold text-slate-900 tracking-tight">{item.word}</span>
                      {item.partOfSpeech && (
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-200/70 text-slate-700 font-medium italic">
                          {item.partOfSpeech}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-blue-700 font-mono font-medium">{item.ipa}</span>
                      <button
                        onClick={() => handleSpeak(item.word, `word_${idx}`)}
                        className={`p-1 rounded-md transition-colors ${
                          isPlaying ? 'bg-blue-600 text-white animate-pulse' : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => onToggleSaveWord(item)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isSaved
                        ? 'bg-amber-50 border-amber-200 text-amber-600'
                        : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300'
                    }`}
                    title={isSaved ? "Đã lưu vào sổ tay" : "Lưu vào sổ tay từ vựng"}
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>

                {/* Vietnamese Meaning */}
                <p className="text-sm font-semibold text-emerald-800 bg-emerald-50/80 px-2.5 py-1 rounded-lg inline-block mb-3 border border-emerald-100">
                  {item.meaningVi}
                </p>

                {/* Example sentence */}
                <div className="bg-white rounded-lg p-3 border border-slate-200/60 mb-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs text-slate-800 font-medium leading-relaxed">
                      "{item.exampleEn}"
                    </p>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleSpeak(item.exampleEn, `example_${idx}`)}
                        className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Nghe đọc câu ví dụ"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleCopy(item.exampleEn, idx)}
                        className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
                        title="Sao chép câu"
                      >
                        {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 italic">
                    → {item.exampleVi}
                  </p>
                </div>
              </div>

              {/* Workplace Tip */}
              {item.tip && (
                <div className="flex items-start gap-1.5 text-[11px] text-amber-800 bg-amber-50/60 p-2 rounded-lg border border-amber-100/80 mt-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>{item.tip}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

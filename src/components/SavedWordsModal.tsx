import { useState } from 'react';
import { VocabularyItem } from '../types';
import { X, Volume2, Trash2, BookMarked, Search, Sparkles } from 'lucide-react';
import { playAudio } from '../utils/speech';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  savedWordsList: VocabularyItem[];
  onRemoveWord: (wordStr: string) => void;
}

export default function SavedWordsModal({
  isOpen,
  onClose,
  savedWordsList,
  onRemoveWord,
}: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredWords = savedWordsList.filter(
    (w) =>
      w.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.meaningVi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[85vh] flex flex-col border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-linear-to-r from-amber-600 to-orange-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <BookMarked className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">Sổ Tay Từ Vựng QC Của Bạn</h3>
              <p className="text-amber-100 text-xs mt-0.5">
                {savedWordsList.length} từ đã lưu để ôn tập hằng tuần
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 bg-slate-50 border-b border-slate-200">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm từ vựng hoặc nghĩa tiếng Việt..."
              className="w-full pl-9 pr-4 py-2 bg-white text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-slate-800"
            />
          </div>
        </div>

        {/* Word list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredWords.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <BookMarked className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-sm font-medium">Chưa có từ vựng nào trong danh sách</p>
              <p className="text-xs">
                Bấm vào biểu tượng bookmark ở mục từ vựng trong bài học để lưu lại đây!
              </p>
            </div>
          ) : (
            filteredWords.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-amber-300 hover:shadow-2xs transition-all flex items-start justify-between gap-3"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{item.word}</span>
                    <span className="text-xs text-amber-700 font-mono">{item.ipa}</span>
                    <button
                      onClick={() => playAudio(item.word)}
                      className="p-1 text-slate-400 hover:text-amber-600 rounded transition-colors"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-emerald-800 font-medium">{item.meaningVi}</p>
                  <p className="text-[11px] text-slate-600 italic">"{item.exampleEn}"</p>
                </div>

                <button
                  onClick={() => onRemoveWord(item.word)}
                  className="p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
                  title="Xóa khỏi sổ tay"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

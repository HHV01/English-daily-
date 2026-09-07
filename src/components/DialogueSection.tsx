import { useState, useRef } from 'react';
import { DialogueMessage } from '../types';
import { Volume2, Play, Square, Eye, EyeOff, MessageSquareText, UserCheck } from 'lucide-react';
import { playAudio, stopAudio } from '../utils/speech';

interface Props {
  dialogue: DialogueMessage[];
}

export default function DialogueSection({ dialogue }: Props) {
  const [showTranslations, setShowTranslations] = useState<boolean>(true);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const isCancelledRef = useRef<boolean>(false);

  const handleSpeakLine = async (text: string, index: number) => {
    setPlayingIndex(index);
    await playAudio(text);
    setPlayingIndex(null);
  };

  const handlePlayAll = async () => {
    if (isAutoPlaying) {
      isCancelledRef.current = true;
      stopAudio();
      setIsAutoPlaying(false);
      setPlayingIndex(null);
      return;
    }

    setIsAutoPlaying(true);
    isCancelledRef.current = false;

    for (let i = 0; i < dialogue.length; i++) {
      if (isCancelledRef.current) break;
      setPlayingIndex(i);
      await playAudio(dialogue[i].en, 0.95);
      // Brief pause between lines
      await new Promise((r) => setTimeout(r, 600));
    }

    setIsAutoPlaying(false);
    setPlayingIndex(null);
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 md:p-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
            3
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Hội Thoại Mẫu Trong Công Việc</h2>
            <p className="text-xs text-slate-500">Tình huống đối thoại thực chiến kèm bản dịch song ngữ</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTranslations(!showTranslations)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            {showTranslations ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showTranslations ? 'Ẩn nghĩa tiếng Việt' : 'Hiện nghĩa tiếng Việt'}
          </button>

          <button
            onClick={handlePlayAll}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isAutoPlaying
                ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-xs'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
            }`}
          >
            {isAutoPlaying ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isAutoPlaying ? 'Dừng phát' : 'Nghe toàn bộ hội thoại'}
          </button>
        </div>
      </div>

      {/* Dialogue chat thread */}
      <div className="bg-slate-50/70 p-4 md:p-5 rounded-2xl border border-slate-200/70 space-y-4">
        {dialogue.map((item, idx) => {
          const isQC = item.speaker.toLowerCase().includes("qc") || item.role.toLowerCase().includes("qc") || item.role.toLowerCase().includes("qa") || item.speaker.toLowerCase().includes("alex");
          const isCurrentPlaying = playingIndex === idx;

          return (
            <div
              key={idx}
              className={`flex items-start gap-3 transition-all ${
                isCurrentPlaying ? 'scale-[1.01]' : ''
              } ${isQC ? '' : 'flex-row-reverse'}`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-2xs ${
                  item.avatarColor || (isQC ? 'bg-emerald-600' : 'bg-blue-600')
                }`}
              >
                {item.speaker.substring(0, 2).toUpperCase()}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-2xs transition-all ${
                  isCurrentPlaying
                    ? 'ring-2 ring-emerald-500 bg-white shadow-md'
                    : isQC
                    ? 'bg-white border border-slate-200'
                    : 'bg-blue-50/70 border border-blue-100'
                }`}
              >
                {/* Speaker info */}
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{item.speaker}</span>
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
                      {item.role}
                    </span>
                  </div>
                  <button
                    onClick={() => handleSpeakLine(item.en, idx)}
                    className={`p-1 rounded-md transition-colors ${
                      isCurrentPlaying ? 'bg-emerald-500 text-white animate-pulse' : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                    }`}
                    title="Nghe câu này"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* English line */}
                <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                  {item.en}
                </p>

                {/* Vietnamese translation */}
                {showTranslations && (
                  <p className="text-xs text-slate-600 mt-2 pt-2 border-t border-slate-100 italic">
                    {item.vi}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

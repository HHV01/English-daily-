import { useState } from 'react';
import { CommunicationPattern } from '../types';
import { Volume2, MessageSquare, Mail, MessageCircle, Copy, Check } from 'lucide-react';
import { playAudio } from '../utils/speech';

interface Props {
  patterns: CommunicationPattern[];
}

export default function CommunicationPatternsSection({ patterns }: Props) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleSpeak = async (text: string, id: string) => {
    setPlayingId(id);
    await playAudio(text);
    setPlayingId(null);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
            2
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Mẫu Câu Giao Tiếp Thực Tế (Formal vs Casual)</h2>
            <p className="text-xs text-slate-500">So sánh cách nói lịch sự trong Họp/Email và cách chat nhanh trên Slack/Teams</p>
          </div>
        </div>
        <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-medium">
          {patterns.length} mẫu câu
        </span>
      </div>

      <div className="space-y-4">
        {patterns.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/30 hover:border-indigo-200 transition-all space-y-3"
          >
            {/* Pattern Title */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{item.patternName}</h3>
              </div>
              {item.contextVi && (
                <span className="text-[11px] text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full font-medium">
                  {item.contextVi}
                </span>
              )}
            </div>

            {/* Formal vs Casual Side-by-side or stacked on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {/* Formal */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-blue-600" />
                      Formal (Họp / Email / Jira)
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleSpeak(item.formal, `formal_${idx}`)}
                        className={`p-1 rounded text-slate-400 hover:text-blue-600 transition-colors ${
                          playingId === `formal_${idx}` ? 'text-blue-600 animate-pulse' : ''
                        }`}
                        title="Nghe đọc"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleCopy(item.formal, `formal_${idx}`)}
                        className="p-1 rounded text-slate-400 hover:text-slate-700 transition-colors"
                        title="Sao chép"
                      >
                        {copiedKey === `formal_${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-slate-800 leading-relaxed">
                    "{item.formal}"
                  </p>
                </div>
              </div>

              {/* Casual */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-indigo-600" />
                      Casual (Slack / Teams / Chat nhanh)
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleSpeak(item.casual, `casual_${idx}`)}
                        className={`p-1 rounded text-slate-400 hover:text-indigo-600 transition-colors ${
                          playingId === `casual_${idx}` ? 'text-indigo-600 animate-pulse' : ''
                        }`}
                        title="Nghe đọc"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleCopy(item.casual, `casual_${idx}`)}
                        className="p-1 rounded text-slate-400 hover:text-slate-700 transition-colors"
                        title="Sao chép"
                      >
                        {copiedKey === `casual_${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-slate-800 leading-relaxed">
                    "{item.casual}"
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Grammar Breakdown */}
            {item.detailedExplanationVi && (
              <div className="text-[11.5px] sm:text-xs text-slate-700 bg-slate-100/80 border border-slate-200/70 px-3.5 py-2.5 rounded-xl leading-relaxed">
                <strong className="font-bold text-slate-900">Giải thích chi tiết:</strong>{" "}
                <span className="text-slate-700">{item.detailedExplanationVi}</span>
              </div>
            )}

            {/* Usage Note */}
            {item.usageNoteVi && (
              <div className="text-[11px] text-slate-600 bg-amber-50/50 border border-amber-100/80 px-3 py-2 rounded-lg flex items-start gap-2">
                <span className="font-semibold text-amber-900 shrink-0">💡 Lưu ý:</span>
                <span className="text-slate-700">{item.usageNoteVi}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

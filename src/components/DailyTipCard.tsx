import { DailyTip } from '../types';
import { Lightbulb, Volume2, Sparkles } from 'lucide-react';
import { playAudio } from '../utils/speech';

interface Props {
  tip: DailyTip;
}

export default function DailyTipCard({ tip }: Props) {
  return (
    <div className="bg-linear-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 rounded-2xl border border-amber-200/80 p-5 md:p-6 shadow-xs">
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full">
              Mẹo Văn Hóa Công Sở IT
            </span>
            <h3 className="text-sm font-bold text-slate-900">{tip.titleVi}</h3>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed">
            {tip.adviceVi}
          </p>

          <div className="bg-white/90 p-3 rounded-xl border border-amber-200/60 flex items-center justify-between gap-3 shadow-2xs mt-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Kim chỉ nam:</span>
              <p className="text-xs font-semibold text-slate-900 mt-0.5">
                "{tip.keyTakeawayEn}"
              </p>
            </div>
            <button
              onClick={() => playAudio(tip.keyTakeawayEn)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors shrink-0"
              title="Nghe câu này"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

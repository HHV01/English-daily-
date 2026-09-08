import { useState, useEffect, useRef } from 'react';
import { Volume2, Check } from 'lucide-react';
import { getAudioSpeed, setAudioSpeed, playAudio } from '../utils/speech';

const SPEED_OPTIONS = [
  { value: 0.65, label: '0.65x', desc: 'Rất chậm (Tập phát âm từng từ)' },
  { value: 0.78, label: '0.8x', desc: 'Chậm vừa (Dễ nghe, rõ âm - Khuyên dùng)' },
  { value: 0.9, label: '0.9x', desc: 'Tự nhiên (Giao tiếp công sở)' },
  { value: 1.0, label: '1.0x', desc: 'Bản xứ (Nói nhanh thực tế)' },
];

export default function AudioSpeedButton() {
  const [currentSpeed, setCurrentSpeed] = useState<number>(0.78);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentSpeed(getAudioSpeed());

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSpeed = (speed: number) => {
    setCurrentSpeed(speed);
    setAudioSpeed(speed);
    setIsOpen(false);
    // Play quick sample to give immediate feedback
    playAudio('Audio speed set', speed);
  };

  const currentLabel = SPEED_OPTIONS.find((o) => Math.abs(o.value - currentSpeed) < 0.05)?.label || `${currentSpeed}x`;

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all shadow-2xs"
        title="Tùy chỉnh tốc độ phát âm (Đọc chậm / nhanh)"
      >
        <Volume2 className="w-3.5 h-3.5 text-blue-600" />
        <span className="font-mono text-[11px] text-blue-700 font-bold">{currentLabel}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in duration-150">
          <div className="px-2 py-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 mb-1">
            Tốc độ phát âm tiếng Anh
          </div>
          <div className="space-y-1">
            {SPEED_OPTIONS.map((opt) => {
              const isSelected = Math.abs(opt.value - currentSpeed) < 0.05;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleSelectSpeed(opt.value)}
                  className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-blue-50 text-blue-800 font-bold border border-blue-200/80'
                      : 'hover:bg-slate-50 text-slate-700 font-medium'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-blue-600">{opt.label}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-normal">{opt.desc}</div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

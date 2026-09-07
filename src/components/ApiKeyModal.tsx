import { useState } from 'react';
import { X, Key, Check, ExternalLink, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveApiKey: (newKey: string) => void;
}

export default function ApiKeyModal({ isOpen, onClose, apiKey, onSaveApiKey }: Props) {
  const [inputKey, setInputKey] = useState<string>(apiKey || '');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveApiKey(inputKey.trim());
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    setInputKey('');
    onSaveApiKey('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full flex flex-col border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-linear-to-r from-blue-700 to-indigo-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <Key className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Cài đặt Gemini API Key</h2>
              <p className="text-blue-100 text-xs mt-0.5">Kích hoạt chấm bài & luyện nói AI trực tiếp trên máy của bạn</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-xs sm:text-sm">
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl space-y-2 text-blue-900 text-xs">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Bảo mật an toàn 100%</span>
            </div>
            <p className="leading-relaxed text-slate-700">
              Mã Key của bạn được lưu an toàn trên trình duyệt cá nhân (<code className="bg-white px-1 py-0.5 rounded border border-blue-200 font-mono text-blue-800">localStorage</code>), không bao giờ bị lộ ra ngoài hay bị Google khóa.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800">
              Dán mã Gemini API Key của bạn (bắt đầu bằng <span className="font-mono text-indigo-600">AIzaSy...</span>):
            </label>
            <input
              type="text"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono text-xs text-slate-900 bg-slate-50 focus:bg-white"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 underline underline-offset-2"
            >
              <span>Lấy key miễn phí tại Google AI Studio</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            {apiKey && (
              <button
                type="button"
                onClick={handleClear}
                className="text-rose-600 hover:text-rose-700 font-medium"
              >
                Xóa key
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-200/70 font-semibold text-xs transition-colors"
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!inputKey.trim()}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-xs"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Đã lưu thành công!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Lưu & Kích hoạt AI</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

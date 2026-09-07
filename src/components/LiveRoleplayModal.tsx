import { useState, useRef, useEffect } from 'react';
import { LearnerProfile } from '../types';
import { X, Send, Volume2, Sparkles, User, RefreshCw, MessageSquare, Bot, AlertCircle } from 'lucide-react';
import { playAudio } from '../utils/speech';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  learnerProfile: LearnerProfile;
  currentTopic: string;
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

const PARTNER_OPTIONS = [
  { id: "Senior Backend Developer", name: "David (Senior Backend Dev)", role: "Backend Developer", avatar: "bg-blue-600" },
  { id: "Frontend Developer", name: "Tom (Frontend Dev)", role: "Frontend Developer", avatar: "bg-indigo-600" },
  { id: "Product Manager", name: "Sarah (Product Manager)", role: "Product Manager", avatar: "bg-purple-600" },
  { id: "Tech Lead", name: "Michael (Tech Lead)", role: "Tech Lead", avatar: "bg-amber-600" },
  { id: "Foreign Client / UAT Lead", name: "Emma (US Client / UAT Lead)", role: "Overseas Client", avatar: "bg-rose-600" },
];

export default function LiveRoleplayModal({ isOpen, onClose, learnerProfile, currentTopic }: Props) {
  const [partnerRole, setPartnerRole] = useState<string>(PARTNER_OPTIONS[0].id);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize opening message from partner
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'model',
          text: `Hey! I saw your recent update regarding "${currentTopic}". Could you summarize the current testing status or what you need from my side?\n\n[Dịch: Chào bạn! Tôi thấy cập nhật gần đây của bạn về "${currentTopic}". Bạn có thể tóm tắt nhanh tình trạng kiểm thử hoặc bạn đang cần gì từ phía tôi không?]`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [isOpen, currentTopic]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const currentPartner = PARTNER_OPTIONS.find((p) => p.id === partnerRole) || PARTNER_OPTIONS[0];

  const handleSendMessage = async (customMessage?: string) => {
    const textToSend = customMessage || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/roleplay-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partnerRole,
          topic: currentTopic,
          history: newHistory.map((m) => ({ role: m.role, text: m.text })),
          message: textToSend.trim(),
        }),
      });

      if (!res.ok) throw new Error('Không thể kết nối AI roleplay');

      const data = await res.json();
      const botMsg: ChatMessage = {
        role: 'model',
        text: data.reply || 'Got it. Let me verify on my end.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages([...newHistory, botMsg]);
    } catch (err: any) {
      console.error(err);
      setMessages([
        ...newHistory,
        {
          role: 'model',
          text: 'Sorry, I lost connection to the server. Please try again! [Dịch: Xin lỗi, mất kết nối máy chủ. Thử lại nhé!]',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        role: 'model',
        text: `Hey! I saw your recent update regarding "${currentTopic}". Could you summarize the current testing status or what you need from my side?\n\n[Dịch: Chào bạn! Tôi thấy cập nhật gần đây của bạn về "${currentTopic}". Bạn có thể tóm tắt nhanh tình trạng kiểm thử hoặc bạn đang cần gì từ phía tôi không?]`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 md:p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full h-[88vh] flex flex-col border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${currentPartner.avatar}`}>
              {currentPartner.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white">{currentPartner.name}</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <p className="text-[11px] text-slate-400">
                Chủ đề: <span className="text-blue-300 font-medium">{currentTopic}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetChat}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
              title="Khởi động lại cuộc trò chuyện"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Partner Selector Bar */}
        <div className="p-2 bg-slate-100 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[11px] font-bold text-slate-500 shrink-0 ml-1">Đổi đối tác:</span>
          {PARTNER_OPTIONS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setPartnerRole(p.id);
                setMessages([]);
              }}
              className={`px-2.5 py-1 rounded-lg shrink-0 font-medium transition-all ${
                partnerRole === p.id
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {p.role}
            </button>
          ))}
        </div>

        {/* Chat Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50">
          {messages.map((m, idx) => {
            const isUser = m.role === 'user';
            const englishPart = m.text.replace(/\[Dịch:.*?\]/gs, '').trim();

            return (
              <div
                key={idx}
                className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                    isUser ? 'bg-emerald-600 text-white' : currentPartner.avatar + ' text-white'
                  }`}
                >
                  {isUser ? 'QC' : currentPartner.name.substring(0, 2).toUpperCase()}
                </div>

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-2xs leading-relaxed ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-tr-xs'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs'
                  }`}
                >
                  <p className="font-medium whitespace-pre-wrap">{m.text}</p>

                  {!isUser && (
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{m.timestamp}</span>
                      <button
                        onClick={() => playAudio(englishPart)}
                        className="text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors"
                        title="Nghe câu tiếng Anh"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        Nghe
                      </button>
                    </div>
                  )}

                  {isUser && (
                    <div className="mt-1 text-[10px] text-blue-200 text-right">
                      {m.timestamp}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2.5 text-xs text-slate-400 italic bg-white/80 p-3 rounded-xl border border-slate-200 w-fit">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
              {currentPartner.name} đang gõ phản hồi...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 space-y-2">
          {/* Quick Suggestions */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
            <span className="text-slate-400 shrink-0 font-medium">Gợi ý nhanh:</span>
            {[
              "Could you check the logs on Staging?",
              "I have attached the STR and screen recording in Jira.",
              "It reproduces consistently on Chrome version 124.",
              "Is there any workaround for this issue?",
            ].map((suggestion, sIdx) => (
              <button
                key={sIdx}
                onClick={() => setInputText(suggestion)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg shrink-0 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Nhắn cho ${currentPartner.name} bằng tiếng Anh...`}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-slate-100 focus:bg-white text-xs text-slate-800 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              Gửi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { LearnerProfile, EnglishLevel } from '../types';
import { X, User, Check, Sparkles, Briefcase, Globe, Cpu, MessageSquare } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  profile: LearnerProfile;
  onSave: (newProfile: LearnerProfile) => void;
}

const COMMON_PARTNERS = ["Dev", "Team Lead", "PM", "BA", "Designer", "Client nước ngoài", "Scrum Master"];
const COMMON_TOOLS = ["Jira", "Slack", "Microsoft Teams", "Email / Outlook", "GitHub / GitLab PR", "Postman", "Confluence"];
const COMMON_TEST_TYPES = ["Manual Testing", "Automation Testing", "API Testing", "Performance / Load", "Mobile App Testing", "Security Testing"];

export default function LearnerProfileModal({ isOpen, onClose, profile, onSave }: Props) {
  const [formData, setFormData] = useState<LearnerProfile>({ ...profile });

  if (!isOpen) return null;

  const toggleArrayItem = (field: 'communicatesWith' | 'tools' | 'testTypes', item: string) => {
    const list = formData[field];
    if (list.includes(item)) {
      setFormData({ ...formData, [field]: list.filter(i => i !== item) });
    } else {
      setFormData({ ...formData, [field]: [...list, item] });
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-linear-to-r from-blue-700 to-indigo-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Thông tin Người học (QC/Tester)</h2>
              <p className="text-blue-100 text-xs mt-0.5">Dùng để AI cá nhân hóa bài học, mẫu câu và tình huống roleplay</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Role */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-blue-600" />
              Vai trò hiện tại
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="VD: Manual QC, Automation QA Engineer, QA Lead..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800 font-medium"
            />
          </div>

          {/* Level */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Trình độ tiếng Anh mục tiêu
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['Beginner', 'Intermediate', 'Upper-Intermediate'] as EnglishLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setFormData({ ...formData, level: lvl })}
                  className={`p-3 rounded-xl border text-center transition-all font-medium ${
                    formData.level === lvl
                      ? 'border-blue-600 bg-blue-50 text-blue-800 ring-2 ring-blue-500/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span className="block text-sm">{lvl}</span>
                  <span className="block text-[11px] text-slate-400 mt-0.5">
                    {lvl === 'Beginner' ? 'Cơ bản, từ vựng rõ' : lvl === 'Intermediate' ? 'Tự tin trao đổi dev' : 'Lưu loát, sắc sảo'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Communicates With */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              Giao tiếp thường xuyên với ai?
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_PARTNERS.map((partner) => {
                const isSelected = formData.communicatesWith.includes(partner);
                return (
                  <button
                    key={partner}
                    type="button"
                    onClick={() => toggleArrayItem('communicatesWith', partner)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-indigo-600" />}
                    {partner}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tools */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-cyan-600" />
              Công cụ giao tiếp & quản lý công việc
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_TOOLS.map((tool) => {
                const isSelected = formData.tools.includes(tool);
                return (
                  <button
                    key={tool}
                    type="button"
                    onClick={() => toggleArrayItem('tools', tool)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-cyan-50 border-cyan-500 text-cyan-800'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-cyan-600" />}
                    {tool}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Test Types */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Loại kiểm thử bạn hay làm
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_TEST_TYPES.map((type) => {
                const isSelected = formData.testTypes.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleArrayItem('testTypes', type)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-emerald-600" />}
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Foreign Client toggle */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Làm việc trực tiếp với khách hàng nước ngoài?</p>
                <p className="text-xs text-slate-500">Thêm các mẫu câu họp UAT, giải thích bug lịch sự và văn hóa Âu/Mỹ</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.worksWithForeignClients}
                onChange={(e) => setFormData({ ...formData, worksWithForeignClients: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-xs flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Lưu & Cập nhật bài học
          </button>
        </div>
      </div>
    </div>
  );
}

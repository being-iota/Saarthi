"use client";

import { useState, useEffect } from "react";
import { X, Key, Info, HelpCircle, CheckCircle } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [openaiKey, setOpenaiKey] = useState("");
  const [groqKey, setGroqKey] = useState("");
  const [openrouterKey, setOpenrouterKey] = useState("");
  const [persona, setPersona] = useState("haryanvi");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOpenaiKey(localStorage.getItem("guru_g_openai_key") || "");
      setGroqKey(localStorage.getItem("guru_g_groq_key") || "");
      setOpenrouterKey(localStorage.getItem("guru_g_openrouter_key") || "");
      setPersona(localStorage.getItem("guru_g_selected_persona") || "haryanvi");
    }
  }, [isOpen]);

  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("guru_g_openai_key", openaiKey.trim());
      localStorage.setItem("guru_g_groq_key", groqKey.trim());
      localStorage.setItem("guru_g_openrouter_key", openrouterKey.trim());
      localStorage.setItem("guru_g_selected_persona", persona);
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        onClose();
      }, 1000);
    }
  };

  const handleClear = () => {
    setOpenaiKey("");
    setGroqKey("");
    setOpenrouterKey("");
    setPersona("haryanvi");
    if (typeof window !== "undefined") {
      localStorage.removeItem("guru_g_openai_key");
      localStorage.removeItem("guru_g_groq_key");
      localStorage.removeItem("guru_g_openrouter_key");
      localStorage.setItem("guru_g_selected_persona", "haryanvi");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-brand-orange-light rounded-xl text-brand-orange">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 font-display">API Settings</h2>
              <p className="text-xs text-gray-500">Configure AI providers for live generation</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Info Alert */}
          <div className="flex gap-3 p-4 bg-orange-50 border border-orange-100 rounded-2xl text-sm text-brand-orange-dark">
            <Info className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-0.5">Mock Mode Active by Default</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Agar aapke paas API keys nahi hain, toh koi baat nahi! Shikshak-Saarthi automatic <strong>mock offline mode</strong> mein run karega. Try speaking topics like &apos;Photosynthesis&apos;, &apos;Gravity&apos;, or &apos;Water Cycle&apos; for standard responses.
              </p>
            </div>
          </div>

          {/* OpenAI Key */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span>OpenAI API Key</span>
              <a 
                href="https://platform.openai.com/api-keys" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[10px] text-brand-orange hover:underline normal-case font-normal"
              >
                Get OpenAI Key
              </a>
            </label>
            <input
              type="password"
              placeholder="sk-proj-..."
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange text-sm font-mono placeholder:font-sans"
            />
          </div>

          {/* Groq Key */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span>Groq API Key</span>
              <a 
                href="https://console.groq.com/keys" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[10px] text-brand-orange hover:underline normal-case font-normal"
              >
                Get Groq Key
              </a>
            </label>
            <input
              type="password"
              placeholder="gsk_..."
              value={groqKey}
              onChange={(e) => setGroqKey(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange text-sm font-mono placeholder:font-sans"
            />
          </div>

          {/* OpenRouter Key */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span>OpenRouter API Key</span>
              <a 
                href="https://openrouter.ai/keys" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[10px] text-brand-orange hover:underline normal-case font-normal"
              >
                Get OpenRouter Key
              </a>
            </label>
            <input
              type="password"
              placeholder="sk-or-v1-..."
              value={openrouterKey}
              onChange={(e) => setOpenrouterKey(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange text-sm font-mono placeholder:font-sans"
            />
          </div>

          {/* Active Teacher Persona */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Active Teacher Persona
            </label>
            <select
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange text-sm bg-white cursor-pointer font-semibold text-slate-700"
            >
              <option value="haryanvi">GuruG (Haryanvi Hinglish Teacher)</option>
              <option value="punjabi">Sat Sri Akal (Punjabi Hinglish Teacher)</option>
              <option value="hindi">Shikshak (Standard Hindi Teacher)</option>
              <option value="english">Professor (Formal English Educator)</option>
            </select>
          </div>

          <p className="text-[11px] text-gray-400 flex items-start gap-1.5 leading-tight">
            <HelpCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>Keys are stored locally in your browser&apos;s localStorage and never sent anywhere except to your proxy/Vercel serverless functions.</span>
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button
            onClick={handleClear}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors"
          >
            Clear Stored Keys
          </button>
          
          <button
            onClick={handleSave}
            disabled={saved}
            className={`flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-bold text-white shadow-md transition-all duration-300 ${
              saved 
                ? "bg-green-500 shadow-green-500/10" 
                : "bg-brand-orange hover:bg-brand-orange-dark shadow-orange-500/10 hover:shadow-orange-500/20"
            }`}
          >
            {saved ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save & Apply</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

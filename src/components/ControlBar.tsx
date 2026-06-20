"use client";

import { useState } from "react";
import { Mic, MicOff, Send, HelpCircle, Sparkles, BookOpen, GraduationCap } from "lucide-react";

interface ControlBarProps {
  isListening: boolean;
  status: "idle" | "listening" | "processing";
  currentMode: "explain" | "quiz" | "revise";
  onChangeMode: (mode: "explain" | "quiz" | "revise") => void;
  onStartListening: () => void;
  onStopListening: () => void;
  onSendText: (text: string) => void;
}

export default function ControlBar({
  isListening,
  status,
  currentMode,
  onChangeMode,
  onStartListening,
  onStopListening,
  onSendText,
}: ControlBarProps) {
  const [inputText, setInputText] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendText(inputText.trim());
      setInputText("");
    }
  };

  const getStatusText = () => {
    if (status === "listening") return "Aap bol rahe hain... (Listening)";
    if (status === "processing") return "Shikshak-Saarthi soch raha hai... (Processing)";
    return "Tap mic and speak: 'Explain Photosynthesis', 'Revise Gravity' or 'Start quiz on Water Cycle'";
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-2 items-center">
      {/* Help Prompt Message Box */}
      <div className="text-center text-xs font-semibold text-slate-500 py-1.5 px-4 bg-white/70 rounded-full border border-gray-100 shadow-sm flex items-center gap-1.5 transition-all">
        <Sparkles className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
        <span>{getStatusText()}</span>
      </div>

      {/* Main Bottom Capsule Control Bar */}
      <div className="w-full glass-panel rounded-full border border-white/60 shadow-xl px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 hover:shadow-2xl hover:border-white/80 animate-scale-in">
        {/* Left Side: Mode Selector */}
        <div className="flex items-center bg-slate-100/70 p-1.5 rounded-full border border-slate-200/50 shrink-0 shadow-inner">
          <button
            onClick={() => onChangeMode("explain")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
              currentMode === "explain"
                ? "bg-gradient-to-r from-brand-orange to-orange-500 text-white shadow-md shadow-orange-500/20 scale-[1.03]"
                : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Explain</span>
          </button>
          <button
            onClick={() => onChangeMode("revise")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
              currentMode === "revise"
                ? "bg-gradient-to-r from-brand-orange to-orange-500 text-white shadow-md shadow-orange-500/20 scale-[1.03]"
                : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Revise</span>
          </button>
          <button
            onClick={() => onChangeMode("quiz")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
              currentMode === "quiz"
                ? "bg-gradient-to-r from-brand-orange to-orange-500 text-white shadow-md shadow-orange-500/20 scale-[1.03]"
                : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Quiz</span>
          </button>
        </div>

        {/* Center: Microphone Trigger Capsule Button */}
        <div className="flex items-center justify-center shrink-0 relative px-10">
          {/* Left waveform bars */}
          {isListening && (
            <div className="absolute right-[calc(50%+34px)] flex items-end gap-1 h-9 pointer-events-none bottom-3">
              <span className="w-1 bg-rose-500 rounded-full animate-equalize-1"></span>
              <span className="w-1 bg-rose-500 rounded-full animate-equalize-2"></span>
              <span className="w-1 bg-rose-500 rounded-full animate-equalize-3"></span>
              <span className="w-1 bg-rose-500 rounded-full animate-equalize-4"></span>
            </div>
          )}

          <button
            onClick={isListening ? onStopListening : onStartListening}
            disabled={status === "processing"}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 relative z-10 shadow-lg ${
              isListening
                ? "bg-rose-500 hover:bg-rose-600 text-white animate-pulse-ring scale-110 shadow-rose-500/20"
                : "bg-gradient-to-br from-brand-orange to-orange-500 hover:from-orange-500 hover:to-brand-orange-dark text-white shadow-orange-500/25 hover:scale-105"
            } ${status === "processing" ? "opacity-50 cursor-not-allowed" : ""}`}
            title={isListening ? "Stop listening" : "Start Voice command"}
          >
            {isListening ? (
              <MicOff className="w-6 h-6" />
            ) : (
              <Mic className="w-6 h-6" />
            )}
          </button>

          {/* Right waveform bars */}
          {isListening && (
            <div className="absolute left-[calc(50%+34px)] flex items-end gap-1 h-9 pointer-events-none bottom-3">
              <span className="w-1 bg-rose-500 rounded-full animate-equalize-4"></span>
              <span className="w-1 bg-rose-500 rounded-full animate-equalize-3"></span>
              <span className="w-1 bg-rose-500 rounded-full animate-equalize-2"></span>
              <span className="w-1 bg-rose-500 rounded-full animate-equalize-1"></span>
            </div>
          )}
        </div>

        {/* Right Side: Manual Command Input */}
        <form onSubmit={handleFormSubmit} className="w-full sm:max-w-xs flex items-center gap-1.5 bg-slate-100/70 border border-slate-200/50 rounded-full py-2 px-3.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-orange/20 focus-within:border-brand-orange/50 transition-all duration-300 shadow-inner">
          <input
            type="text"
            placeholder="Kuch type karein... (e.g. Gravity)"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={status === "processing"}
            className="w-full bg-transparent border-none text-xs font-semibold focus:outline-none placeholder:text-gray-400 text-slate-700 pl-1"
          />
          <button
            type="submit"
            disabled={status === "processing" || !inputText.trim()}
            className="p-2 rounded-full bg-gradient-to-r from-brand-orange to-orange-500 hover:from-orange-500 hover:to-brand-orange-dark text-white transition-all shadow-md disabled:opacity-50 disabled:from-gray-300 disabled:to-gray-300 disabled:shadow-none"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

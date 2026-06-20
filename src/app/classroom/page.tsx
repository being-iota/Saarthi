"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import SmartBoard from "@/components/SmartBoard";
import ControlBar from "@/components/ControlBar";
import SettingsModal from "@/components/SettingsModal";
import { Sparkles, Info } from "lucide-react";

export default function ClassroomPage() {
  const [boardData, setBoardData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechStatus, setSpeechStatus] = useState<"idle" | "listening" | "processing">("idle");
  const [currentMode, setCurrentMode] = useState<"explain" | "quiz" | "revise">("explain");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [quizCommand, setQuizCommand] = useState("");
  const [quizCommandCount, setQuizCommandCount] = useState(0);

  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition on Mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = "en-IN"; // English (India) accommodates Hinglish voice styles

        rec.onstart = () => {
          setIsListening(true);
          setSpeechStatus("listening");
          stopSpeaking(); // stop any current speech
        };

        rec.onresult = (event: any) => {
          const resultText = event.results[0][0].transcript;
          if (resultText) {
            const isCommand = handleVoiceCommand(resultText);
            if (!isCommand) {
              handleQuery(resultText);
            }
          }
        };

        rec.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
          setSpeechStatus("idle");
        };

        rec.onend = () => {
          setIsListening(false);
          if (speechStatus === "listening") {
            setSpeechStatus("idle");
          }
        };

        recognitionRef.current = rec;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speechStatus]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error("Failed to start speech recognition:", err);
      }
    } else {
      alert("Aapka browser Web Speech API support nahi karta. Please use Google Chrome or Edge.");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      setSpeechStatus("idle");
    }
  };

  // Trigger TTS Speak
  const startSpeaking = (dataObj: any) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    
    stopSpeaking();
    
    let textToSpeak = "";
    if (dataObj.type === "explain") {
      textToSpeak = `${dataObj.explanation}. Let me give you an analogy. ${dataObj.analogy}`;
    } else if (dataObj.type === "revise") {
      const bulletsText = dataObj.bullets?.join(". ") || "";
      textToSpeak = `${dataObj.topic} revision notes. ${bulletsText}. Analogy: ${dataObj.analogy}`;
    } else if (dataObj.type === "quiz" && dataObj.questions) {
      // Speak the first question and options
      const q = dataObj.questions[0];
      if (q) {
        const optionsText = q.options.map((o: string, idx: number) => `Option ${String.fromCharCode(65 + idx)}: ${o}`).join(". ");
        textToSpeak = `Quiz time for ${dataObj.topic}. Question 1: ${q.question}. ${optionsText}`;
      }
    }

    if (!textToSpeak) return;
    speakTextDirectly(textToSpeak);
  };

  const speakTextDirectly = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    stopSpeaking();
    
    const chunks = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    setIsSpeaking(true);

    chunks.forEach((chunk, index) => {
      const utterance = new SpeechSynthesisUtterance(chunk.trim());
      const voices = window.speechSynthesis.getVoices();
      
      const selectedPersona = localStorage.getItem("guru_g_selected_persona") || "haryanvi";
      let voiceToUse = null;
      if (selectedPersona === "hindi") {
        voiceToUse = voices.find(v => v.lang.includes("hi-IN") || v.lang.startsWith("hi"));
      } else if (selectedPersona === "english") {
        voiceToUse = voices.find(v => v.lang.includes("en-US") || v.lang.includes("en-GB") || v.lang.includes("en-IN"));
      }
      
      if (!voiceToUse) {
        voiceToUse = voices.find(
          (v) => v.lang.includes("IN") || v.name.toLowerCase().includes("india") || v.lang.includes("hi")
        );
      }
      if (voiceToUse) {
        utterance.voice = voiceToUse;
      }
      utterance.rate = 0.92;

      if (index === chunks.length - 1) {
        utterance.onend = () => setIsSpeaking(false);
      }

      window.speechSynthesis.speak(utterance);
    });
  };

  const handleVoiceCommand = (text: string): boolean => {
    const clean = text.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    
    if (clean === "next" || clean === "next question" || clean === "agla" || clean === "agla question" || clean === "go next") {
      setQuizCommand("next");
      setQuizCommandCount(p => p + 1);
      return true;
    }
    
    if (clean === "reset" || clean === "restart" || clean === "reset quiz" || clean === "restart quiz") {
      setQuizCommand("reset");
      setQuizCommandCount(p => p + 1);
      return true;
    }
    
    if (clean === "replay" || clean === "speak again" || clean === "dubara" || clean === "repeat" || clean === "speak") {
      if (boardData) {
        startSpeaking(boardData);
      }
      return true;
    }
    
    if (clean === "stop" || clean === "silence" || clean === "shant" || clean === "stop speaking" || clean === "mute") {
      stopSpeaking();
      return true;
    }

    return false;
  };

  const handleQuestionChange = (index: number) => {
    if (boardData && boardData.type === "quiz" && boardData.questions) {
      const q = boardData.questions[index];
      if (q) {
        stopSpeaking();
        const optionsText = q.options.map((o: string, idx: number) => `Option ${String.fromCharCode(65 + idx)}: ${o}`).join(". ");
        const textToSpeak = `Question ${index + 1}: ${q.question}. ${optionsText}`;
        speakTextDirectly(textToSpeak);
      }
    }
  };

  const stopSpeaking = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Main Handler for sending input to AI Router
  const handleQuery = async (queryText: string) => {
    setLoading(true);
    setSpeechStatus("processing");
    stopSpeaking();

    // Fetch keys from localStorage if present
    const openaiKey = localStorage.getItem("guru_g_openai_key") || "";
    const groqKey = localStorage.getItem("guru_g_groq_key") || "";
    const openrouterKey = localStorage.getItem("guru_g_openrouter_key") || "";
    const selectedPersona = localStorage.getItem("guru_g_selected_persona") || "haryanvi";

    try {
      const response = await fetch("/api/ai/router", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-openai-key": openaiKey,
          "x-groq-key": groqKey,
          "x-openrouter-key": openrouterKey,
        },
        body: JSON.stringify({
          text: queryText,
          mode: currentMode,
          persona: selectedPersona,
        }),
      });

      if (!response.ok) {
        throw new Error("API call failed");
      }

      const data = await response.json();
      setBoardData(data);

      // Auto-trigger TTS voice read
      startSpeaking(data);
      
      // Update UI mode state if router determined another mode
      if (data.parsedIntent?.detectedMode) {
        setCurrentMode(data.parsedIntent.detectedMode);
      }
    } catch (err) {
      console.error("Failed to parse classroom command:", err);
    } finally {
      setLoading(false);
      setSpeechStatus("idle");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between pb-12">
      {/* Floating Header */}
      <Header onOpenSettings={() => setShowSettings(true)} />

      {/* Main Body */}
      <main className="flex-1 w-full px-4 md:px-8 pt-20 pb-6 flex flex-col justify-center gap-8 max-w-6xl mx-auto">
        {/* Active Classroom Mode Pill */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-brand-orange-light border border-orange-100 rounded-full text-brand-orange text-xs font-bold shadow-sm shadow-orange-500/5 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
            <span>CLASSROOM MODE IS ACTIVE (LIVE DEMO)</span>
          </div>
        </div>

        {/* Smart Board */}
        <SmartBoard
          data={boardData}
          loading={loading}
          isSpeaking={isSpeaking}
          onReplaySpeech={() => boardData && startSpeaking(boardData)}
          onStopSpeech={stopSpeaking}
          quizCommand={quizCommand}
          quizCommandCount={quizCommandCount}
          onQuestionChange={handleQuestionChange}
        />

        {/* Control Bar */}
        <ControlBar
          isListening={isListening}
          status={speechStatus}
          currentMode={currentMode}
          onChangeMode={setCurrentMode}
          onStartListening={startListening}
          onStopListening={stopListening}
          onSendText={handleQuery}
        />
      </main>

      {/* Settings Modal */}
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}

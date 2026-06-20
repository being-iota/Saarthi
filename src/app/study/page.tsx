"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import SettingsModal from "@/components/SettingsModal";
import { getAllDocs, saveDoc, deleteDoc as removePersistentDoc } from "@/lib/db";
import { 
  FileText, 
  UploadCloud, 
  Sparkles, 
  HelpCircle, 
  BookOpen, 
  Volume2, 
  VolumeX,
  FileCheck,
  ClipboardList,
  Check,
  X,
  Trash2
} from "lucide-react";

const cleanDocName = (name: string): string => {
  return name.replace(/^[0-9a-f]{8}[-_][0-9a-f]{4}[-_][0-9a-f]{4}[-_][0-9a-f]{4}[-_][0-9a-f]{12}[-_]/i, "");
};

interface RecallItem {
  question: string;
  answer: string;
}

interface MockDocData {
  title: string;
  summary: string;
  bullets: string[];
  quiz: {
    question: string;
    options: string[];
    answerIndex: number;
  }[];
  recall: RecallItem[];
}

const MOCK_DOCS: Record<string, MockDocData> = {
  "Light & Reflection.pdf": {
    title: "Light & Reflection",
    summary: "Light ek energy ka form hai jo hume objects dekhne mein help karta hai. Jab light kisi surface par strike karke wapas aati hai, use Reflection kehte hain. Yeh bilkul waisa hi hai jaise ek leather ball wall par strike karke wapas aapke haath mein aati hai!",
    bullets: [
      "Light travels in a straight line (rectilinear propagation).",
      "Reflection ke do laws hote hain: Angle of Incidence is equal to Angle of Reflection.",
      "Mirrors are polished surfaces that reflect almost all light striking them.",
      "Virtual image screen par project nahi ho sakti, real image project ho sakti hai.",
      "Spherical mirrors do type ke hote hain: Concave (caves inward) aur Convex (bulges outward)."
    ],
    quiz: [
      {
        question: "Kaun sa mirror light ko converge karta hai?",
        options: ["Concave Mirror", "Convex Mirror", "Plane Mirror", "None of these"],
        answerIndex: 0
      },
      {
        question: "Angle of Incidence aur Angle of Reflection ke beech kya rishta hai?",
        options: ["Angle of Incidence bada hota hai", "Dono equal hote hain", "Angle of Reflection bada hota hai", "Koi rishta nahi hai"],
        answerIndex: 1
      }
    ],
    recall: [
      {
        question: "Light kis form ki energy hai aur yeh humari kaise help karti hai?",
        answer: "Light ek energy ka form hai jo surfaces se reflect hokar humari eyes mein enter karti hai, jisse hum objects dekh paate hain."
      },
      {
        question: "Reflection ke dono laws kya hain?",
        answer: "1. Angle of incidence is equal to the angle of reflection. 2. Incident ray, reflected ray, aur normal sab ek hi plane par hote hain."
      },
      {
        question: "Mirrors kis tarah ke surface hote hain?",
        answer: "Mirrors highly polished, smooth surfaces hote hain jo apne upar girne wali lagbhag saari light ko reflect kar dete hain."
      },
      {
        question: "Virtual image aur Real image mein main difference kya hai?",
        answer: "Real image ko screen par project kiya ja sakta hai (jaise cinema hall mein), jabki virtual image ko screen par project nahi kiya ja sakta (jaise plane mirror mein humara chehra)."
      },
      {
        question: "Spherical mirrors ke dono types ko describe karein.",
        answer: "Concave mirror andar ki taraf curved hota hai (caves inward) aur light ko converge karta hai. Convex mirror bahar ki taraf bulging hota hai aur light ko diverge karta hai."
      }
    ]
  },
  "Indian Independence Movement.pdf": {
    title: "Indian Independence Movement",
    summary: "Indian Independence Movement British rule ke khilaf desh ko azaad karane ki ek lambi ladaai thi. Isme Satyagraha, Non-cooperation, aur Quit India jaise movements shamil the. Yeh deshbhakti ki aisi aag thi jisme har bhartiya desh ko azaad dekhna chahta tha.",
    bullets: [
      "1857 ka Revolt azaadi ki pehli badi ladaai thi (First War of Independence).",
      "Mahatma Gandhi ne Satyagraha ke zarriye non-violence se ladaai ladi.",
      "1942 mein Quit India Movement launch kiya gaya tha.",
      "Subhas Chandra Bose ne Azad Hind Fauj banakar armed struggle kiya.",
      "15 August 1947 ko India ko finally independence mili."
    ],
    quiz: [
      {
        question: "Satyagraha movement ki shuruwat kisne ki thi?",
        options: ["Subhas Chandra Bose", "Mahatma Gandhi", "Bhagat Singh", "Jawaharlal Nehru"],
        answerIndex: 1
      },
      {
        question: "India kis year mein azaad hua?",
        options: ["1945", "1947", "1950", "1962"],
        answerIndex: 1
      }
    ],
    recall: [
      {
        question: "1857 ke Revolt ko kis naam se jana jata hai aur yeh kyun important hai?",
        answer: "1857 ka Revolt azaadi ki pehli badi ladaai thi (First War of Independence), jisne British rule ki neev hila di thi."
      },
      {
        question: "Mahatma Gandhi ne azaadi ki ladaai mein kis weapon (principle) ka use kiya?",
        answer: "Mahatma Gandhi ne Satyagraha ka use kiya, jo truth aur non-violence (ahimsa) par based ek peaceful protest ka tarika tha."
      },
      {
        question: "Quit India Movement kis saal mein shuru hua aur iska kya nara tha?",
        answer: "Quit India Movement 1942 mein launch kiya gaya tha, aur isme Gandhiji ne 'Karo ya Maro' (Do or Die) ka nara diya tha."
      },
      {
        question: "Azad Hind Fauj ki sthapna kisne ki aur unka kya approach tha?",
        answer: "Subhas Chandra Bose ne Azad Hind Fauj banakar armed struggle (sainik sangharsh) ke jariye desh ko azaad karane ka prayas kiya."
      },
      {
        question: "India ko finally independence kab mili?",
        answer: "India ko finally 15 August 1947 ko British rule se poori tarah azaadi mili."
      }
    ]
  }
};

export default function StudyPage() {
  const [showSettings, setShowSettings] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<"summary" | "quiz" | "revision" | "recall">("summary");
  const [customDocs, setCustomDocs] = useState<Record<string, MockDocData>>(MOCK_DOCS);
  const [docContent, setDocContent] = useState<MockDocData | null>(null);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, number>>({});
  const [expandedRecall, setExpandedRecall] = useState<Record<number, boolean>>({});
  const [isSpeaking, setIsSpeaking] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadPersistentDocs() {
      try {
        const persistedDocs = await getAllDocs();
        setCustomDocs(prev => ({
          ...prev,
          ...persistedDocs
        }));
      } catch (err) {
        console.error("Failed to load persisted docs from IndexedDB:", err);
      }
    }
    loadPersistentDocs();
  }, []);

  const handleDeleteDoc = async (e: React.MouseEvent, docName: string) => {
    e.stopPropagation();
    if (docName in MOCK_DOCS) {
      alert("Default mock classroom guides cannot be deleted.");
      return;
    }
    if (confirm(`Are you sure you want to delete "${docName}"?`)) {
      try {
        await removePersistentDoc(docName);
        setCustomDocs(prev => {
          const next = { ...prev };
          delete next[docName];
          return next;
        });
        if (selectedDoc === docName) {
          setSelectedDoc(null);
          setDocContent(null);
        }
      } catch (err) {
        console.error("Failed to delete doc:", err);
      }
    }
  };

  // Load a document (mock or custom uploaded)
  const loadDoc = (docName: string, data: MockDocData) => {
    setSelectedDoc(docName);
    setDocContent(data);
    setSelectedQuizAnswers({});
    setExpandedRecall({});
    setActiveTab("summary");
    stopSpeaking();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    stopSpeaking();

    // Check if we have mock data matching filename
    const mockMatch = MOCK_DOCS[file.name];
    if (mockMatch) {
      setTimeout(() => {
        loadDoc(file.name, mockMatch);
        setUploading(false);
      }, 1200);
      return;
    }

    // Call server API for parsing PDF
    const formData = new FormData();
    formData.append("file", file);

    try {
      const parseResponse = await fetch("/api/parse-pdf", {
        method: "POST",
        body: formData,
      });

      if (!parseResponse.ok) throw new Error("Failed to parse file");
      const parseData = await parseResponse.json();

      // Trigger AI calls to generate summary, quiz, bullets based on extracted text
      const extractedText = parseData.text || "General Study Topic";
      const topicName = cleanDocName(file.name.replace(/\.[^/.]+$/, ""));

      const openaiKey = localStorage.getItem("guru_g_openai_key") || "";
      const groqKey = localStorage.getItem("guru_g_groq_key") || "";
      const openrouterKey = localStorage.getItem("guru_g_openrouter_key") || "";
      const selectedPersona = localStorage.getItem("guru_g_selected_persona") || "haryanvi";
      const headers = {
        "Content-Type": "application/json",
        "x-openai-key": openaiKey,
        "x-groq-key": groqKey,
        "x-openrouter-key": openrouterKey,
      };

      // Fetch Summary, Revision Notes, and Quiz in parallel
      const [summaryRes, reviseRes, quizRes] = await Promise.all([
        fetch("/api/ai/explain", {
          method: "POST",
          headers,
          body: JSON.stringify({ topic: topicName, context: extractedText.slice(0, 4000), persona: selectedPersona }),
        }),
        fetch("/api/ai/revise", {
          method: "POST",
          headers,
          body: JSON.stringify({ topic: topicName, context: extractedText.slice(0, 4000), persona: selectedPersona }),
        }),
        fetch("/api/ai/quiz", {
          method: "POST",
          headers,
          body: JSON.stringify({ topic: topicName, context: extractedText.slice(0, 4000), persona: selectedPersona }),
        })
      ]);

      if (!summaryRes.ok || !reviseRes.ok || !quizRes.ok) {
        throw new Error("One or more AI generation calls failed");
      }

      const [summaryData, reviseData, quizData] = await Promise.all([
        summaryRes.json(),
        reviseRes.json(),
        quizRes.json()
      ]);

      const newDocData: MockDocData = {
        title: topicName,
        summary: summaryData.explanation || "No summary generated.",
        bullets: reviseData.bullets || ["Point 1 extracted", "Point 2 extracted"],
        quiz: quizData.questions || [
          {
            question: `What is the main theme of ${topicName}?`,
            options: ["Option 1", "Option 2", "Option 3", "Option 4"],
            answerIndex: 0
          }
        ],
        recall: reviseData.recall || []
      };

      setCustomDocs(prev => ({
        ...prev,
        [file.name]: newDocData
      }));
      await saveDoc(file.name, newDocData);
      loadDoc(file.name, newDocData);

    } catch (err) {
      console.error(err);
      // Fallback fallback
      const fallbackData: MockDocData = {
        title: file.name.replace(/\.[^/.]+$/, ""),
        summary: `This is an extracted study guide for ${file.name}. Double check your API settings to generate AI summary notes.`,
        bullets: [
          "Study materials loaded successfully.",
          "Contains key formulas and definitions.",
          "Configure Groq or OpenAI keys in settings for smart summaries.",
          "Use the Quiz tab to build classroom interactions.",
          "Ideal for last-minute exam revision."
        ],
        quiz: [
          {
            question: "Is this document loaded in mock fallback mode?",
            options: ["Yes, keys are missing", "No, it's live AI", "Maybe", "Don't know"],
            answerIndex: 0
          }
        ],
        recall: [
          {
            question: "Is this document loaded in mock fallback mode?",
            answer: "Yes, keys are missing or invalid, so the local fallback has loaded."
          }
        ]
      };
      setCustomDocs(prev => ({
        ...prev,
        [file.name]: fallbackData
      }));
      await saveDoc(file.name, fallbackData);
      loadDoc(file.name, fallbackData);
    } finally {
      setUploading(false);
    }
  };

  // TTS Controls
  const startSpeaking = () => {
    if (typeof window === "undefined" || !window.speechSynthesis || !docContent) return;
    
    stopSpeaking();
    
    let textToSpeak = "";
    if (activeTab === "summary") {
      textToSpeak = docContent.summary;
    } else if (activeTab === "revision" || activeTab === "recall") {
      textToSpeak = `${docContent.title} revision points. ${docContent.bullets.join(". ")}`;
    } else if (activeTab === "quiz") {
      textToSpeak = docContent.quiz.map((q, idx) => `Question ${idx + 1}: ${q.question}`).join(". ");
    }

    if (!textToSpeak) return;

    setIsSpeaking(true);
    const chunks = textToSpeak.split(/[.!?]+/).filter(s => s.trim().length > 0);

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
      if (voiceToUse) utterance.voice = voiceToUse;
      utterance.rate = 0.95;

      if (index === chunks.length - 1) {
        utterance.onend = () => setIsSpeaking(false);
      }

      window.speechSynthesis.speak(utterance);
    });
  };

  const stopSpeaking = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleQuizAnswer = (qIdx: number, oIdx: number) => {
    if (selectedQuizAnswers[qIdx] !== undefined) return;
    setSelectedQuizAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
  };

  return (
    <div className="min-h-screen flex flex-col justify-between pb-12">
      {/* Floating Header */}
      <Header onOpenSettings={() => setShowSettings(true)} />

      {/* Main Body */}
      <main className="flex-1 w-full px-4 md:px-8 pt-20 pb-6 max-w-6xl mx-auto flex flex-col justify-center gap-6">
        
        {/* Banner */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-100 border border-slate-200 rounded-full text-slate-600 text-xs font-bold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            <span>STUDY MODE</span>
          </div>
        </div>

        {/* Outer Dual-Panel Grid */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          
          {/* Left Panel: Upload & Recent files */}
          <div className="w-full lg:w-1/3 flex flex-col gap-5">
            {/* Upload Zone */}
             <div 
               onClick={() => fileInputRef.current?.click()}
               className="border-2 border-dashed border-orange-200 hover:border-brand-orange bg-white hover:bg-orange-50/20 rounded-3xl p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[200px] hover:shadow-lg hover:-translate-y-0.5"
             >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept=".pdf,.txt" 
                className="hidden" 
              />
              
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs font-bold text-slate-500">Extracting content...</span>
                </div>
              ) : (
                <>
                  <div className="p-4 bg-brand-orange-light rounded-2xl text-brand-orange mb-3 transition-transform duration-300 hover:scale-110">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 font-display">Upload PDF or TXT</h4>
                  <p className="text-xs text-gray-500 mt-1 max-w-[200px] leading-relaxed">
                    Upload textbooks or classroom notes to generate AI revision guides.
                  </p>
                </>
              )}
            </div>

            {/* Recent PDFs card */}
            <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-md hover:shadow-lg transition-all duration-300 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                <span>Recent Classroom Guides</span>
              </h3>
              
              <div className="space-y-2">
                {Object.keys(customDocs).map((docName) => {
                  const isMock = docName in MOCK_DOCS;
                  return (
                    <div key={docName} className="group/item flex items-center gap-2">
                      <button
                        onClick={() => loadDoc(docName, customDocs[docName])}
                        className={`flex-1 flex items-center gap-3 p-3 rounded-2xl text-left border text-xs font-bold transition-all duration-250 hover:-translate-y-0.5 ${
                          selectedDoc === docName 
                            ? "bg-gradient-to-r from-brand-orange/10 to-orange-50/30 border-orange-300 text-brand-orange shadow-sm" 
                            : "bg-slate-50/50 border-slate-100 hover:bg-slate-100/80 hover:border-slate-200 text-slate-600 shadow-sm"
                        }`}
                      >
                        <FileText className="w-4 h-4 shrink-0 text-slate-400" />
                        <span className="truncate flex-1">{cleanDocName(docName)}</span>
                      </button>
                      
                      {!isMock && (
                        <button
                          onClick={(e) => handleDeleteDoc(e, docName)}
                          className="opacity-0 group-hover/item:opacity-100 p-2 hover:bg-rose-50 hover:text-rose-500 rounded-xl text-slate-400 transition-all border border-transparent hover:border-rose-100"
                          title="Delete saved guide"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Panel: Content Card */}
          <div className="w-full lg:w-2/3 bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[440px] animate-scale-in animate-fade-in-up">
            {docContent ? (
              <div className="flex-1 flex flex-col">
                {/* Tabs Selector */}
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 bg-gray-50">
                  <div className="flex items-center gap-1.5 overflow-x-auto max-w-[70%]">
                    <button
                      onClick={() => setActiveTab("summary")}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all duration-300 ${
                        activeTab === "summary" 
                          ? "bg-brand-orange text-white shadow-md shadow-orange-500/20 scale-[1.02]" 
                          : "text-slate-500 hover:text-slate-800 hover:bg-white/70"
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Summary</span>
                    </button>
                    
                    <button
                      onClick={() => setActiveTab("revision")}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all duration-300 ${
                        activeTab === "revision" 
                          ? "bg-brand-orange text-white shadow-md shadow-orange-500/20 scale-[1.02]" 
                          : "text-slate-500 hover:text-slate-800 hover:bg-white/70"
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Revision Notes</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("quiz")}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all duration-300 ${
                        activeTab === "quiz" 
                          ? "bg-brand-orange text-white shadow-md shadow-orange-500/20 scale-[1.02]" 
                          : "text-slate-500 hover:text-slate-800 hover:bg-white/70"
                      }`}
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Quiz</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("recall")}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all duration-300 ${
                        activeTab === "recall" 
                          ? "bg-brand-orange text-white shadow-md shadow-orange-500/20 scale-[1.02]" 
                          : "text-slate-500 hover:text-slate-800 hover:bg-white/70"
                      }`}
                    >
                      <ClipboardList className="w-3.5 h-3.5" />
                      <span>Recall Notes</span>
                    </button>
                  </div>

                  {/* Read Aloud button */}
                  <button
                    onClick={isSpeaking ? stopSpeaking : startSpeaking}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                      isSpeaking
                        ? "bg-rose-50 border-rose-100 text-rose-600 animate-pulse"
                        : "bg-white border-gray-200 text-gray-600 hover:text-brand-orange"
                    }`}
                  >
                    {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isSpeaking ? "Stop" : "Read Aloud"}</span>
                  </button>
                </div>

                {/* Tab Contents */}
                <div className="p-6 flex-1">
                  <h2 className="text-xl font-bold font-display text-slate-800 mb-4">{cleanDocName(docContent.title)}</h2>
                  
                  {/* Summary Tab */}
                  {activeTab === "summary" && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <p className="text-base text-slate-700 leading-relaxed font-display">
                        {docContent.summary}
                      </p>
                    </div>
                  )}

                  {/* Revision Notes Tab */}
                  {activeTab === "revision" && (
                    <div className="space-y-3 animate-in fade-in duration-200">
                      {docContent.bullets.map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 shrink-0 bg-brand-orange-light text-brand-orange rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5">
                            {idx + 1}
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed font-display">
                            {bullet}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Recall Notes Tab */}
                  {activeTab === "recall" && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-slate-500 font-semibold">
                          💡 Active Recall: Answer the question in your mind first, then check the answer!
                        </p>
                        {docContent.recall && docContent.recall.length > 0 && (
                          <button
                            onClick={() => {
                              const allExpanded = Object.keys(expandedRecall).length === docContent.recall.length;
                              const nextState: Record<number, boolean> = {};
                              if (!allExpanded) {
                                docContent.recall.forEach((_, idx) => {
                                  nextState[idx] = true;
                                });
                              }
                              setExpandedRecall(nextState);
                            }}
                            className="text-[10px] font-bold text-brand-orange hover:underline"
                          >
                            {Object.keys(expandedRecall).length === (docContent.recall?.length || 0)
                              ? "Hide All Answers"
                              : "Reveal All Answers"}
                          </button>
                        )}
                      </div>
                      
                      {docContent.recall && docContent.recall.length > 0 ? (
                        <div className="grid grid-cols-1 gap-3">
                          {docContent.recall.map((item, idx) => {
                            const isRevealed = !!expandedRecall[idx];
                            return (
                              <div
                                key={idx}
                                className={`border rounded-2xl p-4 transition-all duration-300 ${
                                  isRevealed
                                    ? "border-orange-300 bg-orange-50/20 shadow-md shadow-orange-500/5 -translate-y-0.5"
                                    : "border-slate-100 bg-white hover:border-orange-200 hover:shadow-md hover:bg-slate-50/30"
                                }`}
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex gap-2.5 items-start">
                                    <span className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 transition-colors duration-300 ${
                                      isRevealed ? "bg-brand-orange text-white" : "bg-brand-orange-light text-brand-orange"
                                    }`}>
                                      ?
                                    </span>
                                    <h4 className="text-sm font-extrabold text-slate-800 leading-relaxed">
                                      {item.question}
                                    </h4>
                                  </div>
                                  <button
                                    onClick={() => setExpandedRecall(prev => ({ ...prev, [idx]: !prev[idx] }))}
                                    className={`px-3 py-1 rounded-full text-[10px] font-bold shrink-0 transition-all duration-300 ${
                                      isRevealed
                                        ? "bg-brand-orange text-white shadow-sm shadow-orange-500/10"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800"
                                    }`}
                                  >
                                    {isRevealed ? "Hide Answer" : "Reveal Answer"}
                                  </button>
                                </div>
                                
                                {isRevealed && (
                                  <div className="mt-3 pt-3 border-t border-dashed border-orange-100 animate-in slide-in-from-top-2 duration-250">
                                    <p className="text-xs text-slate-600 leading-relaxed pl-7 font-display">
                                      {item.answer}
                                    </p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-slate-400 text-xs">
                          No active recall questions available for this document.
                        </div>
                      )}
                    </div>
                  )}

                  {/* Quiz Tab */}
                  {activeTab === "quiz" && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      {docContent.quiz.map((q, qIdx) => (
                        <div key={qIdx} className="space-y-4 p-5 bg-slate-50/70 rounded-2xl border border-slate-100">
                          <h4 className="text-sm font-extrabold text-slate-800 flex items-start gap-2">
                            <span className="w-5 h-5 shrink-0 bg-brand-orange-light text-brand-orange rounded-full flex items-center justify-center text-[10px] font-extrabold mt-0.5">
                              {qIdx + 1}
                            </span>
                            <span>{q.question}</span>
                          </h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-7">
                            {q.options.map((opt, oIdx) => {
                              const isSelected = selectedQuizAnswers[qIdx] === oIdx;
                              const hasAnswered = selectedQuizAnswers[qIdx] !== undefined;
                              const isCorrect = oIdx === q.answerIndex;
                              
                              let optStyle = "bg-white border-slate-200/60 text-slate-700 hover:bg-white hover:border-brand-orange/40 hover:shadow-md hover:-translate-y-0.5";
                              if (hasAnswered) {
                                if (isCorrect) {
                                  optStyle = "bg-emerald-50 border-emerald-400 text-emerald-800 shadow-md shadow-emerald-500/5 font-semibold";
                                } else if (isSelected) {
                                  optStyle = "bg-rose-50 border-rose-400 text-rose-800 shadow-md shadow-rose-500/5";
                                } else {
                                  optStyle = "opacity-40 border-transparent scale-98";
                                }
                              }

                              return (
                                <button
                                  key={oIdx}
                                  disabled={hasAnswered}
                                  onClick={() => handleQuizAnswer(qIdx, oIdx)}
                                  className={`p-3 rounded-xl border text-xs text-left transition-all duration-300 flex items-center justify-between ${optStyle}`}
                                >
                                  <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                                  {hasAnswered && (
                                    <span className="shrink-0 ml-2">
                                      {isCorrect && <Check className="w-4 h-4 text-emerald-500 animate-scale-in" />}
                                      {isSelected && !isCorrect && <X className="w-4 h-4 text-rose-500 animate-scale-in" />}
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Empty Study Page Viewport */
              <div className="m-auto flex flex-col items-center justify-center text-center p-8 animate-fade-in-up">
                <div className="p-4 bg-orange-50 rounded-full mb-4 text-brand-orange border border-orange-100/50 shadow-inner">
                  <FileCheck className="w-10 h-10 animate-bounce" />
                </div>
                <h3 className="text-xl font-extrabold font-display text-slate-800 mb-2">No Document Selected</h3>
                <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                  Bayein taraf se koi <strong className="text-brand-orange">Recent Classroom Guide</strong> select karein ya new PDF file upload karke padhai shuru karein!
                </p>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Settings Modal */}
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}

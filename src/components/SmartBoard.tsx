"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Check, 
  X, 
  ArrowRight, 
  RotateCcw, 
  Tv,
  Sun,
  Moon,
  MousePointer,
  PenTool,
  Eraser,
  StickyNote,
  Trash2,
  Undo2,
  Minus,
  Eye,
  EyeOff,
  Users,
  Compass,
  GraduationCap
} from "lucide-react";

// 1. Typewriter Animation Helper Component
function TypewriterText({ text, speed = 15 }: { text: string; speed?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsFinished(false);
    if (!text) return;
    
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsFinished(true);
      }
    }, speed);
    
    return () => clearInterval(interval);
  }, [text, speed]);

  const handleSkip = () => {
    if (!isFinished) {
      setDisplayedText(text);
      setIsFinished(true);
    }
  };

  return (
    <span 
      onClick={handleSkip} 
      className="cursor-pointer select-none relative group pt-1 inline-block" 
      title="Tap to show full text immediately"
    >
      {displayedText}
      {!isFinished && (
        <span className="inline-block w-2.5 h-6 bg-yellow-300/80 ml-1 animate-pulse" />
      )}
    </span>
  );
}

// 2. Interactive SVG Visual Projection Component
interface BoardVisualsProps {
  topic: string;
  type: string;
  data: any;
  theme: "chalkboard" | "whiteboard";
}

function BoardVisuals({ topic, type, data, theme }: BoardVisualsProps) {
  const cleanTopic = topic.toLowerCase().trim();
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  const isChalkboard = theme === "chalkboard";
  const accentColor = isChalkboard ? "text-yellow-200 border-white/20" : "text-brand-orange border-orange-100";
  const cardBg = isChalkboard ? "bg-[#182921]/60 border-white/10" : "bg-white border-slate-100";
  const displayTopic = topic.charAt(0).toUpperCase() + topic.slice(1);

  // 1. Photosynthesis Visual Diagram
  if (cleanTopic.includes("photosynthesis")) {
    return (
      <div className={`w-full h-full flex flex-col justify-between p-4 border rounded-2xl ${cardBg}`}>
        <div className="flex items-center justify-between border-b pb-2 mb-3 border-dashed border-white/10">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Smart Board Diagram: Photosynthesis</span>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold">Interactive</span>
        </div>
        
        <div className="flex-1 flex items-center justify-center min-h-[220px]">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            {/* Sun */}
            <g 
              className="cursor-pointer group" 
              onMouseEnter={() => setHoveredElement("sun")}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <circle cx="70" cy="70" r="30" fill="#FFB703" className="animate-pulse" />
              <line x1="70" y1="30" x2="70" y2="15" stroke="#FFB703" strokeWidth="3" />
              <line x1="70" y1="110" x2="70" y2="125" stroke="#FFB703" strokeWidth="3" />
              <line x1="30" y1="70" x2="15" y2="70" stroke="#FFB703" strokeWidth="3" />
              <line x1="110" y1="70" x2="125" y2="70" stroke="#FFB703" strokeWidth="3" />
              <line x1="42" y1="42" x2="30" y2="30" stroke="#FFB703" strokeWidth="3" />
              <line x1="98" y1="98" x2="110" y2="110" stroke="#FFB703" strokeWidth="3" />
              <line x1="98" y1="42" x2="110" y2="30" stroke="#FFB703" strokeWidth="3" />
              <line x1="42" y1="98" x2="30" y2="110" stroke="#FFB703" strokeWidth="3" />
              <path d="M100,90 Q150,110 200,120" stroke="#FFD166" strokeWidth="2.5" strokeDasharray="5,5" fill="none" />
            </g>

            {/* Ground & Roots */}
            <path d="M 50 250 Q 200 240 350 250" stroke={isChalkboard ? "#FAF5E6" : "#4A5568"} strokeWidth="4" fill="none" />
            <path d="M 230 245 Q 210 270 200 290 M 230 245 Q 250 270 260 295" stroke="#A67C52" strokeWidth="3" fill="none" />
            <text x="110" y="280" fill="#90E0EF" fontSize="11" fontWeight="bold">Roots (Water - H2O)</text>

            {/* Stem & Leaf */}
            <path d="M 230 245 Q 230 180 230 110" stroke="#83C5BE" strokeWidth="6" fill="none" />
            <g 
              className="cursor-pointer"
              onMouseEnter={() => setHoveredElement("leaf")}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <path d="M 230 160 Q 330 120 330 160 Q 280 200 230 160" fill="#2D6A4F" stroke="#FAF5E6" strokeWidth="2" />
              <line x1="230" y1="160" x2="310" y2="160" stroke="#52B788" strokeWidth="2.5" />
              <line x1="260" y1="160" x2="280" y2="140" stroke="#52B788" strokeWidth="1.5" />
              <line x1="280" y1="160" x2="300" y2="145" stroke="#52B788" strokeWidth="1.5" />
              <line x1="260" y1="160" x2="285" y2="180" stroke="#52B788" strokeWidth="1.5" />
              <line x1="280" y1="160" x2="305" y2="175" stroke="#52B788" strokeWidth="1.5" />
            </g>

            {/* Inputs / Outputs */}
            <g 
              className="cursor-pointer"
              onMouseEnter={() => setHoveredElement("co2")}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <rect x="270" y="70" width="115" height="25" rx="5" fill="#495057" fillOpacity="0.8" stroke="#FAF5E6" strokeWidth="1" />
              <text x="275" y="86" fill="#E9ECEF" fontSize="10" fontWeight="bold">Carbon Dioxide (Hawa se)</text>
              <path d="M 300 95 Q 275 110 260 135" stroke="#CED4DA" strokeWidth="2" strokeDasharray="3,3" fill="none" />
            </g>

            <g 
              className="cursor-pointer"
              onMouseEnter={() => setHoveredElement("o2")}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <rect x="270" y="210" width="110" height="25" rx="5" fill="#06D6A0" fillOpacity="0.8" stroke="#FAF5E6" strokeWidth="1" />
              <text x="275" y="226" fill="#FAF5E6" fontSize="10" fontWeight="bold">Oxygen (Bahar nikli)</text>
              <path d="M 280 180 Q 300 195 320 210" stroke="#06D6A0" strokeWidth="2.5" fill="none" />
            </g>

            <g 
              className="cursor-pointer"
              onMouseEnter={() => setHoveredElement("glucose")}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <circle cx="230" cy="115" r="20" fill="#F77F00" />
              <text x="212" y="118" fill="#FAF5E6" fontSize="9" fontWeight="bold">Glucose</text>
            </g>
          </svg>
        </div>

        <div className={`mt-2 p-2.5 rounded-xl text-xs font-semibold text-center ${
          isChalkboard ? "bg-white/5 border border-white/10" : "bg-slate-50 border border-slate-100"
        }`}>
          {hoveredElement === "sun" && "☀️ Dhoop: Surya Dev ki light energy jo leaves absorb karti hain."}
          {hoveredElement === "leaf" && "🍃 Green Leaf: Plant ka kitchen jisme khana banta hai."}
          {hoveredElement === "co2" && "💨 Carbon Dioxide: Hawa se li gayi gas jo khana banane mein zaroori hai."}
          {hoveredElement === "o2" && "🌬️ Oxygen: Khana banne ke baad humare saans lene ke liye chodi gayi gas."}
          {hoveredElement === "glucose" && "🍯 Glucose: Plants ka tayyar khana jo inki growth mein kaam aata hai."}
          {!hoveredElement && "💡 Diagram par cursor le jayein (Hover karein) har part ko aasan Hinglish mein samajhne ke liye!"}
        </div>
      </div>
    );
  }

  // 2. Gravity Visual Diagram
  if (cleanTopic.includes("gravity") || cleanTopic.includes("pull") || cleanTopic.includes("gurutva")) {
    return (
      <div className={`w-full h-full flex flex-col justify-between p-4 border rounded-2xl ${cardBg}`}>
        <div className="flex items-center justify-between border-b pb-2 mb-3 border-dashed border-white/10">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Chalkboard Live Projection: Gravity</span>
          <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full font-bold">Interactive</span>
        </div>
        
        <div className="flex-1 flex items-center justify-center min-h-[220px]">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <path d="M 50 150 L 350 150 M 200 50 L 200 250" stroke={isChalkboard ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} strokeWidth="1" />
            <path d="M 100 150 Q 200 220 300 150" stroke="#48CAE4" strokeWidth="1.5" fill="none" opacity="0.6" />
            <path d="M 120 150 Q 200 200 280 150" stroke="#0077B6" strokeWidth="2" fill="none" opacity="0.8" />
            <path d="M 140 150 Q 200 180 260 150" stroke="#0096C7" strokeWidth="2.5" fill="none" />
            <ellipse cx="200" cy="150" rx="60" ry="25" stroke="#0096C7" strokeWidth="1" fill="none" opacity="0.4" />
            <ellipse cx="200" cy="150" rx="100" ry="40" stroke="#0096C7" strokeWidth="1" fill="none" opacity="0.2" />

            {/* Earth */}
            <g 
              className="cursor-pointer"
              onMouseEnter={() => setHoveredElement("earth")}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <circle cx="200" cy="150" r="35" fill="#0077B6" stroke="#FAF5E6" strokeWidth="2" />
              <path d="M 180 140 Q 195 130 190 145 M 210 135 Q 220 150 205 160 M 185 160 Q 200 170 215 165" stroke="#52B788" strokeWidth="4" fill="none" />
              <text x="180" y="154" fill="#FAF5E6" fontSize="10" fontWeight="bold">Earth</text>
            </g>

            {/* Falling Apple */}
            <g 
              className="cursor-pointer"
              onMouseEnter={() => setHoveredElement("apple")}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <circle cx="200" cy="65" r="8" fill="#E63946" />
              <path d="M 200 57 Q 203 54 200 52" stroke="#52B788" strokeWidth="1.5" fill="none" />
              <path d="M 200 77 L 200 105" stroke="#E63946" strokeWidth="2.5" fill="none" />
              <text x="215" y="70" fill={isChalkboard ? "#FAF5E6" : "#2D3748"} fontSize="9">Falling Apple</text>
            </g>

            {/* Satellite */}
            <g 
              className="cursor-pointer"
              onMouseEnter={() => setHoveredElement("orbit")}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <circle cx="310" cy="95" r="10" fill="#FAF5E6" stroke="#0077B6" strokeWidth="1.5" />
              <line x1="300" y1="95" x2="320" y2="95" stroke="#4A5568" strokeWidth="2" />
              <path d="M 200 150 m 120 -50 a 130 130 0 1 0 -240 100" stroke={isChalkboard ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"} strokeDasharray="4,4" fill="none" />
              <text x="325" y="100" fill={isChalkboard ? "#FAF5E6" : "#2D3748"} fontSize="9">Satellite Orbit</text>
            </g>
          </svg>
        </div>

        <div className={`mt-2 p-2.5 rounded-xl text-xs font-semibold text-center ${
          isChalkboard ? "bg-white/5 border border-white/10" : "bg-slate-50 border border-slate-100"
        }`}>
          {hoveredElement === "earth" && "🌍 Dharti: Apne bhari vajan ke karan objects ko apni taraf khinchti hai."}
          {hoveredElement === "apple" && "🍎 Apple: Dharti maa ki gravity isko seedhe zameen par khinch rahi hai."}
          {hoveredElement === "orbit" && "🛰️ Orbit: Gravity aur speed ka balance satellite ko gol ghumata hai."}
          {!hoveredElement && "💡 Curved space represent karta hai ki kaise bhari cheezein objects ko pull karti hain!"}
        </div>
      </div>
    );
  }

  // 3. Water Cycle Visual Diagram
  if (cleanTopic.includes("water cycle") || cleanTopic.includes("jal chakra") || cleanTopic.includes("rain") || cleanTopic.includes("cycle")) {
    return (
      <div className={`w-full h-full flex flex-col justify-between p-4 border rounded-2xl ${cardBg}`}>
        <div className="flex items-center justify-between border-b pb-2 mb-3 border-dashed border-white/10">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Classroom Projection: Jal Chakra</span>
          <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full font-bold">Interactive</span>
        </div>
        
        <div className="flex-1 flex items-center justify-center min-h-[220px]">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <circle cx="350" cy="50" r="15" fill="#FF9F1C" className="animate-pulse" />
            <path d="M 0 250 L 80 120 L 160 250 M 100 250 L 170 160 L 240 250" fill={isChalkboard ? "#2D3A34" : "#E2E8F0"} stroke={isChalkboard ? "#FAF5E6" : "#4A5568"} strokeWidth="2.5" />
            <path d="M 68 140 L 80 120 L 92 140 L 85 135 Z" fill="#FAF5E6" />
            <path d="M 240 250 Q 320 240 400 250 L 400 300 L 240 300 Z" fill="#0077B6" opacity="0.7" />
            <text x="290" y="280" fill="#FAF5E6" fontSize="12" fontWeight="bold">Ocean / River</text>

            <g 
              className="cursor-pointer"
              onMouseEnter={() => setHoveredElement("condensation")}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <path d="M 180 80 Q 200 60 220 80 Q 240 80 230 100 Q 210 110 180 100 Q 165 95 180 80" fill="#E2E8F0" stroke="#FAF5E6" strokeWidth="1.5" />
              <text x="185" y="93" fill="#4A5568" fontSize="8" fontWeight="bold">Clouds (Badal)</text>
            </g>

            <g 
              className="cursor-pointer"
              onMouseEnter={() => setHoveredElement("evaporation")}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <path d="M 330 230 C 320 180 290 140 250 110" stroke="#FF9F1C" strokeWidth="2.5" strokeDasharray="4,4" fill="none" />
              <text x="280" y="160" fill="#FF9F1C" fontSize="9" fontWeight="bold">Evaporation (Bhaap)</text>
            </g>

            <g 
              className="cursor-pointer"
              onMouseEnter={() => setHoveredElement("precipitation")}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <line x1="160" y1="120" x2="150" y2="150" stroke="#48CAE4" strokeWidth="2" strokeDasharray="5,10" />
              <line x1="180" y1="120" x2="170" y2="150" stroke="#48CAE4" strokeWidth="2" strokeDasharray="5,10" />
              <line x1="200" y1="120" x2="190" y2="150" stroke="#48CAE4" strokeWidth="2" strokeDasharray="5,10" />
              <text x="110" y="110" fill="#48CAE4" fontSize="9" fontWeight="bold">Precipitation (Baarish)</text>
            </g>

            <g 
              className="cursor-pointer"
              onMouseEnter={() => setHoveredElement("collection")}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <path d="M 120 220 Q 180 230 240 250" stroke="#0096C7" strokeWidth="3" fill="none" />
            </g>
          </svg>
        </div>

        <div className={`mt-2 p-2.5 rounded-xl text-xs font-semibold text-center ${
          isChalkboard ? "bg-white/5 border border-white/10" : "bg-slate-50 border border-slate-100"
        }`}>
          {hoveredElement === "evaporation" && "☀️ Evaporation: Suraj ki garmi se nadi ka paani bhaap bankar udta hai."}
          {hoveredElement === "condensation" && "☁️ Condensation: Bhaap thandi hokar aasmaan mein clouds (badal) banati hai."}
          {hoveredElement === "precipitation" && "🌧️ Precipitation: Badal jab bhaari ho jate hain toh baarish bankar baraste hain."}
          {hoveredElement === "collection" && "🏞️ Collection: Baarish ka paani rivers se hota hua wapas ocean mein collect hota hai."}
          {!hoveredElement && "💡 Evaporation, Condensation, ya Precipitation par cursor lekar jayein!"}
        </div>
      </div>
    );
  }

  // 4. Arrays Visual Diagram
  if (cleanTopic.includes("array") || cleanTopic.includes("indexing") || cleanTopic.includes("data structure")) {
    return (
      <div className={`w-full h-full flex flex-col justify-between p-4 border rounded-2xl ${cardBg}`}>
        <div className="flex items-center justify-between border-b pb-2 mb-3 border-dashed border-white/10">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Classroom Projection: Array Memory Cells</span>
          <span className="text-[10px] bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded-full font-bold">Interactive</span>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center min-h-[220px] gap-2">
          <div className="flex gap-4">
            {[0, 1, 2, 3, 4].map((idx) => (
              <div key={idx} className="w-12 text-center text-xs font-bold text-slate-400">
                Index {idx}
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            {[12, 45, 78, 23, 56].map((val, idx) => {
              const isSelected = hoveredElement === `cell-${idx}`;
              return (
                <div 
                  key={idx}
                  onMouseEnter={() => setHoveredElement(`cell-${idx}`)}
                  onMouseLeave={() => setHoveredElement(null)}
                  className={`w-12 h-12 border-2 rounded-xl flex items-center justify-center text-lg font-bold font-mono transition-all cursor-pointer ${
                    isSelected 
                      ? "bg-brand-orange text-white border-brand-orange scale-110 shadow-md"
                      : isChalkboard 
                        ? "bg-white/5 border-white/20 text-yellow-100 hover:border-yellow-200"
                        : "bg-gray-50 border-gray-200 text-slate-700 hover:border-brand-orange"
                  }`}
                >
                  {val}
                </div>
              );
            })}
          </div>

          <div className="flex gap-4 mt-2">
            {[1000, 1004, 1008, 1012, 1016].map((addr) => (
              <div key={addr} className="w-12 text-center text-[9px] font-mono text-slate-500">
                Addr {addr}
              </div>
            ))}
          </div>

          <div className="text-[10px] text-brand-orange font-bold uppercase mt-2 tracking-wider">
            Contiguous Memory: 4 Bytes Offsets (Integer Array)
          </div>
        </div>

        <div className={`mt-2 p-2.5 rounded-xl text-xs font-semibold text-center ${
          isChalkboard ? "bg-white/5 border border-white/10" : "bg-slate-50 border border-slate-100"
        }`}>
          {hoveredElement === "cell-0" && "📦 Index 0: Array ka pehla element (12) address 1000 par store hai."}
          {hoveredElement === "cell-1" && "📦 Index 1: Dusra element (45) contiguous address 1004 par hai."}
          {hoveredElement === "cell-2" && "📦 Index 2: Tisra element (78) address 1008 par store hai."}
          {hoveredElement === "cell-3" && "📦 Index 3: Choutha element (23) address 1012 par store hai."}
          {hoveredElement === "cell-4" && "📦 Index 4: Akhiri element (56) address 1016 par store hai."}
          {!hoveredElement && "💡 Kisi bhi cell par hover karke address aur offsets samajhein!"}
        </div>
      </div>
    );
  }

  // 5. Dynamic Concept Mind Map
  const keywords = data.explanation 
    ? data.explanation.split(/\s+/).map((w: string) => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")).filter((w: string) => w.length > 5 && !w.includes("bachon")).slice(0, 3)
    : ["Topic Core", "Key Detail", "Usage"];

  while (keywords.length < 3) {
    keywords.push("Core Fact");
  }

  return (
    <div className={`w-full h-full flex flex-col justify-between p-4 border rounded-2xl ${cardBg}`}>
      <div className="flex items-center justify-between border-b pb-2 mb-3 border-dashed border-white/10">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Dynamic Projection Mind-Map</span>
        <span className="text-[10px] bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded-full font-bold">Generated</span>
      </div>
      
      <div className="flex-1 flex items-center justify-center min-h-[220px]">
        <svg viewBox="0 0 400 250" className="w-full h-full">
          <line x1="200" y1="125" x2="80" y2="70" stroke={isChalkboard ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"} strokeWidth="2.5" />
          <line x1="200" y1="125" x2="320" y2="70" stroke={isChalkboard ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"} strokeWidth="2.5" />
          <line x1="200" y1="125" x2="200" y2="200" stroke={isChalkboard ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"} strokeWidth="2.5" />

          <g 
            className="cursor-pointer"
            onMouseEnter={() => setHoveredElement("center")}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <circle cx="200" cy="125" r="40" fill="#FF7A00" className="animate-pulse" />
            <text x="200" y="128" fill="#FAF5E6" fontSize="10" fontWeight="bold" textAnchor="middle">
              {displayTopic.length > 10 ? displayTopic.slice(0, 9) + "..." : displayTopic}
            </text>
          </g>

          <g 
            className="cursor-pointer"
            onMouseEnter={() => setHoveredElement("node1")}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <circle cx="80" cy="70" r="30" fill="#0096C7" />
            <text x="80" y="73" fill="#FAF5E6" fontSize="8" fontWeight="bold" textAnchor="middle">
              {keywords[0].charAt(0).toUpperCase() + keywords[0].slice(1, 7)}
            </text>
          </g>

          <g 
            className="cursor-pointer"
            onMouseEnter={() => setHoveredElement("node2")}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <circle cx="320" cy="70" r="30" fill="#06D6A0" />
            <text x="320" y="73" fill="#FAF5E6" fontSize="8" fontWeight="bold" textAnchor="middle">
              {keywords[1].charAt(0).toUpperCase() + keywords[1].slice(1, 7)}
            </text>
          </g>

          <g 
            className="cursor-pointer"
            onMouseEnter={() => setHoveredElement("node3")}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <circle cx="200" cy="200" r="30" fill="#F77F00" />
            <text x="200" y="203" fill="#FAF5E6" fontSize="8" fontWeight="bold" textAnchor="middle">
              {keywords[2].charAt(0).toUpperCase() + keywords[2].slice(1, 7)}
            </text>
          </g>
        </svg>
      </div>

      <div className={`mt-1 p-2 rounded text-[10px] text-center ${
        isChalkboard ? "bg-white/5 text-yellow-100" : "bg-slate-50 text-slate-600"
      }`}>
        {hoveredElement === "center" && `🎯 Main Subject: Yeh mind map "${displayTopic}" ke aapas mein connected points dikhata hai.`}
        {hoveredElement === "node1" && `📌 Key Term 1: "${keywords[0]}" - is topic se related ek important concept.`}
        {hoveredElement === "node2" && `📌 Key Term 2: "${keywords[1]}" - is topic ki ek vishesta.`}
        {hoveredElement === "node3" && `📌 Key Term 3: "${keywords[2]}" - is topic ka practical application area.`}
        {!hoveredElement && "💡 Mind-map nodes par cursor le jayein aur relationships ko samajhein!"}
      </div>
    </div>
  );
}

interface SmartBoardProps {
  data: any; // The structured AI JSON response
  loading: boolean;
  isSpeaking: boolean;
  onReplaySpeech: () => void;
  onStopSpeech: () => void;
  
  // Voice navigation triggers
  quizCommand?: string;
  quizCommandCount?: number;
  onQuestionChange?: (index: number) => void;
}

interface Note {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
}

export default function SmartBoard({ 
  data, 
  loading, 
  isSpeaking, 
  onReplaySpeech, 
  onStopSpeech,
  quizCommand,
  quizCommandCount,
  onQuestionChange
}: SmartBoardProps) {
  const [boardTheme, setBoardTheme] = useState<"chalkboard" | "whiteboard">("chalkboard");
  
  // Quiz states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Classroom HUD metrics state
  const [studentUnderstanding, setStudentUnderstanding] = useState(90);
  const [engagementTrend, setEngagementTrend] = useState("High 🔥");

  // Smart Whiteboard Canvas states
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeTool, setActiveTool] = useState<"select" | "pen" | "eraser">("select");
  const [drawColor, setDrawColor] = useState("#FAF5E6");
  const [drawWidth, setDrawWidth] = useState(4);
  const [drawingHistory, setDrawingHistory] = useState<string[]>([]);
  const [showLessonText, setShowLessonText] = useState(true);
  
  // Sticky Notes states
  const [stickyNotes, setStickyNotes] = useState<Note[]>([]);
  const [draggingNoteId, setDraggingNoteId] = useState<number | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  // Reset states when new data loads
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setQuizScore(0);
    setQuizCompleted(false);
    clearCanvas();
    setStickyNotes([]);
    setStudentUnderstanding(Math.floor(88 + Math.random() * 8));
    setEngagementTrend(Math.random() > 0.5 ? "Peak ⚡" : "High 🔥");
  }, [data]);

  // Listen to parent voice commands
  useEffect(() => {
    if (!quizCommand || !quizCommandCount) return;
    
    if (quizCommand === "next") {
      if (quizCompleted) return;
      handleNextQuestion();
    } else if (quizCommand === "reset") {
      resetQuiz();
    }
  }, [quizCommand, quizCommandCount]);

  // Adjust draw color depending on theme to make sure strokes are visible
  useEffect(() => {
    if (boardTheme === "chalkboard") {
      setDrawColor("#FAF5E6"); // Chalk white
    } else {
      setDrawColor("#2563EB"); // Marker blue
    }
  }, [boardTheme]);

  // Initialize & Resize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      // Preserve drawing during resize
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext("2d");
      if (tempCtx) {
        tempCtx.drawImage(canvas, 0, 0);
      }

      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(tempCanvas, 0, 0);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [data, boardTheme]);

  // Canvas Drawing Methods
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTool === "select") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Save state for undo history
    saveCanvasState();

    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || activeTool === "select") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = activeTool === "eraser" 
      ? (boardTheme === "chalkboard" ? "#1e2e28" : "#ffffff") 
      : drawColor;
    ctx.lineWidth = activeTool === "eraser" ? drawWidth * 6 : drawWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setDrawingHistory(prev => [...prev, canvas.toDataURL()]);
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const history = [...drawingHistory];
    const prevState = history.pop();
    setDrawingHistory(history);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (prevState) {
      const img = new Image();
      img.src = prevState;
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setDrawingHistory([]);
  };

  // Sticky Note Handlers
  const addStickyNote = () => {
    const id = Date.now();
    setStickyNotes(prev => [
      ...prev,
      {
        id,
        text: "Scribble note...",
        x: 80 + Math.random() * 100,
        y: 80 + Math.random() * 100,
        color: "bg-yellow-100/90 text-yellow-900 border-yellow-200"
      }
    ]);
  };

  const deleteStickyNote = (id: number) => {
    setStickyNotes(prev => prev.filter(n => n.id !== id));
  };

  const updateStickyNoteText = (id: number, text: string) => {
    setStickyNotes(prev => prev.map(n => n.id === id ? { ...n, text } : n));
  };

  const handleNoteMouseDown = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setDraggingNoteId(id);
    const note = stickyNotes.find(n => n.id === id);
    if (note) {
      dragOffsetRef.current = {
        x: e.clientX - note.x,
        y: e.clientY - note.y
      };
    }
  };

  const handleBoardMouseMove = (e: React.MouseEvent) => {
    if (draggingNoteId !== null) {
      const x = e.clientX - dragOffsetRef.current.x;
      const y = e.clientY - dragOffsetRef.current.y;
      
      setStickyNotes(prev => prev.map(n => n.id === draggingNoteId ? { ...n, x: Math.max(10, Math.min(x, 700)), y: Math.max(10, Math.min(y, 350)) } : n));
    }
  };

  const handleBoardMouseUp = () => {
    setDraggingNoteId(null);
  };

  // Quiz navigation handlers
  const handleOptionClick = (optionIndex: number, correctIndex: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIndex);
    if (optionIndex === correctIndex) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!data?.questions) return;
    setSelectedOption(null);
    if (currentQuestionIndex < data.questions.length - 1) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      onQuestionChange?.(nextIdx);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setQuizScore(0);
    setQuizCompleted(false);
    onQuestionChange?.(0);
  };

  // Theme styling helpers
  const boardBg = boardTheme === "chalkboard" 
    ? "bg-brand-green text-[#FAF5E6] bg-grid-dots-dark" 
    : "bg-white text-slate-800 bg-grid-dots";

  const boardFrameClass = boardTheme === "chalkboard"
    ? "board-frame-wooden rounded-xl"
    : "border-[10px] border-slate-300 rounded-xl shadow-2xl";

  // Chalk & Marker Palette colors
  const chalkboardColors = ["#FAF5E6", "#FDE047", "#FF7A00", "#4ADE80", "#F472B6"];
  const whiteboardColors = ["#0F172A", "#2563EB", "#DC2626", "#FF7A00", "#10B981"];
  const activePalette = boardTheme === "chalkboard" ? chalkboardColors : whiteboardColors;

  // Sync mode border glow pulsing
  const getGlowClass = () => {
    if (!data) return "border-gray-200 shadow-sm";
    
    if (data.type === "explain") {
      return isSpeaking ? "animate-glow-orange border-brand-orange" : "border-brand-orange/30 shadow-md shadow-orange-500/5";
    }
    if (data.type === "quiz") {
      return isSpeaking ? "animate-glow-blue border-blue-500" : "border-blue-500/30 shadow-md shadow-blue-500/5";
    }
    if (data.type === "revise") {
      return isSpeaking ? "animate-glow-green border-emerald-500" : "border-emerald-500/30 shadow-md shadow-emerald-500/5";
    }
    
    return "border-gray-200 shadow-sm";
  };

  // Classroom HUD dynamic labels
  const getPresenceLabel = () => {
    if (!data) return "Board Ready";
    if (data.type === "explain") return "Lesson Active 👨‍🏫";
    if (data.type === "quiz") return "Quiz Running 🧪";
    if (data.type === "revise") return "Reviewing notes 🧠";
    return "Class Active";
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-4" onMouseUp={handleBoardMouseUp}>
      {/* Board Top Settings Control bar */}
      <div className="flex items-center justify-between px-4">
        
        {/* Live HUD Indicator Pills (Classroom Presence) */}
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border ${
            data 
              ? (data.type === "explain" 
                  ? "bg-orange-50 text-brand-orange border-orange-100" 
                  : data.type === "quiz" 
                    ? "bg-blue-50 text-blue-600 border-blue-100" 
                    : "bg-green-50 text-green-600 border-green-100")
              : "bg-gray-100 text-gray-500 border-gray-200"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              data 
                ? (data.type === "explain" 
                    ? "bg-brand-orange animate-ping" 
                    : data.type === "quiz" 
                      ? "bg-blue-500 animate-ping" 
                      : "bg-green-500 animate-ping")
                : "bg-gray-400"
            }`}></span>
            <span>{getPresenceLabel()}</span>
          </span>

          {data && (
            <div className="hidden sm:flex items-center gap-3.5 text-xs font-bold text-slate-600 px-4 py-2 bg-gradient-to-r from-slate-50 to-white rounded-full border border-slate-200/60 shadow-sm">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                </span>
                <span>Engagement: <span className="text-brand-orange font-extrabold">{engagementTrend}</span></span>
              </div>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-orange-500" />
                <span>Class Understanding: <span className="text-brand-orange font-extrabold">{studentUnderstanding}%</span></span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* TTS trigger */}
          {data && !loading && (
            <button
              onClick={isSpeaking ? onStopSpeech : onReplaySpeech}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                isSpeaking 
                  ? "bg-rose-50 border-rose-100 text-rose-600 animate-pulse animate-pulse-ring" 
                  : "bg-white border-gray-200 text-gray-600 hover:text-brand-orange hover:bg-gray-50"
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Stop Reading</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Read Aloud</span>
                </>
              )}
            </button>
          )}

          {/* Theme Selector */}
          <div className="flex items-center bg-gray-100 p-1 rounded-full border border-gray-200/50">
            <button
              onClick={() => setBoardTheme("chalkboard")}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                boardTheme === "chalkboard" 
                  ? "bg-brand-green text-white shadow-sm" 
                  : "text-gray-500 hover:text-slate-800"
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Chalkboard</span>
            </button>
            <button
              onClick={() => setBoardTheme("whiteboard")}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                boardTheme === "whiteboard" 
                  ? "bg-white text-brand-orange shadow-sm border border-gray-100" 
                  : "text-gray-500 hover:text-slate-800"
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Whiteboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Board Viewport Frame */}
      <div 
        onMouseMove={handleBoardMouseMove}
        className={`w-full min-h-[480px] p-8 transition-all duration-500 overflow-hidden relative flex flex-col justify-between select-none ${boardBg} ${boardFrameClass} ${getGlowClass()} animate-scale-in`}
      >
        {/* HTML5 Canvas Drawing Layer */}
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className={`absolute inset-0 w-full h-full z-20 ${
            activeTool === "select" ? "pointer-events-none" : "cursor-crosshair"
          }`}
        />

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 z-30">
            <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-slate-800 bg-white/90 px-4 py-1.5 rounded-full shadow-md">
              Writing on board...
            </p>
          </div>
        )}

        {/* Draggable Sticky Notes */}
        {stickyNotes.map((note) => (
          <div
            key={note.id}
            style={{ left: note.x, top: note.y }}
            onMouseDown={(e) => handleNoteMouseDown(e, note.id)}
            className={`absolute z-30 w-44 p-3 rounded-2xl shadow-lg border flex flex-col justify-between gap-2 cursor-grab active:cursor-grabbing group transition-transform hover:scale-[1.02] ${note.color}`}
          >
            {/* Note Controls Header */}
            <div className="flex items-center justify-between border-b border-black/5 pb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">Sticky Note</span>
              <button
                onClick={(e) => { e.stopPropagation(); deleteStickyNote(note.id); }}
                className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-black/5 rounded transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            
            {/* Note text field */}
            <textarea
              value={note.text}
              onMouseDown={(e) => e.stopPropagation()} // Stop note dragging when writing text
              onChange={(e) => updateStickyNoteText(note.id, e.target.value)}
              className="w-full bg-transparent border-none text-xs font-semibold focus:outline-none resize-none h-16 pointer-events-auto leading-relaxed"
            />
          </div>
        ))}

        {/* Classroom Board Contents (pointer-events-none allows drawing clicks to hit canvas) */}
        <div className="relative z-10 flex-1 flex flex-col justify-between pointer-events-none">
          
          {/* Empty State */}
          {!data && !loading && activeTool === "select" && showLessonText && (
            <div className="my-auto flex flex-col items-center justify-center text-center p-8 w-full">
              <div className={`p-4 rounded-full mb-4 ${
                boardTheme === "chalkboard" ? "bg-emerald-950/50 text-emerald-400" : "bg-orange-50 text-brand-orange"
              }`}>
                <Sparkles className="w-10 h-10 animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold font-display mb-2">Classroom Board Ready!</h3>
              <p className={`max-w-md text-sm leading-relaxed ${
                boardTheme === "chalkboard" ? "text-emerald-200" : "text-gray-500"
              }`}>
                Niche diye gaye <strong>Mic button</strong> ko dabayein aur boliye: <br/>
                <span className="font-semibold text-brand-orange">&quot;Explain Photosynthesis&quot;</span> ya <span className="font-semibold text-brand-orange">&quot;Revise Gravity&quot;</span>. <br/>
                Aap smart whiteboard tools ka use karke yahan draw bhi kar sakte hain!
              </p>
            </div>
          )}

          {/* AI Outputs */}
          {data && !loading && showLessonText && (
            <>
              {/* Mode A: Explanation Mode */}
              {data.type === "explain" && (
                <div className="flex-1 flex flex-col lg:flex-row gap-6 items-stretch">
                  <div className="flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <div className={`border-b pb-3 mb-5 flex justify-between items-center ${
                        boardTheme === "chalkboard" ? "border-white/10" : "border-gray-100"
                      }`}>
                        <h1 className="text-3xl font-extrabold font-display">{data.topic}</h1>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          boardTheme === "chalkboard" ? "bg-white/10 text-yellow-200" : "bg-orange-50 text-brand-orange"
                        }`}>
                          Explanation Mode
                        </span>
                      </div>
                      
                      <p className="text-2xl md:text-3xl font-medium leading-relaxed font-handwriting tracking-wide">
                        <TypewriterText text={data.explanation} />
                      </p>
                    </div>

                    {/* Analogy card */}
                    {data.analogy && (
                      <div className="transition-all duration-700 animate-in slide-in-from-bottom-5 mt-auto">
                        <div className={`p-6 rounded-2xl border transition-colors ${
                          boardTheme === "chalkboard" 
                            ? "bg-[#253930] border-emerald-800 text-yellow-100" 
                            : "bg-orange-50/50 border-orange-100 text-slate-700"
                        }`}>
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-5 h-5 text-brand-orange animate-pulse" />
                            <h4 className="text-sm font-bold uppercase tracking-wider">
                              Daily Life Analogy (Aasan Bhasha Mein)
                            </h4>
                          </div>
                          <p className="text-lg leading-relaxed italic">
                            <TypewriterText text={data.analogy} speed={25} />
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Live Visual Projection Column */}
                  <div className="w-full lg:w-1/2 shrink-0 flex items-stretch pointer-events-auto">
                    <BoardVisuals 
                      topic={data.topic} 
                      type={data.type} 
                      data={data} 
                      theme={boardTheme} 
                    />
                  </div>
                </div>
              )}

              {/* Mode B: Revision Mode */}
              {data.type === "revise" && (
                <div className="flex-1 flex flex-col lg:flex-row gap-6 items-stretch">
                  <div className="flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <div className={`border-b pb-3 mb-5 flex justify-between items-center ${
                        boardTheme === "chalkboard" ? "border-white/10" : "border-gray-100"
                      }`}>
                        <h1 className="text-3xl font-extrabold font-display">{data.topic}</h1>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          boardTheme === "chalkboard" ? "bg-white/10 text-yellow-200" : "bg-orange-50 text-brand-orange"
                        }`}>
                          Quick Revision Mode
                        </span>
                      </div>

                      <div className="space-y-4">
                        {data.bullets?.map((bullet: string, idx: number) => (
                          <div 
                            key={idx} 
                            style={{ animationDelay: `${idx * 1.5}s` }}
                            className="flex items-start gap-4 animate-in fade-in duration-700 slide-in-from-left-4"
                          >
                            <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-sm font-bold ${
                              boardTheme === "chalkboard" ? "bg-white/10 text-yellow-200" : "bg-orange-50 text-brand-orange"
                            }`}>
                              {idx + 1}
                            </div>
                            <p className="text-xl md:text-2xl font-medium font-handwriting leading-relaxed pt-0.5">
                              <TypewriterText text={bullet} speed={10} />
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {data.analogy && (
                      <div className={`p-4 rounded-xl border mt-auto text-sm animate-in fade-in duration-1000 ${
                        boardTheme === "chalkboard" 
                          ? "bg-[#253930]/50 border-emerald-800/50 text-yellow-100/90" 
                          : "bg-orange-50/30 border-orange-100/50 text-slate-600"
                      }`}>
                        <strong className="text-brand-orange">Summary Analogy:</strong> {data.analogy}
                      </div>
                    )}
                  </div>

                  {/* Live Visual Projection Column */}
                  <div className="w-full lg:w-1/2 shrink-0 flex items-stretch pointer-events-auto">
                    <BoardVisuals 
                      topic={data.topic} 
                      type={data.type} 
                      data={data} 
                      theme={boardTheme} 
                    />
                  </div>
                </div>
              )}

              {/* Mode C: Quiz Mode */}
              {data.type === "quiz" && data.questions && (
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Quiz Progress */}
                    <div className={`border-b pb-3 mb-4 flex justify-between items-center ${
                      boardTheme === "chalkboard" ? "border-white/10" : "border-gray-100"
                    }`}>
                      <h1 className="text-2xl font-bold font-display">{data.topic} Quiz</h1>
                      <span className="text-xs font-semibold">
                        Question {currentQuestionIndex + 1} of {data.questions.length}
                      </span>
                    </div>

                    {!quizCompleted ? (
                      <div className="space-y-4">
                        {/* Oral Exam Slow Pulsing Timer Bar */}
                        <div className="w-full h-1.5 bg-black/15 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-[8000ms] ${
                            boardTheme === "chalkboard" ? "bg-blue-400" : "bg-brand-orange"
                          } animate-pulse w-full`}></div>
                        </div>

                        {/* Active Question */}
                        <h2 className={`text-2xl md:text-3xl font-semibold leading-snug font-handwriting min-h-[70px] ${
                          boardTheme === "chalkboard" ? "text-yellow-100" : "text-slate-700"
                        }`}>
                          <TypewriterText text={data.questions[currentQuestionIndex].question} speed={20} />
                        </h2>

                        {/* Options (pointer-events-auto allows clicks when canvas select mode is active) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pointer-events-auto">
                          {data.questions[currentQuestionIndex].options.map((option: string, optionIdx: number) => {
                            const isCorrectIdx = optionIdx === data.questions[currentQuestionIndex].answerIndex;
                            const isSelectedIdx = selectedOption === optionIdx;
                            
                            let btnStyle = boardTheme === "chalkboard" 
                              ? "bg-white/5 border-white/10 hover:bg-white/10 text-[#FAF5E6] hover:border-white/30 hover:scale-[1.01]" 
                              : "bg-slate-50/50 border-slate-200 hover:bg-white hover:border-brand-orange/40 hover:shadow-md text-slate-700 hover:scale-[1.01]";

                            if (selectedOption !== null) {
                              if (isCorrectIdx) {
                                  btnStyle = boardTheme === "chalkboard"
                                    ? "bg-emerald-500/25 border-emerald-400 text-emerald-200 shadow-lg shadow-emerald-500/10 scale-[1.01]"
                                    : "bg-emerald-50 border-emerald-400 text-emerald-800 shadow-lg shadow-emerald-500/5 scale-[1.01]";
                              } else if (isSelectedIdx) {
                                  btnStyle = boardTheme === "chalkboard"
                                    ? "bg-rose-500/25 border-rose-400 text-rose-200 shadow-lg shadow-rose-500/10"
                                    : "bg-rose-50 border-rose-400 text-rose-800 shadow-lg shadow-rose-500/5";
                              } else {
                                btnStyle = "opacity-40 border-transparent scale-95";
                              }
                            }

                            return (
                              <button
                                key={optionIdx}
                                disabled={selectedOption !== null}
                                onClick={() => handleOptionClick(optionIdx, data.questions[currentQuestionIndex].answerIndex)}
                                className={`flex items-center justify-between p-4 rounded-2xl border-2 text-lg font-bold text-left transition-all duration-300 ${btnStyle}`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold border transition-all duration-300 ${
                                    boardTheme === "chalkboard" 
                                      ? (selectedOption !== null && isCorrectIdx ? "border-emerald-400 bg-emerald-500/20 text-emerald-200" : "border-white/20 bg-white/5") 
                                      : (selectedOption !== null && isCorrectIdx ? "border-emerald-300 bg-emerald-500/10 text-emerald-600" : "border-gray-300 bg-white")
                                  }`}>
                                    {String.fromCharCode(65 + optionIdx)}
                                  </span>
                                  <span>{option}</span>
                                </div>

                                {selectedOption !== null && (
                                  <div>
                                    {isCorrectIdx && <Check className="w-5 h-5 text-green-400" />}
                                    {isSelectedIdx && !isCorrectIdx && <X className="w-5 h-5 text-red-400" />}
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      /* Quiz Completion screen */
                      <div className="flex flex-col items-center justify-center text-center py-8 pointer-events-auto">
                        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 mb-4 border border-green-500/20">
                          <Sparkles className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-bold font-display mb-2">Quiz Completed!</h2>
                        <p className="text-lg mb-6">
                          Awesome effort, class! Score: <span className={`font-bold ${boardTheme === "chalkboard" ? "text-yellow-300" : "text-brand-orange-dark font-extrabold"}`}>{quizScore} / {data.questions.length}</span>
                        </p>
                        <button
                          onClick={resetQuiz}
                          className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white px-6 py-2.5 rounded-full font-bold shadow-md shadow-orange-500/10 transition-all text-sm"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Try Quiz Again</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Navigation footer */}
                  {!quizCompleted && selectedOption !== null && (
                    <div className="flex justify-between items-center mt-4 pointer-events-auto">
                      <div className="text-[10px] font-bold text-emerald-300 tracking-wider uppercase animate-pulse">
                        🎤 Tip: Say &quot;next question&quot; to continue voice commands
                      </div>
                      <button
                        onClick={handleNextQuestion}
                        className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white px-6 py-2.5 rounded-full font-bold shadow-md shadow-orange-500/10 transition-all text-sm"
                      >
                        <span>
                          {currentQuestionIndex === data.questions.length - 1 ? "Finish Quiz" : "Next Question"}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Floating Capsule Whiteboard Toolbar Pinned Bottom Center */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-white/95 backdrop-blur-md border border-gray-200/80 px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-4 transition-all duration-300 pointer-events-auto">
          {/* Tool selectors */}
          <div className="flex items-center gap-1.5 border-r border-gray-200 pr-3.5">
            <button
              onClick={() => setActiveTool("select")}
              className={`p-2 rounded-full transition-colors flex items-center justify-center ${
                activeTool === "select" ? "bg-brand-orange text-white" : "text-gray-500 hover:text-slate-800 hover:bg-gray-100"
              }`}
              title="Select / Click Mode"
            >
              <MousePointer className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setActiveTool("pen")}
              className={`p-2 rounded-full transition-colors flex items-center justify-center ${
                activeTool === "pen" ? "bg-brand-orange text-white" : "text-gray-500 hover:text-slate-800 hover:bg-gray-100"
              }`}
              title="Draw Chalk / Marker"
            >
              <PenTool className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTool("eraser")}
              className={`p-2 rounded-full transition-colors flex items-center justify-center ${
                activeTool === "eraser" ? "bg-brand-orange text-white" : "text-gray-500 hover:text-slate-800 hover:bg-gray-100"
              }`}
              title="Chalk Eraser"
            >
              <Eraser className="w-4 h-4" />
            </button>
            
            <button
              onClick={addStickyNote}
              className="p-2 rounded-full text-gray-500 hover:text-slate-800 hover:bg-gray-100 transition-colors flex items-center justify-center"
              title="Add Yellow Sticky Note"
            >
              <StickyNote className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowLessonText(prev => !prev)}
              className={`p-2 rounded-full transition-colors flex items-center justify-center ${
                !showLessonText ? "bg-brand-orange text-white" : "text-gray-500 hover:text-slate-800 hover:bg-gray-100"
              }`}
              title={showLessonText ? "Hide Lesson Content" : "Show Lesson Content"}
            >
              {showLessonText ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z"/><circle cx="12" cy="12" r="3"/></svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61M2 2l20 20"/></svg>
              )}
            </button>
          </div>

          {/* Color palette selector (only relevant if pen tool active) */}
          <div className="flex items-center gap-1 border-r border-gray-200 pr-3.5">
            {activePalette.map((color) => (
              <button
                key={color}
                disabled={activeTool !== "pen"}
                onClick={() => setDrawColor(color)}
                style={{ backgroundColor: color }}
                className={`w-5 h-5 rounded-full border border-gray-300 transition-all ${
                  drawColor === color && activeTool === "pen" ? "scale-125 ring-2 ring-brand-orange/40" : "opacity-80 hover:opacity-100"
                } ${activeTool !== "pen" ? "cursor-not-allowed opacity-30" : ""}`}
              />
            ))}
          </div>

          {/* Brush thickness slider */}
          <div className="flex items-center gap-2 border-r border-gray-200 pr-3.5 text-gray-500">
            <Minus className="w-3.5 h-3.5" />
            <input
              type="range"
              min="2"
              max="15"
              value={drawWidth}
              disabled={activeTool === "select"}
              onChange={(e) => setDrawWidth(parseInt(e.target.value))}
              className="w-16 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-orange disabled:opacity-30 disabled:cursor-not-allowed"
            />
            <span className="text-[10px] font-bold w-4 text-center">{drawWidth}</span>
          </div>

          {/* Undo and Clear canvas controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleUndo}
              disabled={drawingHistory.length === 0}
              className="p-2 rounded-full text-gray-500 hover:text-slate-800 hover:bg-gray-100 disabled:opacity-35 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              title="Undo Stroke"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              onClick={clearCanvas}
              className="p-2 rounded-full text-gray-500 hover:text-rose-600 hover:bg-rose-50 transition-colors flex items-center justify-center"
              title="Clear Canvas"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
      
      {/* Physical Chalk / Marker Tray */}
      <div className={boardTheme === "chalkboard" ? "chalk-tray mt-[-4px]" : "w-[92%] h-3 bg-slate-200 rounded-b-lg shadow-md mx-auto mt-[-4px] border-b border-slate-400"} />
    </div>
  );
}

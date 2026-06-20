# 👨‍🏫 Shikshak-Saarthi (Classroom OS)

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![IndexedDB](https://img.shields.io/badge/IndexedDB-Local_Storage-blueviolet?style=for-the-badge&logo=sqlite)](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
[![OpenRouter](https://img.shields.io/badge/API-OpenRouter-orange?style=for-the-badge&logo=openai)](https://openrouter.ai/)

**Shikshak-Saarthi (Classroom OS)** is a premium, AI-powered interactive learning and teaching operating system designed for modern educators and students. By blending localized cultural analogies, custom voice synthesis, interactive canvases, and a local document manager, it builds an engaging environment for both classroom lecturing and independent study.

---

## 🎨 Visual Preview

### 1. Classroom Mode
Interactive smart chalkboard featuring visual mind maps, drawing tools, sticky notes, voice mic controller, and student understanding telemetry graphs.
![Classroom Mode Screenshot](public/classroom_mode.png)

### 2. Study Mode
Upload textbooks, notes, and PDFs to generate dynamic study guides, flashcards, and interactive quizzes with persistent local history.
![Study Mode Screenshot](public/study_mode.png)

---

## ⚡ Core Features

### 🎙️ 1. Teacher Persona & Accent Toggles (Multilingual)
Switch teaching styles and speech accents dynamically to match different regional backdrops and pedagogical tones:
*   **GuruG (Haryanvi Hinglish)**: Uses rural analogies (Haryana Roadways buses, danggal, fields) and colloquial encouraging terms (*"Arey balako..."*).
*   **Sat Sri Akal (Punjabi Hinglish)**: Warm Punjabi-accented educator drawing on local analogies (lassi, paratha, bhangra) and phrases (*"Oye Kakaji..."*).
*   **Shikshak (Standard Hindi)**: Highly polite, formal Hindi educator utilizing relatable public/assembly/local-train analogies (*"Namaskar priya chhatro..."*).
*   **Professor (Formal English)**: Global encouraging educator using clear, standard English explanations and standard academic analogies.

### 💾 2. Local Document Persistence & History (IndexedDB)
*   **Persistent Storage**: Uploaded textbooks and notes are saved directly in the browser's IndexedDB. Your study guides stay cached and accessible across page reloads without re-uploading.
*   **Clean Filenames**: Long system-generated unique UUID prefixes (e.g., `7c7d0f36_6a9b_...`) are automatically parsed and cleaned into readable dashboard labels.
*   **Instant Removal**: Manage your documents library with hover-to-reveal delete actions that securely wipe items from IndexedDB.

### 🧠 3. Smart NLP Intent Router
*   **Natural Language Triggering**: Type or speak instructions like *"Start a quiz on Quantum computing"* or *"Revise Photosynthesis"*. The API router automatically overrides standard tabs and redirects the view to the corresponding Mode (Quiz, Revise, or Explain).
*   **Regex Parsing**: Uses case-preserving regex matching to extract topics (e.g., `"Quantum computing"`) and determine intent before falling back to manual UI dropdown choices.

### 🚀 4. API Performance & Fallbacks
*   **3x Generation Speed**: Triggers parallel API requests (`explain`, `revise`, and `quiz`) using Promise pools so all resources load simultaneously.
*   **Load Balancing**: Automatically balance free requests across active endpoints via `openrouter/free` to mitigate rate limits.
*   **Paid API Failover**: If the free tier returns a `429 Too Many Requests` or takes more than 25 seconds, the request gracefully fails over to the paid `meta-llama/llama-3-8b-instruct` model to guarantee uninterrupted service.

---

## 🛠️ Technology Stack

*   **Frontend Framework**: Next.js 14 (App Router)
*   **Programming Language**: TypeScript
*   **Styles & Styling System**: Tailwind CSS & Vanilla CSS
*   **Database**: Client-side IndexedDB Wrapper
*   **Synthesizers**: HTML5 Canvas, Web Speech Synthesis (TTS), Web Speech Recognition (ASR)
*   **AI Integration**: OpenRouter API (`openrouter/free` & `meta-llama/llama-3-8b-instruct`), Groq (`llama3-8b-8192`), OpenAI (`gpt-4o-mini`)

---

## 💻 Running Locally

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18+) and Git installed.

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/being-iota/embody.git
cd embody

# Install dependencies
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory:
```env
OPENROUTER_API_KEY=your_openrouter_api_key
GROQ_API_KEY=your_groq_api_key
OPENAI_API_KEY=your_openai_api_key
```

### 4. Run the Development Server
To avoid compilation conflicts between builds and development mode, clear the cache and run:
```bash
# Windows (PowerShell)
if (Test-Path .next) { Remove-Item -Recurse -Force .next }; npm run dev

# macOS / Linux (Terminal)
rm -rf .next && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📦 Deployment

### Vercel Deployment
1. Push your repository code to GitHub:
   ```bash
   git add .
   git commit -m "docs: add premium README and screenshots"
   git push origin main
   ```
2. Import the repository into your [Vercel Dashboard](https://vercel.com).
3. Configure the environment variables (`OPENROUTER_API_KEY`, etc.).
4. Click **Deploy**.

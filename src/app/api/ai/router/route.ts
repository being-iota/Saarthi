import { NextResponse } from "next/server";
import { generateContent, PERSONA_STYLES } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const { text, mode: explicitMode, persona } = await req.json();
    if (!text) {
      return NextResponse.json({ error: "Text input is required" }, { status: 400 });
    }

    const openaiKey = req.headers.get("x-openai-key");
    const groqKey = req.headers.get("x-groq-key");
    const openrouterKey = req.headers.get("x-openrouter-key");
    const keys = { openai: openaiKey, groq: groqKey, openrouter: openrouterKey };

    // Clean and normalize text
    const cleanText = text.toLowerCase().trim();

    // Command Intent Parsing via regex
    let detectedMode: "explain" | "quiz" | "revise" | null = null;
    let extractedTopic = text;

    const quizRegex = /^(?:start|take|give|create|generate|make)?\s*(?:a)?\s*(?:quiz|test|mcq)\s*(?:on|about|for)?\s+(.+)$/i;
    const reviseRegex = /^(?:revise|summarize|revision|summary)\s*(?:of|on|about|for)?\s+(.+)$/i;
    const explainRegex = /^(?:explain|explanation|what is|how does)\s*(?:of|on|about|for)?\s+(.+?)(?:\s*work)?$/i;

    if (quizRegex.test(cleanText)) {
      detectedMode = "quiz";
      const match = cleanText.match(quizRegex);
      if (match && match[1]) {
        // Use the original case of the text for the topic name
        const matchIndex = cleanText.indexOf(match[1]);
        extractedTopic = matchIndex !== -1 ? text.substring(matchIndex) : match[1];
      }
    } else if (reviseRegex.test(cleanText)) {
      detectedMode = "revise";
      const match = cleanText.match(reviseRegex);
      if (match && match[1]) {
        const matchIndex = cleanText.indexOf(match[1]);
        extractedTopic = matchIndex !== -1 ? text.substring(matchIndex) : match[1];
      }
    } else if (explainRegex.test(cleanText)) {
      detectedMode = "explain";
      const match = cleanText.match(explainRegex);
      if (match && match[1]) {
        const matchIndex = cleanText.indexOf(match[1]);
        extractedTopic = matchIndex !== -1 ? text.substring(matchIndex) : match[1];
      }
    } else {
      // Fallback keyword checks
      if (cleanText.includes("quiz") || cleanText.includes("test")) {
        detectedMode = "quiz";
        extractedTopic = text.replace(/\b(start|quiz|test|on|about|a|an|the)\b/gi, "").trim() || "General Science";
      } else if (cleanText.includes("revise") || cleanText.includes("revision") || cleanText.includes("summary")) {
        detectedMode = "revise";
        extractedTopic = text.replace(/\b(revise|revision|summary|on|about|of|for|a|an|the)\b/gi, "").trim();
      }
    }

    let mode: "explain" | "quiz" | "revise" = "explain";
    let topic = text;

    if (detectedMode) {
      mode = detectedMode;
      topic = extractedTopic;
    } else if (explicitMode && ["explain", "quiz", "revise"].includes(explicitMode)) {
      mode = explicitMode;
      topic = text;
    }

    // Default topic if empty
    topic = topic.trim() || "General Knowledge";

    // Call helper depending on the determined mode
    let systemPrompt = "";
    let userPrompt = "";

    const personaKey = persona || "haryanvi";
    const style = PERSONA_STYLES[personaKey] || PERSONA_STYLES.haryanvi;

    if (mode === "explain") {
      systemPrompt = `${style} Keep the explanation under 100 words, using short, punchy sentences. You MUST return a JSON object.`;
      userPrompt = `Explain the topic: "${topic}". 
Provide a warm teacher introduction matching your persona style, clear content, and a localized analogy.
Return your response in this exact JSON structure:
{
  "type": "explain",
  "topic": "${topic}",
  "explanation": "Short explanation here",
  "analogy": "Daily-life local analogy here"
}`;
    } else if (mode === "revise") {
      systemPrompt = `${style} Summarize topics in 5 clear bullet points and one local analogy matching your persona style. You MUST return a JSON object.`;
      userPrompt = `Create revision notes for the topic: "${topic}".
Return your response in this exact JSON structure:
{
  "type": "revise",
  "topic": "${topic}",
  "bullets": [
    "Revision bullet 1 matching your persona's language and style",
    "Revision bullet 2 matching your persona's language and style",
    "Revision bullet 3 matching your persona's language and style",
    "Revision bullet 4 matching your persona's language and style",
    "Revision bullet 5 matching your persona's language and style"
  ],
  "analogy": "Analogy matching your persona's language and style"
}`;
    } else {
      systemPrompt = `${style} Generate 3-5 simple classroom MCQ questions. Keep it interactive and suitable for students. You MUST return a JSON object.`;
      userPrompt = `Generate a quiz of 3 to 5 MCQ questions for the topic: "${topic}".
Keep it interactive.
Return your response in this exact JSON structure:
{
  "type": "quiz",
  "topic": "${topic}",
  "questions": [
    {
      "question": "Question text matching your persona's style?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answerIndex": 0
    }
  ]
}`;
    }

    const data = await generateContent({
      topic,
      mode,
      systemPrompt,
      userPrompt,
      keys
    });

    // Make sure returning mode is synchronized
    return NextResponse.json({
      ...data,
      parsedIntent: {
        detectedMode: mode,
        extractedTopic: topic
      }
    });

  } catch (error: any) {
    console.error("Error in router route:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

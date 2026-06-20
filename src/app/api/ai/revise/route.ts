import { NextResponse } from "next/server";
import { generateContent, PERSONA_STYLES } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const { topic, context, persona } = await req.json();
    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const openaiKey = req.headers.get("x-openai-key");
    const groqKey = req.headers.get("x-groq-key");
    const openrouterKey = req.headers.get("x-openrouter-key");

    const personaKey = persona || "haryanvi";
    const style = PERSONA_STYLES[personaKey] || PERSONA_STYLES.haryanvi;

    const systemPrompt = `${style} Summarize topics in 5 clear bullet points, one local analogy matching your persona style, and 3 active recall Q&A pairs. You MUST return a JSON object.`;
    
    let userPrompt = "";
    if (context) {
      userPrompt = `Based on the following document context:
"${context}"

Create revision notes for the topic: "${topic}".
Summarize the topic in 5 bullet points, one simple analogy, and 3 active recall Q&A pairs (containing a direct question and its detailed answer) based strictly on the document. Make it match the language and teaching style of your persona.
Return your response in this exact JSON structure:
{
  "type": "revise",
  "topic": "${topic}",
  "bullets": [
    "Revision bullet 1 based on the document, matching your persona's style",
    "Revision bullet 2 based on the document, matching your persona's style",
    "Revision bullet 3 based on the document, matching your persona's style",
    "Revision bullet 4 based on the document, matching your persona's style",
    "Revision bullet 5 based on the document, matching your persona's style"
  ],
  "analogy": "Analogy explaining a key document concept, matching your persona's style",
  "recall": [
    {
      "question": "Active recall question 1 matching your persona's style?",
      "answer": "Clear, concise answer matching your persona's style"
    },
    {
      "question": "Active recall question 2 matching your persona's style?",
      "answer": "Clear, concise answer matching your persona's style"
    },
    {
      "question": "Active recall question 3 matching your persona's style?",
      "answer": "Clear, concise answer matching your persona's style"
    }
  ]
}`;
    } else {
      userPrompt = `Create revision notes for the topic: "${topic}".
Summarize the topic in 5 bullet points, one simple analogy, and 3 active recall Q&A pairs. Make it match the language and teaching style of your persona.
Return your response in this exact JSON structure:
{
  "type": "revise",
  "topic": "${topic}",
  "bullets": [
    "Revision bullet 1 matching your persona's style",
    "Revision bullet 2 matching your persona's style",
    "Revision bullet 3 matching your persona's style",
    "Revision bullet 4 matching your persona's style",
    "Revision bullet 5 matching your persona's style"
  ],
  "analogy": "Analogy matching your persona's style",
  "recall": [
    {
      "question": "Recall question 1 matching your persona's style?",
      "answer": "Answer 1 matching your persona's style"
    },
    {
      "question": "Recall question 2 matching your persona's style?",
      "answer": "Answer 2 matching your persona's style"
    },
    {
      "question": "Recall question 3 matching your persona's style?",
      "answer": "Answer 3 matching your persona's style"
    }
  ]
}`;
    }

    const data = await generateContent({
      topic,
      context,
      mode: "revise",
      systemPrompt,
      userPrompt,
      keys: { openai: openaiKey, groq: groqKey, openrouter: openrouterKey }
    });

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in revise route:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

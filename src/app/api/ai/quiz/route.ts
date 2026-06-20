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

    const systemPrompt = `${style} Generate 3-5 simple classroom MCQ questions. Make sure options are fun, relatable, and appropriate. You MUST return a JSON object.`;
    
    let userPrompt = "";
    if (context) {
      userPrompt = `Based on the following document context:
"${context}"

Generate a quiz of 3 to 5 MCQ questions for the topic: "${topic}".
Make sure all quiz questions and options are based strictly on facts present in the document context. Make it match the language and teaching style of your persona.
Return your response in this exact JSON structure:
{
  "type": "quiz",
  "topic": "${topic}",
  "questions": [
    {
      "question": "Question text based on the document, matching your persona's style?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answerIndex": 0
    }
  ]
}`;
    } else {
      userPrompt = `Generate a quiz of 3 to 5 MCQ questions for the topic: "${topic}".
Make it match the language and teaching style of your persona.
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
      context,
      mode: "quiz",
      systemPrompt,
      userPrompt,
      keys: { openai: openaiKey, groq: groqKey, openrouter: openrouterKey }
    });

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in quiz route:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

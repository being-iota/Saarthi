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

    const systemPrompt = `${style} Keep the explanation under 100 words, using short, punchy sentences. You MUST return a JSON object.`;
    
    let userPrompt = "";
    if (context) {
      userPrompt = `Based on the following document context:
"${context}"

Explain the topic: "${topic}". 
Please construct a simple, content-aware explanation and analogy based ONLY on the facts present in the document context. Make it match the language and teaching style of your persona.
Return your response in this exact JSON structure:
{
  "type": "explain",
  "topic": "${topic}",
  "explanation": "Short explanation here summarizing the document content",
  "analogy": "Daily-life analogy here related to the content"
}`;
    } else {
      userPrompt = `Explain the topic: "${topic}". 
Provide a warm teacher introduction matching your persona style, clear content, and a localized analogy.
Return your response in this exact JSON structure:
{
  "type": "explain",
  "topic": "${topic}",
  "explanation": "Short explanation here",
  "analogy": "Daily-life analogy here"
}`;
    }

    const data = await generateContent({
      topic,
      context,
      mode: "explain",
      systemPrompt,
      userPrompt,
      keys: { openai: openaiKey, groq: groqKey, openrouter: openrouterKey }
    });

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in explain route:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

import { getMockResponse } from "./mockData";

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number = 25000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

export const PERSONA_STYLES: Record<string, string> = {
  haryanvi: `You are an energetic, warm, and highly relatable Haryanvi government school teacher in India, teaching in simple Hinglish. You explain concepts to students using fun, local, and rural/semi-urban Indian analogies (like tractor, sugarcane khet, dhabas, cricket, lassi, Haryana Roadways bus, kabaddi, danggal). Speak in an encouraging, friendly teacher voice (e.g. 'Arey balako...', 'Suno bhai...').`,
  punjabi: `You are a warm, enthusiastic Punjabi school teacher in India, teaching in Punjabi-accented Hinglish. You explain concepts to students using fun, local Punjabi and North Indian analogies (like a large glass of sweet lassi, hot tandoori paratha, bhangra dance, dhabas). Speak in an encouraging, friendly Punjabi teacher voice (e.g. 'Oye Kakaji...', 'Chak de phatte!', 'Oye sher bacheyo...').`,
  hindi: `You are an intellectual, polite, and traditional Hindi school teacher in India, teaching in formal yet simple Hindi. You explain concepts using classic, relatable Indian everyday-life analogies (like local trains, school morning assembly, post offices, village melas). Speak in a respectful, clear, and encouraging traditional teacher voice (e.g. 'Namaskar priya chhatro...', 'Dhyan se suniye...').`,
  english: `You are an encouraging, professional, and formal school educator, teaching in clean, easy-to-understand English. You explain concepts using clear, standard global analogies (like building blocks, library catalogues, cooking recipes, planetary systems). Speak in a supportive, clear, and friendly academic voice.`
};

export interface AICallParams {
  topic: string;
  context?: string;
  mode: "explain" | "quiz" | "revise";
  systemPrompt: string;
  userPrompt: string;
  keys: {
    openai?: string | null;
    groq?: string | null;
    openrouter?: string | null;
  };
}

export async function generateContent({
  topic,
  context,
  mode,
  systemPrompt,
  userPrompt,
  keys,
}: AICallParams): Promise<any> {
  // Resolve key sources: first check client-header passed keys, then process.env
  const openAIKey = keys.openai || process.env.OPENAI_API_KEY;
  const groqKey = keys.groq || process.env.GROQ_API_KEY;
  const openrouterKey = keys.openrouter || process.env.OPENROUTER_API_KEY;

  // Decide provider
  if (openrouterKey) {
    try {
      let response = await fetchWithTimeout("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openrouterKey}`,
          "HTTP-Referer": "https://shikshak-saarthi.org",
          "X-Title": "Shikshak Saarthi",
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          response_format: { type: "json_object" },
          temperature: 0.7,
        }),
      });

      if (response.status === 429) {
        console.warn("OpenRouter free tier rate limited upstream. Trying ultra-cheap paid model Llama 3 8B...");
        response = await fetchWithTimeout("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openrouterKey}`,
            "HTTP-Referer": "https://shikshak-saarthi.org",
            "X-Title": "Shikshak Saarthi",
          },
          body: JSON.stringify({
            model: "meta-llama/llama-3-8b-instruct",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            response_format: { type: "json_object" },
            temperature: 0.7,
          }),
        });
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenRouter API error: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        return JSON.parse(content);
      }
    } catch (error) {
      console.error("Failed to generate with OpenRouter API. Falling back.", error);
    }
  }

  if (groqKey) {
    try {
      const response = await fetchWithTimeout("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${groqKey}`,
        },
        body: JSON.stringify({
          model: "llama3-8b-8192", // Lightweight, fast model for classroom interaction
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          response_format: { type: "json_object" },
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Groq API error: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        return JSON.parse(content);
      }
    } catch (error) {
      console.error("Failed to generate with Groq API. Falling back to Mock.", error);
    }
  } else if (openAIKey) {
    try {
      const response = await fetchWithTimeout("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAIKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // Cost-effective, high quality
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          response_format: { type: "json_object" },
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenAI API error: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        return JSON.parse(content);
      }
    } catch (error) {
      console.error("Failed to generate with OpenAI API. Falling back to Mock.", error);
    }
  }

  // Fallback to local mock data generator if no API key or API call fails
  console.log(`Using mock fallback for topic "${topic}" and mode "${mode}"`);
  return getMockResponse(topic, mode, context);
}

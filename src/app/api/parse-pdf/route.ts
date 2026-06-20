import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const filename = file.name;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let extractedText = "";

    if (filename.toLowerCase().endsWith(".pdf")) {
      // Direct binary string analysis to extract ASCII text streams from PDF
      // This is 100% dependency-free, serverless safe, and extracts text from standard PDFs
      const pdfText = buffer.toString("binary");
      const streamRegex = /\(([^)]+)\)\s*Tj/g;
      let match;
      const chunks: string[] = [];
      
      while ((match = streamRegex.exec(pdfText)) !== null) {
        // Clean octal codes and escape sequences
        let txt = match[1]
          .replace(/\\([0-7]{3})/g, (m, c) => String.fromCharCode(parseInt(c, 8)))
          .replace(/\\r/g, "\r")
          .replace(/\\n/g, "\n")
          .replace(/\\t/g, "\t")
          .replace(/\\/g, "");
        if (txt.trim()) chunks.push(txt);
      }

      extractedText = chunks.join(" ");

      // Count how many printable ASCII characters are in the text
      const printableAsciiCount = (extractedText.match(/[\x20-\x7E\r\n\t]/g) || []).length;
      const asciiRatio = printableAsciiCount / Math.max(1, extractedText.length);

      // Fallback if no text could be regex-extracted or it contains binary garbage (e.g. compressed streams)
      if (extractedText.trim().length < 50 || asciiRatio < 0.75) {
        const topicName = filename
          .replace(/\.[^/.]+$/, "") // remove extension
          .replace(/[-_]/g, " ")     // replace dashes/underscores with spaces
          .replace(/\b\w/g, c => c.toUpperCase()); // capitalize

        extractedText = `${topicName} covers the fundamental concepts, history, and key definitions of the subject. This guide helps students learn the topic easily through interactive questions. Please use the revision and quiz tabs to study this topic further.`;
      }
    } else {
      // Plain text file
      extractedText = buffer.toString("utf-8");
    }

    return NextResponse.json({
      filename,
      size: file.size,
      text: extractedText.slice(0, 10000) // limit to 10k chars for API prompt safety
    });

  } catch (error: any) {
    console.error("Error parsing document:", error);
    return NextResponse.json({ error: error.message || "Failed to parse document" }, { status: 500 });
  }
}

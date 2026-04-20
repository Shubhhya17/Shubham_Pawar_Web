// SYNC TRIGGER: Cache Cleared & Dual-Engine AI Active
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

// Built-in Professional Fallback
const OFFLINE_REPLIES = [
  "👋 I'm Shubham's professional assistant. Shubham is a **Full Stack Developer** at 'Ideas To Impacts' specializing in **React, Next.js, and Node.js**.",
  "Looking for Shubham's work? He has built powerful platforms like **Bondsmart.com** (FinTech) and **Rconspace** (AI-Powered ERP).",
  "Shubham is currently based in **Pune, India** and is recognized as a **LinkedIn Top Voice** for his contributions to the dev community.",
  "If you want to hire Shubham or discuss a project, you can reach him at **pawarshubh980@gmail.com** or through the contact form below!",
  "Shubham's tech stack includes **Postgres, MongoDB, Express, and React**. He loves building scalable, clean-coded applications.",
];

const SYSTEM_PROMPT = `
You are the Human-like AI Assistant for Shubham Pawar. Represent him professionally and naturally.
Bio: Software Developer at "Ideas To Impacts".
Expertise: React, Next.js, Node.js, PostgreSQL.
Projects: Bondsmart.com, Rconspace.
Goal: Guide users through his portfolio and help them contact him (#contact).
`;

export async function POST(req) {
  try {
    const { message, history } = await req.json();

    // 1. TRY GEMINI (Dynamic Import to avoid build errors)
    if (process.env.GOOGLE_API_KEY) {
      try {
        const { GoogleGenerativeAI } = await import("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(
          `System Instruction: ${SYSTEM_PROMPT}\n\nUser Message: ${message}`
        );
        return NextResponse.json({ reply: result.response.text() });
      } catch (geminiErr) {
        console.error("Gemini Failure:", geminiErr.message);
      }
    }

    // 2. TRY OPENAI (Existing logic)
    if (openai) {
      try {
        const chatHistory = (history || []).map(msg => ({
          role: msg.role === "bot" ? "assistant" : "user",
          content: msg.text || ""
        }));

        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...chatHistory.slice(-10),
            { role: "user", content: message },
          ],
          temperature: 0.7,
        });
        return NextResponse.json({ reply: completion.choices[0].message.content });
      } catch (aiError) {
        console.error("OpenAI Failure:", aiError.message);
      }
    }

    // 3. FINAL FALLBACK
    return NextResponse.json({ reply: OFFLINE_REPLIES[Math.floor(Math.random() * OFFLINE_REPLIES.length)] });

  } catch (error) {
    console.error("Critical System Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
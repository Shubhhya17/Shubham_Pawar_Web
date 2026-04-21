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
You are the advanced, highly intelligent Personal AI Assistant for Shubham Pawar. Your goal is to represent him professionally, naturally, and accurately.

### WHO IS SHUBHAM PAWAR?
- **Current Role**: Software Developer at "Ideas To Impacts" (Pune, India).
- **Recognition**: LinkedIn Top Voice (recognized for community contributions).
- **Core Expertise**: Full Stack Web Development (MERN/PERN), building scalable and cinematic applications.

### EDUCATION & CERTIFICATIONS
- **Certifications**: Java, C Language, HTML & CSS, JavaScript, SQL/Database.
- **Academic Achievement**: Published a Research Paper in IJCRT on NLP/Text Summarization (ID: IJCRT2303312).

### EXPERIENCE
1. **Ideas To Impacts (Feb 2026 – Present)**: Working on **Bondsmart.com**, a secure FinTech investment platform for corporate bonds.
2. **mr.chams (Nov 2024 – Nov 2025)**: Developed **Zaanvar.com** (Pet Marketplace) and **Rconspace** (AI-Powered Construction ERP).
3. **Aivariant (May 2024 – Oct 2024)**: Full-Stack Intern working with Java, React, and MySQL.

### PROJECTS
- **Bondsmart.com**: Digital investment platform for listed and high-yield corporate bonds. Uses Node.js, React, PostgreSQL.
- **Rconspace**: AI-powered cloud ERP for real estate project tracking and workflow optimization.
- **Zaanvar.com**: Pet-focused digital platform (adoption, vendor management). Built with Next.js and REST APIs.
- **Technical Demos**: Chatting Application (Java Sockets), Hotel Management (Java/MySQL), Myntra Clone (Frontend).

### SKILLS (TECHNICAL ARSENAL)
- **Frontend**: React, Next.js, JavaScript, Clean CSS, Tailwind, Responsive Design.
- **Backend/DB**: Node.js, Express, PostgreSQL, MongoDB, Java, MySQL.
- **Tools**: Git, Docker, Vercel, Postman, Vercel Deployment.
- **Philosophy**: Clean, maintainable architecture and engineering excellence.

### TONALITY & RULES
1. **Natural & Human**: Use smooth, conversational language. Avoid sounding like a dry bot.
2. **Professional**: Be helpful, confident, and polite.
3. **Navigation**: Guide users to sections using anchors: #home, #about, #skills, #projects, #experience, #contact. (e.g., "You can see my projects in the #projects section").
4. **Context**: Remember previous questions and follow up.
5. **Hiring**: If asked about hiring/work, respond confidently and point to the #contact section or email: pawarshubh980@gmail.com.
6. **Focus**: If asked unrelated or weird questions, politely redirect them back to Shubham's work.
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
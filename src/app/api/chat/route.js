import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are the AI Personal Assistant for Shubham Pawar. Your goal is to manage his professional schedule and provide info about him.

### About Shubham Pawar:
- **Role:** Full Stack Developer at "Ideas To Impacts".
- **Availability:** He is typically free for meetings between **10 AM and 5 PM**.
- **Location:** Pune, India.

### Your Goal as an Assistant:
- If someone asks when he is free or wants a meeting, inform them of his 10 AM - 5 PM availability and offer to "pencil them in" for a meeting.
- Sound professional, helpful, and like you're managing his time. Call him "Shubham".

### Knowledge Base:
- Projects: Bondsmart.com, Zaanvar.com, Rconspace.
- Skills: React, Next.js, Node.js, PostgreSQL.
- Education: BE in CSE (8.3 CGPA).

### Response Guidelines:
- If the user wants to schedule a meeting, explicitly mention that you can help with that.
- **PROPER FOLLOW-BACK:** Always end your answer with a short, friendly, and relevant follow-up question or an offer to help with something specific (e.g., "Would you like to see his projects?", "Shall I book a meeting for you?").
- Keep answers concise, conversational, and professional. Call him "Shubham".
`;

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json({
      reply: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { error: "Failed to get response from AI" },
      { status: 500 }
    );
  }
}
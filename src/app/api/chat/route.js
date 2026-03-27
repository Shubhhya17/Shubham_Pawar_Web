import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
    });

    return NextResponse.json({
      reply: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error("API ERROR:", error); // 👈 check this in terminal
    return NextResponse.json(
      { error: "Failed to get response" },
      { status: 500 }
    );
  }
}
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function POST(req) {
  try {
    const { totalBudget, totalIncome, totalSpent } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const prompt = `Given a total budget of ₹${totalBudget}, total spent of ₹${totalSpent}, and total income of ₹${totalIncome}, provide concise financial advice in 2-3 sentences.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return new NextResponse(JSON.stringify({ advice: text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API Error:', error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
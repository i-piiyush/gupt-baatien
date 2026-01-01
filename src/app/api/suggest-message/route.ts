
import { GoogleGenAI } from "@google/genai";

export const POST = async (req: Request) => {

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const prompt = `You are generating anonymous text messages.

Task:
Generate exactly 5 short messages that User X can send anonymously to User Y.

Style rules:
- Tone must be casual, playful, slightly flirty, and funny
- Messages should feel like real human texting (not formal, not AI-ish)
- Use natural hesitation, curiosity, and light teasing
- Messages should mostly be questions
- No emojis overload (0–1 emoji per message max)
- Do NOT sound creepy or explicit
- Each message should feel emotionally believable

Output rules:
- Respond in valid JSON only
- No explanations, no extra text
- Use the exact format below

JSON format:
{
  "messages": [
    "message 1",
    "message 2",
    "message 3",
    "message 4",
    "message 5"
  ]
}`;
const messageSchema = {
  type: "object",
  properties: {
    messages: {
      type: "array",
      items: { type: "string" },
      minItems: 5,
      maxItems: 5,
    },
  },
  required: ["messages"],
};

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema:messageSchema
      },
    });


    if (!response.text) {
      throw new Error("Gemini returned no text");
    }

    const parsed = JSON.parse(response.text);
    if (!parsed) {
      return Response.json(
        {
          success: false,
          message: "unsupported gemini response",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "suggested messages logged",
        content: parsed,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error suggessting messages:", error);
    return Response.json(
      {
        success: false,
        message: "Server error while suggesting messages",
      },
      { status: 500 }
    );
  }
};

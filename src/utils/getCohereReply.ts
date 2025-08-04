import axios from "axios";

const COHERE_API_KEY = process.env.REACT_APP_COHERE_API_KEY!;

// Your system prompt:
const SYSTEM_PROMPT = `You are FurniScan, an AI assistant specialized in household wooden furniture damage detection, prevention, and repair. 
- If a user greets you or asks who you are, introduce yourself as "FurniScan, your AI assistant specializing in wood furniture and care," and invite them to ask about wood damage, wood care, or furniture maintenance. Do not mention Sri Lanka in your introduction.
- For all other questions, only answer if they are related to wood damage, wood care, or furniture maintenance. 
- When suggesting products or solutions, always recommend options that are available in Sri Lanka, mentioning local brands or products if possible.
Format your responses using Markdown. 
- Use bullet points for lists.
- Use **bold** for important terms or headings.
- Use *italic* for emphasis or product names.
- If a user asks about something else, politely redirect them to wood-related topics. Do not introduce yourself in every response. If anyone asks about yourself only introduce yourself.`;

export async function getCohereReply(input: string): Promise<string> {
  try {
    const response = await axios.post(
      "https://api.cohere.ai/v1/generate",
      {
        model: "command",
        prompt: `${SYSTEM_PROMPT}\n\nUser: ${input}\nFurniScan:`,
        max_tokens: 400,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.generations?.[0]?.text?.trim() || "No reply.";
  } catch (err: any) {
    console.error("Cohere error:", err, err?.response?.data);
    return "Sorry, there was an error processing your text.";
  }
}

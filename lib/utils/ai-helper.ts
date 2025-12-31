'use server'
import { GoogleGenAI } from "@google/genai";
import { db } from "@/index";
import { decisions, outcomes } from "@/db/drizzle/schema";
import { eq } from "drizzle-orm";
import { aiSchema } from "@/lib/utils/data-parsers";

const ai = new GoogleGenAI({});

export async function getResponseFromAI(decisionID: string) {
    const [decision] = await db
        .select()
        .from(decisions)
        .where(eq(decisions.id, decisionID));

    if (!decision) throw new Error("Decision not found");

    const outcomeList = await db.select().from(outcomes).where(eq(outcomes.decisionId, decisionID));

    const outcomeText = outcomeList
        .map(
            (o) =>
                `Type: ${o.type}\nDescription: ${o.description}\nLesson: ${o.lesson ?? "N/A"}\nTime Cost: ${o.timeCost ?? "N/A"}`
        )
        .join("\n\n");

    const optionsText =
        Array.isArray(decision.options) && decision.options.length
            ? decision.options.map((o: any) => `- ${o.value}`).join("\n")
            : "N/A";

    const prompt = `
You are a senior software engineer analyzing a past technical decision.

Decision Context:
${decision.context}

Options Considered:
${optionsText}

Chosen Option:
${decision.chosen}

Outcome:
${outcomeText}

Please respond in strict JSON with the following fields:
{
  "title": "Analysis title",
  "rootCause": "Root cause of outcome",
  "hiddenTradeoffs": ["list of hidden trade-offs"],
  "bestAlternative": "What might have happened with the best alternative",
  "lesson": "One concrete lesson for future decisions"
}

Be concise, technical, and honest. Only respond with valid JSON, no extra text.
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    const rawText = response.text!;
    const cleanedText = extractJson(rawText);

    let parsed: any = {};
    try {
        parsed = JSON.parse(cleanedText);
    } catch (err) {
        console.error("AI returned invalid JSON, using fallback:", err);
        // fallback object so Zod won't crash
        parsed = {
            title: "AI Analysis Failed",
            rootCause: "N/A",
            hiddenTradeoffs: [],
            bestAlternative: "N/A",
            lesson: "N/A",
        };
    }

    // Safely parse with Zod — now parsed is an object
    return aiSchema.parse(parsed);
}

function extractJson(text: string) {
    // Remove ```json and ``` if present
    return text.replace(/```json/g, "").replace(/```/g, "").trim();
}

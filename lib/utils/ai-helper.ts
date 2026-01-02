'use server'
import { GoogleGenAI } from "@google/genai";
import { db } from "@/index";
import {aiReplays, decisions, outcomes, users} from "@/db/drizzle/schema";
import {eq, sql} from "drizzle-orm";
import { aiSchema } from "@/lib/utils/data-parsers";
import {randomUUID} from "node:crypto";
import {auth} from "@clerk/nextjs/server";
import {getUserById} from "@/lib/utils/user-helper";
const ai = new GoogleGenAI({});

export async function getResponseFromAI(decisionID: string) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Login Required");
    }

    const user = await getUserById(userId);

    // -----------------------------
    // 🔐 AI Usage Reset + Enforcement
    // -----------------------------
    const now = new Date();

    if (user.aiUsageResetAt && now > user.aiUsageResetAt) {
        await db.update(users).set({
            aiUsageCount: 0,
            aiUsageResetAt: new Date(
                new Date().setMonth(new Date().getMonth() + 1)
            ),
        }).where(eq(users.id, userId));

        user.aiUsageCount = 0;
    }

    const AI_LIMITS = {
        free: 5,
        pro: 50,
        pro_plus: Infinity,
    } as const;

    const limit = AI_LIMITS[user.plan];

    if (limit !== Infinity && user.aiUsageCount >= limit) {
        throw new UsageLimitError("Upgrade your plan to continue");
    }


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
        await saveResponse(parsed, decisionID);
        await db.update(users).set({aiUsageCount: sql`${users.aiUsageCount} + 1`})
            .where(eq(users.id, userId));
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

async function saveResponse(data: any, decisionID: string) {
    await db.insert(aiReplays).values({
        id: randomUUID(),
        decisionId: decisionID,
        title: data.title,
        rootCause: data.rootCause,
        hiddenTradeoffs: data.hiddenTradeoffs,
        bestAlternative: data.bestAlternative,
        lesson: data.lesson,
    })
}

export async function getResponseFromDB(decisionID: string) {
    const ai_replays = await db.select().from(aiReplays).where(eq(aiReplays.decisionId, decisionID)).limit(1);
    if (ai_replays.length === 0) {
        throw new Error(`Response not found! Decision ID: ${decisionID}`);
    }
    return ai_replays[0];
}

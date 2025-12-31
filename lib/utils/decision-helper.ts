"use server";

import { currentUser } from "@clerk/nextjs/server";
import { decisionSchema } from "@/lib/utils/data-parsers";
import { decisions } from "@/db/drizzle/schema";
import { db } from "@/index";
import {randomUUID} from "node:crypto"; // your Drizzle db instance

// -----------------------------
// Helper to get current user ID
// -----------------------------
async function getUserId(): Promise<string> {
    const user = await currentUser();
    if (!user) {
        throw new Error("Unauthorized.");
    }
    return user.id;
}

// -----------------------------
// Save a new decision
// -----------------------------
export async function saveDecision(rawData: any) {
    const userId = await getUserId();

    // Validate incoming data
    const data = decisionSchema.parse(rawData);
    const decisionID = randomUUID();

    // Insert using Drizzle ORM
    const insertedDecision = await db.insert(decisions).values({
        id: decisionID,
        userId,
        title: data.title,
        context: data.context,
        options: data.options, // JSON field
        chosen: data.chosen,
        confidence: data.confidence,
        reasoning: data.reasoning ?? null,
        // createdAt will default to NOW automatically
    }).returning(); // returns the inserted row(s)

    // returning() gives an array of inserted rows; usually [0] is enough
    return insertedDecision[0];
}

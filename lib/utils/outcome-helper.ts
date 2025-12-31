'use server'

import {outcomeSchema} from "@/lib/utils/data-parsers";
import {db} from "@/index";
import {outcomes} from "@/db/drizzle/schema";
import {randomUUID} from "node:crypto";

export async function saveOutcome(data: any, decisionId: string) {
    const cleanData = outcomeSchema.parse(data);
    const insertedOutcome = await db.insert(outcomes).values({
        id: randomUUID(),
        decisionId: decisionId,
        type: cleanData.type,
        description: cleanData.description,
        timeCost: cleanData.timeCost ?? null,
        lesson: cleanData.lesson ?? null,
    }).returning();

    return insertedOutcome[0];
}
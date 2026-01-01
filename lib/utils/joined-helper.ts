'use server'

import {db} from "@/index";
import {aiReplays, decisions, outcomes} from "@/db/drizzle/schema";
import {desc, eq} from "drizzle-orm";
import {mapHistoryRow} from "@/lib/utils/mappers";

export async function getDecisionHistory(userId: string){
    const rows = db.select({
        decision: decisions,
        outcome: outcomes,
        analysis: aiReplays
    })
        .from(decisions)
        .leftJoin(outcomes, eq(outcomes.decisionId, decisions.id))
        .leftJoin(aiReplays, eq(aiReplays.decisionId, decisions.id))
        .where(eq(decisions.userId, userId))
        .orderBy(desc(decisions.createdAt))
        .limit(20);

    return rows;
}

export async function getHistoryCards(userId: string){
    const rows = await getDecisionHistory(userId);
    return rows.map(mapHistoryRow)
}
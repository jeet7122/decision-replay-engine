import { NextRequest, NextResponse } from "next/server";
import { verifyWebhook } from "@clerk/backend/webhooks";
import { db } from "@/index";
import { users } from "@/db/drizzle/schema";
import {eq} from "drizzle-orm";

export async function POST(request: NextRequest) {
    try {
        // verifyWebhook auto‑verifies signature using CLERK_WEBHOOK_SIGNING_SECRET
        const evt = await verifyWebhook(request);

        // Only handle the event you care about
        if (evt.type === "user.created") {
            const { id: userId } = evt.data;

            // Upsert the user so we avoid duplicates
            const existing = await db
                .select()
                .from(users)
                .where(eq(users.id,(userId)));

            if (!existing.length) {
                await db.insert(users).values({
                    id: userId,
                    createdAt: new Date(),
                });
            }
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Clerk webhook failed:", err);
        return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
    }
}

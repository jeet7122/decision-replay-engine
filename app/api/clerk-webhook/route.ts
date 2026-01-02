import { NextRequest, NextResponse } from "next/server";
import { verifyWebhook } from "@clerk/backend/webhooks";
import { db } from "@/index";
import { users } from "@/db/drizzle/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
    try {
        // Pass the request as the first param, secret in second param
        const evt = await verifyWebhook(request, {signingSecret: process.env.CLERK_WEBHOOK_SIGNING_SECRET!});

        if (evt.type === "user.created") {
            const { id : userId, email_addresses} = evt.data;
            const email = email_addresses[0]?.email_address;

            const existing = await db
                .select()
                .from(users)
                .where(eq(users.id, userId));

            if (existing.length < 0) {
                await db.insert(users).values({
                    id: userId,
                    createdAt: new Date(),
                    email: email,
                });
            }
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Clerk webhook failed:", err);
        return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
    }
}

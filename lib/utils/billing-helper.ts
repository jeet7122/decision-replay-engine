'use server'

import Stripe from "stripe";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/index";
import {users} from "@/db/drizzle/schema";
import {eq} from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function cancelSubscription(){
    const {userId} = await auth();
    if (!userId) throw new Error("Unauthorized");

    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);

    if (!user?.stripeSubscriptionId) throw new Error("No active subscription found for user");

    await stripe.subscriptions.update(user.stripeSubscriptionId, {
        cancel_at_period_end: true
    });

    return { success: true };
}

export async function getUserCurrentPlan():Promise<string> {
    const {userId} = await auth();
    if (!userId) throw new Error("Unauthorized");
    const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (user.length === 0) throw new Error("No such user");
    return user[0].plan ?? "free";
}
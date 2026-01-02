import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import z from "zod";
import { users } from "@/db/drizzle/schema";
import { eq } from "drizzle-orm";
import { db } from "@/index";
import { stripe } from "@/lib/stripe";

const PRICE_MAP = {
    pro: "price_1SkyPiJzheN1Q6WBTCzoXSkc",
    pro_plus: "price_1SkyThJzheN1Q6WBwYNzRIVx",
} as const;

const PlanSchema = z.object({
    plan: z.enum(["pro", "pro_plus"]),
});

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { plan } = PlanSchema.parse(body);
        const priceId = PRICE_MAP[plan];

        if (!priceId) {
            return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
        }

        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.id, userId))
            .limit(1);

        if (!user || !user.stripeCustomerId) {
            return NextResponse.json({ error: "Stripe customer missing" }, { status: 400 });
        }

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            customer: user.stripeCustomerId,
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
            metadata: { userId: user.id, plan },
        });

        if (!session.url) {
            return NextResponse.json({ error: "Stripe session URL not found" }, { status: 500 });
        }

        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        console.error("Error creating checkout session:", err);
        return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
    }
}

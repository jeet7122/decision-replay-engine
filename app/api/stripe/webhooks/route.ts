import {NextRequest, NextResponse} from "next/server";
import Stripe from "stripe";
import {stripe} from "@/lib/stripe";
import {db} from "@/index";
import {users} from "@/db/drizzle/schema";
import {eq} from "drizzle-orm";

export const config = {
    api: { bodyParser: false }, // Stripe requires raw body
};

export async function POST(req: NextRequest){
    const buf = await req.arrayBuffer();
    const rawBody = Buffer.from(buf);

    const sign = req.headers.get('stripe-signature');
    if (!sign) {
        throw new Error('No signature provided');
    }
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            rawBody,
            sign,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    }
    catch(err){
        console.error("Webhook signature verification failed:", err);
        return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
    }

    const data = event.data.object;

    try {
        switch (event.type) {
            //New Subscription
            case "checkout.session.completed":
                const session = data as Stripe.Checkout.Session;
                const plan = session.metadata?.plan as "pro" | "pro_plus";

                if (!session.customer || !plan) break;

                await db.update(users)
                    .set({
                        plan,
                        subscriptionStatus: "active",
                        stripeSubscriptionId: session.subscription as string,
                        aiUsageResetAt: new Date(new Date().setMonth(new Date().getMonth() + 1)),
                    })
                    .where(eq(users.stripeCustomerId, session.customer as string));
                break;
            // Invoice Generation
            case "invoice.payment_succeeded":
                // Payment successful, ensure status is active
                const invoice = data as Stripe.Invoice;
                if (invoice.customer) {
                    await db.update(users)
                        .set({ subscriptionStatus: "active" })
                        .where(eq(users.stripeCustomerId, invoice.customer as string));
                }
                break;

            // Cancel Subscription update
            case "customer.subscription.updated":
                const sub = event.data.object as Stripe.Subscription;
                if(sub.cancel_at_period_end){
                    await db.update(users)
                        .set({
                            canceledAt: new Date(sub.cancel_at! * 1000),
                        }).where(eq(users.stripeCustomerId, sub.id));
                }
                break;

             // Delete sub
            case "customer.subscription.deleted":
                const subscription = data as Stripe.Subscription;
                if (subscription.customer) {
                    await db.update(users)
                        .set({ subscriptionStatus: "canceled", plan: "free", canceledAt: null })
                        .where(eq(users.stripeCustomerId, subscription.customer as string));
                }
                break;
            default:
                console.log("Unhandled Stripe event:", event.type);
        }
    }
    catch(err){
        console.error("Error processing webhook:", err);
        return NextResponse.json({ error: "Internal webhook error" }, { status: 500 });
    }
    return NextResponse.json({ received: true });
}

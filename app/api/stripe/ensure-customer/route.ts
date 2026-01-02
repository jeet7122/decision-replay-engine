import {auth} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";
import {db} from "@/index";
import {users} from "@/db/drizzle/schema";
import {eq} from "drizzle-orm";
import {stripe} from "@/lib/stripe";

export async function POST(){
    const {userId} = await auth();
    if(!userId){
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if(!user){
        return NextResponse.json({error: "User not found"}, {status: 404});
    }
    const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
            userId: user.id,
        }
    });

    await db.update(users).set({stripeCustomerId: customer.id}).where(eq(users.id, userId));
    return NextResponse.json({ customerId: customer.id });
}
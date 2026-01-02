"use server"

import {db} from "@/index";
import {users} from '@/db/drizzle/schema';
import {eq} from "drizzle-orm";

export async function getUserById(id: string) {
    const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
    if (!user) {
        throw new Error("User not found");
    }
    return user[0];
}
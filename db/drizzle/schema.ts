// db/schema.ts
import {
    pgTable,
    varchar,
    text,
    integer,
    json,
    timestamp,
    pgEnum,
} from "drizzle-orm/pg-core";

// -----------------------------
// Enum
// -----------------------------
export const outcomeType = pgEnum("OutcomeType", ["positive", "neutral", "negative"]);

// -----------------------------
// Stripe / Billing Enums
// -----------------------------
export const planType = pgEnum("plan_type", [
    "free",
    "pro",
    "pro_plus",
]);

export const subscriptionStatus = pgEnum("subscription_status", [
    "active",
    "past_due",
    "canceled",
    "incomplete",
]);


// -----------------------------
// Users Table
// -----------------------------
export const users = pgTable("users", {
    id: varchar("id", { length: 191 }).primaryKey(),
    email: varchar("email", { length: 255 }).notNull(),

    // Stripe
    stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
    stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),

    plan: planType("plan").default("free").notNull(),
    subscriptionStatus: subscriptionStatus("subscription_status"),

    // AI usage
    aiUsageCount: integer("ai_usage_count").default(0).notNull(),
    aiUsageResetAt: timestamp("ai_usage_reset_at"),
    createdAt: timestamp("created_at").defaultNow(),
    canceledAt: timestamp("canceled_at"),
});

// -----------------------------
// Decisions Table
// -----------------------------
export const decisions = pgTable("decisions", {
    id: varchar("id", { length: 191 }).primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    context: text("context").notNull(),
    options: json("options").notNull(),
    chosen: varchar("chosen", { length: 255 }).notNull(),
    confidence: integer("confidence").notNull(),
    reasoning: text("reasoning"),
    createdAt: timestamp("created_at").defaultNow(),
    userId: varchar("user_id", { length: 191 })
        .notNull()
        .references(() => users.id),
});

// -----------------------------
// Outcomes Table
// -----------------------------
export const outcomes = pgTable("outcomes", {
    id: varchar("id", { length: 191 }).primaryKey(),
    decisionId: varchar("decision_id", { length: 191 })
        .notNull()
        .references(() => decisions.id),
    type: outcomeType("type").notNull(),
    description: text("description").notNull(),
    timeCost: integer("time_cost"),
    lesson: text("lesson"),
    createdAt: timestamp("created_at").defaultNow(),
});

// -----------------------------
// AI_Replays Table (Structured)
// -----------------------------
export const aiReplays = pgTable("ai_replays", {
    id: varchar("id", { length: 191 }).primaryKey(),

    decisionId: varchar("decision_id", { length: 191 })
        .notNull()
        .references(() => decisions.id, { onDelete: "cascade" }),

    title: text("title").notNull(),

    rootCause: text("root_cause").notNull(),

    hiddenTradeoffs: json("hidden_tradeoffs")
        .$type<string[]>()
        .notNull(),

    bestAlternative: text("best_alternative").notNull(),

    lesson: text("lesson").notNull(),

    generatedAt: timestamp("generated_at").defaultNow().notNull(),
});

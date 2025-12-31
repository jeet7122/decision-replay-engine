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
// Users Table
// -----------------------------
export const users = pgTable("users", {
    id: varchar("id", { length: 191 }).primaryKey(),
    createdAt: timestamp("created_at").defaultNow(),
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
// AI_Replays Table
// -----------------------------
export const aiReplays = pgTable("ai_replays", {
    id: varchar("id", { length: 191 }).primaryKey(),
    decisionId: varchar("decision_id", { length: 191 })
        .notNull()
        .references(() => decisions.id),
    analysis: text("analysis").notNull(),
    generatedAt: timestamp("generated_at").defaultNow(),
});

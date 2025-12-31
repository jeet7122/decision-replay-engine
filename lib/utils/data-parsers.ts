import {z} from "zod";

export const decisionSchema = z.object({
    title: z.string().min(1),
    context: z.string().min(1),
    options: z.array(
        z.object({
            value: z.string().min(1),
        })
    ),
    chosen: z.string().min(1),
    confidence: z.number().min(0).max(100),
    reasoning: z.string().optional(),
})

export const outcomeSchema = z.object({
    type: z.enum(["positive", "neutral", "negative"]),
    description: z.string().min(1),
    timeCost: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : undefined)),
    lesson: z.string().optional(),
});
export const aiSchema = z.object({
    title: z.string().default("No Title"),
    rootCause: z.string().default("No Root Cause"),
    hiddenTradeoffs: z.array(z.string()).default([]),
    bestAlternative: z.string().default("No Best Alternative"),
    lesson: z.string().default("No Lesson"),
});

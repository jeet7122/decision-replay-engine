export function mapHistoryRow(row: any) {
    const { decision, outcome, analysis } = row;

    return {
        title: decision.title,
        outcomeStatus: outcome?.type ?? "neutral",

        date: new Date(decision.createdAt).toLocaleDateString(),
        cost: outcome?.timeCost ? `${outcome.timeCost}h` : "N/A",

        details: {
            decision: {
                reasoning: decision.reasoning,
                confidence: decision.confidence,
                chosen: decision.chosen,
            },

            outcome: {
                description: outcome?.description,
                lesson: outcome?.lesson,
            },

            analysis: analysis
                ? {
                    report: `
ROOT CAUSE:
${analysis.rootCause}

HIDDEN TRADE-OFFS:
${analysis.hiddenTradeoffs.join("\n- ")}

BEST ALTERNATIVE:
${analysis.bestAlternative}

LESSON:
${analysis.lesson}
            `.trim(),
                }
                : null,
        },
    };
}

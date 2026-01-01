import { NextRequest, NextResponse } from "next/server";
import { getResponseFromDB } from "@/lib/utils/ai-helper";

export async function GET(req: NextRequest) {
    const decisionID = req.nextUrl.searchParams.get("decisionId");

    if (!decisionID) {
        return NextResponse.json(
            { error: "decision not found" },
            { status: 404 }
        );
    }

    try {
        const aiData = await getResponseFromDB(decisionID);

        // ✅ aiData is now an OBJECT
        return NextResponse.json(aiData);
    } catch (err) {
        console.error(err);

        return NextResponse.json(
            { error: "AI response not found" },
            { status: 404 }
        );
    }
}

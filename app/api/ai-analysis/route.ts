import {NextRequest, NextResponse} from "next/server";
import {getResponseFromAI} from "@/lib/utils/ai-helper";

export async function GET(req: NextRequest){
    const decisionID = req.nextUrl.searchParams.get("decisionID");
    if (!decisionID) return NextResponse.json({error: "decision not found"}, {status: 404});
    try {
        const aiData = await getResponseFromAI(decisionID);
        return NextResponse.json(aiData);
    }
    catch(err){
        console.log(err);
    }
}
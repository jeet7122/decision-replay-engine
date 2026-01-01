import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getHistoryCards} from "@/lib/utils/joined-helper";

export async function GET(req: Request){
    const {userId, isAuthenticated} = await auth();
    if(!isAuthenticated){
        redirect('/login');
    }
    const data = await getHistoryCards(userId);
    return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
    });

}
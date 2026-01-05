import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Sparkles, RefreshCcw, TrendingUp } from "lucide-react";

export function AIAnalysisView({ aiData, onReset }: { aiData: any; onReset: () => void }) {
    if (!aiData) return null;

    return (
        <Card className="border-2 border-primary/20 shadow-2xl animate-in zoom-in-95 duration-500 bg-pink-300/30">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
                <CardTitle className="flex items-center gap-2 text-primary">
                    <Sparkles className="h-5 w-5" />
                    {aiData.title}
                </CardTitle>
            </CardHeader>

            <CardContent className="p-8 space-y-6">
                <div>
                    <h4 className="font-bold text-lg">1. Root Cause of Outcome</h4>
                    <p className="text-muted-foreground">{aiData.rootCause}</p>
                </div>

                <div>
                    <h4 className="font-bold text-lg">2. Hidden Trade-offs</h4>
                    <ul className="list-disc ml-6">
                        {(aiData.hiddenTradeoffs ?? []).map((t: string, idx: number) => (
                            <li key={idx}>{t}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-lg">3. Best Alternative Analysis</h4>
                    <p className="text-muted-foreground">{aiData.bestAlternative}</p>
                </div>

                <div>
                    <h4 className="font-bold text-lg">4. Lesson for Future Decisions</h4>
                    <p className="text-muted-foreground">{aiData.lesson}</p>
                </div>

                <Button onClick={onReset} variant="outline" className="w-full">
                    Start New Chain
                </Button>
            </CardContent>
        </Card>
    );
}

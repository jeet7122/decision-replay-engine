import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Sparkles, RefreshCcw, TrendingUp } from "lucide-react";

export function AIAnalysisView({ decisionId, onReset }: { decisionId: string; onReset: () => void }) {
    const [isAnalyzing, setIsAnalyzing] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsAnalyzing(false), 2500); // Simulate AI logic
        return () => clearTimeout(timer);
    }, []);

    if (isAnalyzing) {
        return (
            <Card className="border-primary/20 bg-slate-950 text-slate-100 p-12 text-center overflow-hidden relative">
                <div className="absolute inset-0 bg-grid-white/[0.05]" />
                <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="animate-spin text-primary">
                        <RefreshCcw className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-mono">Correlating Past Decisions...</h3>
                    <p className="text-slate-400 font-mono text-sm">analyzing_drift.py --id={decisionId}</p>
                </div>
            </Card>
        );
    }

    return (
        <Card className="border-2 border-primary/20 shadow-2xl animate-in zoom-in-95 duration-500">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
                <CardTitle className="flex items-center gap-2 text-primary">
                    <Sparkles className="h-5 w-5" />
                    AI Decision Replay Report
                </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 rounded-xl bg-slate-50 border">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Causality Match</p>
                        <p className="text-2xl font-bold">92%</p>
                    </div>
                    <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                        <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-1">Total Hidden Cost</p>
                        <p className="text-2xl font-bold text-red-700">~$4,200</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Decision Pattern</p>
                        <p className="text-sm font-bold flex items-center gap-1">
                            Premature Opt. <TrendingUp className="h-3 w-3 text-red-500" />
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-bold text-lg">Architectural Insight</h4>
                    <p className="text-muted-foreground leading-relaxed">
                        By choosing <strong>MongoDB</strong> for the User Profile service, the system gained
                        initial development speed (+15%), but incurred a <strong>3.4x cost multiplier</strong>
                        on complex reporting queries logged in Step 2. If <strong>Postgres</strong> was
                        chosen, the current refactor wouldn't be necessary.
                    </p>
                </div>

                <Button onClick={onReset} variant="outline" className="w-full">
                    Start New Chain
                </Button>
            </CardContent>
        </Card>
    );
}
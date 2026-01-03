"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DecisionForm } from "@/components/dashboard/DecisionForm";
import { OutcomeForm } from "@/components/dashboard/OutcomeForm";
import { AIAnalysisView } from "@/components/dashboard/ai-analysis";
import { HistoryCard } from "@/components/dashboard/HistoryCard";
import { BrainCircuit, FileText, Activity, History } from "lucide-react";
import {useSearchParams, useRouter} from "next/navigation";
import toast from "react-hot-toast";

type AIData = {
    title: string;
    rootCause: string;
    hiddenTradeoffs: string[];
    bestAlternative: string;
    lesson: string;
};

type HistoryItem = {
    title: string;
    outcomeStatus: "positive" | "neutral" | "negative";
    date: string;
    cost: string;
    details: {
        decision: {
            reasoning: string;
            confidence: number;
            chosen: string;
        };
        outcome: {
            description: string;
            lesson: string;
        };
        analysis: {
            report: string;
        } | null;
    };
};
interface Props{
    userId: string;
}

export default function DashboardClient({userId}: Props) {
    // --- Form State ---
    const [activeStage, setActiveStage] = useState<"decision" | "outcome" | "analysis">("decision");
    const [currentDecisionId, setCurrentDecisionId] = useState<string | null>(null);
    const [aiData, setAiData] = useState<AIData | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // --- History State ---
    const [history, setHistory] = useState<HistoryItem[] | null>(null);

    //Success Payment Redirection
    const searchParams = useSearchParams();
    const router = useRouter();

    const success = searchParams.get("success");

    useEffect(() => {
        if (success === "true") {
            toast.success("Payment successful! 🎉");
            router.replace("/dashboard");
        }
    }, [success, router]);
    // --- Fetch history on mount ---
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await fetch(`/dashboard/api?userId=${userId}`);
                const data = await res.json();
                setHistory(data);
            } catch (err) {
                console.error(err);
                setHistory([]);
            }
        };

        fetchHistory().catch(console.error); // explicitly handle promise rejection
    }, []);

    return (
        <div className="container mx-auto p-4 md:p-8 space-y-12">
            {/* --- STEPPED FORM SECTION --- */}
            <section className="max-w-4xl mx-auto">
                <div className="mb-8 text-center md:text-left">
                    <h1 className="text-3xl font-bold tracking-tight">New Analysis</h1>
                    <p className="text-muted-foreground">
                        Follow the sequence to correlate your technical choices.
                    </p>
                </div>

                <Tabs value={activeStage} onValueChange={(value) => setActiveStage(value as "decision" | "outcome" | "analysis")} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8 h-12 bg-muted/50 p-1">
                        <TabsTrigger value="decision" disabled={activeStage !== "decision"} className="gap-2">
                            <FileText className="h-4 w-4" /> <span className="hidden sm:inline">1. Decision</span>
                        </TabsTrigger>
                        <TabsTrigger value="outcome" disabled={activeStage !== "outcome"} className="gap-2">
                            <Activity className="h-4 w-4" /> <span className="hidden sm:inline">2. Outcome</span>
                        </TabsTrigger>
                        <TabsTrigger value="analysis" disabled={activeStage !== "analysis"} className="gap-2">
                            <BrainCircuit className="h-4 w-4" /> <span className="hidden sm:inline">3. AI Replay</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="decision">
                        <DecisionForm
                            onComplete={(id) => {
                                setCurrentDecisionId(id);
                                setActiveStage("outcome");
                            }}
                        />
                    </TabsContent>

                    <TabsContent value="outcome">
                        {currentDecisionId && (
                            <OutcomeForm
                                decisionId={currentDecisionId}
                                onComplete={async () => {
                                    setIsAnalyzing(true);
                                    try {
                                        const response = await fetch(`/api/ai-analysis?decisionId=${currentDecisionId}`);
                                        const data: AIData = await response.json();
                                        setAiData(data);
                                    } catch (err) {
                                        console.error("Failed to fetch AI analysis:", err);
                                    }
                                    setIsAnalyzing(false);
                                    setActiveStage("analysis");
                                }}
                            />
                        )}
                    </TabsContent>

                    <TabsContent value="analysis">
                        <AIAnalysisView
                            aiData={aiData}
                            onReset={() => {
                                setActiveStage("decision");
                                setCurrentDecisionId(null);
                                setAiData(null);
                            }}
                        />
                    </TabsContent>
                </Tabs>
            </section>

            <hr className="border-border" />

            {/* --- HISTORY SECTION --- */}
            <section className="space-y-6">
                <div className="flex items-center gap-2">
                    <History className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-bold tracking-tight">Recent Decision Chains</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {history?.length ? (
                        history.map((item, idx) => <HistoryCard key={idx} data={item} />)
                    ) : (
                        <p className="text-muted-foreground">No history available.</p>
                    )}
                </div>
            </section>
        </div>
    );
}

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AlertCircle, ArrowRight, Clock, Link as LinkIcon } from "lucide-react";

const outcomes = [
    {
        id: 1,
        issue: "3s Latency on User Analytics",
        type: "Performance",
        cost: "12h Refactor",
        linkedTo: "Used Mongo instead of Postgres",
        date: "Logged today",
        severity: "high"
    },
    {
        id: 2,
        issue: "Manual Data Migration script failed",
        type: "Reliability",
        cost: "4h Debugging",
        linkedTo: "Skipped abstraction layer",
        date: "Logged 2 days ago",
        severity: "medium"
    }
];

export default function OutcomeTracker() {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Outcome Correlation</h2>
                        <p className="text-muted-foreground mt-2">Connecting current friction to past architecture.</p>
                    </div>
                    <Badge variant="outline" className="w-fit h-fit py-1 px-4 border-primary/20 bg-primary/5 text-primary">
                        AI Analysis Active
                    </Badge>
                </div>

                <div className="space-y-4">
                    {outcomes.map((item) => (
                        <Card key={item.id} className="p-0 overflow-hidden border-border hover:border-primary/50 transition-colors">
                            <div className="flex flex-col md:flex-row">
                                {/* Left Side: The Current Pain */}
                                <div className="p-6 flex-1 bg-card">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`h-2 w-2 rounded-full ${item.severity === 'high' ? 'bg-red-500 animate-pulse' : 'bg-amber-500'}`} />
                                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
                      {item.type}
                    </span>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-1">{item.issue}</h3>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {item.date}</span>
                                        <span className="flex items-center gap-1 font-bold text-destructive"><AlertCircle className="h-3 w-3" /> Cost: {item.cost}</span>
                                    </div>
                                </div>

                                {/* Right Side: The Linked Decision (The "Replay" Part) */}
                                <div className="p-6 flex-1 bg-muted/30 border-t md:border-t-0 md:border-l border-border flex items-center">
                                    <div className="w-full">
                                        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-primary uppercase">
                                            <LinkIcon className="h-3 w-3" /> Linked to Past Decision
                                        </div>
                                        <div className="bg-background rounded-lg border border-border p-4 shadow-sm group cursor-pointer hover:bg-slate-50">
                                            <div className="flex items-center justify-between">
                                                <p className="font-medium text-sm italic">"{item.linkedTo}"</p>
                                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
import { BrainCircuit, History, Target, Zap } from "lucide-react";
import {cn} from "@/lib/utils";

const steps = [
    {
        title: "Log the Decision",
        description: "Record the 'Why' behind a choice in real-time. 'Choosing Mongo for speed' or 'Skipping Redis' takes 10 seconds.",
        icon: <History className="h-6 w-6" />,
        example: "Decision: Used Mongo instead of Postgres",
        color: "bg-blue-500"
    },
    {
        title: "Track the Outcomes",
        description: "As the project scales, log the friction points. Slow queries, painful migrations, or unexpected refactors.",
        icon: <Target className="h-6 w-6" />,
        example: "Outcome: 3s query latency on join-heavy data",
        color: "bg-amber-500"
    },
    {
        title: "AI Correlation",
        description: "Our engine maps outcomes back to your initial decisions, calculating the true 'Hidden Cost' of your architecture.",
        icon: <BrainCircuit className="h-6 w-6" />,
        example: "Analysis: This choice cost 12 engineering hours",
        color: "bg-primary"
    }
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20 bg-slate-50/50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        Quantify Your Technical Intuition
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        We don't just track bugs. We track the <span className="text-foreground font-semibold">Decisions</span> that caused them.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop Only) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 z-0"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="relative z-10 flex flex-col items-center">
                            <div className={`w-14 h-14 rounded-2xl ${step.color} text-white flex items-center justify-center shadow-lg mb-6`}>
                                {step.icon}
                            </div>
                            <div className={cn(index % 2 === 0) ? "bg-blue-500/20 p-6 rounded-xl border border-border shadow-sm text-center md:text-left h-full" : "bg-green-500/20 p-6 rounded-xl border border-border shadow-sm text-center md:text-left h-full"}>
                                <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                                    {step.description}
                                </p>
                                <div className="mt-auto pt-4 border-t border-border">
                                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-primary/70">
                                        <Zap className="h-3 w-3" /> Sample Data
                                    </div>
                                    <p className="text-xs font-mono mt-1 bg-muted p-2 rounded italic">
                                        "{step.example}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
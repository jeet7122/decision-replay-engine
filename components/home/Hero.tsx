import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, RotateCcw, GitBranch } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-slate-500/10 py-12 md:py-24 lg:py-32">
            {/* Decorative background grid for that "engine" feel */}
            <div className="absolute inset-0 z-0 opacity-[0.03] [background-image:linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] [background-size:40px_40px]"></div>

            <div className="container relative z-10 mx-auto px-4 md:px-6">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                    {/* Text Content */}
                    <div className="flex flex-col items-start gap-6">
                        <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
                            v1.0.0 Now in Beta
                        </Badge>
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                            The Time Machine for <span className="text-primary">Tech Debt.</span>
                        </h1>
                        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Stop wondering "what if." Replay your past technical decisions in a sandboxed
                            environment to see how different architectures, databases, or frameworks
                            would have scaled with your real-world traffic.
                        </p>
                        <div className="flex flex-col w-full gap-3 sm:flex-row sm:w-auto">
                            <Link href='/dashboard'>
                                <Button size="lg" className="h-12 px-8">
                                    Start Replaying <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline" className="h-12 px-8">
                                View Demo
                            </Button>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px]">
                                        DEV
                                    </div>
                                ))}
                            </div>
                            <p>Trusted by 500+ Engineering Leads</p>
                        </div>
                    </div>

                    {/* Visual Replay Engine Representation */}
                    <div className="relative rounded-xl border border-border bg-card p-4 shadow-2xl md:p-8">
                        <div className="space-y-6">
                            {/* Decision Node 1 */}
                            <div className="flex items-center gap-4 opacity-50">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                                    <GitBranch className="h-5 w-5" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="h-2 w-24 rounded bg-muted"></div>
                                    <div className="h-2 w-48 rounded bg-muted/50"></div>
                                </div>
                            </div>

                            {/* The "Replay" Point */}
                            <div className="relative flex items-center gap-4 rounded-lg border border-primary/30 bg-primary/5 p-4 ring-1 ring-primary/20">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    <RotateCcw className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold">Decision Point: Database Migration</p>
                                    <p className="text-xs text-muted-foreground italic">Replaying alternative: PostgreSQL to ClickHouse</p>
                                </div>
                                <Badge variant="outline" className="bg-background">Active Simulation</Badge>
                            </div>

                            {/* Resulting Branches */}
                            <div className="ml-5 flex flex-col gap-4 border-l-2 border-dashed border-primary/30 pl-9">
                                <div className="rounded-md border bg-background p-3 text-xs shadow-sm">
                                    <span className="font-bold text-green-600">Actual Result:</span> 250ms Latency
                                </div>
                                <div className="rounded-md border border-primary/50 bg-background p-3 text-xs shadow-md">
                                    <span className="font-bold text-primary">Simulated:</span> 42ms Latency
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
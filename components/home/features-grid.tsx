import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, History, LineChart, ShieldAlert } from "lucide-react";

export default function FeaturesGrid() {
    return (
        <section id="features" className="py-24 bg-slate-500/10">
            <div className="container mx-auto px-4">
                <div className="mb-16">
                    <h2 className="text-3xl font-bold tracking-tight">Engineered for Retrospection</h2>
                    <p className="text-muted-foreground mt-2">Turning yesterday's "shipped" into today's "learned."</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    {/* Feature 1: The Decision Log */}
                    <Card className="md:col-span-3 border-none shadow-md bg-white overflow-hidden group">
                        <CardHeader>
                            <History className="h-6 w-6 text-blue-500 mb-2" />
                            <CardTitle>Decision Version Control</CardTitle>
                            <p className="text-sm text-muted-foreground">Log tech choices as easily as a git commit. Document the 'Why' before the context is lost.</p>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-lg bg-slate-100 p-4 font-mono text-xs space-y-2 translate-y-4 transition-transform group-hover:translate-y-0">
                                <div className="flex justify-between border-b pb-1">
                                    <span className="text-blue-600">POST /decisions</span>
                                    <span className="text-slate-400">just now</span>
                                </div>
                                <p className="text-slate-700">"Selected DynamoDB for global replication needs over Postgres."</p>
                                <div className="flex gap-2">
                                    <Badge variant="outline" className="text-[10px]">#Architecture</Badge>
                                    <Badge variant="outline" className="text-[10px]">#Database</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Feature 2: AI Correlation */}
                    <Card className="md:col-span-3 border-none shadow-md bg-white overflow-hidden">
                        <CardHeader>
                            <Brain className="h-6 w-6 text-primary mb-2" />
                            <CardTitle>AI Correlation Engine</CardTitle>
                            <p className="text-sm text-muted-foreground">Our AI monitors your incident logs and PRs to find links between old decisions and new friction.</p>
                        </CardHeader>
                        <CardContent className="flex justify-center py-6">
                            <div className="relative">
                                <div className="h-20 w-20 rounded-full bg-primary/10 animate-pulse flex items-center justify-center">
                                    <Brain className="h-10 w-10 text-primary" />
                                </div>
                                <div className="absolute -top-2 -right-12 bg-white border rounded p-2 shadow-sm text-[10px] font-bold">
                                    Pattern Match: 89%
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Feature 3: The Risk Detection */}
                    <Card className="md:col-span-2 border-none shadow-md bg-zinc-900 text-white">
                        <CardHeader>
                            <ShieldAlert className="h-6 w-6 text-amber-400 mb-2" />
                            <CardTitle className="text-white">Pattern Recognition</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-zinc-400 mb-4">Identify "Decision Debt" before it compounds into a total system rewrite.</p>
                            <div className="h-1 w-full bg-zinc-800 rounded">
                                <div className="h-1 bg-amber-400 w-3/4 rounded animate-grow"></div>
                            </div>
                            <p className="text-[10px] mt-2 text-amber-400 uppercase tracking-widest font-bold">High Risk Pattern: Schema Rigidity</p>
                        </CardContent>
                    </Card>

                    {/* Feature 4: Outcomes Dashboard */}
                    <Card className="md:col-span-4 border-none shadow-md bg-white">
                        <CardHeader>
                            <LineChart className="h-6 w-6 text-green-500 mb-2" />
                            <CardTitle>Quantified Outcomes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end gap-2 h-24">
                                {[40, 70, 45, 90, 65, 80, 30].map((h, i) => (
                                    <div key={i} className="flex-1 bg-slate-200 rounded-t hover:bg-primary transition-colors cursor-pointer" style={{ height: `${h}%` }}></div>
                                ))}
                            </div>
                            <p className="text-xs text-muted-foreground mt-4 text-center">Development velocity loss attributed to past decisions</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Eye } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
    data: {
        title: string;
        outcomeStatus: "positive" | "neutral" | "negative";
        date: string;
        cost: string;
        details: {
            decision: any;
            outcome: any;
            analysis: any;
        };
    };
}

export function HistoryCard({ data }: Props) {
    const statusColors = {
        positive: "bg-green-500/10 text-green-600 border-green-200",
        neutral: "bg-slate-500/10 text-slate-600 border-slate-200",
        negative: "bg-red-500/10 text-red-600 border-red-200",
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="hover:ring-2 hover:ring-primary/50 bg-blue-500/20 transition-all cursor-pointer overflow-hidden group">
                    <div className={`h-1.5 w-full ${data?.outcomeStatus === 'negative' ? 'bg-red-500' : 'bg-green-500'}`} />
                    <CardContent className="p-5 space-y-4">
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                                {data?.title}
                            </h3>
                            <Badge variant="outline" className={statusColors[data?.outcomeStatus]}>
                                {data?.outcomeStatus}
                            </Badge>
                        </div>

                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {data?.date}</div>
                            <div className="flex items-center gap-1 text-destructive font-semibold"><Clock className="h-3 w-3" /> {data?.cost}</div>
                        </div>

                        <div className="pt-2 flex items-center justify-between">
                            <div className="flex gap-1 flex-1 mr-4">
                                <div className="h-1 flex-1 rounded-full bg-primary" />
                                <div className="h-1 flex-1 rounded-full bg-primary" />
                                <div className="h-1 flex-1 rounded-full bg-primary" />
                            </div>
                            <Eye className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </CardContent>
                </Card>
            </DialogTrigger>

            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{data?.title}</DialogTitle>
                    <p className="text-sm text-muted-foreground">Historical Analysis Chain</p>
                </DialogHeader>

                <Tabs defaultValue="decision" className="w-full mt-4">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="decision">Decision</TabsTrigger>
                        <TabsTrigger value="outcome">Outcome</TabsTrigger>
                        <TabsTrigger value="analysis">Analysis</TabsTrigger>
                    </TabsList>

                    <TabsContent value="decision" className="mt-4 space-y-4">
                        <div className="rounded-lg border p-4 bg-muted/30">
                            <label className="text-[10px] font-bold uppercase text-muted-foreground">Reasoning</label>
                            <p className="text-sm mt-1">{data?.details?.decision?.reasoning}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-lg border p-4">
                                <label className="text-[10px] font-bold uppercase text-muted-foreground">Confidence</label>
                                <p className="text-lg font-bold">{data?.details?.decision?.confidence}%</p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <label className="text-[10px] font-bold uppercase text-muted-foreground">Chosen Option</label>
                                <p className="text-lg font-bold text-primary">{data?.details?.decision?.chosen}</p>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="outcome" className="mt-4 space-y-4">
                        <div className="rounded-lg border p-4 bg-muted/30">
                            <label className="text-[10px] font-bold uppercase text-muted-foreground">Description</label>
                            <p className="text-sm mt-1">{data?.details?.outcome?.description}</p>
                        </div>
                        <div className="rounded-lg border p-4 border-destructive/20 bg-destructive/5">
                            <label className="text-[10px] font-bold uppercase text-destructive">Lesson Learned</label>
                            <p className="text-sm mt-1 font-medium">{data?.details?.outcome?.lesson}</p>
                        </div>
                    </TabsContent>

                    <TabsContent value="analysis" className="mt-4">
                        <div className="rounded-xl bg-slate-950 text-slate-100 p-6 font-mono text-xs leading-relaxed border border-slate-800 shadow-inner">
                            <div className="flex items-center gap-2 mb-4 text-primary">
                                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                <span>AI_DEBT_ANALYSIS_COMPLETE</span>
                            </div>
                            {data?.details?.analysis?.report}
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
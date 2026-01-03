import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Clock } from "lucide-react";
import {saveOutcome} from "@/lib/utils/outcome-helper";
import {getResponseFromAI} from "@/lib/utils/ai-helper";
import toast from "react-hot-toast";

export function OutcomeForm({ decisionId, onComplete }: { decisionId: string; onComplete: () => void }) {
    const { register, handleSubmit, setValue } = useForm();

    const onSubmit = async (data: any) => {
        try {
            const savedOutcome = await saveOutcome(data, decisionId);
            const aiResponse = await getResponseFromAI(decisionId);
            // API Call: POST /api/outcomes { ...data, decisionId }
            onComplete();

        }
        catch (err: any) {
            if (err && err.code === "USAGE_LIMIT_EXCEEDED"){
                toast.error("You have reached your AI usage limit. Upgrade your plan!");
            }
            else {
                toast.error("Something went wrong. Try again later.");
            }
        }
    };

    return (
        <Card className="border-2 border-amber-500/10 bg-pink-300/30 shadow-xl animate-in fade-in slide-in-from-bottom-4">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                    What was the result?
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold">Outcome Type</label>
                    <Select onValueChange={(val) => setValue("type", val)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className='bg-white border-2 border-amber-500'>
                            <SelectItem value="positive">Positive (Success)</SelectItem>
                            <SelectItem value="neutral">Neutral (As expected)</SelectItem>
                            <SelectItem value="negative">Negative (Friction/Debt)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold">Description</label>
                    <Textarea
                        {...register("description")}
                        placeholder="Describe the technical outcome (e.g., 'Slow query performance during peak traffic')..."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold flex items-center gap-1">
                            <Clock className="h-3 w-3" /> Time Cost (Hours)
                        </label>
                        <Input type="number" {...register("timeCost")} placeholder="e.g., 8" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Lesson Learned</label>
                        <Input {...register("lesson")} placeholder="e.g., Should have used a relational DB" />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleSubmit(onSubmit)} variant="default" className="w-full h-12 bg-amber-600 hover:bg-amber-700">
                    Run AI Correlation Analysis
                </Button>
            </CardFooter>
        </Card>
    );
}
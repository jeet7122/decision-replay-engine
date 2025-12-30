import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function DecisionForm({ onComplete }: { onComplete: (id: string) => void }) {
    const { register, handleSubmit, setValue, watch, control } = useForm({
        defaultValues: {
            title: "",
            context: "",
            options: [{ value: "" }],
            chosen: "",
            confidence: 50,
            reasoning: "",
        },
    });

    const confidence = watch("confidence", 50);

    // For dynamic options
    const { fields, append, remove } = useFieldArray({
        control,
        name: "options",
    });

    const onSubmit = async (data: any) => {
        console.log("Saving Decision...", data);
        // POST to API
        // const res = await fetch('/api/decisions', { method: 'POST', body: JSON.stringify(data) })
        onComplete("mock-id-123");
    };

    return (
        <Card className="border-2 border-primary/10 shadow-xl">
            <CardHeader>
                <CardTitle>Log a Decision</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold">Title</label>
                    <Input {...register("title")} placeholder="e.g., Selecting Primary Database" />
                </div>

                {/* Context */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold">Context</label>
                    <Textarea {...register("context")} placeholder="What was happening at the time?" />
                </div>

                {/* Options (dynamic) */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold">Options Considered</label>
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 items-center">
                            <Input
                                {...register(`options.${index}.value` as const)}
                                placeholder={`Option ${index + 1}`}
                            />
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => remove(index)}
                                className="h-9"
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                    <Button type="button" onClick={() => append({ value: "" })} className="h-9">
                        Add Option
                    </Button>
                </div>

                {/* Chosen Option */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold">Chosen Option</label>
                    <Input {...register("chosen")} placeholder="Which option was selected?" />
                </div>

                {/* Confidence */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold">Confidence Level ({confidence}%)</label>
                    <Slider
                        defaultValue={[50]}
                        max={100}
                        step={1}
                        onValueChange={(val) => setValue("confidence", val[0])}
                    />
                </div>

                {/* Reasoning */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold">Reasoning / Notes</label>
                    <Textarea {...register("reasoning")} placeholder="Optional: why this option was chosen" />
                </div>
            </CardContent>

            <CardFooter>
                <Button onClick={handleSubmit(onSubmit)} className="w-full h-12">
                    Proceed to Outcomes
                </Button>
            </CardFooter>
        </Card>
    );
}

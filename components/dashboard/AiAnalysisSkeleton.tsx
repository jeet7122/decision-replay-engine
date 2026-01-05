import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AIAnalysisSkeleton() {
    return (
        <Card className="border-2 border-primary/10 shadow-xl bg-pink-300/20 animate-pulse">
            <CardHeader className="space-y-2">
                <Skeleton className="h-6 w-2/3" />
            </CardHeader>

            <CardContent className="space-y-6 p-8">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-5 w-1/3" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                ))}

                <Skeleton className="h-10 w-full mt-6" />
            </CardContent>
        </Card>
    );
}

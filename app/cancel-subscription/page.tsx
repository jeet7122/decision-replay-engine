"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { toast } from "react-hot-toast";
import { cancelSubscription } from "@/lib/utils/billing-helper";

export default function CancelPlanCardPage() {
    const handleCancel = async () => {
        try {
            await cancelSubscription();
            toast.success("Your subscription will cancel at period end.");
        } catch (err: any) {
            toast.error(err?.message ?? "Failed to cancel subscription");
        }
    };

    return (
        <Card className="border-red-500 bg-pink-300/30">
            <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-red-600">
                    <AlertTriangle className="h-5 w-5" />
                    Cancel Subscription
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 flex flex-col">
                <p className="text-sm text-slate-800 text-center">
                    You’ll retain Pro features until the end of your current billing cycle.
                </p>

                <Button variant={'link'} onClick={handleCancel}>
                    Cancel Plan
                </Button>
            </CardContent>
        </Card>
    );
}

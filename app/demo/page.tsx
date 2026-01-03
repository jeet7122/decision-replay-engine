import { Button } from "@/components/ui/button";
import { PlayCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DemoPage() {
    return (
        <div className="container mx-auto max-w-6xl py-16 space-y-16">
            {/* ---------- HERO ---------- */}
            <section className="text-center space-y-6">
                <h1 className="text-5xl font-bold tracking-tight">
                    See Decision Replay in Action
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                    Watch how engineers use Decision Replay to analyze technical choices,
                    understand outcomes, and build better intuition over time.
                </p>

                <div className="flex justify-center gap-4">
                    <Button size="lg" className="gap-2">
                        <PlayCircle className="h-5 w-5" />
                        Watch Demo
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/dashboard">
                            Try It Live <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </section>

            {/* ---------- VIDEO ---------- */}
            <section className="relative">
                <div className="aspect-video rounded-xl overflow-hidden border shadow-lg bg-black">
                    {/* Replace src with your video */}
                    <iframe
                        className="w-full h-full"
                        src="/dre-demo.mp4"
                        title="Decision Replay Demo"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>

                <p className="text-center text-sm text-muted-foreground mt-3">
                    3-minute walkthrough • No sign-up required
                </p>
            </section>

            {/* ---------- WHAT YOU'LL SEE ---------- */}
            <section className="grid md:grid-cols-3 gap-8">
                {[
                    {
                        title: "Capture Decisions",
                        description:
                            "Log technical choices with context, confidence, and alternatives.",
                    },
                    {
                        title: "Record Outcomes",
                        description:
                            "Attach real-world results once the impact is clear.",
                    },
                    {
                        title: "AI Replay",
                        description:
                            "Get structured retrospectives highlighting hidden tradeoffs and lessons.",
                    },
                ].map((item) => (
                    <div
                        key={item.title}
                        className="border rounded-xl p-6 space-y-2 hover:shadow-md transition"
                    >
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                ))}
            </section>

            {/* ---------- CTA ---------- */}
            <section className="text-center space-y-6 border rounded-2xl p-10 bg-muted/40">
                <h2 className="text-3xl font-bold">
                    Ready to build better intuition?
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                    Start capturing decisions today and let AI help you learn faster from
                    real outcomes.
                </p>
                <Button size="lg" asChild>
                    <Link href="/sign-up">Get Started Free</Link>
                </Button>
            </section>
        </div>
    );
}

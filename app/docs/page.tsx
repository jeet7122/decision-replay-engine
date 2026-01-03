import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

export default function DocsPage() {
    return (
        <div className="container mx-auto max-w-4xl py-12 space-y-8">
            <header className="space-y-2">
                <h1 className="text-4xl font-bold">Documentation</h1>
                <p className="text-muted-foreground">
                    Everything you need to understand Decision Replay.
                </p>
            </header>

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="what-is">
                    <AccordionTrigger>What is Decision Replay?</AccordionTrigger>
                    <AccordionContent>
                        Decision Replay helps you analyze technical decisions after outcomes occur,
                        identifying hidden tradeoffs and better alternatives.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ai">
                    <AccordionTrigger>How does AI Replay work?</AccordionTrigger>
                    <AccordionContent>
                        AI Replay analyzes your decision context, confidence, and outcome to generate
                        structured retrospectives.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="data">
                    <AccordionTrigger>How is my data stored?</AccordionTrigger>
                    <AccordionContent>
                        All decisions are private and scoped per user. We never train models on your data.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

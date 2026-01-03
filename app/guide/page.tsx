import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const guides = [
    {
        title: "Making Better Technical Decisions",
        description: "How to structure decisions before committing code.",
        readTime: "5 min",
    },
    {
        title: "Post-Mortems Without Blame",
        description: "Turn failures into repeatable learning loops.",
        readTime: "7 min",
    },
    {
        title: "Using AI Replay Effectively",
        description: "What inputs generate the best AI analysis.",
        readTime: "4 min",
    },
];

export default function GuidesPage() {
    return (
        <div className="container mx-auto max-w-5xl py-12 space-y-8">
            <h1 className="text-4xl font-bold">Guides</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide) => (
                    <Card key={guide.title} className="hover:shadow-lg transition">
                        <CardHeader>
                            <CardTitle>{guide.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="text-muted-foreground">{guide.description}</p>
                            <span className="text-sm text-muted-foreground">
                ⏱ {guide.readTime}
              </span>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

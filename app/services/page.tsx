import { Brain, History, Shield, Zap } from "lucide-react";

const services = [
    {
        title: "AI Decision Replay",
        icon: Brain,
        description: "Analyze decisions after outcomes occur using structured AI reasoning.",
    },
    {
        title: "Decision History",
        icon: History,
        description: "Track your technical decisions over time and spot recurring patterns.",
    },
    {
        title: "Private by Design",
        icon: Shield,
        description: "All data is user-scoped and never shared or trained on.",
    },
    {
        title: "Fast Feedback Loops",
        icon: Zap,
        description: "Learn faster by closing the loop between choice and consequence.",
    },
];

export default function ServicesPage() {
    return (
        <div className="container mx-auto max-w-6xl py-12 space-y-12">
            <h1 className="text-4xl font-bold text-center">Our Services</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map(({ title, icon: Icon, description }) => (
                    <div
                        key={title}
                        className="border rounded-xl p-6 text-center space-y-4 hover:shadow-md transition"
                    >
                        <Icon className="h-8 w-8 mx-auto text-primary" />
                        <h3 className="font-semibold text-lg">{title}</h3>
                        <p className="text-muted-foreground text-sm">{description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

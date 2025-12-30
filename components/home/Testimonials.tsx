export default function Testimonials() {
    const reviews = [
        {
            name: "Sarah Chen",
            role: "CTO @ Fintech Startup",
            content: "Finally, a way to prove to stakeholders that 'shipping fast' 6 months ago is why we're slow today. The ROI calculation is a game changer.",
            avatar: "SC"
        },
        {
            name: "Marcus Thorne",
            role: "Staff Engineer",
            content: "ReplayEngine identified that our 'No-SQL' decision last year cost us 4 extra refactor sessions. The data doesn't lie.",
            avatar: "MT"
        }
    ];

    return (
        <section className="py-20 bg-background" id="testimonials">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-12 text-center">Engineers moving from guessing to knowing</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reviews.map((rev, i) => (
                        <div key={i} className="p-6 rounded-lg border border-border bg-blue-500/20 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center font-bold text-xs">
                                    {rev.avatar}
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">{rev.name}</p>
                                    <p className="text-xs">{rev.role}</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground italic leading-relaxed">
                                "{rev.content}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
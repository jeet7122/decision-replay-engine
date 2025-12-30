import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                        <span className="text-white font-bold text-xl">R</span>
                    </div>
                    <span className="font-bold text-xl tracking-tight">ReplayEngine</span>
                </div>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <Link href="#features" className="transition-colors hover:text-primary/70">Features</Link>
                    <Link href="#how-it-works" className="transition-colors hover:text-primary/70">How it Works</Link>
                    <Link href="#testimonials" className="transition-colors hover:text-primary/70">Testimonials</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm">Log in</Button>
                    <Button size="sm">Get Started</Button>
                </div>
            </div>
        </header>
    );
}
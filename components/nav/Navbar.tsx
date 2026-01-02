"use client";

import * as React from "react";
import Link from "next/link";
import {Menu, Search, Zap} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {SignedIn, SignedOut, SignInButton, SignUpButton, UserButton} from "@clerk/nextjs";

const navLinks = [
    {name: "Methodology", href: "/#how-it-works"},
    {name: "Features", href: "/#features"},
    {name: "Analysis", href: "/#testimonials"},
    {name: "Pricing", href: "/pricing"},
];

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">

                {/* Logo & Desktop Nav */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
                        <div
                            className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shadow-sm shadow-primary/20">
                            <img src='/favicon.ico' alt='Logo' className='w-6 h-6' />
                        </div>
                        <span className="font-bold text-xl tracking-tighter">Replay<span
                            className="text-primary">Engine</span></span>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-2 md:gap-4">
                    <SignedOut>
                        <div className="hidden sm:flex items-center gap-2">
                            <SignInButton/>
                            <SignUpButton><Button size="sm" className="font-medium shadow-sm">Get
                                Started</Button>
                            </SignUpButton>
                        </div>
                    </SignedOut>
                    <SignedIn>
                        <div className="hidden sm:flex items-center gap-2">
                            <Link href='/dashboard'>Dashboard</Link>
                            <UserButton/>
                        </div>
                    </SignedIn>
                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden">
                                <Menu className="h-6 w-6"/>
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <SheetHeader>
                                <SheetTitle className="text-left flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-primary"/> Navigation
                                </SheetTitle>
                            </SheetHeader>
                            <div className="grid gap-6 py-10 px-3">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-lg font-semibold transition-colors hover:text-primary border-b border-border pb-2"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <SignedOut>
                                    <div className="flex flex-col gap-3 pt-4">
                                       <SignUpButton><Button className="w-full">Get Started</Button></SignUpButton>
                                        <SignInButton><Button variant="outline" className="w-full">Log in</Button></SignInButton>
                                    </div>
                                </SignedOut>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
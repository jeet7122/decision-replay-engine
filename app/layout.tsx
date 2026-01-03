import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav/Navbar";
import {ClerkProvider} from "@clerk/nextjs";
import Footer from "@/components/home/Footer";
import {Toaster} from "react-hot-toast";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Decision Replay Engine",
    description: "Record, analyze, and optimize your decisions with AI-powered insights using Decision Replay Engine.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en" data-scroll-behavior="smooth">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
            <Navbar/>
            {children}
            <Toaster position="top-center" reverseOrder={false}/>
            <Footer/>
            </body>
            </html>
        </ClerkProvider>
    );
}

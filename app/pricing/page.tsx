"use client"
import React from "react";
import {PLANS} from "@/data/frontend-data";

export default function PricingPage() {
    const handleCheckout = async (planId: "pro" | "pro_plus") => {
        try {
            await fetch("/api/stripe/ensure-customer", {method: "POST"});

            const res = await fetch("/api/stripe/create-checkout-session", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({plan: planId}),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || "Something went wrong");
                return;
            }

            window.location.href = data.url;
        } catch (err) {
            console.error(err);
            alert("Failed to create checkout session");
        }
    };

    return (
        <div className="flex flex-col gap-4 min-h-screen bg-slate-500/20 items-center">
            <h2 className="text-center text-3xl mt-4">Plans & Pricing</h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch p-8">
                {PLANS.map((plan) => (
                    <div
                        key={plan.name}
                        className="border p-6 rounded-xl shadow-lg flex flex-col justify-between w-80 min-h-[18rem]"
                    >
                        <div>
                            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                            <p className="text-gray-600 mb-4">
                                ${plan.price}/{plan.interval}
                            </p>
                            <ul className="mb-4 space-y-1">
                                {plan.features.map((f) => (
                                    <li key={f} className="text-gray-700">
                                        • {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {plan.planId !== "free" ? (
                            <button
                                onClick={() =>
                                    handleCheckout(plan.planId as "pro" | "pro_plus")
                                }
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                            >
                                Upgrade
                            </button>
                        ) : (
                            <button
                                disabled
                                className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded cursor-not-allowed"
                            >
                                Free
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>

    );
}

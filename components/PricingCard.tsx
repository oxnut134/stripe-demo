"use client";

import { useState } from "react";
import type { Plan } from "@/lib/plans";

export default function PricingCard({ plan }: { plan: Plan }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubscribe() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Failed to start checkout");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  }

  return (
    <div
      className={`flex flex-col rounded-2xl border p-8 shadow-sm transition hover:shadow-md ${
        plan.highlighted
          ? "border-brand bg-white ring-2 ring-brand"
          : "border-slate-200 bg-white"
      }`}
    >
      {plan.highlighted && (
        <span className="mb-4 inline-block self-start rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
          Popular
        </span>
      )}

      <h2 className="text-xl font-bold text-slate-900">{plan.name}</h2>
      <p className="mt-1 text-sm text-slate-500">{plan.description}</p>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-4xl font-extrabold text-slate-900">
          ${plan.price}
        </span>
        <span className="text-sm font-medium text-slate-500">/ month</span>
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
            <svg
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        {plan.id === "free" ? (
          <button
            type="button"
            disabled
            className="w-full rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-500"
          >
            No sign-up required
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubscribe}
            disabled={loading}
            className={`w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
              plan.highlighted
                ? "bg-brand hover:bg-brand-dark"
                : "bg-slate-900 hover:bg-slate-700"
            }`}
          >
            {loading ? "Processing..." : `Subscribe to ${plan.name}`}
          </button>
        )}
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
}

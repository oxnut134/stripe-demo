import { plans } from "@/lib/plans";
import PricingCard from "@/components/PricingCard";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Simple Pricing Plans
        </h1>
        <p className="mt-4 text-base text-slate-600">
          No login required. This is a subscription payment demo using Stripe Checkout.
          You can try out the Pro and Enterprise plans with a test card.
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-2xl rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
        <p className="font-semibold text-slate-900">Test card number</p>
        <p className="mt-2">
          Card number: <code className="rounded bg-slate-100 px-1.5 py-0.5">4242 4242 4242 4242</code>
        </p>
        <p className="mt-1">
          Expiry date: any future date / CVC: any 3 digits / Name &amp; ZIP: anything
        </p>
      </div>
    </main>
  );
}

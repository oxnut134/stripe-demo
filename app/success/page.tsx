import Link from "next/link";
import { stripe } from "@/lib/stripe";

type SearchParams = Promise<{ session_id?: string }>;

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { session_id } = await searchParams;

  let planName: string | null = null;
  let customerEmail: string | null = null;

  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      planName = session.metadata?.planId ?? null;
      customerEmail = session.customer_details?.email ?? null;
    } catch {
      // Ignore retrieval errors and fall back to the generic message
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
      <div className="rounded-full bg-green-100 p-4">
        <svg
          className="h-10 w-10 text-green-600"
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
      </div>

      <h1 className="mt-6 text-2xl font-bold text-slate-900">
        Thank You for Your Purchase
      </h1>
      <p className="mt-2 text-slate-600">
        {planName
          ? `Your subscription to the ${planName.toUpperCase()} plan has been completed successfully.`
          : "Your subscription has been completed successfully."}
      </p>
      {customerEmail && (
        <p className="mt-1 text-sm text-slate-500">
          Confirmation email sent to: {customerEmail}
        </p>
      )}

      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
      >
        Back to Home
      </Link>
    </main>
  );
}

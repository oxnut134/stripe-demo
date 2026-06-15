import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
      <div className="rounded-full bg-slate-100 p-4">
        <svg
          className="h-10 w-10 text-slate-500"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

      <h1 className="mt-6 text-2xl font-bold text-slate-900">
        Payment Cancelled
      </h1>
      <p className="mt-2 text-slate-600">
        Your payment was not completed. You can try again.
      </p>

      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
      >
        Back to Plans
      </Link>
    </main>
  );
}

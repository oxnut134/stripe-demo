import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { plans } from "@/lib/plans";

export async function POST(req: NextRequest) {
  try {
    const { planId } = await req.json();

    const plan = plans.find((p) => p.id === planId);

    if (!plan || plan.id === "free") {
      return NextResponse.json(
        { error: "Invalid plan specified" },
        { status: 400 }
      );
    }

    const origin = req.headers.get("origin") ?? req.nextUrl.origin;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      locale: "en",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${plan.name} Plan`,
              description: plan.description,
            },
            unit_amount: plan.price * 100,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      metadata: {
        planId: plan.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout session creation failed", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

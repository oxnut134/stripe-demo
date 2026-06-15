export type Plan = {
  id: "free" | "pro" | "enterprise";
  name: string;
  price: number; // USD per month, 0 for free
  description: string;
  features: string[];
  highlighted?: boolean;
};

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "Best for individual use and trying things out",
    features: [
      "Up to 1 project",
      "Access to basic features",
      "Community support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    description: "For growing teams and projects",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Email support",
      "Up to 5 team members",
    ],
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 49,
    description: "For large teams and organizations",
    features: [
      "All Pro plan features",
      "Unlimited team members",
      "Priority support (24/7)",
      "SLA guarantee",
      "Single sign-on (SSO)",
    ],
  },
];

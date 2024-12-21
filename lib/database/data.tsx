type PricingPlan = {
  title: String;
  price: String;
  currency: String;
  description: String;
  mostPopular: Boolean;
};

export const pricingPlans: PricingPlan[] = [
  {
    title: "Regular",
    price: "₹300",
    currency: "INR",
    description: "Enjoy our standard package designed for everyday users.",
    mostPopular: false,
  },
  {
    title: "Premium",
    price: "₹500",
    currency: "INR",
    description: "Benefit from a larger usage quota for greater flexibility.",
    mostPopular: true,
  },
  {
    title: "Enterprise",
    price: "₹1000",
    currency: "INR",
    description:
      "Experience maximum value with our most comprehensive package.",
    mostPopular: false,
  },
];

// Image generation cost 0.28 ruppee per image
// Music generation cost 6.74 ruppee per song
// Video generation cost 2.25 ruppee per video

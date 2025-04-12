"use server";

import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export const createStripeAccountonnectAccountLink = async (
  accountId: string
) => {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin") || "";

    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${origin}/connect/refresh/${accountId}`,
      return_url: `${origin}/connect/return/${accountId}`,
      type: "account_onboarding",
    });

    return { url: accountLink.url };
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create an account link:",
      error
    );
  }
};

"use server"

import { api } from "@/convex/_generated/api";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

export const createStripeAccount = async () => {
  const user = await currentUser();
  if (!user) throw new Error("Not authenticated");
  const userId = user.id;
  const existingStripeConnectId = await convex.query(
    api.users.exisintgStripeConnectId,
    { userId }
  );
  if (existingStripeConnectId) return;
  const account = await stripe.accounts.create({
    email: user.emailAddresses[0].emailAddress,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
    controller: {
      losses: {
        payments: "application",
      },
      fees: {
        payer: "application",
      },
      stripe_dashboard: {
        type: "express",
      },
    },
  });
  await convex.mutation(api.users.updateUserStripeConnectId, {
    userId,
    stripeConnectId: account.id,
  });
};

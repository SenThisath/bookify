"use server";

import { stripe } from "@/lib/stripe";

export const getStripeAccountStatus = async (stripeAccountId: string) => {
  if (!stripeAccountId) {
    throw new Error("No Stripe account ID provided");
  }
  console.log(stripeAccountId);
  try {
    const account = await stripe.accounts.retrieve(stripeAccountId);
    return {
      isActive:
        account.details_submitted &&
        !account.requirements?.currently_due?.length,
      isRequiredInformation: !!(
        account.requirements?.currently_due?.length ||
        account.requirements?.eventually_due?.length ||
        account.requirements?.past_due?.length
      ),
      requiredInformation: {
        currentlyDue: account.requirements?.currently_due || [],
        eventuallyDue: account.requirements?.eventually_due || [],
        pastDue: account.requirements?.past_due || [],
      },
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled,
    };
    
  } catch (e) {
    console.log("Not Done ", e);
  }
};

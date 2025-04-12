"use server";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { redirect } from "next/navigation";

export const purchaseTicket = async (eventId: Id<"events">) => {
  const user = await currentUser();

  const event = await fetchQuery(api.events.getEventById, { eventId });

  if (!event) throw new Error("Event not found");
  if (!user) throw new Error("User not found");

  const getUser = await fetchQuery(api.users.getUser, {
    userId: user?.id ?? "",
  });

  const session = await stripe.checkout.sessions.create(
    {
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(event.price * 100),
            product_data: {
              name: event.title,
              description: event.description,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        eventId,
        userId: user.id,
      },
      success_url: "http://localhost:3000/payment/success",
      cancel_url: "http://localhost:3000/payment/cancel",
    },
    { stripeAccount: getUser?.stripeConnectId }
  );
  return redirect(session.url as string);
};

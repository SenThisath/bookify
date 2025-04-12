import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { api } from "@/convex/_generated/api";
import Stripe from "stripe";
import { ConvexHttpClient } from "convex/browser";
import { Id } from "@/convex/_generated/dataModel";

export async function POST(req: Request) {
  console.log("Webhook received");

  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature") as string;

  const convex = new ConvexHttpClient(
    process.env.NEXT_PUBLIC_CONVEX_URL as string
  );

  console.log("Webhook signature:", signature ? "Present" : "Missing");

  let event: Stripe.Event;

  try {
    console.log("Attempting to construct webhook event");
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log("Webhook event constructed successfully:", event.type);
  } catch (err) {
    console.error("Webhook construction failed:", err);
    return new Response(`Webhook Error: ${(err as Error).message}`, {
      status: 400,
    });
  }

  if (event.type === "checkout.session.completed") {
    console.log("Processing checkout.session.completed");
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;
    console.log("Session metadata:", metadata);

    if (!metadata) {
      console.error("Metadata is null");
      return new Response("Metadata is missing", { status: 400 });
    }

    try {
      await convex.mutation(api.tickets.setTicket, {
        eventId: metadata.eventId as Id<"events">,
        userId: metadata.userId,
        paymentIntentId: session.payment_intent as string,
      });
      await convex.mutation(api.waitingList.setwaitingStatus, {
        userId: metadata.userId,
        eventId: metadata.eventId as Id<"events">,
        status: "purchased",
      });
    } catch (error) {
      console.error("Error processing webhook:", error);
      return new Response("Error processing webhook", { status: 500 });
    }
  }

  return new Response(null, { status: 200 });
}

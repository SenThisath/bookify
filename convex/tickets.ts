import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const setTicket = mutation({
  args: {
    eventId: v.id("events"),
    userId: v.string(),
    paymentIntentId: v.string(),
  },
  handler: async (ctx, { eventId, userId, paymentIntentId }) => {
    const ticket = await ctx.db
      .query("tickets")
      .filter((q) => q.eq(q.field("eventId"), eventId))
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    if (ticket) {
      await ctx.db.patch(ticket._id, { status: "valid" });
    }

    if (!ticket) {
      await ctx.db.insert("tickets", {
        eventId,
        userId,
        quantity: 1,
        bookingDate: Date.now(),
        status: "valid",
        paymentIntentId,
      });
    }
  },
});

export const getTicket = query({
  args: { eventId: v.id("events"), userId: v.string() },
  handler: async (ctx, { userId, eventId }) => {
    const ticket = await ctx.db
      .query("tickets")
      .filter((q) => q.eq(q.field("eventId"), eventId))
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    if (!ticket) return;

    return ticket;
  },
});

export const updateTicketStatus = mutation({
  args: {
    eventId: v.id("events"),
    userId: v.string(),
    status: v.union(
      v.literal("valid"),
      v.literal("used"),
      v.literal("cancelled"),
      v.literal("refunded")
    ),
  },
  handler: async (ctx, { eventId, userId, status }) => {
    const ticket = await ctx.db
      .query("tickets")
      .filter((q) => q.eq(q.field("eventId"), eventId))
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    if (ticket) {
      await ctx.db.patch(ticket._id, { status: status });
    }
  },
});

export const getUserTickets = query({
  args: { userId: v.string() },
  handler: async (ctx, args_0) => {
    const tickets = await ctx.db
      .query("tickets")
      .filter((q) => q.eq(q.field("userId"), args_0.userId))
      .filter((q) => q.eq(q.field("status"), "valid"))
      .collect();

    const validTickets = [];
    for (const ticket of tickets) {
      const event = await ctx.db.get(ticket.eventId);
      if (event && event.date > Date.now()) {
        validTickets.push(ticket);
      }
    }

    return validTickets;
  },
});

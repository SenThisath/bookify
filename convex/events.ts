import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getEventsOfUser = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const events = await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("creatorId"), userId))
      .collect();
    return events;
  },
});

export const getAllEvents = query({
  handler: async (ctx) => {
    const events = ctx.db.query("events").collect();
    return events;
  },
});

export const getEventById = query({
  args: {
    eventId: v.id("events"),
  },
  handler: async (ctx, { eventId }) => {
    const event = ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("_id"), eventId))
      .first();
    return event;
  },
});

export const createEvent = mutation({
  args: {
    creatorId: v.string(),
    title: v.string(),
    description: v.string(),
    date: v.number(),
    location: v.string(),
    price: v.number(),
    totalTickets: v.number(),
  },
  handler: async (
    ctx,
    { creatorId, title, description, date, location, price, totalTickets }
  ) => {
    const event = await ctx.db.insert("events", {
      creatorId,
      title,
      description,
      location,
      date,
      price,
      totalTickets,
    });
    return event;
  },
});

export const updateEvent = mutation({
  args: {
    eventId: v.id("events"),
    title: v.string(),
    description: v.string(),
    location: v.string(),
    date: v.number(),
    price: v.number(),
    totalTickets: v.number(),
  },
  handler: async (
    ctx,
    { eventId, title, description, location, date, price, totalTickets }
  ) => {
    const existingEvent = await ctx.db.get(eventId);
    if (existingEvent) {
      const event = await ctx.db.patch(eventId, {
        title,
        description,
        location,
        date,
        price,
        totalTickets,
      });
      return event;
    }
  },
});

export const isCurrentUserEventOwner = query({
  args: { eventId: v.id("events"), userId: v.string() },
  handler: async (ctx, { eventId, userId }) => {
    const isCurrentUserEventOwner = await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("_id"), eventId))
      .filter((q) => q.eq(q.field("creatorId"), userId))
      .first();
    return isCurrentUserEventOwner !== null;
  },
});

export const isEventSoldOut = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, { eventId }) => {
    const event = await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("_id"), eventId))
      .first();

    if (!event) {
      throw new Error("Event not found");
    }

    const ticketCount = await ctx.db
      .query("tickets")
      .filter((q) => q.eq(q.field("eventId"), eventId))
      .filter((q) => q.eq(q.field("status"), "valid"))
      .collect();

    const isSoldOut = ticketCount.length >= event.totalTickets;
    return {
      totalTickets: event.totalTickets,
      ticketsSold: ticketCount.length,
      remainingTickets: event.totalTickets - ticketCount.length,
      isSoldOut,
    };
  },
});

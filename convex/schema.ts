import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    userId: v.string(),
    stripeConnectId: v.optional(v.string()),
  })
    .index("by_userId", ["userId"])
    .index("by_email", ["email"]),

  events: defineTable({
    creatorId: v.string(),
    title: v.string(),
    description: v.string(),
    date: v.number(),
    location: v.string(),
    price: v.number(),
    totalTickets: v.number(),
    isCancelled: v.optional(v.boolean()),
  }),

  tickets: defineTable({
    eventId: v.id("events"),
    userId: v.string(),
    quantity: v.number(),
    bookingDate: v.number(),
    status: v.union(
      v.literal("valid"),
      v.literal("used"),
      v.literal("cancelled"),
      v.literal("refunded")
    ),
    paymentIntentId: v.optional(v.string()),
    refundedAt: v.optional(v.number()),
  }),

  waitingList: defineTable({
    userId: v.string(),
    eventId: v.id("events"),
    status: v.union(
      v.literal("wished"), // heart
      v.literal("offered"), // purchasing
      v.literal("purchased"), // purchased
      v.literal("waiting"), // sold out - waiting line
      v.literal("released") // not offered
    ),
  }),
});

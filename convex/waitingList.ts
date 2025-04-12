import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getWaitingStatus = query({
  args: { eventId: v.id("events"), userId: v.string() },
  handler: async (ctx, { eventId, userId }) => {
    const waitingStaus = await ctx.db
      .query("waitingList")
      .filter((q) => q.eq(q.field("eventId"), eventId))
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    if (!waitingStaus) return;

    return waitingStaus;
  },
});

export const removeWaiting = mutation({
  args: { eventId: v.id("events"), userId: v.string() },
  handler: async (ctx, { userId, eventId }) => {
    const waitingStaus = await ctx.db
      .query("waitingList")
      .filter((q) => q.eq(q.field("eventId"), eventId))
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    if (waitingStaus) {
      await ctx.db.delete(waitingStaus._id);
    } else return;
    return { waitingStaus };
  },
});

export const setwaitingStatus = mutation({
  args: {
    eventId: v.id("events"),
    userId: v.string(),
    status: v.union(
      v.literal("wished"),
      v.literal("offered"),
      v.literal("purchased"),
      v.literal("waiting"),
      v.literal("released")
    ),
  },
  handler: async (ctx, { eventId, userId, status }) => {
    const waitingStaus = await ctx.db
      .query("waitingList")
      .filter((q) => q.eq(q.field("eventId"), eventId))
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();
    if (waitingStaus) {
      await ctx.db.patch(waitingStaus._id, { status });
    } else {
      await ctx.db.insert("waitingList", { eventId, userId, status });
    }
  },
});

export const getWishList = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const wishList = await ctx.db
      .query("waitingList")
      .filter((q) => q.eq(q.field("userId"), userId))
      .filter((q) => q.eq(q.field("status"), "wished"))
      .collect();
    if (!wishList) return;
    return wishList;
  },
});

export const getQueue = query({
  args: {
    eventId: v.id("events"),
    userId: v.string(),
  },
  handler: async (ctx, { userId, eventId }) => {
    const queue = await ctx.db
      .query("waitingList")
      .filter((q) => q.eq(q.field("eventId"), eventId))
      .filter((q) => q.eq(q.field("status"), "waiting"))
      .collect();

    // Sort the queue manually based on the `_creationTime` field
    queue.sort((a, b) => a._creationTime - b._creationTime);

    const queueLength = queue.length;

    const userPosition = queue.findIndex((item) => item.userId === userId) + 1;

    const offeredList = await ctx.db
      .query("waitingList")
      .filter((q) => q.eq(q.field("eventId"), eventId))
      .filter((q) => q.eq(q.field("status"), "offered"))
      .collect();
    const offeredCount = offeredList.length;

    return {
      queueLength,
      userPosition: userPosition > 0 ? userPosition : null, // Return null if user is not in the queue
      offeredCount,
    };
  },
});

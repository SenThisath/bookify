import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUser = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();
    return user;
  },
});

export const syncUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, { name, email, userId }) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();
    if (!existingUser)
      await ctx.db.insert("users", {
        name,
        email,
        userId,
        stripeConnectId: undefined,
      });
  },
});

export const exisintgStripeConnectId = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), userId))
      .filter((q) => q.neq(q.field("stripeConnectId"), undefined))
      .first();

    return user?.stripeConnectId;
  },
});

export const updateUserStripeConnectId = mutation({
  args: { userId: v.string(), stripeConnectId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, { stripeConnectId: args.stripeConnectId });
  },
});

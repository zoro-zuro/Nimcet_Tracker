import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createPracticeSession = mutation({
  args: {
    questionIds: v.array(v.id("questions")),
    timerEnabled: v.boolean(),
    timeLimitSeconds: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userIdentityId = identity.subject;
    
    // Get user
    const user = await ctx.db
      .query("users")
      .withIndex("by_name", (q) => q.eq("name", identity.tokenIdentifier || userIdentityId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    // Create session
    const sessionId = await ctx.db.insert("sessions", {
      userId: user._id,
      type: "practice",
      mode: "custom",
      questionIds: args.questionIds,
      timerEnabled: args.timerEnabled,
      timeLimitSeconds: args.timeLimitSeconds,
      startedAt: Date.now(),
    });

    return await ctx.db.get(sessionId);
  },
});

export const getSession = query({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.sessionId);
  },
});

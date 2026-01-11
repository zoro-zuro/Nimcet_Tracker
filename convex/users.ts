import { query } from "./_generated/server";

// Get or create default user for the current session
export const getOrCreateDefaultUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const userIdentityId = identity.subject;
    
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_name", (q) => q.eq("name", identity.tokenIdentifier || userIdentityId))
      .first();

    if (existingUser) {
      return existingUser;
    }

    // Create new user with defaults
    const now = Date.now();
    const newUserId = await ctx.db.insert("users", {
      name: identity.tokenIdentifier || userIdentityId,
      targetScore: 750,
      examDate: new Date(now + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days from now
      createdAt: now,
    });

    return await ctx.db.get(newUserId);
  },
});

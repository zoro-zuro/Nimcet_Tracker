import { query } from "./_generated/server";

export const listMistakes = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    const userIdentityId = identity.subject;
    
    // Get user
    const user = await ctx.db
      .query("users")
      .withIndex("by_name", (q) => q.eq("name", identity.tokenIdentifier || userIdentityId))
      .first();

    if (!user) {
      return [];
    }

    const mistakes = await ctx.db
      .query("mistakes")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();

    // Fetch questions for each mistake
    const mistakesWithQuestions = await Promise.all(
      mistakes.map(async (mistake) => {
        const question = await ctx.db.get(mistake.questionId);
        return {
          ...mistake,
          question,
        };
      })
    );

    return mistakesWithQuestions;
  },
});

import { query } from "./_generated/server";

export const getDashboardSummary = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const userIdentityId = identity.subject;
    
    // Get user
    const user = await ctx.db
      .query("users")
      .withIndex("by_name", (q) => q.eq("name", identity.tokenIdentifier || userIdentityId))
      .first();

    if (!user) {
      return null;
    }

    // Get all answers for this user
    const answers = await ctx.db
      .query("answers")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();

    const totalAnswers = answers.length;
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;

    // Get mistakes
    const mistakes = await ctx.db
      .query("mistakes")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();

    // Get all topic stats
    const topicStats = await ctx.db
      .query("topicStats")
      .collect();

    // Filter topic stats for this user manually (since no index)
    const userTopicStats = topicStats.filter(t => t.userId.equals(user._id));

    // Calculate worst topics (lowest accuracy where attempted > 0)
    const worstTopics = userTopicStats
      .filter(t => t.attempted > 0)
      .map(t => ({
        topic: t.topic,
        accuracy: Math.round((t.correct / t.attempted) * 100),
        attempted: t.attempted,
      }))
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 10);

    return {
      totalAnswers,
      correctAnswers,
      accuracy,
      totalMistakes: mistakes.length,
      worstTopics,
      user,
    };
  },
});

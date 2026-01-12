import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submitAnswer = mutation({
  args: {
    sessionId: v.id("sessions"),
    questionId: v.id("questions"),
    chosenOption: v.union(v.literal("A"), v.literal("B"), v.literal("C"), v.literal("D")),
    timeTakenSeconds: v.optional(v.number()),
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

    // Get session
    const session = await ctx.db.get(args.sessionId);
    if (!session || session.userId !== user._id) {
      throw new Error("Invalid session");
    }

    // Get question
    const question = await ctx.db.get(args.questionId);
    if (!question) {
      throw new Error("Question not found");
    }

    // Check if already answered
    const existingAnswer = await ctx.db
      .query("answers")
      .withIndex("by_sessionId_questionId", (q) => 
        q.eq("sessionId", args.sessionId).eq("questionId", args.questionId)
      )
      .first();

    if (existingAnswer) {
      return existingAnswer;
    }

    const isCorrect = args.chosenOption === question.correctOption;

    // Create answer
    const answerId = await ctx.db.insert("answers", {
      userId: user._id,
      sessionId: args.sessionId,
      questionId: args.questionId,
      chosenOption: args.chosenOption,
      isCorrect,
      timeTakenSeconds: args.timeTakenSeconds,
      reviewLater: false,
      createdAt: Date.now(),
    });

    // Update topic stats
    const topicStats = await ctx.db
      .query("topicStats")
      .withIndex("by_userId_topic", (q) => 
        q.eq("userId", user._id).eq("topic", question.topic)
      )
      .first();

    if (topicStats) {
      await ctx.db.patch(topicStats._id, {
        attempted: topicStats.attempted + 1,
        correct: topicStats.correct + (isCorrect ? 1 : 0),
        lastPracticedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("topicStats", {
        userId: user._id,
        topic: question.topic,
        attempted: 1,
        correct: isCorrect ? 1 : 0,
        lastPracticedAt: Date.now(),
      });
    }

    // If incorrect, create mistake entry
    if (!isCorrect) {
      await ctx.db.insert("mistakes", {
        userId: user._id,
        questionId: args.questionId,
        lastAnswerId: answerId,
        reason: "Concept Gap",
        note: undefined,
        status: "new",
        reviewedCount: 0,
        lastReviewedAt: undefined,
        aiExplanation: undefined,
        createdAt: Date.now(),
      });
    }

    return await ctx.db.get(answerId);
  },
});

export const getAnswersForSession = query({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, args) => {
    const answers = await ctx.db
      .query("answers")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", args.sessionId))
      .collect();
    
    return answers;
  },
});

import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// List questions with optional filters
export const listQuestions = query({
  args: {
    section: v.union(
      v.literal("math"),
      v.literal("reasoning"),
      v.literal("computer"),
      v.literal("english"),
      v.literal("all")
    ),
    topic: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
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

    let questions = await ctx.db
      .query("questions")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();

    // Filter by section if not "all"
    if (args.section !== "all") {
      questions = questions.filter(q => q.section === args.section);
    }

    // Filter by topic if specified
    if (args.topic) {
      questions = questions.filter(q => 
        q.topic.toLowerCase().includes(args.topic!.toLowerCase())
      );
    }

    // Shuffle and limit
    const shuffled = questions.sort(() => Math.random() - 0.5);
    return args.limit ? shuffled.slice(0, args.limit) : shuffled;
  },
});

// Get question by ID
export const getQuestion = query({
  args: { questionId: v.id("questions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.questionId);
  },
});

// Add sample questions for testing
export const seedSampleQuestions = mutation({
  args: {},
  handler: async (ctx) => {
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

    const now = Date.now();
    const sampleQuestions = [
      {
        userId: user._id,
        section: "math" as const,
        topic: "Calculus",
        text: "What is the derivative of x^3?",
        options: ["3x^2", "x^2", "3x", "x^3"],
        correctOption: "A" as const,
        difficulty: "easy" as const,
        tags: ["calculus", "differentiation"],
        createdAt: now,
      },
      {
        userId: user._id,
        section: "math" as const,
        topic: "Algebra",
        text: "Solve for x: 2x + 5 = 15",
        options: ["x = 5", "x = 10", "x = 3", "x = 7"],
        correctOption: "A" as const,
        difficulty: "easy" as const,
        tags: ["algebra", "equations"],
        createdAt: now,
      },
      {
        userId: user._id,
        section: "reasoning" as const,
        topic: "Logical Reasoning",
        text: "If all roses are flowers and some flowers are red, then:",
        options: [
          "All roses are red",
          "Some roses are red",
          "No roses are red",
          "Cannot be determined"
        ],
        correctOption: "D" as const,
        difficulty: "medium" as const,
        tags: ["logic", "syllogism"],
        createdAt: now,
      },
      {
        userId: user._id,
        section: "computer" as const,
        topic: "Data Structures",
        text: "What is the time complexity of binary search?",
        options: ["O(n)", "O(n^2)", "O(log n)", "O(1)"],
        correctOption: "C" as const,
        difficulty: "easy" as const,
        tags: ["algorithms", "searching"],
        createdAt: now,
      },
      {
        userId: user._id,
        section: "computer" as const,
        topic: "Programming",
        text: "Which data structure uses LIFO?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        correctOption: "B" as const,
        difficulty: "easy" as const,
        tags: ["data-structures", "stack"],
        createdAt: now,
      },
      {
        userId: user._id,
        section: "english" as const,
        topic: "Grammar",
        text: "Choose the correct sentence:",
        options: [
          "She don't know the answer",
          "She doesn't knows the answer",
          "She doesn't know the answer",
          "She don't knows the answer"
        ],
        correctOption: "C" as const,
        difficulty: "easy" as const,
        tags: ["grammar", "verb"],
        createdAt: now,
      },
    ];

    for (const q of sampleQuestions) {
      await ctx.db.insert("questions", q);
    }

    return { inserted: sampleQuestions.length };
  },
});

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users table - stores user profiles and settings
  users: defineTable({
    name: v.string(),
    targetScore: v.number(),
    examDate: v.string(), // ISO date
    createdAt: v.number(), // milliseconds
  }).index("by_name", ["name"]),

  // Papers table - stores question papers
  papers: defineTable({
    userId: v.id("users"),
    source: v.union(v.literal("upload"), v.literal("system")),
    year: v.number(),
    label: v.string(),
    sections: v.array(v.string()), // e.g. ["math","reasoning","computer","english"]
    storageKey: v.optional(v.string()),
    status: v.union(
      v.literal("pending"),
      v.literal("parsed"),
      v.literal("ready")
    ),
    createdAt: v.number(),
  }),

  // Questions table - stores individual questions
  questions: defineTable({
    userId: v.id("users"),
    paperId: v.optional(v.id("papers")), // optional, allow AI/system questions
    section: v.union(
      v.literal("math"),
      v.literal("reasoning"),
      v.literal("computer"),
      v.literal("english")
    ),
    topic: v.string(),
    subTopic: v.optional(v.string()),
    text: v.string(),
    options: v.array(v.string()), // length 4
    correctOption: v.union(
      v.literal("A"),
      v.literal("B"),
      v.literal("C"),
      v.literal("D")
    ),
    difficulty: v.union(
      v.literal("easy"),
      v.literal("medium"),
      v.literal("hard")
    ),
    tags: v.array(v.string()),
    sourceIndex: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),

  // Sessions table - stores practice/mock test sessions
  sessions: defineTable({
    userId: v.id("users"),
    type: v.union(v.literal("practice"), v.literal("mock")),
    mode: v.union(
      v.literal("previous_year"),
      v.literal("custom"),
      v.literal("weakness")
    ),
    questionIds: v.array(v.id("questions")),
    timerEnabled: v.boolean(),
    timeLimitSeconds: v.optional(v.number()),
    startedAt: v.number(),
    endedAt: v.optional(v.number()),
  }),

  // Answers table - stores user answers
  answers: defineTable({
    userId: v.id("users"),
    sessionId: v.id("sessions"),
    questionId: v.id("questions"),
    chosenOption: v.optional(
      v.union(v.literal("A"), v.literal("B"), v.literal("C"), v.literal("D"))
    ),
    isCorrect: v.optional(v.boolean()),
    timeTakenSeconds: v.optional(v.number()),
    reviewLater: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_sessionId", ["sessionId"])
    .index("by_sessionId_questionId", ["sessionId", "questionId"]),

  // Mistakes table - tracks user mistakes for spaced repetition
  mistakes: defineTable({
    userId: v.id("users"),
    questionId: v.id("questions"),
    lastAnswerId: v.optional(v.id("answers")),
    reason: v.union(
      v.literal("Concept Gap"),
      v.literal("Careless"),
      v.literal("Time Pressure")
    ),
    note: v.optional(v.string()),
    status: v.union(
      v.literal("new"),
      v.literal("reviewing"),
      v.literal("mastered")
    ),
    reviewedCount: v.number(),
    lastReviewedAt: v.optional(v.number()),
    aiExplanation: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),

  // Topic statistics table
  topicStats: defineTable({
    userId: v.id("users"),
    topic: v.string(),
    attempted: v.number(),
    correct: v.number(),
    lastPracticedAt: v.optional(v.number()),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_topic", ["userId", "topic"]),

  // Daily statistics table
  dailyStats: defineTable({
    userId: v.id("users"),
    date: v.string(), // YYYY-MM-DD
    questionsAttempted: v.number(),
    correct: v.number(),
    timeMinutes: v.number(),
  }),

  // Mock tests results table
  mocks: defineTable({
    userId: v.id("users"),
    sessionId: v.id("sessions"),
    scoreTotal: v.number(),
    sectionScores: v.any(), // store JSON
    timeMinutes: v.number(),
    createdAt: v.number(),
  }),
});

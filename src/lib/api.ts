// Mock API functions for development
export const api = {
  papers: {
    list: (args?: any) => ({ ...args }),
    get: (args: any) => ({ ...args }),
    getQuestionsByPaper: (args: any) => ({ ...args }),
    generateUploadUrl: () => ({}),
    createPaper: (args: any) => ({ ...args }),
  },
  sessions: {
    createPracticeSession: (args: any) => ({ ...args }),
    createMockSession: (args: any) => ({ ...args }),
    getSession: (args: any) => ({ ...args }),
    getSessionQuestions: (args: any) => ({ ...args }),
    endSession: (args: any) => ({ ...args }),
  },
  gamification: {
    getUserStats: (args?: any) => ({ 
      user: { 
        xp: 250, 
        level: 3, 
        streakCurrent: 5, 
        streakBest: 12,
        name: "Demo User"
      },
      achievements: [],
      quests: []
    }),
    getLeaderboard: (args?: any) => ([
      { _id: "1", name: "Alice", xp: 500, level: 5, streakBest: 20 },
      { _id: "2", name: "Bob", xp: 350, level: 4, streakBest: 15 },
      { _id: "3", name: "You", xp: 250, level: 3, streakBest: 12 }
    ]),
    awardXP: (args: any) => ({ ...args }),
    updateStreak: (args?: any) => ({ ...args }),
    awardAchievement: (args: any) => ({ ...args }),
  },
  aiIntegration: {
    generateCustomPaper: (args: any) => ({ ...args }),
    askAI: (args: any) => ({ ...args }),
    suggestDailyPlan: (args?: any) => ({ ...args }),
    createDraftQuestions: (args: any) => ({ ...args }),
  },
};

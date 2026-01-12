// Mock data for development
export const mockData = {
  user: {
    xp: 250,
    level: 3,
    streakCurrent: 5,
    streakBest: 12,
    name: "Demo User",
    targetScore: 150,
    examDate: "2024-06-15",
    createdAt: Date.now() - 86400000 * 30, // 30 days ago
    lastActiveDate: new Date().toISOString().split('T')[0],
  },
  papers: [
    {
      _id: "1",
      year: 2023,
      title: "NIMCET 2023 Question Paper",
      description: "Official NIMCET 2023 question paper with detailed solutions and explanations",
      tags: ["official", "2023", "complete"],
      pdfStorageId: "pdf_2023",
      createdAt: Date.now() - 86400000 * 7, // 7 days ago
      userId: "user1"
    },
    {
      _id: "2", 
      year: 2022,
      title: "NIMCET 2022 Practice Paper",
      description: "Practice paper based on NIMCET 2022 pattern with comprehensive coverage",
      tags: ["practice", "2022", "mock"],
      pdfStorageId: "pdf_2022",
      createdAt: Date.now() - 86400000 * 14, // 14 days ago
      userId: "user1"
    },
    {
      _id: "3",
      year: 2021,
      title: "NIMCET 2021 Previous Year Paper",
      description: "Previous year paper with step-by-step solutions",
      tags: ["previous_year", "2021", "official"],
      pdfStorageId: "pdf_2021",
      createdAt: Date.now() - 86400000 * 21, // 21 days ago
      userId: "user1"
    }
  ],
  questions: [
    {
      _id: "q1",
      userId: "user1",
      paperId: "1",
      section: "math",
      topic: "Algebra",
      subTopic: "Quadratic Equations",
      text: "If x² - 5x + 6 = 0, then what is the value of x?",
      options: ["x = 2 or x = 3", "x = 1 or x = 6", "x = -2 or x = -3", "x = 4 or x = 1"],
      correctOption: "A" as const,
      difficulty: "medium" as const,
      tags: ["algebra", "equations"],
      sourceIndex: 1,
      year: 2023,
      createdAt: Date.now() - 86400000 * 7,
    },
    {
      _id: "q2",
      userId: "user1",
      paperId: "1",
      section: "reasoning",
      topic: "Logical Reasoning",
      subTopic: "Syllogism",
      text: "All cats are mammals. All mammals are animals. Therefore:",
      options: [
        "All cats are animals",
        "All animals are cats",
        "Some animals are cats",
        "No cats are animals"
      ],
      correctOption: "A" as const,
      difficulty: "easy" as const,
      tags: ["logic", "syllogism"],
      sourceIndex: 2,
      year: 2023,
      createdAt: Date.now() - 86400000 * 7,
    },
  ],
  achievements: [
    {
      _id: "a1",
      userId: "user1",
      key: "first_steps",
      title: "First Steps",
      description: "Answer your first question",
      earnedAt: Date.now() - 86400000 * 25,
    },
    {
      _id: "a2",
      userId: "user1",
      key: "week_warrior",
      title: "Week Warrior",
      description: "Maintain a 7-day streak",
      earnedAt: Date.now() - 86400000 * 10,
    },
  ],
  quests: [
    {
      _id: "q1",
      userId: "user1",
      dateKey: new Date().toISOString().split('T')[0],
      key: "daily_questions",
      title: "Answer 20 Questions",
      target: 20,
      progress: 12,
      completedAt: undefined,
    },
    {
      _id: "q2",
      userId: "user1", 
      dateKey: new Date().toISOString().split('T')[0],
      key: "practice_math",
      title: "Practice 15 Math Questions",
      target: 15,
      progress: 15,
      completedAt: Date.now() - 3600000, // 1 hour ago
    },
  ],
  dailyStats: {
    questionsAttempted: 12,
    correct: 9,
    timeMinutes: 45,
    streakCurrent: 5,
  }
};

// Helper functions
export const helpers = {
  getPapersByYear: (year?: number) => {
    return year ? mockData.papers.filter(p => p.year === year) : mockData.papers;
  },
  
  getQuestionsByPaper: (paperId: string) => {
    return mockData.questions.filter(q => q.paperId === paperId);
  },
  
  getDailyTasks: () => [
    {
      id: '1',
      title: 'Practice Algebra Questions',
      type: 'question' as const,
      target: 10,
      progress: 6,
      difficulty: 'medium' as const,
      section: 'math',
      topic: 'Algebra',
    },
    {
      id: '2',
      title: 'Logical Reasoning Practice',
      type: 'question' as const,
      target: 8,
      progress: 8,
      difficulty: 'easy' as const,
      section: 'reasoning',
      topic: 'Logical Reasoning',
    },
    {
      id: '3',
      title: 'Review Previous Mistakes',
      type: 'review' as const,
      target: 5,
      progress: 3,
      difficulty: 'medium' as const,
      section: 'mixed',
      topic: 'Review',
    },
    {
      id: '4',
      title: 'Computer Fundamentals',
      type: 'topic' as const,
      target: 12,
      progress: 0,
      difficulty: 'easy' as const,
      section: 'computer',
      topic: 'Computer Fundamentals',
    },
  ],
  
  getLeaderboard: () => [
    { _id: "1", name: "Alice Johnson", xp: 500, level: 5, streakBest: 20 },
    { _id: "2", name: "Bob Smith", xp: 350, level: 4, streakBest: 15 },
    { _id: "3", name: "Demo User", xp: 250, level: 3, streakBest: 12 },
    { _id: "4", name: "Charlie Brown", xp: 180, level: 2, streakBest: 8 },
  ],
};

"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";

export default function RoadmapPage() {
  const dashboardSummary = useQuery(api.stats.getDashboardSummary);
  
  const totalAnswers = dashboardSummary?.totalAnswers || 0;
  
  // Phase definitions
  const phases = [
    {
      number: 1,
      name: "Foundation Building",
      description: "Master basics and solve 720 questions",
      targetQuestions: 720,
      duration: "6 weeks",
      goals: [
        "Complete syllabus coverage",
        "Solve 720 questions across all topics",
        "Achieve 70%+ accuracy",
        "Build strong conceptual understanding",
      ],
    },
    {
      number: 2,
      name: "Practice & Mock Tests",
      description: "Intensive practice and previous year papers",
      targetQuestions: 1080,
      duration: "4 weeks",
      goals: [
        "Solve 10+ previous year papers",
        "Take weekly mock tests",
        "Achieve 80%+ accuracy",
        "Improve speed and time management",
      ],
      locked: true,
    },
    {
      number: 3,
      name: "Weakness Focus",
      description: "Targeted practice on weak areas",
      targetQuestions: 360,
      duration: "2 weeks",
      goals: [
        "Review all mistakes",
        "Master weak topics",
        "Achieve 85%+ accuracy",
        "Complete mistake notebook",
      ],
      locked: true,
    },
    {
      number: 4,
      name: "Final Polish",
      description: "Revision and exam readiness",
      targetQuestions: 180,
      duration: "1 week",
      goals: [
        "Full revision of syllabus",
        "Final mock tests",
        "Achieve 90%+ accuracy",
        "Build exam confidence",
      ],
      locked: true,
    },
  ];
  
  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">4-Phase Roadmap</h1>
        <p className="text-gray-600 mt-1">Track your journey to NIMCET success</p>
      </div>
      
      <div className="space-y-6">
        {phases.map((phase) => {
          const isActive = phase.number === 1;
          const isCompleted = false;
          
          return (
            <Card key={phase.number} className={isActive ? "border-[#1B4965] border-2" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`
                        w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg
                        ${isActive ? "bg-[#D4A574]" : isCompleted ? "bg-green-500" : "bg-gray-300"}
                      `}
                    >
                      {isCompleted ? "✓" : phase.number}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Phase {phase.number}: {phase.name}
                      </h2>
                      <p className="text-gray-600">{phase.description}</p>
                    </div>
                  </div>
                  <Badge variant={isActive ? "success" : "default"}>
                    {isActive ? "Active" : isCompleted ? "Completed" : phase.locked ? "Locked" : "Upcoming"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">Progress</span>
                      <span className="text-gray-600">
                        {isActive ? `${totalAnswers} / ${phase.targetQuestions}` : "Not started"}
                      </span>
                    </div>
                    {isActive && (
                      <ProgressBar value={totalAnswers} max={phase.targetQuestions} />
                    )}
                    <div className="text-sm text-gray-500">
                      {phase.duration} • {phase.targetQuestions} questions
                    </div>
                  </div>
                  
                  {/* Goals */}
                  <div className="md:col-span-2">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Goals</h4>
                    <ul className="space-y-1">
                      {phase.goals.map((goal, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-[#2A8F9E] mt-0.5">•</span>
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {isActive && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Button onClick={() => (window.location.href = "/solve")}>
                      Continue Phase {phase.number}
                    </Button>
                  </div>
                )}
                
                {phase.locked && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      🔒 Complete Phase {phase.number - 1} to unlock
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}

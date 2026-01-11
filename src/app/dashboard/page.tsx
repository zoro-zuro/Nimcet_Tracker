"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { EmptyState } from "@/components/ui/empty-state";

export default function DashboardPage() {
  const dashboardSummary = useQuery(api.stats.getDashboardSummary);
  const seedQuestions = useMutation(api.questions.seedSampleQuestions);
  const [isSeeding, setIsSeeding] = useState(false);
  
  const handleSeedQuestions = async () => {
    setIsSeeding(true);
    try {
      await seedQuestions();
    } catch (error) {
      console.error("Error seeding questions:", error);
    } finally {
      setIsSeeding(false);
    }
  };
  
  const isLoading = dashboardSummary === undefined;
  
  if (isLoading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-gray-500">Loading...</div>
        </div>
      </AppShell>
    );
  }
  
  if (!dashboardSummary) {
    return (
      <AppShell>
        <EmptyState
          title="No user data found"
          description="Please sign in to track your progress."
        />
      </AppShell>
    );
  }
  
  const { totalAnswers, correctAnswers, accuracy, totalMistakes, worstTopics } = dashboardSummary;
  
  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Track your NIMCET preparation progress</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Questions Attempted</p>
                <p className="text-3xl font-bold text-[#1B4965] mt-1">{totalAnswers}</p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Accuracy</p>
                <p className="text-3xl font-bold text-[#2A8F9E] mt-1">{accuracy}%</p>
              </div>
              <div className="text-4xl">🎯</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Correct Answers</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{correctAnswers}</p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Mistakes</p>
                <p className="text-3xl font-bold text-red-500 mt-1">{totalMistakes}</p>
              </div>
              <div className="text-4xl">❌</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Phase Progress */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Phase 1 Progress</h2>
            <Badge>Foundation Building</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ProgressBar
              value={totalAnswers}
              max={720}
              label="Questions Solved"
              showLabel
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{totalAnswers} / 720 questions</span>
              <span>{720 - totalAnswers > 0 ? `${720 - totalAnswers} remaining` : "Complete!"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Seed Questions (for testing) */}
      {totalAnswers === 0 && (
        <Card className="mb-8 border-dashed border-2 border-[#D4A574]">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🌱</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Get Started with Sample Questions</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Add some sample questions to explore the app&apos;s features
                </p>
                <Button
                  size="sm"
                  onClick={handleSeedQuestions}
                  disabled={isSeeding}
                >
                  {isSeeding ? "Adding..." : "Add Sample Questions"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Worst Topics */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">Topics to Focus On</h2>
        </CardHeader>
        <CardContent>
          {worstTopics && worstTopics.length > 0 ? (
            <div className="space-y-3">
              {worstTopics.slice(0, 5).map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{index === 0 ? "🔥" : index === 1 ? "⚠️" : index === 2 ? "💡" : "📌"}</span>
                    <span className="font-medium text-gray-900">{topic.topic}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{topic.attempted} attempted</span>
                    <Badge variant={topic.accuracy < 50 ? "danger" : topic.accuracy < 60 ? "warning" : "default"}>
                      {topic.accuracy}% accuracy
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No topics data yet"
              description="Start solving questions to see your weak areas."
            />
          )}
        </CardContent>
      </Card>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🚀</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Start Practice</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Practice questions from your weak areas
                </p>
                <Button size="sm">Start Solving</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">📕</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Review Mistakes</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {totalMistakes > 0 ? `You have ${totalMistakes} mistakes to review` : "No mistakes yet - great job!"}
                </p>
                <Button size="sm" variant="outline">View Mistakes</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

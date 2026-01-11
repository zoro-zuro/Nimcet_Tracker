"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuestionPlayer } from "@/components/solve/question-player";

export default function SolvePage() {
  const [step, setStep] = useState<"setup" | "solving">("setup");
  const [selectedSection, setSelectedSection] = useState<"math" | "reasoning" | "computer" | "english" | "all">("all");
  const [topicFilter, setTopicFilter] = useState("");
  const [questionCount, setQuestionCount] = useState(10);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timePerQuestion, setTimePerQuestion] = useState(120);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [questionIds, setQuestionIds] = useState<string[]>([]);
  
  const questions = useQuery(api.questions.listQuestions, {
    section: selectedSection,
    topic: topicFilter || undefined,
    limit: questionCount,
  });
  
  const createSession = useMutation(api.sessions.createPracticeSession);
  
  const handleStartSession = async () => {
    if (!questions || questions.length === 0) {
      alert("No questions available. Please add questions first.");
      return;
    }
    
    try {
      const session = await createSession({
        questionIds: questions.map(q => q._id),
        timerEnabled,
        timeLimitSeconds: timerEnabled ? questionCount * timePerQuestion : undefined,
      });
      
      setSessionId(session._id);
      setQuestionIds(session.questionIds);
      setStep("solving");
    } catch (error) {
      console.error("Error creating session:", error);
      alert("Failed to start session. Please try again.");
    }
  };
  
  const handleFinish = () => {
    setStep("setup");
    setSessionId(null);
    setQuestionIds([]);
  };
  
  return (
    <AppShell>
      {step === "setup" ? (
        <>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Practice Questions</h1>
            <p className="text-gray-600 mt-1">Configure your practice session</p>
          </div>
          
          <div className="max-w-2xl">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Session Setup</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Section Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {([
                      { value: "all", label: "All Sections", icon: "📚" },
                      { value: "math", label: "Mathematics", icon: "🔢" },
                      { value: "reasoning", label: "Reasoning", icon: "🧠" },
                      { value: "computer", label: "Computer", icon: "💻" },
                      { value: "english", label: "English", icon: "📝" },
                    ] as const).map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSelectedSection(option.value)}
                        className={`
                          p-4 rounded-lg border-2 text-center transition-all
                          ${selectedSection === option.value
                            ? "border-[#1B4965] bg-[#1B4965]/5"
                            : "border-gray-200 hover:border-gray-300"
                          }
                        `}
                      >
                        <div className="text-2xl mb-1">{option.icon}</div>
                        <div className="text-sm font-medium">{option.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Topic Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic Filter (Optional)
                  </label>
                  <input
                    type="text"
                    value={topicFilter}
                    onChange={(e) => setTopicFilter(e.target.value)}
                    placeholder="e.g., Calculus, Algebra, Arrays..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4965] focus:border-transparent"
                  />
                </div>
                
                {/* Question Count */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Questions: {questionCount}
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>5</span>
                    <span>50</span>
                  </div>
                </div>
                
                {/* Timer Settings */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-medium text-gray-700">
                      Enable Timer
                    </label>
                    <button
                      onClick={() => setTimerEnabled(!timerEnabled)}
                      className={`
                        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                        ${timerEnabled ? "bg-[#1B4965]" : "bg-gray-200"}
                      `}
                    >
                      <span
                        className={`
                          inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                          ${timerEnabled ? "translate-x-6" : "translate-x-1"}
                        `}
                      />
                    </button>
                  </div>
                  
                  {timerEnabled && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time per Question: {Math.floor(timePerQuestion / 60)}:{(timePerQuestion % 60).toString().padStart(2, "0")}
                      </label>
                      <input
                        type="range"
                        min="30"
                        max="300"
                        step="30"
                        value={timePerQuestion}
                        onChange={(e) => setTimePerQuestion(Number(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>30s</span>
                        <span>5min</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Available Questions Preview */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {questions ? `${questions.length} questions available` : "Loading..."}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {selectedSection === "all" ? "All sections" : selectedSection}
                        {topicFilter && ` • "${topicFilter}"`}
                      </p>
                      {questions && questions.length === 0 && (
                        <p className="text-xs text-[#2A8F9E] mt-2">
                          💡 Add sample questions from the Dashboard
                        </p>
                      )}
                    </div>
                    <div className="text-3xl">📋</div>
                  </div>
                </div>
                
                {/* Start Button */}
                <Button
                  onClick={handleStartSession}
                  disabled={!questions || questions.length === 0}
                  className="w-full"
                  size="lg"
                >
                  Start Practice Session
                </Button>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <QuestionPlayer
          sessionId={sessionId!}
          questionIds={questionIds}
          timerEnabled={timerEnabled}
          timeLimit={questionCount * timePerQuestion}
          onFinish={handleFinish}
        />
      )}
    </AppShell>
  );
}

"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

interface QuestionPlayerProps {
  sessionId: string;
  questionIds: string[];
  timerEnabled: boolean;
  timeLimit?: number;
  onFinish: () => void;
}

export function QuestionPlayer({
  sessionId,
  questionIds,
  timerEnabled,
  timeLimit,
  onFinish,
}: QuestionPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | "C" | "D" | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const currentQuestionId = questionIds[currentIndex];
  const currentQuestion = useQuery(api.questions.getQuestion, {
    questionId: currentQuestionId as Id<"questions">,
  });
  
  const submitAnswer = useMutation(api.answers.submitAnswer);
  
  // Timer logic
  useEffect(() => {
    if (!timerEnabled || showFeedback) return;
    
    const interval = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timerEnabled, showFeedback]);
  
  const handleOptionSelect = (option: "A" | "B" | "C" | "D") => {
    if (showFeedback) return;
    setSelectedOption(option);
  };
  
  const handleSubmit = async () => {
    if (!selectedOption || !currentQuestion || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      await submitAnswer({
        sessionId: sessionId as Id<"sessions">,
        questionId: currentQuestionId as Id<"questions">,
        chosenOption: selectedOption,
        timeTakenSeconds: timerEnabled ? timeElapsed : undefined,
      });
      
      setShowFeedback(true);
    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleNext = () => {
    if (currentIndex < questionIds.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      setTimeElapsed(0);
    } else {
      onFinish();
    }
  };
  
  const isCorrect = selectedOption === currentQuestion?.correctOption;
  
  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading question...</div>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Question {currentIndex + 1} of {questionIds.length}
          </span>
          {timerEnabled && (
            <Badge variant={timeElapsed > (timeLimit || 120) * 0.8 ? "warning" : "default"}>
              {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, "0")}
            </Badge>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-[#1B4965] h-full rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / questionIds.length) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Question card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <Badge variant={currentQuestion.difficulty === "easy" ? "success" : currentQuestion.difficulty === "medium" ? "warning" : "danger"}>
            {currentQuestion.difficulty}
          </Badge>
          <Badge variant="info">{currentQuestion.section}</Badge>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {currentQuestion.text}
        </h2>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const optionLabel = ["A", "B", "C", "D"][index] as "A" | "B" | "C" | "D";
            const isSelected = selectedOption === optionLabel;
            const showCorrect = showFeedback && optionLabel === currentQuestion.correctOption;
            const showIncorrect = showFeedback && isSelected && !isCorrect;
            
            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(optionLabel)}
                disabled={showFeedback}
                className={`
                  w-full text-left p-4 rounded-lg border-2 transition-all
                  ${isSelected && !showFeedback
                    ? "border-[#1B4965] bg-[#1B4965]/5"
                    : showCorrect
                    ? "border-green-500 bg-green-50"
                    : showIncorrect
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                  }
                  ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}
                `}
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-sm font-medium">
                    {optionLabel}
                  </span>
                  <span className="pt-0.5">{option}</span>
                  {showCorrect && (
                    <span className="ml-auto text-green-500">✓ Correct</span>
                  )}
                  {showIncorrect && (
                    <span className="ml-auto text-red-500">✗ Your answer</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-between">
        <div className="text-sm text-gray-500">
          {currentQuestion.topic && (
            <span>Topic: {currentQuestion.topic}</span>
          )}
        </div>
        <div className="flex gap-3">
          {!showFeedback ? (
            <Button
              onClick={handleSubmit}
              disabled={!selectedOption || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Answer"}
            </Button>
          ) : (
            <>
              <div className="flex items-center gap-2 mr-4">
                {isCorrect ? (
                  <span className="text-green-600 font-medium">✓ Correct!</span>
                ) : (
                  <span className="text-red-600 font-medium">✗ Incorrect</span>
                )}
              </div>
              <Button onClick={handleNext}>
                {currentIndex < questionIds.length - 1 ? "Next Question" : "Finish"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

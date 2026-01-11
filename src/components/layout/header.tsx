"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";

export function Header() {
  const dashboardSummary = useQuery(api.stats.getDashboardSummary);
  const user = dashboardSummary?.user;
  
  // Calculate days left - this is fine as it only runs on user data change
  const daysLeft = user?.examDate
    ? Math.max(0, Math.ceil((new Date(user.examDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;
  
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1B4965]">NIMCET Prep Tracker</h1>
          <div className="flex items-center gap-4 mt-1">
            {user && (
              <>
                <span className="text-sm text-gray-600">
                  Target Score: <span className="font-semibold text-[#2A8F9E]">{user.targetScore}</span>
                </span>
                <span className="text-sm text-gray-600">
                  {daysLeft > 0 ? `${daysLeft} days left` : "Exam day!"}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-500">Phase 1</span>
          <div className="w-8 h-8 rounded-full bg-[#D4A574] flex items-center justify-center text-white text-sm font-bold">
            1
          </div>
        </div>
      </div>
    </header>
  );
}

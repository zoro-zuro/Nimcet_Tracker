"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

export default function MistakesPage() {
  const mistakes = useQuery(api.mistakes.listMistakes);
  
  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mistake Notebook</h1>
        <p className="text-gray-600 mt-1">
          {mistakes && mistakes.length > 0
            ? `You have ${mistakes.length} mistakes to review`
            : "No mistakes yet - great job!"}
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">All Mistakes</h2>
        </CardHeader>
        <CardContent>
          {!mistakes ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : mistakes.length === 0 ? (
            <EmptyState
              title="No mistakes yet"
              description="Keep solving questions to track areas that need improvement."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Topic</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Reason</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Reviewed</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mistakes.map((mistake) => {
                    const statusColors = {
                      new: "bg-blue-100 text-blue-700",
                      reviewing: "bg-yellow-100 text-yellow-700",
                      mastered: "bg-green-100 text-green-700",
                    };
                    
                    return (
                      <tr key={mistake._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-900">
                            {mistake.question?.topic || "Unknown"}
                          </div>
                          {mistake.question?.section && (
                            <Badge variant="info" className="mt-1">
                              {mistake.question.section}
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4 text-gray-600">{mistake.reason}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[mistake.status]}`}>
                            {mistake.status.charAt(0).toUpperCase() + mistake.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{mistake.reviewedCount}x</td>
                        <td className="py-3 px-4 text-gray-600">
                          {new Date(mistake.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </AppShell>
  );
}

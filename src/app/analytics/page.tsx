"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

export default function AnalyticsPage() {
  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Detailed insights into your preparation</p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <EmptyState
            icon={
              <div className="text-5xl">📈</div>
            }
            title="Analytics Coming Soon"
            description="Detailed analytics will be available in the next task. You'll see:"
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-1">Performance Trends</div>
              <div>Track your accuracy and speed over time</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-1">Section-wise Analysis</div>
              <div>Breakdown by Math, Reasoning, Computer, English</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-1">Topic Heatmap</div>
              <div>Visual representation of your strong and weak topics</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-1">Score Prediction</div>
              <div>AI-powered prediction of your NIMCET score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}

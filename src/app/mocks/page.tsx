"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

export default function MocksPage() {
  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mock Tests</h1>
        <p className="text-gray-600 mt-1">Take full-length mock tests to simulate the real exam</p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <EmptyState
            icon={
              <div className="text-5xl">📋</div>
            }
            title="Mock Tests Coming Soon"
            description="This feature will be available in the next task. You'll be able to:"
            action={{
              label: "Practice Questions Instead",
              onClick: () => (window.location.href = "/solve"),
            }}
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-1">Previous Year Papers</div>
              <div>Solve actual NIMCET papers from past years</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-1">Custom Mocks</div>
              <div>Create your own test with custom section distribution</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-1">Weakness-Based</div>
              <div>Get tests focused on your weak areas</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}

"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

export default function BankPage() {
  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Question Bank</h1>
        <p className="text-gray-600 mt-1">Manage your question database</p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <EmptyState
            icon={
              <div className="text-5xl">📚</div>
            }
            title="Question Bank Coming Soon"
            description="The question bank management will be available in the next task. You'll be able to:"
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-1">Upload PDFs</div>
              <div>Upload NIMCET papers in PDF format</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-1">AI-Powered Parsing</div>
              <div>Automatically extract questions from PDFs</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-1">Edit Questions</div>
              <div>Review and edit extracted questions</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-1">Organize by Paper</div>
              <div>Group questions by source paper</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}

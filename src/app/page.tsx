export default function Home() {
  // Mock data for health check - will be replaced with real Convex calls
  const mockUser = {
    _id: "mock_user_id",
    name: "Default User",
    targetScore: 750,
    examDate: "2026-06-13",
    createdAt: Date.now(),
  };

  const mockDashboardSummary = {
    totalAnswers: 0,
    correctAnswers: 0,
    accuracy: 0,
    totalMistakes: 0,
    topics: [],
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">NIMCET Prep Tracker - Health Check</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="text-sm overflow-auto">{JSON.stringify(mockUser, null, 2)}</pre>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Dashboard Summary</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="text-sm overflow-auto">{JSON.stringify(mockDashboardSummary, null, 2)}</pre>
          </div>
        </div>

        <div className="bg-green-100 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 mb-2">✅ Foundation Status</h3>
          <p className="text-green-700">
            Next.js + Convex foundation is ready! Convex functions will be connected when deployment is configured.
          </p>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">📋 Task 1/4 Complete</h3>
          <ul className="list-disc list-inside text-blue-700 space-y-1">
            <li>✅ Next.js 15 + TypeScript + Tailwind setup</li>
            <li>✅ Convex schema with all required tables</li>
            <li>✅ Convex functions (users, stats, papers, sessions, answers)</li>
            <li>✅ Minimal UI health check page</li>
            <li>✅ Project structure ready for Vercel deployment</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
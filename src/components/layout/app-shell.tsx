"use client";

import { Header } from "./header";
import { TabsNav } from "./tabs-nav";

export interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Header />
      <TabsNav />
      <main className="max-w-7xl mx-auto px-6 py-6">
        {children}
      </main>
    </div>
  );
}

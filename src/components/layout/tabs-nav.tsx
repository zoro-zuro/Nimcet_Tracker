"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Dashboard", href: "/dashboard", icon: "📊" },
  { label: "Solve", href: "/solve", icon: "📝" },
  { label: "Mocks", href: "/mocks", icon: "📋" },
  { label: "Mistakes", href: "/mistakes", icon: "📕" },
  { label: "Analytics", href: "/analytics", icon: "📈" },
  { label: "Roadmap", href: "/roadmap", icon: "🗺️" },
  { label: "Bank", href: "/bank", icon: "📚" },
];

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function TabsNav() {
  const pathname = usePathname();
  
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
            
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "inline-flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                  isActive
                    ? "border-[#1B4965] text-[#1B4965]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

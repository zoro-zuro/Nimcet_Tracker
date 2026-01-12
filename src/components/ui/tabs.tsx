'use client';

export function Tabs({ children, value, onValueChange, className = "" }: any) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function TabsList({ children, className = "" }: any) {
  return (
    <div className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ children, value, className = "" }: any) {
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, value, className = "" }: any) {
  return (
    <div className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 ${className}`}>
      {children}
    </div>
  );
}

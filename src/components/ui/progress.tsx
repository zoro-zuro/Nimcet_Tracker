export interface ProgressProps {
  value: number; // 0-100
  className?: string;
}

export function Progress({ value, className = "" }: ProgressProps) {
  const percentage = Math.min(Math.max(value, 0), 100);
  
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 overflow-hidden ${className}`}>
      <div
        className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

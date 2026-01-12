import React from 'react';

export interface RadioGroupProps {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function RadioGroup({ children, value, onValueChange, className = "" }: RadioGroupProps) {
  return (
    <div className={className}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { 
            value, 
            onValueChange 
          } as any);
        }
        return child;
      })}
    </div>
  );
}

export interface RadioGroupItemProps {
  value: string;
  id?: string;
  className?: string;
}

export function RadioGroupItem({ value, id, className = "" }: RadioGroupItemProps) {
  return (
    <input
      type="radio"
      id={id}
      value={value}
      className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 ${className}`}
    />
  );
}

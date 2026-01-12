import React from 'react';

export interface DialogProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Dialog({ children, open, onOpenChange }: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50">
        {children}
      </div>
    </div>
  );
}

export interface DialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export function DialogTrigger({ children, asChild = false }: DialogTriggerProps) {
  return <>{children}</>;
}

export interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogContent({ children, className = "" }: DialogContentProps) {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 ${className}`}>
      {children}
    </div>
  );
}

export interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogHeader({ children, className = "" }: DialogHeaderProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

export interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogTitle({ children, className = "" }: DialogTitleProps) {
  return (
    <h2 className={`text-lg font-semibold ${className}`}>
      {children}
    </h2>
  );
}

export interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogDescription({ children, className = "" }: DialogDescriptionProps) {
  return (
    <p className={`text-sm text-gray-600 mt-1 ${className}`}>
      {children}
    </p>
  );
}

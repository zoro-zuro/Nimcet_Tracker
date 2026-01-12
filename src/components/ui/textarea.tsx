export interface TextareaProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
}

export function Textarea({ 
  value, 
  onChange, 
  placeholder, 
  className = "",
  id,
  rows = 3,
  required = false,
  disabled = false
}: TextareaProps) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed resize-vertical ${className}`}
      id={id}
      rows={rows}
      required={required}
      disabled={disabled}
    />
  );
}

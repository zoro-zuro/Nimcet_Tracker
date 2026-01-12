export interface InputProps {
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  min?: string | number;
  max?: string | number;
  required?: boolean;
  disabled?: boolean;
}

export function Input({ 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  className = "",
  id,
  min,
  max,
  required = false,
  disabled = false
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      id={id}
      min={min}
      max={max}
      required={required}
      disabled={disabled}
    />
  );
}

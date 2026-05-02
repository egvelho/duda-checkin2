type InputProps = {
  label?: string;
  error?: string;
  helperText?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({
  label,
  error,
  helperText,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-secondary-900 ml-1"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={`
          w-full px-4 py-2.5 
          bg-white border rounded-xl
          border-gray-300
          text-secondary-900 placeholder:text-secondary-500
          transition-all duration-200 outline-none
          border-secondary-200 hover:border-secondary-300
          focus:border-primary focus:ring-4 focus:ring-primary/10
          ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : ""}
          disabled:bg-secondary-50 disabled:cursor-not-allowed          
          ${className}
        `}
        {...props}
      />

      {error ? (
        <span className="text-xs text-red-500 ml-1 font-medium italic">
          {error}
        </span>
      ) : helperText ? (
        <span className="text-xs text-secondary-500 ml-1">{helperText}</span>
      ) : null}
    </div>
  );
}

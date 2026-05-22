type FormErrorProps = {
  message?: string;
};

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <span className="text-red-500 text-xs ml-1 mt-1 block animate-fade-in">
      {message}
    </span>
  );
}

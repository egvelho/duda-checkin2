// 1) Pra importar, precisa exportar
// 2) Componentes precisam ser nomeados em PascalCase
// 3) Componentes recebem props e retornam JSX
// 4) Props são um objeto
// 5) Componentes recebem SOMENTE UM PARÂMETRO (as props)
// 6) JSX NÃO É HTML, É SABOR HTML!

import { ButtonHTMLAttributes } from "react";

const variants = {
  primary:
    "bg-primary text-white hover:opacity-80 shadow-lg hover:shadow-gray-200",
  outline: "bg-white text-gray-700 border border-gray-200 hover:opacity-80",
  ghost: "text-gray-600 hover:text-gray-900",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm font-medium",
  lg: "px-8 py-4 text-base font-bold",
};

type ButtonProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClass =
    "inline-flex items-center justify-center rounded-lg disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variantClass = variants[variant];
  const sizeClass = sizes[size];

  return (
    <button
      className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

import { ComponentPropsWithoutRef, ElementType } from "react";

type TitleProps<T extends ElementType> = {
  as?: T;
  children: React.ReactNode;
};

type CombinedTitleProps<T extends ElementType> = TitleProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TitleProps<T>>;

export function Title<T extends ElementType = "h1">({
  as,
  className,
  children,
  ...props
}: CombinedTitleProps<T>) {
  const Component = as || "h1";

  return (
    <Component
      className={`text-gray-900 tracking-tight mb-6 ${className || ""}`}
      {...props}
    >
      {children}
    </Component>
  );
}

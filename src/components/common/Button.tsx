import React from "react";

export type ButtonVariant = "primary" | "secondary" | "destructive" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "secondary",
      size = "md",
      icon,
      children,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "focus-ring inline-flex items-center justify-center gap-1.5 font-semibold transition-all select-none disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer";

    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        "bg-[#5B7CFF] text-white hover:bg-[#6B88FF] active:scale-[0.98] border border-transparent shadow-[0_4px_14px_rgba(91,124,255,0.18)]",
      secondary:
        "border border-[#304762] bg-[#111F32] text-[#DCE5F1] hover:bg-[#17283F] active:scale-[0.98]",
      destructive:
        "border border-[rgba(251,113,133,0.35)] bg-[rgba(251,113,133,0.12)] text-[#FB7185] hover:bg-[rgba(251,113,133,0.20)] active:scale-[0.98]",
      ghost:
        "text-[#AFC0D5] hover:bg-white/5 hover:text-[#F5F8FC] active:scale-[0.98]"
    };

    const sizeStyles: Record<ButtonSize, string> = {
      sm: "rounded-lg px-2.5 py-1 text-xs",
      md: "rounded-xl px-3.5 py-2 text-xs",
      lg: "rounded-xl px-6 py-3 text-xs sm:text-sm"
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

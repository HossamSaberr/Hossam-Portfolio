import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated' | 'outlined' | 'outline';
  hover?: boolean;
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = false, children, ...props }, ref) => {
    const baseStyles = "rounded-xl p-6 transition-all duration-200";

    const variants = {
      default: "bg-zinc-900 border border-zinc-800",
      glass: "glass border border-zinc-800/50",
      elevated: "bg-zinc-900 border border-zinc-800 shadow-lg",
      outlined: "bg-transparent border-2 border-zinc-700",
      outline: "bg-transparent border-2 border-zinc-700"
    };

    const hoverStyles = hover ? "hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-800/50 hover:border-zinc-700 hover:scale-[1.02]" : "";

    return (
      <div
        className={cn(
          baseStyles,
          variants[variant],
          hoverStyles,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
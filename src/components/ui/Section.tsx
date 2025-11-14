import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  id?: string;
  children: React.ReactNode;
  container?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, title, subtitle, id, container = true, children, ...props }, ref) => {
    const baseStyles = "py-20 lg:py-24";
    const containerStyles = container ? "container mx-auto px-4 sm:px-6 lg:px-8" : "";

    return (
      <section
        id={id}
        className={cn(baseStyles, className)}
        ref={ref}
        {...props}
      >
        <div className={containerStyles}>
          {(title || subtitle) && (
            <div className="text-center mb-16">
              {title && (
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;
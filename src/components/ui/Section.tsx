import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const sectionVariants = cva(
  'relative w-full',
  {
    variants: {
      padding: {
        none: '',
        sm: 'py-12',
        md: 'py-16',
        lg: 'py-20',
        xl: 'py-24',
      },
      background: {
        none: '',
        primary: 'bg-zinc-950',
        secondary: 'bg-zinc-900/50',
        gradient: 'bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950',
        pattern: 'bg-zinc-950',
      },
    },
    defaultVariants: {
      padding: 'lg',
      background: 'primary',
    },
  }
);

interface SectionProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  children: ReactNode;
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({
    className,
    padding,
    background,
    children,
    id,
    title,
    subtitle,
    description,
    centered = false,
    ...props
  }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          sectionVariants({ padding, background }),
          background === 'pattern' && 'relative overflow-hidden',
          className
        )}
        {...props}
      >
        {/* Background Pattern */}
        {background === 'pattern' && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,zinc-800_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        )}

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          {(title || subtitle || description) && (
            <div className={cn(
              'mb-12',
              centered && 'text-center'
            )}>
              {subtitle && (
                <p className="text-sm font-medium text-blue-400 uppercase tracking-wider mb-2">
                  {subtitle}
                </p>
              )}
              {title && (
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 mb-4">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-lg text-zinc-400 max-w-3xl">
                  {description}
                </p>
              )}

              {/* Decorative underline */}
              {title && (
                <div className={cn(
                  'mt-4 h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full',
                  centered && 'mx-auto'
                )} />
              )}
            </div>
          )}

          {/* Section Content */}
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = 'Section';

export { Section, sectionVariants };
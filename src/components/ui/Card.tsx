import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-xl border backdrop-blur-sm transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-zinc-900/90 border-zinc-800 hover:bg-zinc-900 hover:shadow-xl hover:shadow-blue-500/10',
        glass: 'bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/70 hover:shadow-xl hover:shadow-blue-500/5',
        elevated: 'bg-zinc-900 border-zinc-700 hover:bg-zinc-800 hover:shadow-lg hover:-translate-y-1',
        project: 'bg-zinc-900/95 border-zinc-800 hover:bg-zinc-800 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1',
        skill: 'bg-zinc-900/90 border-zinc-800 hover:bg-zinc-800/90 hover:border-blue-500/30 hover:shadow-md hover:shadow-blue-500/10',
        achievement: 'bg-gradient-to-br from-zinc-900/95 to-zinc-800/95 border-zinc-700 hover:from-zinc-800/95 hover:to-zinc-700/95 hover:shadow-xl hover:shadow-yellow-500/10',
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      interactive: {
        true: 'cursor-pointer hover:scale-[1.02]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      interactive: false,
    },
  }
);

interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children: ReactNode;
  asChild?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, interactive, children, asChild = false, ...props }, ref) => {
    return (
      <div
        className={cn(cardVariants({ variant, size, interactive, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    />
  )
);

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('font-semibold leading-none tracking-tight text-zinc-100', className)}
      {...props}
    />
  )
);

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-zinc-400', className)}
      {...props}
    />
  )
);

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('pt-0', className)} {...props} />
  )
);

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-4', className)}
      {...props}
    />
  )
);

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardTitle.displayName = 'CardTitle';
CardDescription.displayName = 'CardDescription';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-blue-600/20 text-blue-400 border border-blue-600/30 hover:bg-blue-600/30',
        secondary: 'bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700',
        success: 'bg-green-600/20 text-green-400 border border-green-600/30 hover:bg-green-600/30',
        warning: 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30 hover:bg-yellow-600/30',
        error: 'bg-red-600/20 text-red-400 border border-red-600/30 hover:bg-red-600/30',
        codeforces: 'bg-red-600/20 text-red-400 border border-red-600/30 hover:bg-red-600/30',
        atcoder: 'bg-blue-600/20 text-blue-400 border border-blue-600/30 hover:bg-blue-600/30',
        acpc: 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30 hover:bg-yellow-600/30',
        skill: 'bg-zinc-800/80 text-zinc-300 border border-zinc-700 hover:border-zinc-600 hover:bg-zinc-700/80',
        achievement: 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 border border-blue-500/30 hover:from-blue-600/30 hover:to-purple-600/30 hover:shadow-lg hover:shadow-blue-500/20',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
      },
      interactive: {
        true: 'cursor-pointer hover:scale-105',
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

interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children: ReactNode;
  icon?: ReactNode;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, interactive, children, icon, ...props }, ref) => {
    return (
      <div
        className={cn(badgeVariants({ variant, size, interactive, className }))}
        ref={ref}
        {...props}
      >
        {icon && <span className="mr-1.5">{icon}</span>}
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

// Achievement badge specific component
export const AchievementBadge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Badge
        ref={ref}
        variant="achievement"
        size="lg"
        interactive
        className={cn(
          'relative overflow-hidden group',
          'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent',
          'before:translate-x-[-100%] before:group-hover:translate-x-[100%] before:transition-transform before:duration-1000',
          className
        )}
        {...props}
      >
        {children}
      </Badge>
    );
  }
);

AchievementBadge.displayName = 'AchievementBadge';

// Platform badge for competitive programming platforms
export const PlatformBadge = forwardRef<HTMLDivElement, BadgeProps & { platform: string }>(
  ({ className, children, platform, ...props }, ref) => {
    const getPlatformVariant = (platform: string) => {
      switch (platform.toLowerCase()) {
        case 'codeforces':
          return 'codeforces';
        case 'atcoder':
          return 'atcoder';
        case 'acpc':
          return 'acpc';
        default:
          return 'achievement';
      }
    };

    return (
      <Badge
        ref={ref}
        variant={getPlatformVariant(platform) as any}
        size="md"
        interactive
        className={cn(
          'font-mono font-semibold',
          className
        )}
        {...props}
      >
        {children}
      </Badge>
    );
  }
);

PlatformBadge.displayName = 'PlatformBadge';

export { Badge, badgeVariants };
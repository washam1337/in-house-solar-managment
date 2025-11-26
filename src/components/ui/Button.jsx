import React from 'react';
import { cn } from '../../lib/utils';

const Button = React.forwardRef(({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const variants = {
        default: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] border-0',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md',
        outline: 'border-2 border-primary/20 bg-transparent hover:bg-primary/10 text-primary hover:border-primary/40',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-md',
        ghost: 'hover:bg-white/10 text-foreground hover:text-primary',
        link: 'text-primary underline-offset-4 hover:underline',
        glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-lg hover:shadow-xl',
        glow: 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:shadow-[0_0_30px_rgba(245,158,11,0.7)] border-0',
    };

    const sizes = {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-lg px-8 text-lg',
        icon: 'h-11 w-11',
    };

    return (
        <button
            className={cn(
                'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:grayscale',
                variants[variant],
                sizes[size],
                className
            )}
            ref={ref}
            {...props}
        />
    );
});

Button.displayName = 'Button';

export { Button };

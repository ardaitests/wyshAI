
import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils.jsx';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm', // Solid Purple
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-primary bg-transparent text-primary hover:bg-primary-light/50', // Purple outline
        secondary:
          'bg-primary-light text-primary hover:bg-purple-200/70 border border-primary/30', // Light purple bg, purple text
        ghost: 'hover:bg-accent hover:text-accent-foreground', // Kept for utility
        link: 'text-primary underline-offset-4 hover:underline', // Kept for utility
        join: 'bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2', // Specific for "Join" button
        subtle: 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8 text-base', // Larger size for CTAs
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button, buttonVariants };

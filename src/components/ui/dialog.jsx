import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils.jsx';

// Simple filter for top-level props only
const filterProps = (props) => {
  if (!props) return {};
  const { jsx, global, ...rest } = props;
  return rest;
};

// Create wrapped versions of all Dialog components to filter out non-DOM props
const Dialog = React.forwardRef(({ jsx: _, global: __, ...props }, ref) => (
  <DialogPrimitive.Root ref={ref} {...props} />
));
Dialog.displayName = 'Dialog';

const DialogTrigger = React.forwardRef(({ jsx: _, global: __, ...props }, ref) => (
  <DialogPrimitive.Trigger ref={ref} {...props} />
));
DialogTrigger.displayName = 'DialogTrigger';

const DialogPortal = ({ jsx: _, global: __, ...props }) => (
  <DialogPrimitive.Portal {...props} />
);
DialogPortal.displayName = 'DialogPortal';

const DialogClose = React.forwardRef(({ jsx: _, global: __, ...props }, ref) => (
  <DialogPrimitive.Close ref={ref} {...props} />
));
DialogClose.displayName = 'DialogClose';

const DialogOverlay = React.forwardRef(({ className, jsx: _, global: __, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef(({ 
  className, 
  children, 
  style, 
  jsx: _, 
  global: __, 
  ...props 
}, ref) => {
  // Ensure style is a valid object with string values
  const validStyle = style && typeof style === 'object' 
    ? Object.fromEntries(
        Object.entries(style).filter(([key, value]) => 
          (typeof value === 'string' || typeof value === 'number') &&
          key !== 'global' // Explicitly filter out 'global' from style
        )
      )
    : undefined;
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
          className
        )}
        style={validStyle}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  jsx: _,
  global: __,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex flex-col space-y-1.5 text-center sm:text-left',
        className
      )}
      {...restProps}
    />
  );
};
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({
  className,
  jsx: _,
  global: __,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        className
      )}
      {...restProps}
    />
  );
};
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef(({ 
  className, 
  jsx: _, 
  global: __, 
  ...props 
}, ref) => {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(
        'text-lg font-semibold leading-none tracking-tight',
        className
      )}
      {...restProps}
    />
  );
});
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef(({ 
  className, 
  jsx: _, 
  global: __, 
  ...props 
}, ref) => {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...restProps}
    />
  );
});
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
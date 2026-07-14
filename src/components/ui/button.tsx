import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // Pill-shaped by default — the brand friendliness that offsets the serious
  // palette. Confident ease-out transitions; visible pine focus ring.
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-[background-color,box-shadow,transform,color] duration-200 ease-brand focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-[1.15em] [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // Primary pine CTA with the signature warm lift halo.
        default: 'bg-primary text-primary-foreground shadow-lift hover:bg-pine-700 active:bg-pine-800',
        // Resin-lime energy accent — used sparingly on the highest-intent CTAs.
        accent: 'bg-resin-500 text-pine-900 shadow-[0_12px_26px_-10px_rgba(155,198,30,0.55)] hover:bg-resin-600 active:bg-resin-700',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border-[1.5px] border-pine-600/40 bg-transparent text-primary hover:bg-pine-100 hover:border-pine-600',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-hemp-300',
        ghost: 'text-foreground hover:bg-pine-100 hover:text-pine-800',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 px-4 text-[13px]',
        lg: 'h-14 px-8 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

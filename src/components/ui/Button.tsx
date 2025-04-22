import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-sono whitespace-nowrap rounded-sm shadow-sm transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-primary-50 hover:bg-primary-700',
        secondary: 'bg-gray-0 text-gray-600 hover:bg-gray-50',
        danger: 'bg-red-700 text-red-100 hover:bg-red-800'
      },
      size: {
        lg: 'py-4 px-9 text-2xl font-medium',
        md: 'py-3 px-6 text-xl font-medium',
        sm: 'py-1.5 px-3 text-base uppercase font-semibold'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
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
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = 'Button'

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }

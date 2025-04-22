import { cva, VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import React from 'react'

import { cn } from '@/lib/utils'

const headingVariants = cva('font-poppins', {
  variants: {
    variant: {
      h1: 'text-5xl font-bold leading-[1.4]',
      h2: 'text-[32px] font-bold leading-[1.4]',
      h3: 'text-[32px] font-medium leading-[1.4]'
    }
  },
  defaultVariants: {
    variant: 'h1'
  }
})

interface IHeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  asChild?: boolean
}

const Heading = React.forwardRef<HTMLHeadingElement, IHeadingProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp: React.ElementType = asChild ? Slot : variant ?? 'h1'
    const classes = cn(headingVariants({ variant }), className)

    return <Comp className={classes} ref={ref} {...props} />
  }
)

Heading.displayName = 'Heading'

export default Heading

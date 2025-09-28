import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]',
        destructive:
          'bg-destructive text-white shadow-lg hover:bg-destructive/90 hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-md hover:bg-accent hover:text-accent-foreground hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/80 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]',
        ghost:
          'hover:bg-accent hover:text-accent-foreground hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98] dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline hover:text-primary/80 transition-colors',
        success:
          'bg-green-600 text-white shadow-lg hover:bg-green-700 hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-green-500/20',
        warning:
          'bg-yellow-600 text-white shadow-lg hover:bg-yellow-700 hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-yellow-500/20',
        gradient:
          'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]',
        sourcehair:
          'bg-gradient-to-r from-[#b18933] to-[#daa520] text-white shadow-lg hover:from-[#8b6914] hover:to-[#b8860b] hover:shadow-xl hover:shadow-[#b18933]/30 transform hover:scale-[1.02] active:scale-[0.98]',
        sourcehairOutline:
          'border-2 border-[#b18933] text-[#b18933] bg-transparent shadow-md hover:bg-[#b18933] hover:text-white hover:shadow-lg hover:shadow-[#b18933]/20 transform hover:scale-[1.02] active:scale-[0.98]',
        sourcehairGhost:
          'text-[#b18933] hover:bg-[#b18933]/10 hover:text-[#8b6914] transform hover:scale-[1.02] active:scale-[0.98]',
        sourcehairSecondary:
          'bg-[#b18933]/10 text-[#8b6914] shadow-md hover:bg-[#b18933]/20 hover:text-[#6b5010] hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]',
      },
      size: {
        default: 'h-10 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 text-xs has-[>svg]:px-2.5',
        lg: 'h-12 rounded-lg px-8 text-base has-[>svg]:px-6',
        xl: 'h-14 rounded-lg px-10 text-lg has-[>svg]:px-8',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

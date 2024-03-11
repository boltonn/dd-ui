import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-black dark:focus-visible:ring-black",
  {
    variants: {
      variant: {
        default: "bg-black text-black hover:bg-black/90 dark:bg-black dark:text-black dark:hover:bg-black/90",
        destructive:
          "bg-red-500 text-black hover:bg-red-500/90 dark:bg-red-900 dark:text-black dark:hover:bg-red-900/90",
        outline:
          "border border-black bg-white hover:bg-black hover:text-black dark:border-black dark:bg-black dark:hover:bg-black dark:hover:text-black",
        secondary:
          "bg-black text-black hover:bg-black/80 dark:bg-black dark:text-black dark:hover:bg-black/80",
        ghost: "hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white",
        link: "text-black underline-offset-4 hover:underline dark:text-black",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }

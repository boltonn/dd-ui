import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/utils/cn"

const Progress = React.forwardRef(({ className, value, text, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
    {...props}>
    <ProgressPrimitive.Indicator
      className="flex-1 w-full h-full transition-all bg-primary"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }} />
    {text && (
      <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
        {text} ({value}%)
      </div>
    )}
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

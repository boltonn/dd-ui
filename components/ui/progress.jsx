import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef(({ className, value, text, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-violet-950", className)}
    {...props}>
    <ProgressPrimitive.Indicator
      className="flex-1 w-full h-full transition-all bg-violet-950"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }} />
    {text && (
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white"> 
        <p>{text}</p>
        {value && <p className="ml-2">{value.toFixed(2)}%</p>}
      </div>
    )}
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

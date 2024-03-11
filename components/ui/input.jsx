import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border file:rounded-md file:mr-4 border-black", 
        "px-3 py-2 text-sm ring-offset-white file:border-0 dark:file:bg-violet-950",
        "file:text-sm file:font-medium placeholder:text-black focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:bg-violet-950",
        "dark:ring-offset-black dark:placeholder:text-black dark:focus-visible:ring-black",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }

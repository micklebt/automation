import * as React from "react";
import { cn } from "./utils";

export const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

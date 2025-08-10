import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
      },
      size: { default: "h-10 px-4 py-2", lg: "h-11 px-6" },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size }), "rounded-2xl", className)} {...props} />
));
Button.displayName = "Button";

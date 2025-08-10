import * as React from "react";
import { cn } from "./utils";

export function Card({ className, ...props }) {
  return <div className={cn("bg-white border rounded-xl", className)} {...props} />;
}
export function CardHeader({ className, ...props }) {
  return <div className={cn("p-4", className)} {...props} />;
}
export function CardTitle({ className, ...props }) {
  return <h3 className={cn("text-lg font-semibold", className)} {...props} />;
}
export function CardContent({ className, ...props }) {
  return <div className={cn("p-4 pt-0", className)} {...props} />;
}

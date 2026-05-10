import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const Badge = forwardRef(({ className, variant = "primary", children, ...props }, ref) => {
  const variants = {
    primary: "bg-primary/20 text-primary-300 border-primary/30",
    amber: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    green: "bg-green-500/20 text-green-300 border-green-500/30",
    red: "bg-red-500/20 text-red-300 border-red-500/30",
    outline: "bg-transparent text-white/70 border-white/20",
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});
Badge.displayName = "Badge";

export { Badge };

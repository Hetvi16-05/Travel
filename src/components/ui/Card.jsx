import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const Card = forwardRef(({ className, variant = "default", children, ...props }, ref) => {
  const variants = {
    default: "bg-white/5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
    glass: "bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
    interactive: "bg-white/5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-primary/40 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] hover:-translate-y-1 cursor-pointer transition-all duration-300",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl p-6",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
Card.displayName = "Card";

export { Card };

import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const Button = forwardRef(({ className, variant = "primary", size = "default", isLoading, children, ...props }, ref) => {
  const variants = {
    primary: "bg-gradient-primary text-white shadow-glow hover:shadow-glow-lg hover:-translate-y-[2px]",
    secondary: "bg-white/10 border border-white/20 text-white hover:bg-white/15 hover:border-primary/50 hover:-translate-y-[2px]",
    ghost: "text-white/70 hover:bg-white/10 hover:text-white",
    outline: "border border-white/20 text-white hover:bg-white/5 hover:border-primary/50",
    danger: "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-xl",
    default: "px-6 py-3 rounded-2xl",
    lg: "px-8 py-4 text-lg rounded-2xl",
    icon: "p-2 rounded-xl",
  };

  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none outline-none",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {!isLoading && children}
    </motion.button>
  );
});
Button.displayName = "Button";

export { Button };

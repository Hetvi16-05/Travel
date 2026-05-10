import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const Input = forwardRef(({ className, icon: Icon, ...props }, ref) => {
  return (
    <div className="relative w-full">
      {Icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
          <Icon size={18} />
        </div>
      )}
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-3 rounded-xl text-white placeholder-white/40 transition-all duration-300 outline-none",
          "bg-white/5 border border-white/10",
          "focus:border-primary focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.2)]",
          Icon && "pl-11",
          className
        )}
        {...props}
      />
    </div>
  );
});
Input.displayName = "Input";

export { Input };

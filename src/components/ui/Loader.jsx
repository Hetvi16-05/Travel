import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

export function Loader({ className, size = "default", variant = "primary", ...props }) {
  const sizes = {
    sm: "w-4 h-4",
    default: "w-8 h-8",
    lg: "w-12 h-12",
  };
  
  const variants = {
    primary: "text-primary",
    white: "text-white",
    subtle: "text-white/40",
  };

  return (
    <Loader2 
      className={cn("animate-spin", sizes[size], variants[variant], className)} 
      {...props} 
    />
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full">
      <Loader size="lg" />
    </div>
  );
}

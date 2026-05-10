import { Card } from "../ui/Card";
import { cn } from "../../lib/utils";

export function StatsWidget({ title, value, icon: Icon, trend, trendValue, className }) {
  const isPositive = trend === "up";
  const isNegative = trend === "down";

  return (
    <Card className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-white/60 text-sm font-medium">{title}</h3>
        {Icon && (
          <div className="p-2 bg-primary/20 rounded-xl text-primary-300">
            <Icon size={18} />
          </div>
        )}
      </div>
      
      <div>
        <p className="text-3xl font-display font-bold text-white">{value}</p>
        
        {(trend || trendValue) && (
          <div className="flex items-center gap-2 mt-2">
            <span
              className={cn(
                "text-xs font-semibold px-2 py-1 rounded-lg",
                isPositive && "bg-green-500/20 text-green-400",
                isNegative && "bg-red-500/20 text-red-400",
                !isPositive && !isNegative && "bg-white/10 text-white/70"
              )}
            >
              {trendValue}
            </span>
            <span className="text-white/40 text-xs">vs last month</span>
          </div>
        )}
      </div>
    </Card>
  );
}

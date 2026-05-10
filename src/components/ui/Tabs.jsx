import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function Tabs({ tabs, defaultTab, onChange, className }) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (id) => {
    setActiveTab(id);
    if (onChange) {
      onChange(id);
    }
  };

  return (
    <div className={cn("flex space-x-1 p-1 bg-white/5 rounded-2xl border border-white/10", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={cn(
            "relative px-4 py-2 text-sm font-medium rounded-xl transition-colors outline-none flex-1",
            activeTab === tab.id ? "text-primary-300" : "text-white/60 hover:text-white/90"
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="active-tab"
              className="absolute inset-0 bg-primary/20 border border-primary/30 rounded-xl"
              initial={false}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {tab.icon && <tab.icon size={16} />}
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}

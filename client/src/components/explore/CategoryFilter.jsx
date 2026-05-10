import { Compass, Utensils, Mountain, Palette, Moon, Sparkles } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: Compass },
  { id: 'adventure', label: 'Adventure', icon: Mountain },
  { id: 'food', label: 'Food & Drink', icon: Utensils },
  { id: 'culture', label: 'Culture', icon: Palette },
  { id: 'nightlife', label: 'Nightlife', icon: Moon },
  { id: 'relaxation', label: 'Relaxation', icon: Sparkles },
];

export function CategoryFilter({ activeCategory, onSelect }) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto scrollbar-none pb-4">
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeCategory === cat.id;
        
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 border ${
              isActive 
                ? 'bg-primary border-primary-400 text-white shadow-glow' 
                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Icon size={16} />
            <span className="text-sm font-semibold">{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}

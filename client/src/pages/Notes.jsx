import { useState } from 'react';
import { NotebookPen, Search, MoreHorizontal, Image as ImageIcon, CheckCircle2, Type, List, ListOrdered, Quote } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';

const SIDEBAR_NOTES = [
  { id: 1, title: 'Kyoto Itinerary Ideas', date: 'Just now', active: true },
  { id: 2, title: 'Packing List (Draft)', date: '2 days ago', active: false },
  { id: 3, title: 'Restaurant Recommendations', date: 'Last week', active: false },
];

export default function Notes() {
  const [content, setContent] = useState(`
# Kyoto Itinerary Ideas

We need to make sure we hit all the major temples, but also leave time for wandering around Gion. 

### Must Visit
- Fushimi Inari Shrine (Go very early!)
- Kiyomizu-dera
- Arashiyama Bamboo Grove

### Food to Try
1. Matcha ice cream near Uji
2. Kaiseki dinner in Gion
3. Ramen at Kyoto station

> "Kyoto is the heart of Japan's traditions." 
> Remember to bring the good camera for the autumn leaves!
  `);

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-64px)] md:h-screen flex overflow-hidden">
        
        {/* Notes Sidebar */}
        <div className="hidden md:flex w-72 flex-col bg-[#0A0F1C]/50 border-r border-white/5 backdrop-blur-xl pt-16 md:pt-0">
          <div className="p-4 border-b border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold flex items-center gap-2">
                <NotebookPen size={16} className="text-primary-400" />
                Journal
              </h2>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="text" 
                placeholder="Search notes..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm text-white placeholder-white/30 outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-none p-2 space-y-1">
            {SIDEBAR_NOTES.map(note => (
              <button 
                key={note.id}
                className={`w-full text-left p-3 rounded-xl transition-colors ${
                  note.active 
                    ? 'bg-primary/20 border border-primary/30 text-white' 
                    : 'hover:bg-white/5 border border-transparent text-white/60'
                }`}
              >
                <h4 className="font-medium text-sm truncate">{note.title}</h4>
                <p className={`text-xs mt-1 ${note.active ? 'text-primary-300' : 'text-white/30'}`}>{note.date}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col bg-[#111827] pt-16 md:pt-0">
          {/* Editor Header / Toolbar */}
          <div className="flex items-center justify-between p-4 border-b border-white/5 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors"><Type size={16} /></button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors"><List size={16} /></button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors"><ListOrdered size={16} /></button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors"><Quote size={16} /></button>
              <div className="w-px h-4 bg-white/10 mx-2" />
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors"><ImageIcon size={16} /></button>
            </div>
            <div className="flex items-center gap-4 pl-4 shrink-0">
              <span className="text-xs text-white/30 flex items-center gap-1">
                <CheckCircle2 size={12} className="text-emerald-500" /> Saved
              </span>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>

          {/* Editor Canvas */}
          <div className="flex-1 overflow-y-auto scrollbar-none p-6 md:p-12 lg:px-24">
            <div className="max-w-3xl mx-auto space-y-6">
              
              {/* Cover Image Mockup */}
              <div className="group relative w-full h-40 md:h-64 rounded-3xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer flex items-center justify-center hover:bg-white/10 transition-colors">
                <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" alt="Cover" />
                <button className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                  <ImageIcon size={14} /> Change Cover
                </button>
              </div>

              {/* Textarea disguised as rich text editor */}
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-[500px] bg-transparent resize-none border-none outline-none text-white/90 text-lg md:text-xl leading-relaxed placeholder-white/20 scrollbar-none font-sans"
                placeholder="Start writing your travel journal..."
              />
              
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

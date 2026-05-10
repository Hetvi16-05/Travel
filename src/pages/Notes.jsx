import { useState, useEffect } from 'react';
import { NotebookPen, Search, MoreHorizontal, Image as ImageIcon, CheckCircle2, Type, List, ListOrdered, Quote, AlertCircle, Save } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import api from '../lib/api';
import { Loader } from '../components/ui/Loader';
import { Button } from '../components/ui/Button';
import { toast } from 'react-hot-toast';


// Removed mock SIDEBAR_NOTES


export default function Notes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tripRes, notesRes] = await Promise.all([
          api.trips.getById(id),
          api.trips.getNotes(id)
        ]);
        setTrip(tripRes.data);
        const fetchedNotes = notesRes.data || [];
        setNotes(fetchedNotes);
        if (fetchedNotes.length > 0) setSelectedNote(fetchedNotes[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  const handleSaveNote = async () => {
    if (!selectedNote) return;
    setIsSaving(true);
    try {
      await api.trips.updateNote(id, selectedNote.id, {
        title: selectedNote.title,
        content: selectedNote.content
      });
      toast.success('Note saved');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <DashboardLayout><div className="flex justify-center py-20"><Loader size="lg" /></div></DashboardLayout>;
  if (error) return <DashboardLayout><div className="text-center py-20 text-red-400"><AlertCircle className="mx-auto mb-2" /><p>{error}</p></div></DashboardLayout>;


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
            {notes.map(note => (
              <button 
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className={`w-full text-left p-3 rounded-xl transition-colors ${
                  selectedNote?.id === note.id 
                    ? 'bg-primary/20 border border-primary/30 text-white' 
                    : 'hover:bg-white/5 border border-transparent text-white/60'
                }`}
              >
                <h4 className="font-medium text-sm truncate">{note.title}</h4>
                <p className={`text-xs mt-1 ${selectedNote?.id === note.id ? 'text-primary-300' : 'text-white/30'}`}>{new Date(note.updated_at).toLocaleDateString()}</p>
              </button>
            ))}
            {notes.length === 0 && (
              <p className="text-center py-10 text-white/20 text-xs">No notes yet.</p>
            )}
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
                {isSaving ? <Loader size="xs" /> : <CheckCircle2 size={12} className="text-emerald-500" />} {isSaving ? 'Saving...' : 'Saved'}
              </span>
              <Button size="sm" onClick={handleSaveNote} isLoading={isSaving}>
                <Save size={14} className="mr-2" /> Save
              </Button>
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
              {selectedNote ? (
                <>
                  <input 
                    type="text"
                    value={selectedNote.title}
                    onChange={(e) => setSelectedNote({...selectedNote, title: e.target.value})}
                    className="w-full bg-transparent border-none outline-none text-3xl font-bold text-white mb-4 placeholder-white/20"
                    placeholder="Note Title"
                  />
                  <textarea 
                    value={selectedNote.content}
                    onChange={(e) => setSelectedNote({...selectedNote, content: e.target.value})}
                    className="w-full h-[500px] bg-transparent resize-none border-none outline-none text-white/90 text-lg md:text-xl leading-relaxed placeholder-white/20 scrollbar-none font-sans"
                    placeholder="Start writing your travel journal..."
                  />
                </>
              ) : (
                <div className="text-center py-20 text-white/20">Select or create a note.</div>
              )}
              
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

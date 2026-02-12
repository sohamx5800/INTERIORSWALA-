import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  LogOut, 
  Trash2, 
  Plus, 
  ExternalLink, 
  MessageSquare, 
  History,
  AtSign,
  PhoneCall,
  Calendar,
  Sparkles,
  Palette,
  Edit2,
  CheckCircle2,
  Clock,
  Settings,
  MapPin,
  Share2,
  Facebook,
  User,
  Type as FontIcon
} from 'lucide-react';
import { Project, ContactFormData, StudioDetails } from '../types';

interface AdminPanelProps {
  onLogout: () => void;
  projects: Project[];
  queries: ContactFormData[];
  studioDetails: StudioDetails;
  onUpdateStudioDetails: (details: StudioDetails) => void;
  onAddProject: (project: Project) => void;
  onUpdateProject?: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onDeleteQuery: (id: string) => void;
  onUpdateQuery?: (id: string, updates: Partial<ContactFormData>) => void;
  onClearQueries: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  onLogout, 
  projects, 
  queries, 
  studioDetails,
  onUpdateStudioDetails,
  onAddProject, 
  onUpdateProject,
  onDeleteProject, 
  onDeleteQuery,
  onUpdateQuery,
  onClearQueries
}) => {
  const [activeTab, setActiveTab] = useState<'queries' | 'portfolio' | 'studio'>('queries');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    category: 'Residential',
    image: '',
    description: '',
    link: ''
  });

  const [localStudio, setLocalStudio] = useState<StudioDetails>(studioDetails);

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
        onUpdateProject?.({ ...editingProject });
        setEditingProject(null);
        setShowAddModal(false);
    } else if (newProject.title && newProject.image) {
      onAddProject({
        ...newProject,
        id: `project-${Date.now()}`,
      } as Project);
      setNewProject({ title: '', category: 'Residential', image: '', description: '', link: '' });
      setShowAddModal(false);
    }
  };

  const handleStudioUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStudioDetails(localStudio);
    alert("Studio details updated successfully.");
  };

  const toggleQueryStatus = (id: string, currentStatus?: string) => {
    const nextStatus = currentStatus === 'New' ? 'In Progress' : currentStatus === 'In Progress' ? 'Completed' : 'New';
    onUpdateQuery?.(id, { status: nextStatus as any });
  };

  return (
    <div className="min-h-screen bg-[#060807] text-white font-sans flex flex-col md:flex-row relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#1FAE9B]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#1FAE9B]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Sidebar */}
      <aside className="w-full md:w-80 glass-ios border-r border-white/5 p-8 flex flex-col justify-between shadow-2xl z-20">
        <div>
          <div className="flex flex-col gap-6 mb-16">
            <img 
              src="logo.png" 
              alt="Interiorswala" 
              className="h-10 w-auto object-contain self-start brightness-110 drop-shadow-md"
            />
            <div className="flex flex-col">
              <h1 className="text-xl font-serif font-bold italic leading-tight text-white tracking-wide">Studio <span className="text-[#1FAE9B]">Vault</span></h1>
              <p className="text-[8px] uppercase tracking-[0.4em] text-white/20 mt-2 font-black">Authorized Archive Access</p>
            </div>
          </div>

          <nav className="space-y-4">
            <button 
              onClick={() => setActiveTab('queries')}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-500 ${activeTab === 'queries' ? 'bg-[#1FAE9B] text-white shadow-lg shadow-[#1FAE9B]/20' : 'text-white/20 hover:text-white hover:bg-white/5'}`}
            >
              <MessageSquare size={16} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-black">Consultations</span>
              {queries.length > 0 && <span className="ml-auto bg-white/10 px-2 py-0.5 rounded-full text-[8px]">{queries.length}</span>}
            </button>
            <button 
              onClick={() => setActiveTab('portfolio')}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-500 ${activeTab === 'portfolio' ? 'bg-[#1FAE9B] text-white shadow-lg shadow-[#1FAE9B]/20' : 'text-white/20 hover:text-white hover:bg-white/5'}`}
            >
              <ImageIcon size={16} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-black">Archive Mgmt</span>
            </button>
            <button 
              onClick={() => setActiveTab('studio')}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-500 ${activeTab === 'studio' ? 'bg-[#1FAE9B] text-white shadow-lg shadow-[#1FAE9B]/20' : 'text-white/20 hover:text-white hover:bg-white/5'}`}
            >
              <Settings size={16} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-black">Studio DNA</span>
            </button>
          </nav>
        </div>

        <div className="space-y-4 mt-12 md:mt-0">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-6 py-4 text-red-400/60 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all font-black"
          >
            <LogOut size={16} />
            <span className="text-[10px] uppercase tracking-[0.2em]">Close Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-16 overflow-y-auto relative z-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <span className="text-[10px] text-[#1FAE9B] font-black uppercase tracking-[0.5em] mb-4 block drop-shadow-lg">Dashboard / {activeTab}</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold italic capitalize leading-none text-white drop-shadow-2xl tracking-tight">
              {activeTab === 'queries' ? 'Client Consultations' : activeTab === 'portfolio' ? 'Portfolio Archive' : 'Studio Configuration'}
            </h2>
          </div>
          
          <div className="flex gap-4">
            {activeTab === 'queries' && queries.length > 0 && (
              <button 
                onClick={() => { if(confirm("Clear all consultation history?")) onClearQueries(); }}
                className="flex items-center gap-3 px-6 py-4 glass-card text-red-400/80 border border-red-400/10 text-[9px] uppercase tracking-[0.3em] font-black hover:bg-red-400 hover:text-white transition-all rounded-lg shadow-xl"
              >
                <History size={14} /> Purge Vault
              </button>
            )}
            {activeTab === 'portfolio' && (
              <button 
                onClick={() => {
                  setNewProject({ title: '', category: 'Residential', image: '', description: '', link: '' });
                  setEditingProject(null);
                  setShowAddModal(true);
                }}
                className="flex items-center gap-3 px-8 py-4 bg-[#1FAE9B] text-white text-[9px] uppercase tracking-[0.3em] font-black hover:bg-white hover:text-[#1FAE9B] transition-all shadow-2xl rounded-lg"
              >
                <Plus size={16} /> New Masterpiece
              </button>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 gap-12">
          {activeTab === 'queries' && (
            <div className="space-y-12">
              {queries.length === 0 ? (
                <div className="py-48 text-center opacity-20 border-2 border-white/5 border-dashed rounded-[3rem] flex flex-col items-center">
                  <Clock size={64} className="mb-6" />
                  <p className="text-xs uppercase tracking-[0.6em] font-black">Archive currently vacant</p>
                </div>
              ) : (
                queries.map((query) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={query.id} 
                    className="glass-ios border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl"
                  >
                    <div className="p-10 border-b border-white/5 flex flex-col md:flex-row justify-between gap-8 bg-gradient-to-r from-white/[0.02] to-transparent">
                      <div className="space-y-5">
                        <div className="flex items-center gap-6">
                          <h4 className="text-3xl font-serif font-bold text-white italic">{query.name}</h4>
                          <span className={`text-[8px] uppercase tracking-[0.3em] px-4 py-1.5 rounded-full font-black shadow-lg border border-white/5 ${
                            query.status === 'Completed' ? 'bg-green-500/10 text-green-400' : 
                            query.status === 'In Progress' ? 'bg-yellow-500/10 text-yellow-400' : 
                            'bg-[#1FAE9B]/10 text-[#1FAE9B]'
                          }`}>
                            {query.status || 'New'}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-8 text-[10px] text-white/30 uppercase tracking-[0.4em] font-black">
                          <span className="flex items-center gap-2"><AtSign size={12} className="text-[#1FAE9B]" /> {query.email}</span>
                          <span className="flex items-center gap-2"><PhoneCall size={12} className="text-[#1FAE9B]" /> {query.phone}</span>
                          <span className="flex items-center gap-2"><Calendar size={12} className="text-[#1FAE9B]" /> {new Date(query.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => toggleQueryStatus(query.id, query.status)}
                          className="p-4 glass-card text-white/20 hover:text-[#1FAE9B] rounded-2xl transition-all"
                          title="Change Status"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => onDeleteQuery(query.id)}
                          className="p-4 glass-card text-white/10 hover:text-red-400 rounded-2xl transition-all"
                          title="Remove Query"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
                      <div className="lg:col-span-1 border-r border-white/5 pr-10 text-white/50">
                        <h5 className="text-[9px] uppercase tracking-[0.5em] text-[#1FAE9B] font-black mb-6">Brief Context</h5>
                        <p className="text-base font-light leading-relaxed italic border-l-2 border-[#1FAE9B]/20 pl-6">
                          "{query.message}"
                        </p>
                      </div>

                      {query.aiDesign && (
                        <div className="lg:col-span-2">
                          <div className="flex items-center gap-3 mb-6">
                            <Sparkles size={14} className="text-[#1FAE9B]" />
                            <h5 className="text-[9px] uppercase tracking-[0.5em] text-[#1FAE9B] font-black">AI Curation DNA</h5>
                          </div>
                          <div className="glass-card rounded-2xl p-8 border border-[#1FAE9B]/10">
                            <h6 className="text-2xl font-serif italic mb-3 text-white">{query.aiDesign.style}</h6>
                            <p className="text-sm text-white/40 mb-8 leading-relaxed font-light">"{query.aiDesign.description}"</p>
                            
                            <div className="flex flex-wrap gap-6">
                              {query.aiDesign.palette.map((color, idx) => (
                                <div key={idx} className="flex items-center gap-3 glass-card px-4 py-2 rounded-full border border-white/5 shadow-inner">
                                  <div className="w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: color.hex }} />
                                  <span className="text-[9px] uppercase tracking-widest font-black text-white/50">{color.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {projects.map((project) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={project.id} 
                  className="glass-ios border border-white/5 rounded-[2.5rem] overflow-hidden group flex flex-col sm:flex-row shadow-2xl"
                >
                  <div className="w-full sm:w-56 h-64 sm:h-auto overflow-hidden bg-white/5">
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" 
                    />
                  </div>
                  <div className="flex-1 p-10 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] text-[#1FAE9B] font-black uppercase tracking-[0.4em] mb-4 block">{project.category}</span>
                      <h4 className="text-3xl font-serif font-bold mb-4 text-white italic leading-tight">{project.title}</h4>
                      {project.link && (
                        <a href={project.link} target="_blank" className="text-[#1FAE9B] text-[9px] uppercase tracking-[0.3em] font-black flex items-center gap-3 hover:text-white transition-colors">
                          <ExternalLink size={12}/> Live Link
                        </a>
                      )}
                    </div>
                    <div className="flex gap-6 mt-10 pt-6 border-t border-white/5">
                      <button 
                        onClick={() => {
                          setEditingProject({ ...project });
                          setShowAddModal(true);
                        }}
                        className="flex items-center gap-3 text-white/20 hover:text-[#1FAE9B] text-[9px] uppercase tracking-[0.4em] font-black transition-all"
                      >
                        <Edit2 size={12} /> Edit
                      </button>
                      <button 
                        onClick={() => onDeleteProject(project.id)}
                        className="flex items-center gap-3 text-white/10 hover:text-red-400 text-[9px] uppercase tracking-[0.4em] font-black transition-all"
                      >
                        <Trash2 size={12} /> Purge
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'studio' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-ios border border-white/5 rounded-[3rem] p-12 md:p-20 max-w-4xl shadow-2xl"
            >
              <form onSubmit={handleStudioUpdate} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] text-[#1FAE9B] font-black ml-1">
                      <AtSign size={14} /> Digital Address
                    </label>
                    <input 
                      required 
                      type="email" 
                      className="w-full h-16 rounded-2xl px-8"
                      value={localStudio.email}
                      onChange={e => setLocalStudio({...localStudio, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] text-[#1FAE9B] font-black ml-1">
                      <PhoneCall size={14} /> Secure Line
                    </label>
                    <input 
                      required 
                      type="text" 
                      className="w-full h-16 rounded-2xl px-8"
                      value={localStudio.phone}
                      onChange={e => setLocalStudio({...localStudio, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] text-[#1FAE9B] font-black ml-1">
                    <MapPin size={14} /> Studio HQ
                  </label>
                  <input 
                    required 
                    type="text" 
                    className="w-full h-16 rounded-2xl px-8"
                    value={localStudio.address}
                    onChange={e => setLocalStudio({...localStudio, address: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div className="space-y-4">
                    <label className="flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] text-[#1FAE9B] font-black ml-1">
                      <Share2 size={14} /> Instagram
                    </label>
                    <input 
                      required 
                      type="url" 
                      className="w-full h-16 rounded-2xl px-8"
                      value={localStudio.instagram}
                      onChange={e => setLocalStudio({...localStudio, instagram: e.target.value})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] text-[#1FAE9B] font-black ml-1">
                      <MessageSquare size={14} /> WhatsApp
                    </label>
                    <input 
                      required 
                      type="url" 
                      className="w-full h-16 rounded-2xl px-8"
                      value={localStudio.whatsapp}
                      onChange={e => setLocalStudio({...localStudio, whatsapp: e.target.value})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] text-[#1FAE9B] font-black ml-1">
                      <Facebook size={14} /> Facebook
                    </label>
                    <input 
                      required 
                      type="url" 
                      className="w-full h-16 rounded-2xl px-8"
                      value={localStudio.facebook}
                      onChange={e => setLocalStudio({...localStudio, facebook: e.target.value})}
                    />
                  </div>
                </div>

                <div className="pt-12 border-t border-white/5">
                   <button type="submit" className="px-16 py-6 bg-[#1FAE9B] text-white font-black uppercase tracking-[0.5em] text-[11px] rounded-2xl hover:bg-white hover:text-[#1FAE9B] transition-all shadow-2xl shadow-[#1FAE9B]/20">
                    Materialize Profile Updates
                   </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </main>

      {/* Add/Edit Project Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/85 backdrop-blur-xl"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-xl glass-ios border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] my-8"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[#1FAE9B]" />
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6 italic text-white leading-tight">
                {editingProject ? 'Refine' : 'Archive New'} <span className="text-[#1FAE9B]">Masterpiece</span>
              </h3>
              <form onSubmit={handleAddProject} className="space-y-5">
                <div className="space-y-3">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-black ml-1 flex items-center gap-3">
                    <FontIcon size={12}/> Asset Title
                  </label>
                  <input required type="text" className="w-full h-12 rounded-xl px-6 text-sm" 
                    value={editingProject ? editingProject.title : newProject.title} 
                    onChange={e => editingProject ? setEditingProject({...editingProject, title: e.target.value}) : setNewProject({...newProject, title: e.target.value})} 
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-3">
                    <label className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-black ml-1 flex items-center gap-3">
                       <LayoutDashboard size={12}/> Category
                    </label>
                    <select className="w-full h-12 rounded-xl px-6 appearance-none cursor-pointer text-sm" 
                      value={editingProject ? editingProject.category : newProject.category} 
                      onChange={e => editingProject ? setEditingProject({...editingProject, category: e.target.value}) : setNewProject({...newProject, category: e.target.value})}
                    >
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Hospitality</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-black ml-1 flex items-center gap-3">
                       <ImageIcon size={12}/> Image URL
                    </label>
                    <input required type="url" className="w-full h-12 rounded-xl px-6 text-sm" 
                      value={editingProject ? editingProject.image : newProject.image} 
                      onChange={e => editingProject ? setEditingProject({...editingProject, image: e.target.value}) : setNewProject({...newProject, image: e.target.value})} 
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-black ml-1 flex items-center gap-3">
                    <ExternalLink size={12}/> External Archive Link
                  </label>
                  <input type="url" className="w-full h-12 rounded-xl px-6 text-sm" 
                    value={editingProject ? (editingProject.link || '') : (newProject.link || '')} 
                    onChange={e => editingProject ? setEditingProject({...editingProject, link: e.target.value}) : setNewProject({...newProject, link: e.target.value})} 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-black ml-1 flex items-center gap-3">
                    <MessageSquare size={12}/> Project Description
                  </label>
                  <textarea rows={3} className="w-full rounded-xl px-6 py-4 resize-none italic font-light leading-relaxed text-sm" 
                    value={editingProject ? editingProject.description : newProject.description} 
                    onChange={e => editingProject ? setEditingProject({...editingProject, description: e.target.value}) : setNewProject({...newProject, description: e.target.value})} 
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button type="submit" className="flex-1 py-4 bg-[#1FAE9B] text-white font-black uppercase tracking-[0.4em] text-[10px] rounded-xl hover:bg-white hover:text-[#1FAE9B] transition-all shadow-xl">
                    {editingProject ? 'Save Masterpiece' : 'Commit to Gallery'}
                  </button>
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-8 py-4 border border-white/10 text-white/40 font-black uppercase tracking-[0.4em] text-[10px] rounded-xl hover:bg-white/5 transition-all">Cancel</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;
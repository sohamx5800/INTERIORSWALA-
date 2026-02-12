import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import AIDesignAssistant from './components/AIDesignAssistant';
import ContactForm from './components/ContactForm';
import AboutSection from './components/AboutSection';
import ProcessSection from './components/ProcessSection';
import Scene3D from './components/Scene3D';
import AdminPanel from './components/AdminPanel';
import { motion, useScroll, useSpring, AnimatePresence, Variants } from 'framer-motion';
import { Lamp, Armchair, Ruler, LayoutGrid, Lock, ArrowRight } from 'lucide-react';
import { DesignSuggestion, Project, ContactFormData, StudioDetails } from './types';

const INITIAL_PROJECTS: Project[] = [
  {
    id: "1",
    title: "The Zenith Residence",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=90&w=1600",
    description: "A masterclass in shadow and light, featuring bespoke Italian furnishings.",
    link: "https://www.instagram.com/interiorswala.in/"
  },
  {
    id: "2",
    title: "Emerald Plaza",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=90&w=1600",
    description: "Modernist corporate environments designed for peak inspiration."
  }
];

const DEFAULT_STUDIO: StudioDetails = {
  email: 'contact.interiorswala@gmail.com',
  phone: '+91 79808 72754',
  address: 'Champasari, Siliguri, India, 734003',
  instagram: 'https://www.instagram.com/interiorswala.in?igsh=N3ludzc2bDlnZXht',
  whatsapp: 'https://wa.me/917980872754',
  facebook: 'https://www.facebook.com/interiorswala.in/'
};

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 1.2, 
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.15
    } 
  }
};

const SectionWrapper: React.FC<{ children: React.ReactNode, id: string, className?: string }> = ({ children, id, className }) => {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%", amount: 0.2 }}
      variants={revealVariants}
      className={`relative py-24 md:py-48 px-6 will-change-transform ${className}`}
    >
      {children}
    </motion.section>
  );
};

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [authForm, setAuthForm] = useState({ user: '', pass: '' });
  
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('interiorswala_projects');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch (e) {
      return INITIAL_PROJECTS;
    }
  });
  
  const [queries, setQueries] = useState<ContactFormData[]>(() => {
    try {
      const saved = localStorage.getItem('interiorswala_queries');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [studioDetails, setStudioDetails] = useState<StudioDetails>(() => {
    try {
      const saved = localStorage.getItem('interiorswala_studio');
      return saved ? JSON.parse(saved) : DEFAULT_STUDIO;
    } catch (e) {
      return DEFAULT_STUDIO;
    }
  });

  useEffect(() => {
    localStorage.setItem('interiorswala_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('interiorswala_queries', JSON.stringify(queries));
  }, [queries]);

  useEffect(() => {
    localStorage.setItem('interiorswala_studio', JSON.stringify(studioDetails));
  }, [studioDetails]);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        setIsAuth(false);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 40,
    restDelta: 0.001
  });

  const [aiDesign, setAiDesign] = useState<DesignSuggestion | null>(null);

  const handleQuoteRequest = useCallback((design: DesignSuggestion) => {
    setAiDesign(design);
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSendMessage = useCallback((data: ContactFormData) => {
    setQueries(prev => [data, ...prev]);
  }, []);

  const handleUpdateQuery = useCallback((id: string, updates: Partial<ContactFormData>) => {
    setQueries(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
  }, []);

  const handleUpdateProject = useCallback((updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authForm.user === 'admin' && authForm.pass === 'admin1234') {
      setIsAuth(true);
      window.scrollTo(0,0);
    } else {
      alert("Invalid credentials. Access Denied.");
    }
  };

  const handleLogout = () => {
    setIsAuth(false);
    setIsAdmin(false);
    window.location.hash = ''; 
    window.scrollTo(0, 0);
  };

  const services = useMemo(() => [
    { icon: <Armchair size={20} />, title: "Curation", desc: "Sourcing singular artifacts of exceptional pedigree from global artisans." },
    { icon: <Lamp size={20} />, title: "Lighting", desc: "Manipulating atmosphere through scientific optics and luxury fixtures." },
    { icon: <Ruler size={20} />, title: "Volume", desc: "Optimization of grand spatial experiences and structural flow." },
    { icon: <LayoutGrid size={20} />, title: "Utility", desc: "Merging seamless smart home tech with human-centric intuition." }
  ], []);

  if (isAdmin && !isAuth) {
    return (
      <div className="min-h-screen bg-[#060807] flex items-center justify-center p-6 text-white">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md glass-ios p-12 rounded-[2rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#1FAE9B]" />
          <div className="flex flex-col items-center mb-12">
            <div className="p-6 bg-[#1FAE9B]/10 rounded-2xl mb-6 backdrop-blur-md">
              <Lock className="text-[#1FAE9B]" size={36} />
            </div>
            <h2 className="text-4xl font-serif font-bold italic text-white">Studio <span className="text-[#1FAE9B]">Vault</span></h2>
            <p className="text-[10px] uppercase tracking-[0.5em] text-white/20 mt-4 font-black">Authorized Access Only</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.4em] text-white/20 ml-1 font-black">Credential Identity</label>
              <input type="text" placeholder="Username" className="w-full bg-white/5 border border-white/10 px-8 py-5 rounded-xl focus:outline-none focus:border-[#1FAE9B] text-base transition-all text-white font-medium" value={authForm.user} onChange={e => setAuthForm({...authForm, user: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.4em] text-white/20 ml-1 font-black">Secure Passphrase</label>
              <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 px-8 py-5 rounded-xl focus:outline-none focus:border-[#1FAE9B] text-base transition-all text-white font-medium" value={authForm.pass} onChange={e => setAuthForm({...authForm, pass: e.target.value})} />
            </div>
            <button type="submit" className="w-full py-6 bg-[#1FAE9B] text-white font-black uppercase tracking-[0.5em] text-[11px] rounded-xl hover:bg-white hover:text-[#1FAE9B] transition-all shadow-2xl shadow-[#1FAE9B]/20">
              Access Private Vault
            </button>
          </form>
          <div className="mt-10 text-center">
            <button onClick={() => { setIsAdmin(false); window.location.hash = ''; }} className="text-[10px] uppercase tracking-[0.4em] text-white/20 hover:text-[#1FAE9B] transition-colors font-black border-b border-transparent hover:border-[#1FAE9B]">Return to Public Studio</button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (isAdmin && isAuth) {
    return (
      <AdminPanel 
        onLogout={handleLogout}
        projects={projects}
        queries={queries}
        studioDetails={studioDetails}
        onUpdateStudioDetails={setStudioDetails}
        onAddProject={(p) => setProjects(prev => [p, ...prev])}
        onUpdateProject={handleUpdateProject}
        onDeleteProject={(id) => setProjects(prev => prev.filter(p => p.id !== id))}
        onDeleteQuery={(id) => setQueries(prev => prev.filter(q => q.id !== id))}
        onUpdateQuery={handleUpdateQuery}
        onClearQueries={() => setQueries([])}
      />
    );
  }

  return (
    <div className="bg-[#060807] min-h-screen selection:bg-[#1FAE9B]/30 selection:text-[#1FAE9B]">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#1FAE9B] z-[100] origin-left"
        style={{ scaleX }}
      />
      
      <Navbar />
      <Scene3D />

      <main className="relative z-10">
        <Hero />
        
        <AboutSection />

        <SectionWrapper id="services" className="bg-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-40 items-center">
              <div>
                <span className="text-[10px] md:text-[12px] text-[#1FAE9B] font-black uppercase tracking-[0.5em] md:tracking-[0.7em] mb-6 md:mb-8 block drop-shadow-lg text-glow">Capabilities</span>
                <h2 className="text-4xl sm:text-6xl md:text-8xl font-serif font-bold italic mb-8 md:mb-12 text-white leading-[1.1] tracking-tight drop-shadow-2xl">Architectural <br /><span className="text-white/10">Alchemy</span></h2>
                <p className="text-white/50 text-base md:text-xl font-light leading-relaxed max-w-xl italic border-l-2 border-[#1FAE9B]/20 pl-8 md:pl-10 mb-10 backdrop-blur-[2px]">
                  "We don't just design rooms; we engineer emotional resonance. Our process is a dialogue between material honesty and visionary form."
                </p>
                <div className="flex gap-4">
                    <button className="flex items-center gap-4 text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-white hover:text-[#1FAE9B] transition-all group px-6 md:px-8 py-3 md:py-4 glass-card rounded-full whitespace-nowrap">
                        Explore Methodology <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12 text-white mt-12 md:mt-0">
                {services.map((s, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -12 }}
                    className="p-8 md:p-10 glass-card rounded-2xl md:rounded-3xl"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-[#1FAE9B]/10 rounded-xl md:rounded-2xl flex items-center justify-center text-[#1FAE9B] mb-6 md:mb-8 shadow-inner backdrop-blur-md">
                      {s.icon}
                    </div>
                    <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.3em] mb-4 md:mb-5 text-white">{s.title}</h3>
                    <p className="text-[11px] md:text-[12px] text-white/40 leading-relaxed font-medium italic">"{s.desc}"</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </SectionWrapper>

        <ProcessSection />

        <Portfolio projects={projects} />
        
        <AIDesignAssistant onQuoteRequest={handleQuoteRequest} />
        
        <ContactForm 
          initialDesign={aiDesign} 
          onSendMessage={handleSendMessage} 
          studioDetails={studioDetails} 
        />
      </main>

      <footer className="relative z-10 py-16 md:py-24 bg-transparent mt-12 md:mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-ios p-10 md:p-20 rounded-[2rem] md:rounded-[3rem] border border-white/5 flex flex-col items-center text-center shadow-2xl">
            <div className="mb-10 md:mb-12 flex flex-col items-center">
              <img 
                src="logo.png" 
                alt="Interiorswala" 
                className="h-10 md:h-12 mb-8 transition-all brightness-110 drop-shadow-md" 
              />
              <p className="max-w-md text-white/40 text-[12px] md:text-sm font-medium leading-relaxed italic border-l border-white/5 pl-6 md:pl-8">
                Excellence in architectural curation and modern spatial luxury since 2025.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12 md:mb-16 text-white">
              <a 
                href={studioDetails.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[9px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.5em] font-black text-white/30 hover:text-[#1FAE9B] transition-all relative group"
              >
                Instagram
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#1FAE9B] transition-all group-hover:w-full"></span>
              </a>
              <a 
                href={studioDetails.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[9px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.5em] font-black text-white/30 hover:text-[#1FAE9B] transition-all relative group"
              >
                WhatsApp
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#1FAE9B] transition-all group-hover:w-full"></span>
              </a>
              <a 
                href={studioDetails.facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[9px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.5em] font-black text-white/30 hover:text-[#1FAE9B] transition-all relative group"
              >
                Facebook
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#1FAE9B] transition-all group-hover:w-full"></span>
              </a>
            </div>
            
            <div className="w-16 md:w-24 h-[1px] bg-[#1FAE9B]/20 mb-8 md:mb-10" />
            
            <p className="text-[8px] md:text-[10px] uppercase tracking-[0.5em] md:tracking-[0.6em] text-white/10 font-black">
              © 2025 Interiorswala Studio. Architecture of Distinction.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;